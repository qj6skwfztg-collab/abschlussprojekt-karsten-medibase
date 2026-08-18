import { useEffect, useState } from "react";
import initialMedications from "../data/medications";
import MedicationContext from "./MedicationContext";

function MedicationProvider({ children }) {
  const [medications, setMedications] = useState(() => {
    const savedMedications = localStorage.getItem("medications");

    if (savedMedications) {
      return JSON.parse(savedMedications);
    }

    return initialMedications;
  });

  useEffect(() => {
    localStorage.setItem(
      "medications",
      JSON.stringify(medications)
    );
  }, [medications]);

  function addMedication(newMedication) {
    setMedications((currentMedications) => [
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
