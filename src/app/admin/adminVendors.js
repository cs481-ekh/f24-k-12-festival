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

//function to add a row
async function addVendor(vendor) {
  try {
    const vendorData = { vendors: [vendor] };

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/vendors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vendorData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error adding vendor:', errorData);
      throw new Error(errorData.error || 'Failed to add vendor');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Unexpected error:', error);
    throw error;
  }
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [editingVendor, setEditingVendor] = useState(null);
  const editFormRef = useRef(null);
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

  // Fetch vendor data on component mount
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

  const refreshData = async () => {
    const updatedData = await fetchVendors();
    setData(updatedData);
    setFilteredData(updatedData);
  };
  

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = data.filter((vendor) =>
      (vendor.vendor_name || "").toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };


  useEffect(() => {
    async function getData() {
      const fetchedData = await fetchVendors();
      setData(fetchedData);
      setFilteredData(fetchedData);
    }
    getData();
  }, []);

  const handleCsvUpload = async () => {
    if (!csvFile) {
      alert("Please select a CSV file to upload.");
      return;
    }

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        console.log("Parsed CSV Data:", results.data);

        try {
          const vendors = results.data;

          if (!Array.isArray(vendors) || vendors.length === 0) {
            throw new Error("No valid data found in the CSV file.");
          }

          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/vendors`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ vendors }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to upload vendors.");
          }

          const result = await response.json();

          const { added = [], skipped = [], errors = [] } = result;
          const messages = [];

          if (added.length > 0) {
            messages.push(`${added.length} vendors added successfully.`);
          }
          if (skipped.length > 0) {
            messages.push(`${skipped.length} duplicate vendors skipped.`);
          }
          if (errors.length > 0) {
            messages.push(`${errors.length} vendors failed to upload. Check logs for details.`);
            console.error("Upload errors:", errors);
          }

          // Refresh data
          await refreshData();

          alert(messages.join("\n"));
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

  // Handle input change for the add vendor form
  const handleAddChange = (e) => {
    setNewVendor({ ...newVendor, [e.target.name]: e.target.value });
  };
  
  const handleAdd = async () => {
    try {
      // Check if the vendor already exists in the list
      const vendorExists = data.some((existingVendor) => {
        return existingVendor.vendor_name.toLowerCase() === newVendor.vendor_name.toLowerCase() &&
          existingVendor.vendor_description.toLowerCase() === newVendor.vendor_description.toLowerCase() &&
          existingVendor.building.toLowerCase() === newVendor.building.toLowerCase() &&
          existingVendor.floor.toLowerCase() === newVendor.floor.toLowerCase() &&
          existingVendor.room.toLowerCase() === newVendor.room.toLowerCase() &&
          existingVendor.age_range.toLowerCase() === newVendor.age_range.toLowerCase() &&
          existingVendor.time_frame.toLowerCase() === newVendor.time_frame.toLowerCase();
      });

      if (vendorExists) {
        alert("Duplicate vendor. This vendor was not added.");
        return; // Prevent further execution
      }

      const result = await addVendor(newVendor);
      if (result.added) {
        await refreshData();
        alert("Vendor added successfully.");
        setNewVendor({
          vendor_name: '',
          vendor_description: '',
          building: '',
          floor: '',
          room: '',
          age_range: '',
          time_frame: '',
        });
      }
    } catch (error) {
      alert("Error adding vendor.");
    }
  };

  // Delete a vendor
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this vendor? This action cannot be undone."
    );
    if (!isConfirmed) return;

    try {
      await deleteVendor(id);
      await refreshData();
      alert("Vendor deleted successfully!");
    } catch (error) {
      console.error("Failed to delete vendor:", error);
      alert("An error occurred while deleting the vendor. Please try again.");
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
    await refreshData();
  };

  return (
    <div className="min-w-full">
      <h3 className="text-2xl mb-4">Manage Activities</h3>
      {/* CSV Upload Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6 shadow-lg">
        <h4 className="text-lg font-semibold mb-4">Upload Activities from CSV</h4>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="block w-50 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 bg-white cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-bsu-blue focus:border-bsu-blue mb-4"
        />
        <button
          type="button"
          onClick={handleCsvUpload}
          className="bg-bsu-blue text-white text-lg font-bold w-40 px-6 py-1 rounded shadow-lg hover:bg-orange-500 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Upload CSV
        </button>
      </div>
      {/* Add New Vendor Form */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6 shadow-lg">
        <h4 className="text-lg font-semibold mb-4">Add New Activity</h4>
        <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label>
            Host Name
            <input
              type="text"
              name="vendor_name"
              value={newVendor.vendor_name}
              onChange={handleAddChange}
              className="w-full p-2 border rounded"
            />
          </label>
          <label>
            Activity Description
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
        </form>
        <button
          type="button"
          onClick={handleAdd}
          className="bg-green-500 text-white text-lg font-bold w-40 px-6 py-1 mt-4 rounded shadow-lg hover:bg-green-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Add Activity
        </button>
      </div>

      {/* Search Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6 shadow-lg">
        <h4 className="text-lg font-semibold mb-4">Search Activities</h4>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by activity"
            className="flex-grow w-full p-2 border rounded"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="bg-bsu-blue text-white font-bold hover:bg-orange-500 hover:scale-110 duration-300 px-4 py-2 rounded"
          >
            Search
          </button>
        </div>
      </div>

      {/* Table layout on large screens, Card layout on small screens */}
      <div>
        {/* Table layout */}
        <div className="hidden lg:block">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="text-sm text-gray-700 bg-gray-50 border">
              <tr>
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
              {filteredData.length > 0 ? (
                filteredData.map((vendor) => (
                  <tr key={vendor.id} className="border-l border-r text-center">
                    <td className="px-6 py-3 border">{vendor.building}</td>
                    <td className="px-6 py-3 border">{vendor.floor}</td>
                    <td className="px-6 py-3 border">{vendor.room}</td>
                    <td className="px-6 py-3 border">{vendor.vendor_name}</td>
                    <td className="px-6 py-3 border">{vendor.vendor_description}</td>
                    <td className="px-6 py-3 border">{vendor.age_range}</td>
                    <td className="px-6 py-3 border">{vendor.time_frame}</td>
                    <td className="px-6 py-3 border">
                      <div className="flex flex-col">
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
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No vendors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Card layout */}
      <div className="lg:hidden grid gap-4 grid-cols-1 sm:grid-cols-2">
        {filteredData.map((vendor) => (
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
      {/* Edit Vendor Form */}
      {editingVendor && (
        <div ref={editFormRef} className="bg-gray-100 p-4 rounded-lg mb-6 shadow-lg mt-4">
          <h4 className="text-lg font-semibold mb-4">Edit Vendor</h4>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label>
              Vendor Name
              <input
                type="text"
                name="vendor_name"
                value={editingVendor.vendor_name || ''}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
              />
            </label>
            <label>
              Description
              <input
                type="text"
                name="vendor_description"
                value={editingVendor.vendor_description || ''}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
              />
            </label>
            <label>
              Building
              <input
                type="text"
                name="building"
                value={editingVendor.building || ''}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
              />
            </label>
            <label>
              Floor
              <input
                type="text"
                name="floor"
                value={editingVendor.floor || ''}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
              />
            </label>
            <label>
              Room
              <input
                type="text"
                name="room"
                value={editingVendor.room || ''}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
              />
            </label>
            <label>
              Age Range
              <input
                type="text"
                name="age_range"
                value={editingVendor.age_range || ""}
                onChange={(e) =>
                  setEditingVendor({ ...editingVendor, age_range: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </label>
            <label>
              Time Frame
              <input
                type="text"
                name="time_frame"
                value={editingVendor.time_frame || ""}
                onChange={(e) =>
                  setEditingVendor({ ...editingVendor, time_frame: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </label>
          </form>
          <div className="flex space-x-4 mt-4">
            <button
              type="button"
              onClick={handleSave}
              className="bg-green-500 text-white text-lg font-bold w-40 px-6 py-1 rounded shadow-lg hover:bg-green-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditingVendor(null)}
              className="bg-red-500 text-white text-lg font-bold w-40 px-6 py-1 rounded shadow-lg hover:bg-red-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
