"use client";

import { useState, useEffect } from 'react';

// Fetch vendors from the API
async function fetchVendors() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/vendors`);
  const data = await response.json();
  return data;
}

// Function to update vendor details
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

  const data = await response.json();
  return data;
}

//function to add a row
async function addVendor(vendor) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/vendors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vendor),
  });
  if (!response.ok) throw new Error('Failed to add vendor');
  return await response.json();
}

//function to delete a row
async function deleteVendor(id) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/vendors`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) throw new Error('Failed to delete vendor');
  return await response.json();
}

export default function VendorsAdmin() {
  const [data, setData] = useState([]);
  const [editingVendor, setEditingVendor] = useState(null);
  const [newVendor, setNewVendor] = useState({
    vendor_name: '',
    vendor_description: '',
    building: '',
    room: '',
    age_range: '',
    time_frame: '',
  });

  // Fetch vendor data on component mount
  useEffect(() => {
    async function getData() {
      const fetchedData = await fetchVendors();
      setData(fetchedData);
    }
    getData();
  }, []);

  // Handle input change for the add vendor form
  const handleAddChange = (e) => {
    setNewVendor({ ...newVendor, [e.target.name]: e.target.value });
  };

  // Add a new vendor
  const handleAdd = async () => {
    await addVendor(newVendor);
    setNewVendor({
      vendor_name: '',
      vendor_description: '',
      building: '',
      room: '',
      age_range: '',
      time_frame: '',
    });
    const updatedData = await fetchVendors();
    setData(updatedData);
  };

  // Delete a vendor
  const handleDelete = async (id) => {
    await deleteVendor(id);
    const updatedData = await fetchVendors();
    setData(updatedData);
  };

  // Trigger editing mode for a selected vendor
  const handleEditClick = (vendor) => {
    setEditingVendor(vendor);
  };

  // Handle changes in the edit form
  const handleEditChange = (e) => {
    setEditingVendor({ ...editingVendor, [e.target.name]: e.target.value });
  };

  // Save the edited vendor information
  const handleSave = async () => {
    await updateVendor(editingVendor);
    setEditingVendor(null);
    const updatedData = await fetchVendors(); // Refresh data after update
    setData(updatedData);
  };

  return (
    <div className="p-5">
      <h3 className="text-2xl mb-4">Manage Vendors</h3>
      {/* Add New Vendor Form */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6 shadow-lg">
        <h4 className="text-lg font-semibold mb-4">Add New Vendor</h4>
        <form className="space-y-4">
        <input
            type="text"
            name="building"
            placeholder="Building"
            value={newVendor.building}
            onChange={handleAddChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="room"
            placeholder="Room"
            value={newVendor.room}
            onChange={handleAddChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="vendor_name"
            placeholder="Vendor Name"
            value={newVendor.vendor_name}
            onChange={handleAddChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="vendor_description"
            placeholder="Vendor Description"
            value={newVendor.vendor_description}
            onChange={handleAddChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="age_range"
            placeholder="Age Range"
            value={newVendor.age_range}
            onChange={handleAddChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="time_frame"
            placeholder="Time Frame"
            value={newVendor.time_frame}
            onChange={handleAddChange}
            className="w-full p-2 border rounded"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Vendor
          </button>
        </form>
      </div>
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
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(vendor.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Vendor Form */}
      {editingVendor && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-4">Edit Vendor</h4>
          <form>
            <label>
              Vendor Name
              <input
                type="text"
                name="vendor_name"
                value={editingVendor.vendor_name || ''}
                onChange={handleEditChange}
                className="w-full p-2 mb-2 border rounded"
              />
            </label>
            <label>
              Description
              <input
                type="text"
                name="vendor_description"
                value={editingVendor.vendor_description || ''}
                onChange={handleEditChange}
                className="w-full p-2 mb-2 border rounded"
              />
            </label>
            <label>
              Building
              <input
                type="text"
                name="building"
                value={editingVendor.building || ''}
                onChange={handleEditChange}
                className="w-full p-2 mb-2 border rounded"
              />
            </label>
            <label>
              Room
              <input
                type="text"
                name="room"
                value={editingVendor.room || ''}
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
