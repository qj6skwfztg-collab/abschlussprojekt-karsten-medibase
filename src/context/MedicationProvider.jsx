import { useEffect, useState } from "react";
import initialMedications from "../data/medications";
import MedicationContext from "./MedicationContext";

function MedicationProvider({ children }) {
  const [customMedications, setCustomMedications] = useState(() => {
    const savedMedications =
      localStorage.getItem("customMedications");

    if (savedMedications) {
      return JSON.parse(savedMedications);
    }

    return [];
  });

  const medications = [
    ...initialMedications,
    ...customMedications,
  ];

  useEffect(() => {
    localStorage.setItem(
      "customMedications",
      JSON.stringify(customMedications)
    );
  }, [customMedications]);

  function addMedication(newMedication) {
    setCustomMedications((currentMedications) => [
      ...currentMedications,
      newMedication,
    ]);
  }

  return (
    <MedicationContext.Provider
      value={{ medications, addMedication }}
    >
      {children}
    </MedicationContext.Provider>
  );
}

export default MedicationProvider;

