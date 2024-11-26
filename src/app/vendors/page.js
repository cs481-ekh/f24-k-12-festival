"use client"; // Mark the file as a Client Component

import { useState, useEffect } from 'react';

async function fetchVendors() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/vendors`);
  const data = await response.json();
  return data;
}

async function fetchFilterOptions() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/vendors/filterOptions`);
  const data = await response.json();
  return data;
}

export default function Vendors() {
  const [data, setData] = useState([]);
  const [ageFilter, setAgeFilter] = useState('');
  const [buildingFilter, setBuildingFilter] = useState('');
  const [floorFilter, setFloorFilter] = useState('');
  const [roomFilter, setRoomFilter] = useState('');
  const [vendorNameFilter, setVendorNameFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [ageOptions, setAgeOptions] = useState([]);
  const [buildingOptions, setBuildingOptions] = useState([]);
  const [floorOptions, setFloorOptions] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);
  const [vendorNameOptions, setVendorNameOptions] = useState([]);

  useEffect(() => {
    async function getFilterOptions() {
      const fetchedFilterOptions = await fetchFilterOptions();
      setAgeOptions(fetchedFilterOptions.ageOptions);
      setBuildingOptions(fetchedFilterOptions.buildingOptions);
      setFloorOptions(fetchedFilterOptions.floorOptions);
      setRoomOptions(fetchedFilterOptions.roomOptions);
      setVendorNameOptions(fetchedFilterOptions.vendorNameOptions);
    }
    getFilterOptions();
  }, []);

  useEffect(() => {
    async function getData() {
      const fetchedData = await fetchVendors();
      setData(fetchedData);
    }
    getData();
  }, []);

  const filteredData = data.filter((vendor) => {
    const searchTextMatch =
      vendor.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.floor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.vendor_description.toLowerCase().includes(searchTerm.toLowerCase());

    const ageMatch = ageFilter === "" || vendor.age_range === ageFilter;
    const buildingMatch = buildingFilter === "" || vendor.building === buildingFilter;
    const floorMatch = floorFilter === "" || vendor.floor === floorFilter;
    const roomMatch = roomFilter === "" || vendor.room === roomFilter;
    const vendorNameMatch = vendorNameFilter === "" || vendor.vendor_name === vendorNameFilter;

    return ageMatch && buildingMatch && floorMatch && roomMatch && vendorNameMatch && searchTextMatch;
  });

  return (
    <div className="min-w-full p-5 bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Activities
        </h1>
        <p className="text-lg text-gray-600">
          Browse through the activities below and find the ones you&apos;re most excited for!
        </p>
        <br></br>
      </div>
      {/* Search and Filters */}
      <div className="mb-4">
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-full md:w-auto flex-1 bg-white"
            placeholder="Search activities"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="border p-2 rounded bg-bsu-blue text-white font-bold w-full md:w-auto hover:bg-orange-500 transition"
          >
            <span className="mr-2">Filters</span>
            <span>{showFilters ? '▲' : '▼'}</span>
          </button>
        </div>

        {/* Filter Options Dropdown */}
        {showFilters && (
          <div className="mt-4 p-4 bg-orange-500 rounded-lg shadow-md">
            <div className="flex flex-wrap gap-4">
              {/* Filter by Vendor Name */}
              <div className="w-full md:w-1/2 lg:w-1/4">
                <label htmlFor="vendorNameFilter" className="text-white block mb-1">Host Name:</label>
                <select
                  id="vendorNameFilter"
                  value={vendorNameFilter}
                  onChange={(e) => setVendorNameFilter(e.target.value)}
                  className="border p-2 rounded w-full bg-white"
                >
                  <option value="">All Hosts</option>
                  {vendorNameOptions.map((vendorName) => (
                    <option key={vendorName.vendor_name} value={vendorName.vendor_name}>
                      {vendorName.vendor_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter by Building */}
              <div className="w-full md:w-1/2 lg:w-1/4">
                <label htmlFor="buildingFilter" className="text-white block mb-1">Building:</label>
                <select
                  id="buildingFilter"
                  value={buildingFilter}
                  onChange={(e) => setBuildingFilter(e.target.value)}
                  className="border p-2 rounded w-full bg-white"
                >
                  <option value="">All Buildings</option>
                  {buildingOptions.map((building) => (
                    <option key={building.building} value={building.building}>
                      {building.building}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter by Floor */}
              <div className="w-full md:w-1/2 lg:w-1/4">
                <label htmlFor="floorFilter" className="text-white block mb-1">Floor:</label>
                <select
                  id="floorFilter"
                  value={floorFilter}
                  onChange={(e) => setFloorFilter(e.target.value)}
                  className="border p-2 rounded w-full bg-white"
                >
                  <option value="">All Floors</option>
                  {floorOptions.map((floor) => (
                    <option key={floor.floor} value={floor.floor}>
                      {floor.floor}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter by Room */}
              <div className="w-full md:w-1/2 lg:w-1/4">
                <label htmlFor="roomFilter" className="text-white block mb-1">Room:</label>
                <select
                  id="roomFilter"
                  value={roomFilter}
                  onChange={(e) => setRoomFilter(e.target.value)}
                  className="border p-2 rounded w-full bg-white"
                >
                  <option value="">All Rooms</option>
                  {roomOptions.map((room) => (
                    <option key={room.room} value={room.room}>
                      {room.room}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter by Age Group */}
              <div className="w-full md:w-1/2 lg:w-1/4">
                <label htmlFor="ageGroup" className="text-white block mb-1">Age Group:</label>
                <select
                  id="ageGroup"
                  value={ageFilter}
                  onChange={(e) => setAgeFilter(e.target.value)}
                  className="border p-2 rounded w-full bg-white"
                >
                  <option value="">No Filter</option>
                  {ageOptions.map((age) => (
                    <option key={age.age_range} value={age.age_range}>
                      {age.age_range}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Table layout on large screens, Card layout on small screens */}
      <div>
        {/* Table layout */}
        <div className="hidden lg:block">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="text-sm text-gray-700 border">
              <tr>
                <th className="px-6 py-3 border bg-bsu-blue text-white">Building</th>
                <th className="px-6 py-3 border bg-bsu-blue text-white">Floor</th>
                <th className="px-6 py-3 border bg-bsu-blue text-white">Room</th>
                <th className="px-6 py-3 border bg-bsu-blue text-white">Host Name</th>
                <th className="px-6 py-3 border bg-bsu-blue text-white">Activity Description</th>
                <th className="px-6 py-3 border bg-bsu-blue text-white">Age Range</th>
                <th className="px-6 py-3 border bg-bsu-blue text-white">Time Frame</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr key={row.id} className="border-l border-r text-center bg-white">
                    <td className="px-6 py-3 border">{row.building}</td>
                    <td className="px-6 py-3 border">{row.floor}</td>
                    <td className="px-6 py-3 border">{row.room}</td>
                    <td className="px-6 py-3 border">{row.vendor_name}</td>
                    <td className="px-6 py-3 border">{row.vendor_description}</td>
                    <td className="px-6 py-3 border">{row.age_range}</td>
                    <td className="px-6 py-3 border">{row.time_frame}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">No activities found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Card layout */}
        <div className="lg:hidden grid gap-4 grid-cols-1 sm:grid-cols-2">
          {filteredData.length > 0 ? (
            filteredData.map((vendor) => (
              <div key={vendor.id} className="p-4 bg-white shadow-lg rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{vendor.vendor_name}</h3>
                <p className="text-gray-600"><strong>Building:</strong> {vendor.building}</p>
                <p className="text-gray-600"><strong>Floor:</strong> {vendor.floor}</p>
                <p className="text-gray-600"><strong>Room:</strong> {vendor.room}</p>
                <p className="text-gray-600"><strong>Age Range:</strong> {vendor.age_range}</p>
                <p className="text-gray-600"><strong>Time Frame:</strong> {vendor.time_frame}</p>
                <br></br>
                <strong>Description:</strong>
                <p className="text-black"> {vendor.vendor_description}</p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No activities found</p>
          )}
        </div>
      </div>
    </div>
  );
}
