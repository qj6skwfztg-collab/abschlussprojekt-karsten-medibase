import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

function useHealthEntries() {
  const [healthEntries, setHealthEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let stopEntryListener = () => {};

    const stopAuthListener = onAuthStateChanged(auth, (currentUser) => {
      stopEntryListener();

      if (!currentUser || !currentUser.emailVerified) {
        setHealthEntries([]);
        setIsLoading(false);
        return;
      }

      const entryCollection = collection(
        db,
        "users",
        currentUser.uid,
        "healthEntries"
      );

      stopEntryListener = onSnapshot(
        entryCollection,
        (snapshot) => {
          const entries = snapshot.docs
            .map((entryDocument) => ({
              id: entryDocument.id,
              ...entryDocument.data(),
            }))
            .sort((first, second) => {
              const firstDate = first.measuredAt?.toMillis?.() ?? 0;
              const secondDate = second.measuredAt?.toMillis?.() ?? 0;
              return secondDate - firstDate;
            });

          setHealthEntries(entries);
          setError("");
          setIsLoading(false);
        },
        () => {
          setError("Deine Gesundheitseinträge konnten nicht geladen werden.");
          setIsLoading(false);
        }
      );
    });

    return () => {
      stopEntryListener();
      stopAuthListener();
    };
  }, []);

  async function addHealthEntry(entry) {
    const currentUser = auth.currentUser;

    if (!currentUser || !currentUser.emailVerified) {
      throw new Error("Du bist nicht vollständig angemeldet.");
    }

    const entryCollection = collection(
      db,
      "users",
      currentUser.uid,
      "healthEntries"
    );

    await addDoc(entryCollection, {
      type: entry.type,
      value: entry.value,
      secondaryValue: entry.secondaryValue,
      unit: entry.unit,
      context: entry.context,
      notes: entry.notes.trim(),
      measuredAt: Timestamp.fromDate(entry.measuredAt),
      createdAt: serverTimestamp(),
    });
  }

  async function deleteHealthEntry(entryId) {
    const currentUser = auth.currentUser;

    if (!currentUser || !currentUser.emailVerified) {
      throw new Error("Du bist nicht vollständig angemeldet.");
    }

    await deleteDoc(
      doc(db, "users", currentUser.uid, "healthEntries", entryId)
    );
  }

  async function updateHealthEntry(entryId, entry) {
    const currentUser = auth.currentUser;

    if (!currentUser || !currentUser.emailVerified) {
      throw new Error("Du bist nicht vollständig angemeldet.");
    }

    await updateDoc(
      doc(db, "users", currentUser.uid, "healthEntries", entryId),
      {
        type: entry.type,
        value: entry.value,
        secondaryValue: entry.secondaryValue,
        unit: entry.unit,
        context: entry.context,
        notes: entry.notes.trim(),
        measuredAt: Timestamp.fromDate(entry.measuredAt),
      }
    );
  }

  return {
    healthEntries,
    isLoading,
    error,
    addHealthEntry,
    updateHealthEntry,
    deleteHealthEntry,
  };
}

export default useHealthEntries;
