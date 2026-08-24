import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";

function useUserMedications() {
  const [userMedications, setUserMedications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let stopMedicationListener = () => {};

    const stopAuthListener = onAuthStateChanged(
      auth,
      (currentUser) => {
        stopMedicationListener();

        if (!currentUser || !currentUser.emailVerified) {
          setUserMedications([]);
          setIsLoading(false);
          return;
        }

        const medicationCollection = collection(
          db,
          "users",
          currentUser.uid,
          "medications"
        );

        stopMedicationListener = onSnapshot(
          medicationCollection,
          (snapshot) => {
            const medications = snapshot.docs.map(
              (medicationDocument) => ({
                id: medicationDocument.id,
                ...medicationDocument.data(),
              })
            );

            setUserMedications(medications);
            setError("");
            setIsLoading(false);
          },
          () => {
            setError(
              "Deine Medikamente konnten nicht geladen werden."
            );
            setIsLoading(false);
          }
        );
      }
    );

    return () => {
      stopMedicationListener();
      stopAuthListener();
    };
  }, []);

  async function addUserMedication(medication) {
    const currentUser = auth.currentUser;

    if (!currentUser || !currentUser.emailVerified) {
      throw new Error("Du bist nicht vollständig angemeldet.");
    }

    const medicationCollection = collection(
      db,
      "users",
      currentUser.uid,
      "medications"
    );

    const intakeTimes = Array.isArray(medication.intakeTimes)
      ? medication.intakeTimes
      : [medication.intakeTime];

    await addDoc(medicationCollection, {
      name: medication.name.trim(),
      dosage: medication.dosage.trim(),
      intakeTime: intakeTimes[0],
      intakeTimes,
      notes: medication.notes.trim(),
      createdAt: serverTimestamp(),
    });
  }

  async function updateUserMedication(
    medicationId,
    medication
  ) {
    const currentUser = auth.currentUser;

    if (!currentUser || !currentUser.emailVerified) {
      throw new Error("Du bist nicht vollständig angemeldet.");
    }

    const medicationDocument = doc(
      db,
      "users",
      currentUser.uid,
      "medications",
      medicationId
    );

    const intakeTimes = Array.isArray(medication.intakeTimes)
      ? medication.intakeTimes
      : [medication.intakeTime];

    await updateDoc(medicationDocument, {
      name: medication.name.trim(),
      dosage: medication.dosage.trim(),
      intakeTime: intakeTimes[0],
      intakeTimes,
      notes: medication.notes.trim(),
    });
  }

  async function deleteUserMedication(medicationId) {
    const currentUser = auth.currentUser;

    if (!currentUser || !currentUser.emailVerified) {
      throw new Error("Du bist nicht vollständig angemeldet.");
    }

    const medicationDocument = doc(
      db,
      "users",
      currentUser.uid,
      "medications",
      medicationId
    );

    await deleteDoc(medicationDocument);
  }

  return {
    userMedications,
    isLoading,
    error,
    addUserMedication,
    updateUserMedication,
    deleteUserMedication,
  };
}

export default useUserMedications;
