"use client"; // Mark the file as a Client Component

import { useState, useEffect } from 'react';
import { neon } from '@neondatabase/serverless';

async function fetchVendors() {
  const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
  const response = await sql`SELECT * FROM vendors`;
  return response;
}

function parseRange(range) {
  if (range.includes('+')) {
    const min = parseInt(range, 10);
    return { min, max: Infinity };
  } else {
    const [min, max] = range.split('-').map(Number);
    return { min, max };
  }
}

function rangesOverlap(range1, range2) {
  return range1.min <= range2.max && range1.max >= range2.min;
}

export default function Vendors() {
  const [data, setData] = useState([]);
  const [ageFilter, setAgeFilter] = useState('');

  useEffect(() => {
    async function getData() {
      const fetchedData = await fetchVendors();
      setData(fetchedData);
    }
    getData();
  }, []);

  const filteredData = ageFilter
    ? data.filter((vendor) => {
        const vendorRange = parseRange(vendor.age_range);
        const filterRange = parseRange(ageFilter);
        return rangesOverlap(vendorRange, filterRange);
      })
    : data;

  return (
    <div className="min-w-full overflow-hidden overflow-x-auto p-5">
      <div className="mb-4">
        <label htmlFor="ageGroup" className="mr-2 text-gray-700">Filter by Age Group:</label>
        <select
          id="ageGroup"
          value={ageFilter}
          onChange={(e) => setAgeFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Ages</option>
          <option value="5-10">5-10</option>
          <option value="11-15">11-15</option>
          <option value="16-20">16-20</option>
        </select>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="text-sm text-gray-700 bg-gray-50 border">
          <tr>
            <th className="px-6 py-3 border">Building</th>
            <th className="px-6 py-3 border">Room</th>
            <th className="px-6 py-3 border">Vendor Name</th>
            <th className="px-6 py-3 border">Vendor Description</th>
            <th className="px-6 py-3 border">Age Range</th>
            <th className="px-6 py-3 border">Starting Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id} className="border-l border-r text-center">
              <td className="px-6 py-3 border-b">{row.building}</td>
              <td className="px-6 py-3 border-b">{row.room}</td>
              <td className="px-6 py-3 border-b">{row.vendor_name}</td>
              <td className="px-6 py-3 border-b">{row.vendor_description}</td>
              <td className="px-6 py-3 border-b">{row.age_range}</td>
              <td className="px-6 py-3 border-b">{row.starting_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
