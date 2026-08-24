import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  collection,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "../firebase";

async function deleteSubcollection(userId, collectionName) {
  const collectionReference = collection(
    db,
    "users",
    userId,
    collectionName
  );
  const snapshot = await getDocs(collectionReference);

  for (let start = 0; start < snapshot.docs.length; start += 450) {
    const batch = writeBatch(db);
    const documents = snapshot.docs.slice(start, start + 450);

    documents.forEach((documentSnapshot) => {
      batch.delete(documentSnapshot.ref);
    });

    await batch.commit();
  }
}

function clearLocalReminderData() {
  const reminderKeys = [];

  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);

    if (key?.startsWith("reminder-")) {
      reminderKeys.push(key);
    }
  }

  reminderKeys.forEach((key) => localStorage.removeItem(key));
}

async function deleteAccount(password) {
  const currentUser = auth.currentUser;

  if (!currentUser?.email) {
    throw new Error("auth/no-current-user");
  }

  const credential = EmailAuthProvider.credential(
    currentUser.email,
    password
  );

  await reauthenticateWithCredential(currentUser, credential);
  await deleteSubcollection(currentUser.uid, "medications");
  await deleteSubcollection(currentUser.uid, "emergencyContacts");
  await deleteUser(currentUser);
  clearLocalReminderData();
}

export default deleteAccount;
