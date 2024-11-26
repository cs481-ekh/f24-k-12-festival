"use client";

import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import VendorsAdmin from './adminVendors'; // Adjust the path based on your folder structure

export default function Admin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

   // Check for existing login state from cookie on component mount
   useEffect(() => {
    const token = Cookies.get("admin_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle login logic
  const handleLogin = (e) => {
    e.preventDefault();

    const storedUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const storedPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (username === storedUsername && password === storedPassword) {
      Cookies.set("admin_token", "logged_in"); // Set cookie for 1 day
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!isLoggedIn ? (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800">Admin Login</h2>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div className="flex justify-center">
            <button
              type="submit"
              className="bg-bsu-blue text-white text-lg text-center font-bold hover:bg-orange-500 hover:scale-110 duration-300 px-4 py-2 rounded ml-2 mr-2"
            >
              Log In
            </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Welcome, Admin!</h2>
            <button
              onClick={handleLogout}
              className="bg-bsu-blue text-white text-lg text-center font-bold hover:bg-orange-500 hover:scale-110 duration-300 px-4 py-2 rounded ml-2 mr-2"
            >
              Log Out
            </button>
          </div>
          <p className="text-gray-600 mb-4">Manage vendors below:</p>
          <VendorsAdmin /> {/* Render the admin-only Vendors component */}
        </div>
      )}
    </div>
  );
}
