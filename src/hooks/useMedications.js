import { useContext } from "react";
import MedicationContext from "../context/MedicationContext";

function useMedications() {
  const context = useContext(MedicationContext);

  if (!context) {
    throw new Error(
      "useMedications muss innerhalb des MedicationProviders verwendet werden."
    );
  }

  return context;
}

export default useMedications;
