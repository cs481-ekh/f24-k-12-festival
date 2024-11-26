"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function MyComponent() {
  const [selectedBuilding, setSelectedBuilding] = useState("");

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
    "CVA": `${process.env.NEXT_PUBLIC_BASE_PATH}/CVA.svg`,
  };

  const handleBuildingChange = (event) => {
    setSelectedBuilding(event.target.value);
  };

  return (
    <div className="flex flex-col items-center text-center p-4 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">Boise State University Campus Map</h1>

      <iframe
        src="https://maps.boisestate.edu/?id=715#!s/?mc/43.604355,-116.202606?z/16?lvl/0"
        width="100%"
        height="800"
        allow="geolocation"
        className="w-full rounded-lg shadow-lg border border-gray-300 mb-10"
      ></iframe>

      <h1 className="text-2xl font-bold mb-5">Looking for more navigation? Internal building maps can be found below</h1>

      <label htmlFor="building-select" className="mt-5 text-lg">
        Choose a building:
      </label>
      <select
        id="building-select"
        onChange={handleBuildingChange}
        className="mt-2 p-3 border rounded-md shadow-md focus:ring focus:ring-blue-400 mb-10"
      >
        <option value="">Select a building</option>
        {Object.keys(buildingMaps).map((key) => (
          <option key={key} value={key}>
            {key.replace(/-/g, " ")}
          </option>
        ))}
      </select>

      {selectedBuilding && (
        <div className="mt-5 w-full max-w-[90vw] md:max-w-[600px] lg:max-w-[800px]">
          <h3 className="text-xl font-semibold mb-3">
            Selected Building: {selectedBuilding.replace(/-/g, " ")}
          </h3>
          <Image
            src={buildingMaps[selectedBuilding]}
            alt={`Map of ${selectedBuilding}`}
            layout="responsive"
            width={1000}
            height={1000}
            className="rounded-lg shadow-md border border-gray-300 mb-10"
          />
        </div>
      )}
    </div>
  );
}
