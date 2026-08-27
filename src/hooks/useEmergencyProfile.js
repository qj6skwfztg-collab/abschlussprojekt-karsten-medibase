import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

export const emptyEmergencyProfile = {
  allergies: "",
  conditions: "",
  bloodGroup: "",
  specialNotes: "",
};

function useEmergencyProfile() {
  const [profile, setProfile] = useState(emptyEmergencyProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let stopProfileListener = () => {};

    const stopAuthListener = onAuthStateChanged(auth, (currentUser) => {
      stopProfileListener();

      if (!currentUser || !currentUser.emailVerified) {
        setProfile(emptyEmergencyProfile);
        setError("");
        setIsLoading(false);
        return;
      }

      const profileReference = doc(
        db,
        "users",
        currentUser.uid,
        "emergencyProfile",
        "main"
      );

      stopProfileListener = onSnapshot(
        profileReference,
        (snapshot) => {
          setProfile(
            snapshot.exists()
              ? { ...emptyEmergencyProfile, ...snapshot.data() }
              : emptyEmergencyProfile
          );
          setError("");
          setIsLoading(false);
        },
        () => {
          setError("Die Notfallpass-Angaben konnten nicht geladen werden.");
          setIsLoading(false);
        }
      );
    });

    return () => {
      stopProfileListener();
      stopAuthListener();
    };
  }, []);

  async function saveEmergencyProfile(nextProfile) {
    const currentUser = auth.currentUser;

    if (!currentUser || !currentUser.emailVerified) {
      throw new Error("Du bist nicht vollständig angemeldet.");
    }

    await setDoc(
      doc(db, "users", currentUser.uid, "emergencyProfile", "main"),
      {
        allergies: nextProfile.allergies.trim(),
        conditions: nextProfile.conditions.trim(),
        bloodGroup: nextProfile.bloodGroup.trim(),
        specialNotes: nextProfile.specialNotes.trim(),
        updatedAt: serverTimestamp(),
      }
    );
  }

  return {
    profile,
    isLoading,
    error,
    saveEmergencyProfile,
  };
}

export default useEmergencyProfile;
