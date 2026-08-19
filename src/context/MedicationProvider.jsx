import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import initialMedications from "../data/medications";
import { db } from "../firebase";
import MedicationContext from "./MedicationContext";

function MedicationProvider({ children }) {
  const [customMedications, setCustomMedications] = useState([]);
  const [firebaseError, setFirebaseError] = useState("");

  useEffect(() => {
    const medicationsCollection = collection(db, "medications");

    const unsubscribe = onSnapshot(
      medicationsCollection,
      (snapshot) => {
        const loadedMedications = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        setCustomMedications(loadedMedications);
        setFirebaseError("");
      },
      () => {
        setFirebaseError(
          "Eigene Medikamente konnten nicht aus Firebase geladen werden."
        );
      }
    );

    return unsubscribe;
  }, []);

  const medications = [
    ...initialMedications,
    ...customMedications,
  ];

  async function addMedication(newMedication) {
    const medicationsCollection = collection(db, "medications");

    await addDoc(medicationsCollection, {
      name: newMedication.name,
      category: newMedication.category,
      description: newMedication.description,
      source: newMedication.source,
      createdAt: serverTimestamp(),
    });
  }

  return (
    <MedicationContext.Provider
      value={{
        medications,
        addMedication,
        firebaseError,
      }}
    >
      {children}
    </MedicationContext.Provider>
  );
}

export default MedicationProvider;

