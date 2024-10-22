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
  // State for fetched data, filters, and search term
  const [data, setData] = useState([]);
  const [ageFilter, setAgeFilter] = useState('');
  const [buildingFilter, setBuildingFilter] = useState('');
  const [roomFilter, setRoomFilter] = useState('');
  const [vendorNameFilter, setVendorNameFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Search term state

  // States for filter options
  const [ageOptions, setAgeOptions] = useState([]);
  const [buildingOptions, setBuildingOptions] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);
  const [vendorNameOptions, setVendorNameOptions] = useState([]);

  // Fetch filter options
  useEffect(() => {
    async function getFilterOptions() {
      const fetchedFilterOptions = await fetchFilterOptions();
      console.log(fetchFilterOptions);
      setAgeOptions(fetchedFilterOptions.ageOptions);
      setBuildingOptions(fetchedFilterOptions.buildingOptions);
      setRoomOptions(fetchedFilterOptions.roomOptions);
      setVendorNameOptions(fetchedFilterOptions.vendorNameOptions);
    }
    getFilterOptions();
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    async function getData() {
      const fetchedData = await fetchVendors();
      setData(fetchedData);
    }
    getData();
  }, []); // Empty dependency array to fetch once on mount

  // Filter the data based on the selected filters and search term
  const filteredData = data.filter((vendor) => {
    const searchTextMatch =
      vendor.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.vendor_description.toLowerCase().includes(searchTerm.toLowerCase());

    const ageMatch = ageFilter === "" || vendor.age_range === ageFilter;
    const buildingMatch = buildingFilter === "" || vendor.building === buildingFilter;
    const roomMatch = roomFilter === "" || vendor.room === roomFilter;
    const vendorNameMatch = vendorNameFilter === "" || vendor.vendor_name === vendorNameFilter;

    return (
      ageMatch &&
      buildingMatch &&
      roomMatch &&
      vendorNameMatch &&
      searchTextMatch
    );
  });

  return (
    <div className="min-w-full overflow-hidden overflow-x-auto p-5">

      {/*Search and Filters*/}
      <div className="mb-4 flex items-center">
        {/* Search Form */}
        <div className="flex-1 mb-0 mr-4">
          <label htmlFor="searchInput" className="mr-2 text-gray-700 pl-5"></label>
          <input
            type="text"
            id="searchInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded mr-2 w-full"
            placeholder="Search vendors..."
          />
        </div>

        {/* Filter Form */}
        <fieldset className="flex space-x-4 mb-0">
          {/* Filter by Age Group */}
          <div>
            <label htmlFor="ageGroup" className="mr-2 text-gray-700 pl-5">Age Group:</label>
            <select
              id="ageGroup"
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">No Filter</option>
              {ageOptions.map((age) => (
                <option key={age.age_range} value={age.age_range}>
                  {age.age_range}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Building */}
          <div>
            <label htmlFor="buildingFilter" className="mr-2 text-gray-700 pl-5">Building:</label>
            <select
              id="buildingFilter"
              value={buildingFilter}
              onChange={(e) => setBuildingFilter(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">All Buildings</option>
              {buildingOptions.map((building) => (
                <option key={building.building} value={building.building}>
                  {building.building}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Room */}
          <div>
            <label htmlFor="roomFilter" className="mr-2 text-gray-700 pl-5">Room:</label>
            <select
              id="roomFilter"
              value={roomFilter}
              onChange={(e) => setRoomFilter(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">All Rooms</option>
              {roomOptions.map((room) => (
                <option key={room.room} value={room.room}>
                  {room.room}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Vendor Name */}
          <div>
            <label htmlFor="vendorNameFilter" className="mr-2 text-gray-700 pl-5">Vendor Name:</label>
            <select
              id="vendorNameFilter"
              value={vendorNameFilter}
              onChange={(e) => setVendorNameFilter(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">All Vendors</option>
              {vendorNameOptions.map((vendorName) => (
                <option key={vendorName.vendor_name} value={vendorName.vendor_name}>
                  {vendorName.vendor_name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
      </div>

      {/* Display Vendor Data */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="text-sm text-gray-700 bg-gray-50 border">
          <tr>
            <th className="px-6 py-3 border">Building</th>
            <th className="px-6 py-3 border">Room</th>
            <th className="px-6 py-3 border">Vendor Name</th>
            <th className="px-6 py-3 border">Vendor Description</th>
            <th className="px-6 py-3 border">Age Range</th>
            <th className="px-6 py-3 border">Time Frame</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row) => (
              <tr key={row.id} className="border-l border-r text-center">
                <td className="px-6 py-3 border">{row.building}</td>
                <td className="px-6 py-3 border">{row.room}</td>
                <td className="px-6 py-3 border">{row.vendor_name}</td>
                <td className="px-6 py-3 border">{row.vendor_description}</td>
                <td className="px-6 py-3 border">{row.age_range}</td>
                <td className="px-6 py-3 border">{row.time_frame}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">No vendors found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}