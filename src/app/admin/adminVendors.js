"use client";

import { useState, useEffect } from 'react';

// Fetch vendors
async function fetchVendors() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/vendors`);
  const data = await response.json();
  return data;
}

// Update vendor API call
async function updateVendor(vendor) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/vendors`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vendor),
  });

  if (!response.ok) {
    console.error('Failed to update vendor:', response.statusText);
    throw new Error('Failed to update vendor');
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export default function VendorsAdmin() {
  const [data, setData] = useState([]);
  const [editingVendor, setEditingVendor] = useState(null);

  useEffect(() => {
    async function getData() {
      const fetchedData = await fetchVendors();
      setData(fetchedData);
    }
    getData();
  }, []);

  const handleEditClick = (vendor) => {
    setEditingVendor(vendor);
  };

  const handleEditChange = (e) => {
    setEditingVendor({ ...editingVendor, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await updateVendor(editingVendor);
    setEditingVendor(null);
    const updatedData = await fetchVendors();
    setData(updatedData);
  };

  return (
    <div className="p-5">
      <h3 className="text-2xl mb-4">Manage Vendors</h3>
      <table className="min-w-full divide-y divide-gray-200 mb-6">
        <thead>
          <tr>
            <th>Building</th>
            <th>Room</th>
            <th>Vendor Name</th>
            <th>Vendor Description</th>
            <th>Age Range</th>
            <th>Time Frame</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.building}</td>
              <td>{vendor.room}</td>
              <td>{vendor.vendor_name}</td>
              <td>{vendor.vendor_description}</td>
              <td>{vendor.age_range}</td>
              <td>{vendor.time_frame}</td>
              <td>
                <button
                  onClick={() => handleEditClick(vendor)}
                  className="text-blue-500 underline"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form */}
      {editingVendor && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-4">Edit Vendor</h4>
          <form>
            <label>
              Vendor Name
              <input
                type="text"
                name="vendor_name"
                value={editingVendor.vendor_name}
                onChange={handleEditChange}
                className="w-full p-2 mb-2 border rounded"
              />
            </label>
            <label>
              Description
              <input
                type="text"
                name="vendor_description"
                value={editingVendor.vendor_description}
                onChange={handleEditChange}
                className="w-full p-2 mb-2 border rounded"
              />
            </label>
            <label>
              Building
              <input
                type="text"
                name="building"
                value={editingVendor.building}
                onChange={handleEditChange}
                className="w-full p-2 mb-2 border rounded"
              />
            </label>
            <label>
              Room
              <input
                type="text"
                name="room"
                value={editingVendor.room}
                onChange={handleEditChange}
                className="w-full p-2 mb-2 border rounded"
              />
            </label>
            <button
              type="button"
              onClick={handleSave}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
