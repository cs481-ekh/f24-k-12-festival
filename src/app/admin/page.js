// "use client";

// import { useState } from 'react';

// export default function Admin() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [error, setError] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Use plain-text comparison for now (environment variables for credentials)
//     const storedUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
//     const storedPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

//     if (username === storedUsername && password === storedPassword) {
//       setIsLoggedIn(true);
//       setError('');
//     } else {
//       setError('Invalid username or password');
//     }
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUsername('');
//     setPassword('');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       {!isLoggedIn ? (
//         <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//           <h2 className="text-2xl font-semibold text-center text-gray-800">Admin Login</h2>
//           <form onSubmit={handleLogin} className="mt-6 space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Username</label>
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your username"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>
//             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//             <button
//               type="submit"
//               className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
//             >
//               Log In
//             </button>
//           </form>
//         </div>
//       ) : (
//         <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
//           <h2 className="text-2xl font-semibold text-gray-800">Welcome, Admin!</h2>
//           <p className="text-gray-600 mt-2">Manage event content and settings below.</p>
//           <div className="mt-6 space-y-4">
//             {/* Placeholder for admin controls */}
//             <section className="p-4 border border-gray-200 rounded-md">
//               <h3 className="text-lg font-medium text-gray-700">Vendor Management</h3>
//               <p className="text-sm text-gray-500">Add, edit, or remove vendors from the festival roster.</p>
//             </section>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="mt-6 w-full py-2 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 transition duration-200"
//           >
//             Log Out
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
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

export default function VendorsAdmin() {
  const [data, setData] = useState([]);
  const [editingVendor, setEditingVendor] = useState(null);

  // Fetch vendor data on component mount
  useEffect(() => {
    async function getData() {
      const fetchedData = await fetchVendors();
      setData(fetchedData);
    }
    getData();
  }, []);

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
