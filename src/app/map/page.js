"use client"; // Make this a client component in Next.js

import React, { useState } from 'react';

function MyComponent() {
  const [selectedBuilding, setSelectedBuilding] = useState("");
  
  // Object mapping building names to their corresponding map images
  const buildingMaps = {
    "029-ENGR-1": `${process.env.NEXT_PUBLIC_BASE_PATH}/025-BGYM-1.svg`,
    "100-HML-1": `${process.env.NEXT_PUBLIC_BASE_PATH}/100_HML-1.svg`,
    "100-HML-2": `${process.env.NEXT_PUBLIC_BASE_PATH}/100_HML-2.svg`,
    "100-MCE-1": `${process.env.NEXT_PUBLIC_BASE_PATH}/100-MCE-1st.svg`,
    "100-MCE-2": `${process.env.NEXT_PUBLIC_BASE_PATH}/100-MCE-2.svg`,
    "100-MCE-3": `${process.env.NEXT_PUBLIC_BASE_PATH}/100-MCE-3.svg`,
    "100-MCE-4": `${process.env.NEXT_PUBLIC_BASE_PATH}/100-MCE-4.svg`,
    "393-MCMR-1": `${process.env.NEXT_PUBLIC_BASE_PATH}/393-MCMR-1.svg`,
    "393-MCMR-3": `${process.env.NEXT_PUBLIC_BASE_PATH}/393-MCMR-3.svg`,
    "025-BGYM-1": `${process.env.NEXT_PUBLIC_BASE_PATH}/025-BGYM-1.svg`,
    "025-BGYM-2": `${process.env.NEXT_PUBLIC_BASE_PATH}/025-BGYM-2.svg`,
    "025-BGYM-B": `${process.env.NEXT_PUBLIC_BASE_PATH}/025-BGYM-B.svg`,
    "025-BGYM-D": `${process.env.NEXT_PUBLIC_BASE_PATH}/025-BGYM-D.svg`,
    "025-BGYM-R": `${process.env.NEXT_PUBLIC_BASE_PATH}/025-BGYM-R.svg`,
    "027-ALBR-1": `${process.env.NEXT_PUBLIC_BASE_PATH}/027-ALBR-1.svg`,
    "027-ALBR-2": `${process.env.NEXT_PUBLIC_BASE_PATH}/027-ALBR-2.svg`,
    "032-SUBFIRST": `${process.env.NEXT_PUBLIC_BASE_PATH}/032-SUBFIRST.svg`,
    "032-SUBSECOND": `${process.env.NEXT_PUBLIC_BASE_PATH}/032-SUBSECOND.svg`,
    "032-SUBTHIRD": `${process.env.NEXT_PUBLIC_BASE_PATH}/032-SUBTHIRD.svg`,
    "267-ERB-1": `${process.env.NEXT_PUBLIC_BASE_PATH}/267-ERB-1.svg`,
    "349-CVA-FIRST": `${process.env.NEXT_PUBLIC_BASE_PATH}/349-CVA-FIRST.svg`
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
