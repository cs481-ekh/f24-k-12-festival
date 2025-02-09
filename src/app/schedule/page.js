"use client"; // Make this a client component in Next.js

import React, { useState, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie

async function fetchVendors() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/vendors`);
  const data = await response.json();
  return data;
}

export default function Schedule() {
  const [data, setData] = useState([]);
  const [selectedEvent, setselectedEvent] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [officialSchedule, setOfficialSchedule] = useState([]);

  useEffect(() => {
    const savedSchedule = Cookies.get('officialSchedule');
    if (savedSchedule) {
      try {
        setOfficialSchedule(JSON.parse(savedSchedule));
        setSubmitted(true);
      } catch (error) {
        console.error("Failed to parse saved schedule from cookies", error);
      }
    }
  }, []);

  useEffect(() => {
    async function getData() {
      const vendorData = await fetchVendors();
      setData(vendorData);
    }
    getData();
  }, []);

  const uniqueVendors = useMemo(() =>
    Array.from(new Set(data.map(item => item.vendor_name))).sort(),
    [data]
  );

  const availableTimeSlots = useMemo(() => {
    const filtered = data.filter(item => item.activity === selectedEvent);
    return Array.from(new Set(filtered.map(item => item.time_frame))).sort();
  }, [data, selectedEvent]);

  const availableLocations = useMemo(() => {
    const filtered = data.filter(item => item.activity === selectedEvent);
    return Array.from(new Set(filtered.map(item => `${item.building} - ${item.floor} - ${item.room}`))).sort();
  }, [data, selectedEvent]);

  useEffect(() => {
    if (!selectedTime || !availableTimeSlots.includes(selectedTime)) {
      setSelectedTime(availableTimeSlots[0] || '');
    }
    if (!selectedLocation || !availableLocations.includes(selectedLocation)) {
      setSelectedLocation(availableLocations[0] || '');
    }
  }, [selectedEvent, availableTimeSlots, availableLocations]);

  const handleAddEvent = () => {
    if (selectedEvent && selectedTime && selectedLocation) {
      const newEvent = {
        event: selectedEvent,
        time: selectedTime,
        location: selectedLocation,
      };
      const updatedSchedule = [...officialSchedule, newEvent]
        .sort((a, b) => new Date(`1970/01/01 ${a.time}`) - new Date(`1970/01/01 ${b.time}`));
      setOfficialSchedule(updatedSchedule);
      Cookies.set('officialSchedule', JSON.stringify(updatedSchedule), { expires: 7 });
      setselectedEvent('');
      setSelectedTime('');
      setSelectedLocation('');
    } else {
      alert("Please select an activity, time, and location before adding an event.");
    }
  };

  const handleRemoveEvent = (index) => {
    const updatedSchedule = officialSchedule.filter((_, i) => i !== index);
    setOfficialSchedule(updatedSchedule);
    Cookies.set('officialSchedule', JSON.stringify(updatedSchedule), { expires: 7 });
  };
  // Share schedule via email
  const handleShareSchedule = () => {
    const scheduleText = officialSchedule
      .map((event) => `${event.vendor} - ${event.time} at ${event.location}`)
      .join('\n');

    const emailSubject = "My Official STEM Festival Schedule";
    const emailBody = encodeURIComponent(`Here is my official STEM Festival schedule:\n\n${scheduleText}`);
    const emailLink = `mailto:?subject=${emailSubject}&body=${emailBody}`;

    window.location.href = emailLink; // Opens the email client
  };

  // Share schedule via text (sms:)
  const handleShareScheduleText = () => {
    const scheduleText = officialSchedule
      .map((event) => `${event.vendor} - ${event.time} at ${event.location}`)
      .join('\n');

    const smsLink = `sms:?body=My%20STEM%20Festival%20Schedule:%0A%0A${encodeURIComponent(scheduleText)}`;
    window.location.href = smsLink; // Opens the SMS client on mobile or desktop
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen flex flex-col justify-between">
      <header>
        <h1 className="text-3xl font-bold mb-8 text-center text-black">Create a Schedule</h1>
      </header>

      <div className="flex-grow mb-8 gap-4">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
            <div>
              <label htmlFor="activity-select" className="block text-lg font-medium text-black mb-2">Select Activity</label>
              <select
                id="-select"
                value={selectedEvent}
                onChange={(e) => {
                  setselectedEvent(e.target.value);
                  setSelectedTime('');
                  setSelectedLocation('');
                }}
                className="border border-gray-300 p-3 w-full bg-white rounded-lg"
              >
                <option value="">Choose an activity</option>
                {uniqueVendors.map((vendor, index) => (
                  <option key={index} value={vendor}>
                    {vendor}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="time-select" className="block text-lg font-medium text-black mb-2">Select Time Slot</label>
              <select
                id="time-select"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full"
                disabled={!selectedEvent || availableTimeSlots.length === 0}
              >
                <option value="">Choose a time slot</option>
                {availableTimeSlots.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="location-select" className="block text-lg font-medium text-black mb-2">Select Location</label>
              <select
                id="location-select"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full"
                disabled={!selectedEvent || availableLocations.length === 0}
              >
                <option value="">Choose a location</option>
                {availableLocations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handleAddEvent}
              className="bg-bsu-blue text-white px-6 py-3 rounded hover:bg-orange-500 transition-colors"
            >
              Add to Schedule
            </button>
            <button
              onClick={handleShareSchedule}
              className="bg-bsu-blue text-white px-6 py-3 rounded hover:bg-orange-500 transition-colors"
            >
              Share via Email
            </button>
            <button
              onClick={handleShareScheduleText}
              className="bg-bsu-blue text-white px-6 py-3 rounded hover:bg-orange-500 transition-colors"
            >
              Share via Text
            </button>
          </div>
        </div>


        <div>
          <div className="hidden lg:block">
            <div className="mt-8 bg-white rounded-lg shadow-lg p-8 overflow-hidden">
              <h2 className="text-3xl font-bold mb-8 text-center text-black">Your Official Schedule</h2>
              {officialSchedule.length === 0 ? (
                <p className="text-black text-center">No events added yet.</p>
              ) : (
                <table className="w-full border">
                  <thead className="bg-bsu-blue border-b">
                    <tr>
                      <th className="px-3 py-4 border text-left font-medium text-white">Activity</th>
                      <th className="px-3 py-4 border text-left font-medium text-white">Time</th>
                      <th className="px-3 py-4 border text-left font-medium text-white">Location</th>
                      <th className="px-3 py-4 border text-left font-medium text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {officialSchedule.map((event, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-3 py-4 border-b text-gray-700">{event.vendor}</td>
                        <td className="px-3 py-4 border-b text-gray-700">{event.time}</td>
                        <td className="px-3 py-4 border-b text-gray-700">
                        {event.location.split(' - ').map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </td>
                        <td className="px-3 py-4 border-b text-gray-700">
                          <button
                            onClick={() => handleRemoveEvent(index)}
                            className="text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="lg:hidden grid gap-4 grid-cols-1 sm:grid-cols-2">
            {officialSchedule.length === 0 ? (
              <p className="text-black text-center">No events added yet.</p>
            ) : (
              <table className="w-full border">
                <thead className="bg-bsu-blue border-b">
                  <tr>
                    <th className="px-3 py-4 border text-left font-medium text-white">Activity</th>
                    <th className="px-3 py-4 border text-left font-medium text-white">Time</th>
                    <th className="px-3 py-4 border text-left font-medium text-white">Location</th>
                    <th className="px-3 py-4 border text-left font-medium text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {officialSchedule.map((event, index) => (
                    <tr key={index} className="p-4 bg-white shadow-lg rounded-lg">
                      <td className="px-3 py-4 border-b text-gray-700">{event.vendor}</td>
                      <td className="px-3 py-4 border-b text-gray-700">{event.time}</td>
                      <td className="px-3 py-4 border-b text-gray-700">
                        {event.location.split(' - ').map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </td>
                      <td className="px-3 py-4 border-b text-gray-700">
                        <button
                          onClick={() => handleRemoveEvent(index)}
                          className="text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
