"use client";

import { useState, useEffect, useRef } from 'react';
import Papa from "papaparse"; // For parsing CSV files

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

// Function to add a new vendor
async function addVendor(vendor) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/vendors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vendor),
  });
  if (!response.ok) throw new Error('Failed to add vendor');
  return await response.json();
}

// Function to bulk add vendors via a CSV
async function bulkAddVendors(vendors) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/vendors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vendors }),
  });
  if (!response.ok) throw new Error("Failed to add vendors in bulk");
  return await response.json();
}

// Function to delete a single vendor
async function deleteVendor(id) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/vendors`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) throw new Error('Failed to delete vendor');
  return await response.json();
}

// Function to bulk delete vendors
async function bulkDeleteVendors(ids) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/vendors`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  });
  if (!response.ok) throw new Error('Failed to delete vendors');
  return await response.json();
}

export default function VendorsAdmin() {
  const [data, setData] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]); // Track selected vendors
  const [editingVendor, setEditingVendor] = useState(null);
  const [csvFile, setCsvFile] = useState(null); // For storing the selected CSV file
  const [newVendor, setNewVendor] = useState({
    vendor_name: '',
    vendor_description: '',
    building: '',
    floor: '',
    room: '',
    age_range: '',
    time_frame: '',
  });

  useEffect(() => {
    async function getData() {
      const fetchedData = await fetchVendors();
      setData(fetchedData);
    }
    getData();
  }, []);

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleCsvUpload = async () => {
    if (!csvFile) {
      alert("Please select a CSV file to upload.");
      return;
    }

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        console.log("Parsed CSV Data:", results.data); // Log parsed data for debugging

        try {
          const vendors = results.data;

          // Check if parsed data is an array and not empty
          if (!Array.isArray(vendors) || vendors.length === 0) {
            throw new Error("No valid data found in the CSV file.");
          }

          // Send data to the backend
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/vendors`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ vendors }),
          });

          if (!response.ok) {
            throw new Error("Failed to upload vendors.");
          }

          const updatedData = await fetchVendors(); // Refresh the table
          setData(updatedData);
          alert("Vendors uploaded successfully!");
        } catch (error) {
          console.error("Error uploading vendors:", error);
          alert("Failed to upload vendors. Please ensure the file is correctly formatted.");
        }
      },
      error: (error) => {
        console.error("Error parsing CSV file:", error);
        alert("Failed to parse CSV file.");
      },
    });
  };

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
      floor: '',
      room: '',
      age_range: '',
      time_frame: '',
    });
    const updatedData = await fetchVendors();
    setData(updatedData);
  };

  // Handle checkbox changes
  const handleCheckboxChange = (id) => {
    setSelectedVendors((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((vendorId) => vendorId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  // Delete selected vendors with confirmation
  const handleBulkDelete = async () => {
    if (selectedVendors.length === 0) {
      alert("You have not selected any vendors to delete.");
      return;
    }

    if (window.confirm("Are you sure you want to delete the selected vendors? This action cannot be undone.")) {
      try {
        await bulkDeleteVendors(selectedVendors);
        setSelectedVendors([]); // Clear selection after delete
        const updatedData = await fetchVendors();
        setData(updatedData);
        alert("Vendors deleted successfully!");
      } catch (error) {
        console.error("Error deleting vendors:", error);
        alert("Failed to delete vendors.");
      }
    }
  };

  // Trigger editing mode for a selected vendor
  const handleEditClick = (vendor) => {
    setEditingVendor(vendor);
    // Scroll to the edit form
    setTimeout(() => {
      editFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
    <div className="min-w-full">
      <h3 className="text-2xl mb-4">Manage Vendors</h3>

      {/* CSV Upload Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6 shadow-lg">
        <h4 className="text-lg font-semibold mb-4">Upload Vendors from CSV</h4>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600 bg-white cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-bsu-blue focus:border-bsu-blue mb-4"
        />
        <button
          type="button"
          onClick={handleCsvUpload}
          className="bg-bsu-blue text-white text-lg font-bold hover:bg-orange-500 hover:scale-110 duration-300 px-4 py-2 rounded"
        >
          Upload CSV
        </button>
      </div>

      {/* Add New Vendor Form */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6 shadow-lg">
        <h4 className="text-lg font-semibold mb-4">Add New Vendor</h4>
        <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label>
            Vendor Name
            <input
              type="text"
              name="vendor_name"
              value={newVendor.vendor_name}
              onChange={handleAddChange}
              className="w-full p-2 border rounded"
            />
          </label>
          <label>
            Vendor Description
            <input
              type="text"
              name="vendor_description"
              value={newVendor.vendor_description}
              onChange={handleAddChange}
              className="w-full p-2 border rounded"
            />
          </label>
          <label>
            Building
            <input
              type="text"
              name="building"
              value={newVendor.building}
              onChange={handleAddChange}
              className="w-full p-2 border rounded"
            />
          </label>
          <label>
            Floor
            <input
              type="text"
              name="floor"
              value={newVendor.floor}
              onChange={handleAddChange}
              className="w-full p-2 border rounded"
            />
          </label>
          <label>
            Room
            <input
              type="text"
              name="room"
              value={newVendor.room}
              onChange={handleAddChange}
              className="w-full p-2 border rounded"
            />
          </label>
          <label>
            Age Range
            <input
              type="text"
              name="age_range"
              value={newVendor.age_range}
              onChange={handleAddChange}
              className="w-full p-2 border rounded"
            />
          </label>
          <label>
            Time Frame
            <input
              type="text"
              name="time_frame"
              value={newVendor.time_frame}
              onChange={handleAddChange}
              className="w-full p-2 border rounded"
            />
          </label>
          <button
            type="button"
            onClick={handleAdd}
            className="bg-bsu-blue text-white text-lg text-center font-bold hover:bg-orange-500 rounded"
          >
            Add Vendor
          </button>
        </form>
      </div>

      {/* Bulk Delete Selected Vendors Button */}
      {selectedVendors.length > 0 && (
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={handleBulkDelete}
            className="bg-bsu-blue text-white text-sm font-bold hover:bg-orange-500 hover:scale-110 duration-300 px-4 py-2 rounded"
          >
            Delete Selected Vendors
          </button>
        </div>
      )}

      {/* Table layout */}
      <div>
        <div className="hidden lg:block">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="text-sm text-gray-700 bg-gray-50 border">
              <tr>
                <th className="px-6 py-3 border bg-bsu-blue text-white">
                  <input
                    type="checkbox"
                    onChange={() => {
                      if (selectedVendors.length === data.length) {
                        setSelectedVendors([]);
                      } else {
                        setSelectedVendors(data.map((vendor) => vendor.id));
                      }
                    }}
                    checked={selectedVendors.length === data.length}
                  />
                </th>
                <th className="px-6 py-3 border bg-bsu-blue text-white">Building</th>
                <th className="px-6 py-3 border bg-bsu-blue text-white">Floor</th>
                <th className="px-6 py-3 border bg-bsu-blue text-white">Room</th>
                <th className="px-6 py-3 border bg-bsu-blue text-white">Host Name</th>
                <th className="px-6 py-3 border bg-bsu-blue text-white">Activity Description</th>
                <th className="px-6 py-3 border bg-bsu-blue text-white">Age Range</th>
                <th className="px-6 py-3 border bg-bsu-blue text-white">Time Frame</th>
                <th className="px-6 py-3 border bg-bsu-blue text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((vendor) => (
                <tr key={vendor.id} className="border-l border-r text-center">
                  <td className="px-6 py-3 border">
                    <input
                      type="checkbox"
                      checked={selectedVendors.includes(vendor.id)}
                      onChange={() => handleCheckboxChange(vendor.id)}
                    />
                  </td>
                  <td className="px-6 py-3 border">{vendor.building}</td>
                  <td className="px-6 py-3 border">{vendor.floor}</td>
                  <td className="px-6 py-3 border">{vendor.room}</td>
                  <td className="px-6 py-3 border">{vendor.vendor_name}</td>
                  <td className="px-6 py-3 border">{vendor.vendor_description}</td>
                  <td className="px-6 py-3 border">{vendor.age_range}</td>
                  <td className="px-6 py-3 border">{vendor.time_frame}</td>
                  <td className="px-6 py-3 border">
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
        </div>

        {/* Card layout */}
        <div className="lg:hidden grid gap-4 grid-cols-1 sm:grid-cols-2">
          {data.map((vendor) => (
            <div key={vendor.id} className="p-4 bg-white shadow-lg rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{vendor.vendor_name}</h3>
              <p className="text-gray-600"><strong>Building:</strong> {vendor.building}</p>
              <p className="text-gray-600"><strong>Floor:</strong> {vendor.floor}</p>
              <p className="text-gray-600"><strong>Room:</strong> {vendor.room}</p>
              <p className="text-gray-600"><strong>Age Range:</strong> {vendor.age_range}</p>
              <p className="text-gray-600"><strong>Time Frame:</strong> {vendor.time_frame}</p>
              <p className="text-gray-600"><strong>Description:</strong> {vendor.vendor_description}</p>
              <div className="flex mt-3 space-x-2">
                <button
                  onClick={() => handleEditClick(vendor)}
                  className="text-blue-500 underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(vendor.id)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
