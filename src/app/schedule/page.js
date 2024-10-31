"use client"; // Make this a client component in Next.js

import React, { useState, useEffect, useMemo } from 'react';

async function fetchVendors() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/vendors`);
  const data = await response.json();
  return data;
}

export default function Schedule() {
  const [data, setData] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [customSchedule, setCustomSchedule] = useState([]);
  const [submitted, setSubmitted] = useState(false);

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
    const filtered = data.filter(item => item.vendor_name === selectedVendor);
    return Array.from(new Set(filtered.map(item => item.time_frame))).sort();
  }, [data, selectedVendor]);

  const availableLocations = useMemo(() => {
    const filtered = data.filter(item => item.vendor_name === selectedVendor);
    return Array.from(new Set(filtered.map(item => `${item.building} - ${item.room}`))).sort();
  }, [data, selectedVendor]);

  useEffect(() => {
    if (availableTimeSlots.length === 1) {
      setSelectedTime(availableTimeSlots[0]);
    } else {
      setSelectedTime('');
    }

    if (availableLocations.length === 1) {
      setSelectedLocation(availableLocations[0]);
    } else {
      setSelectedLocation('');
    }
  }, [selectedVendor, availableTimeSlots, availableLocations]);

  const handleAddEvent = () => {
    if (selectedVendor && selectedTime && selectedLocation) {
      const newEvent = {
        vendor: selectedVendor,
        time: selectedTime,
        location: selectedLocation,
      };
      const updatedSchedule = [...customSchedule, newEvent].sort((a, b) => {
        return new Date(`1970/01/01 ${a.time}`) - new Date(`1970/01/01 ${b.time}`);
      });
      setCustomSchedule(updatedSchedule);
      setSelectedVendor('');
      setSelectedTime('');
      setSelectedLocation('');
    } else {
      alert("Please select a vendor, time, and location before adding an event.");
    }
  };

  const handleRemoveEvent = (index) => {
    const updatedSchedule = customSchedule.filter((_, i) => i !== index);
    setCustomSchedule(updatedSchedule);
  };

  const handleClearSchedule = () => {
    setCustomSchedule([]);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleEdit = () => {
    setSubmitted(false);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-50 min-h-screen flex flex-col justify-between">
      <header>
        <h1 className="text-4xl font-bold mb-8 text-center text-black">Schedule Builder</h1>
      </header>

      <div className="flex-grow mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
            <div>
              <label htmlFor="vendor-select" className="block text-lg font-medium text-black mb-2">Select Vendor</label>
              <select
                id="vendor-select"
                value={selectedVendor}
                onChange={(e) => {
                  setSelectedVendor(e.target.value);
                  setSelectedTime('');
                  setSelectedLocation('');
                }}
                className="border border-gray-300 rounded-lg p-3 w-full"
              >
                <option value="">Choose a vendor</option>
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
                disabled={!selectedVendor || availableTimeSlots.length === 1}
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
                disabled={!selectedVendor || availableLocations.length === 1}
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
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={handleAddEvent}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors"
          >
            Add Event
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors"
          >
            Create Schedule
          </button>
          <button
            onClick={handleClearSchedule}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors"
          >
            Clear Schedule
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-black text-center">Your Custom Schedule</h2>
          {customSchedule.length === 0 ? (
            <p className="text-black text-center">No events added yet.</p>
          ) : (
            <div className="overflow-hidden rounded-lg shadow-lg bg-white">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium text-gray-600">Vendor</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-600">Time</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-600">Location</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customSchedule.map((event, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 border-b text-gray-700">{event.vendor}</td>
                      <td className="px-6 py-4 border-b text-gray-700">{event.time}</td>
                      <td className="px-6 py-4 border-b text-gray-700">{event.location}</td>
                      <td className="px-6 py-4 border-b text-gray-700">
                        <button
                          onClick={() => handleRemoveEvent(index)}
                          className="text-blue-500 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {submitted && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Your Official Schedule</h2>
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-600">Vendor</th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">Time</th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">Location</th>
              </tr>
            </thead>
            <tbody>
              {customSchedule.map((event, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b text-gray-700">{event.vendor}</td>
                  <td className="px-6 py-4 border-b text-gray-700">{event.time}</td>
                  <td className="px-6 py-4 border-b text-gray-700">{event.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors"
            >
              Edit Schedule
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
