"use client"; // Make this a client component in Next.js

import React, { useState } from 'react';

function MyComponent() {
  const [selectedBuilding, setSelectedBuilding] = useState("");

  // Define your base path if the app is deployed under a subdirectory
  const basePath = '/k-12-festival'; // Make sure this matches your actual base path
  
  // Object mapping building names to their corresponding map images
  const buildingMaps = {
    "029-ENGR-1": `${basePath}/025-BGYM-1.svg`,
    "100-HML-1": `${basePath}/100_HML-1.svg`,
    "100-HML-2": `${basePath}/100_HML-2.svg`,
    "100-MCE-1": `${basePath}/100-MCE-1st.svg`,
    "100-MCE-2": `${basePath}/100-MCE-2.svg`,
    "100-MCE-3": `${basePath}/100-MCE-3.svg`,
    "100-MCE-4": `${basePath}/100-MCE-4.svg`,
    "393-MCMR-1": `${basePath}/393-MCMR-1.svg`,
    "393-MCMR-3": `${basePath}/393-MCMR-3.svg`,
    "025-BGYM-1": `${basePath}/025-BGYM-1.svg`,
    "025-BGYM-2": `${basePath}/025-BGYM-2.svg`,
    "025-BGYM-B": `${basePath}/025-BGYM-B.svg`,
    "025-BGYM-D": `${basePath}/025-BGYM-D.svg`,
    "025-BGYM-R": `${basePath}/025-BGYM-R.svg`,
    "027-ALBR-1": `${basePath}/027-ALBR-1.svg`,
    "027-ALBR-2": `${basePath}/027-ALBR-2.svg`,
    "032-SUBFIRST": `${basePath}/032-SUBFIRST.svg`,
    "032-SUBSECOND": `${basePath}/032-SUBSECOND.svg`,
    "032-SUBTHIRD": `${basePath}/032-SUBTHIRD.svg`,
    "267-ERB-1": `${basePath}/267-ERB-1.svg`,
    "349-CVA-FIRST": `${basePath}/349-CVA-FIRST.svg`
  };

  // Handler to update selected building
  const handleBuildingChange = (event) => {
    setSelectedBuilding(event.target.value);
  };

  return (
    <div>
      {/* Dropdown for selecting a building */}
      <label htmlFor="building-select">Choose a building:</label>
      <select id="building-select" onChange={handleBuildingChange}>
        <option value="">Select a building</option>
        <option value="029-ENGR-1">029-ENGR-1</option>
        <option value="100-HML-1">100-HML-1</option>
        <option value="100-HML-2">100-HML-2</option>
        <option value="100-MCE-1">100-MCE-1</option>
        <option value="100-MCE-2">100-MCE-2</option>
        <option value="393-MCMR-1">393-MCMR-1</option>
        <option value="393-MCMR-3">393-MCMR-3</option>

        <option value="025-BGYM-1">025-BGYM-1</option>
        <option value="025-BGYM-2">025-BGYM-2</option>
        <option value="025-BGYM-B">025-BGYM-B</option>
        <option value="025-BGYM-D">025-BGYM-D</option>
        <option value="025-BGYM-R">025-BGYM-R</option>
        <option value="027-ALBR-1">027-ALBR-1</option>
        <option value="027-ALBR-2">027-ALBR-2</option>
        <option value="032-SUBFIRST">032-SUBFIRST</option>
        <option value="032-SUBSECOND">032-SUBSECOND</option>
        <option value="032-SUBTHIRD">032-SUBTHIRD</option>
        <option value="267-ERB-1">267-ERB-1</option>
        <option value="349-CVA-FIRST">349-CVA-FIRST</option>
      </select>

      {/* Conditionally render the selected map */}
      {selectedBuilding && (
        <div>
          <h3>Selected Building: {selectedBuilding}</h3>
          <img
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

export default MyComponent;
