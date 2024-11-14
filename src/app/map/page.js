"use client"; // Make this a client component in Next.js

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function MyComponent() {
  const [selectedBuilding, setSelectedBuilding] = useState("");

  // Object mapping building names to their corresponding map images
  const buildingMaps = {
    "ENGR-First": `${process.env.NEXT_PUBLIC_BASE_PATH}/ENGR-First.svg`,
    "ENGR-Second": `${process.env.NEXT_PUBLIC_BASE_PATH}/ENGR-Second.svg`,
    "ENGR-Third": `${process.env.NEXT_PUBLIC_BASE_PATH}/ENGR-Third.svg`,
    "HMCV-First": `${process.env.NEXT_PUBLIC_BASE_PATH}/HMCV-First.svg`,
    "HMCV-Second": `${process.env.NEXT_PUBLIC_BASE_PATH}/HMCV-Second.svg`,
    "MCMR-First": `${process.env.NEXT_PUBLIC_BASE_PATH}/MCMR-First.svg`,
    "MCMR-Second": `${process.env.NEXT_PUBLIC_BASE_PATH}/MCMR-Second.svg`,
    "MCMR-Third": `${process.env.NEXT_PUBLIC_BASE_PATH}/MCMR-Third.svg`,
    "Kinesiology-Building-First": `${process.env.NEXT_PUBLIC_BASE_PATH}/Kinesiology-Building-First.svg`,
    "Kinesiology-Building-Second": `${process.env.NEXT_PUBLIC_BASE_PATH}/Kinesiology-Building-Second.svg`,
    "ALBR-First": `${process.env.NEXT_PUBLIC_BASE_PATH}/ALBR-First.svg`,
    "ALBR-Second": `${process.env.NEXT_PUBLIC_BASE_PATH}/ALBR-Second.svg`,
    "Sub-First-Floor": `${process.env.NEXT_PUBLIC_BASE_PATH}/Sub-First-Floor.svg`,
    "Sub-Second-Floor": `${process.env.NEXT_PUBLIC_BASE_PATH}/Sub-Second-Floor.svg`,
    "Sub-Third-Floor": `${process.env.NEXT_PUBLIC_BASE_PATH}/Sub-Third-Floor.svg`,
    "ERB": `${process.env.NEXT_PUBLIC_BASE_PATH}/ERB.svg`,
    "CVA": `${process.env.NEXT_PUBLIC_BASE_PATH}/CVA.svg`
  };

  const handleBuildingChange = (event) => {
    setSelectedBuilding(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center mt-5 text-lg">
      {/* Embedded Boise State University Campus Map */}
      <iframe
        src="https://maps.boisestate.edu/?id=715#!s/?mc/43.604355,-116.202606?z/16?lvl/0"
        width="100%"
        height="500px"
        title="Boise State University Campus Map"
        scrolling="no"
        allow="geolocation"
        style={{ border: '0px solid #fff', margin: 0, padding: 0 }}
      ></iframe>

      {/* Dropdown for selecting a building */}
      <label htmlFor="building-select" className="mt-5">Choose a building:</label>
      <select
        id="building-select"
        onChange={handleBuildingChange}
        className="mt-4 p-2 border rounded"
      >
        <option value="">Select a building</option>
        <option value="ENGR-First">Ruch Engineering Building First Floor</option>
        <option value="ENGR-Second">Ruch Engineering Building Second Floor</option>
        <option value="ENGR-Third">Ruch Engineering Building Third Floor</option>
        <option value="HMCV-First">Harry Morrison Civil Engineering First Floor</option>
        <option value="HMCV-Second">Harry Morrison Civil Engineering Second Floor</option>
        <option value="MCMR-First">Micron Center for Materials Research First Floor</option>
        <option value="MCMR-Second">Micron Center for Materials Research Second Floor</option>
        <option value="MCMR-Third">Micron Center for Materials Research Third Floor</option>
        <option value="Kinesiology-Building-First">Kinesiology Building First Floor</option>
        <option value="Kinesiology-Building-Second">Kinesiology Building Second Floor</option>
        <option value="ALBR-First">Albertson Library First</option>
        <option value="ALBR-Second">Albertson Library Second</option>
        <option value="Sub-First-Floor">Student Union Building First Floor</option>
        <option value="Sub-Second-Floor">Student Union Building Second Floor</option>
        <option value="Sub-Third-Floor">Student Union Building-Third-Floor</option>
        <option value="ERB">Environmental Research Building First & Second</option>
        <option value="CVA">Center for the Visual Arts</option>
      </select>

      {/* Conditionally render the selected map */}
      {selectedBuilding && (
        <div>
          <h3 className="mt-5">Selected Building: {selectedBuilding}</h3>
          <Image
            src={buildingMaps[selectedBuilding]}
            alt={`Map of ${selectedBuilding}`}
            width="1000"
            height="1000"
          />
        </div>
      )}
    </div>
  );
}
