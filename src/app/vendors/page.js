"use client"; // Mark the file as a Client Component

import { useState, useEffect } from 'react';
import { neon } from '@neondatabase/serverless';

async function fetchVendors() {
  const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
  const response = await sql`SELECT * FROM vendors`;
  return response;
}

export default function Vendors() {
  // State for fetched data, filters, and search term
  const [data, setData] = useState([]);
  const [ageFilter, setAgeFilter] = useState('');
  const [buildingFilter, setBuildingFilter] = useState('');
  const [roomFilter, setRoomFilter] = useState('');
  const [vendorNameFilter, setVendorNameFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Search term state

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
      vendor.room?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.vendor_description.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      (!ageFilter || vendor.age_range === ageFilter) &&
      (!buildingFilter || vendor.building === buildingFilter) &&
      (!roomFilter || vendor.room === roomFilter) &&
      (!vendorNameFilter || vendor.vendor_name === vendorNameFilter) &&
      searchTextMatch
    );
  });

  // Handle search input and search button click
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchTerm); // Trigger a filter based on the search term
  };

  return (
    <div className="min-w-full overflow-hidden overflow-x-auto p-5">
      {/* Search Form */}
      <div className="mb-4">
        <label htmlFor="searchInput" className="mr-2 text-gray-700">Search:</label>
        <input
          type="text"
          id="searchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded mr-2"
          placeholder="Search vendors..."
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>

      {/* Filter Form */}
      <div className="mb-4">
        {/* Filter by Age Group */}
        <div className="mb-4">
          <label htmlFor="ageGroup" className="mr-2 text-gray-700">Filter by Age Group:</label>
          <select
            id="ageGroup"
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Ages</option>
            <option value="Ages 5+">Ages 5+</option>
            <option value="Ages 5-18">Ages 5-18</option>
            <option value="Ages 6+">Ages 6+</option>
          </select>
        </div>

        {/* Filter by Building */}
        <div className="mb-4">
          <label htmlFor="buildingFilter" className="mr-2 text-gray-700">Filter by Building:</label>
          <select
            id="buildingFilter"
            value={buildingFilter}
            onChange={(e) => setBuildingFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="All Buildings">All Buildings</option>
            <option value="Student Union Building">Student Union Building</option>
            <option value="Kinesiology Building">Kinesiology Building</option>
            <option value="Micron Center for Materials Research">Micron Center for Materials Research</option>
            <option value="Ruch Engineering Building">Ruch Engineering Building</option>
            <option value="Harry Morrison Civil Engineering">Harry Morrison Civil Engineering</option>
            <option value="Environmental Research Building">Environmental Research Building</option>
            <option value="Albertson Library">Albertson Library</option>
            <option value="Center for the Visual Arts">Center for the Visual Arts</option>
          </select>
        </div>

        {/* Filter by Room */}
        <div className="mb-4">
          <label htmlFor="roomFilter" className="mr-2 text-gray-700">Filter by Room:</label>
          <select
            id="roomFilter"
            value={roomFilter}
            onChange={(e) => setRoomFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Rooms</option>
            <option value="Bronco Gym">Bronco Gym</option>
            <option value="MCMR Lobby">MCMR Lobby</option>
            <option value="Room 105">Room 105</option>
            <option value="1st Floor Research Wing Hallway">1st Floor Research Wing Hallway</option>
            <option value="2nd Floor Labs and 200A Conference Room">2nd Floor Labs and 200A Conference Room</option>
            <option value="Lab 126">Lab 126</option>
            <option value="Room 106">Room 106</option>
            <option value="Room 205">Room 205</option>
            <option value="Room 103">Room 103</option>
            <option value="Lab 108">Lab 108</option>
            <option value="South Patio">South Patio</option>
            <option value="Patio">Patio</option>
            <option value="Lobby">Lobby</option>
            <option value="1st Floor">1st Floor</option>
          </select>
        </div>

        {/* Filter by Vendor Name */}
        <div className="mb-4">
          <label htmlFor="vendorNameFilter" className="mr-2 text-gray-700">Filter by Vendor Name:</label>
          <select
            id="vendorNameFilter"
            value={vendorNameFilter}
            onChange={(e) => setVendorNameFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value=" ">All Vendors</option>
            <option value="Division of Aeronautics">Division of Aeronautics</option>
            <option value="Science Olympiad">Science Olympiad</option>
            <option value="Boise State Physics + AstroTAC">Boise State Physics + AstroTAC</option>
            <option value="Linguistics Department at Boise State University">Linguistics Department at Boise State University</option>
            <option value="Idaho National Laboratory (INL)">Idaho National Laboratory (INL)</option>
            <option value="Mathnasium of Boise">Mathnasium of Boise</option>
            <option value="Chemistry and Biochemistry">Chemistry and Biochemistry</option>
            <option value="EFx Boise">EFx Boise</option>
            <option value="Verizon">Verizon</option>
            <option value="Boise State University CAST">Boise State University CAST</option>
            <option value="Girl Scouts of Silver Sage">Girl Scouts of Silver Sage</option>
            <option value="Department of Computer Science">Department of Computer Science</option>
            <option value="NASA Challenge Teams at Boise State University">NASA Challenge Teams at Boise State University</option>
            <option value="Dean JoAnn Lighty">Dean JoAnn Lighty</option>
            <option value="Boise State Chemistry Department">Boise State Chemistry Department</option>
            <option value="David Rush">David Rush</option>
            <option value="Brian Jackson">Brian Jackson</option>
            <option value="Rapid Aerial LLC">Rapid Aerial LLC</option>
            <option value="FIRST Idaho Robotics">FIRST Idaho Robotics</option>
            <option value="Idaho Lego Users Group">Idaho Lego Users Group</option>
            <option value="Open Lab Idaho/V.E.R.N">Open Lab Idaho/V.E.R.N</option>
            <option value="STARBASE Idaho">STARBASE Idaho</option>
            <option value="Federal Highway Administration">Federal Highway Administration</option>
            <option value="Nuclear Engineering Club (Materials Science and Engineering)">Nuclear Engineering Club (Materials Science and Engineering)</option>
            <option value="Electrical and Computer Engineering">Electrical and Computer Engineering</option>
            <option value="Quantum DNA Research Group (Boise State MSMSE)">Quantum DNA Research Group (Boise State MSMSE)</option>
            <option value="Micron School of Materials Science and Engineering">Micron School of Materials Science and Engineering</option>
            <option value="Surface Science Lab (Boise State MSMSE)">Surface Science Lab (Boise State MSMSE)</option>
            <option value="The Discovery Center of Idaho">The Discovery Center of Idaho</option>
            <option value="MSMSE">MSMSE</option>
            <option value="Boise State Center for Materials Characterization">Boise State Center for Materials Characterization</option>
            <option value="National Weather Science">National Weather Science</option>
            <option value="Engineering Innovation Studio">Engineering Innovation Studio</option>
            <option value="Civil Engineering – ASCE Student Chapter Timber Strong Delicate (Taylor’s Version)">Civil Engineering – ASCE Student Chapter Timber Strong Delicate (Taylor’s Version)</option>
            <option value="New Product Development Lab at TechHelp and Studio\Blu">New Product Development Lab at TechHelp and Studio\Blu</option>
            <option value="Surface Science Lab (Boise State MSMSE)">Surface Science Lab (Boise State MSMSE)</option>
            <option value="Civil Engineering Department – Environmental Engineering Club Filter Competition (Teardrops on My Guitar)">Civil Engineering Department – Environmental Engineering Club Filter Competition (Teardrops on My Guitar)</option>
            <option value="Civil Engineering Steel Bridge Club">Civil Engineering Steel Bridge Club</option>
            <option value="Civil Engineering Club">Civil Engineering Club</option>
            <option value="Civil Engineering Department">Civil Engineering Department</option>
            <option value="Boise State Geosciences">Boise State Geosciences</option>
            <option value="MakerLab">MakerLab</option>
            <option value="Stein Luminary">Stein Luminary</option>
          </select>
        </div>
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
                <td className="px-6 py-3 border-b">{row.building}</td>
                <td className="px-6 py-3 border-b">{row.room || "N/A"}</td>
                <td className="px-6 py-3 border-b">{row.vendor_name}</td>
                <td className="px-6 py-3 border-b">{row.vendor_description}</td>
                <td className="px-6 py-3 border-b">{row.age_range}</td>
                <td className="px-6 py-3 border-b">{row.time_frame}</td>
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
