import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  Box,
  Button,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { auth, db } from "../firebase";
import useLanguage from "../hooks/useLanguage";

function EmergencyContacts({ emergencyNumber, emergencyCallStarted }) {
  const { isEnglish } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [user, setUser] = useState(null);

  useEffect(
    () =>
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);

        if (!currentUser) {
          setContacts([]);
        }
      }),
    []
  );

  useEffect(() => {
    if (!user) {
      return undefined;
    }

    const contactsReference = collection(
      db,
      "users",
      user.uid,
      "emergencyContacts"
    );

    const stopListening = onSnapshot(
      contactsReference,
      (snapshot) => {
        const loadedContacts = snapshot.docs.map((contactDocument) => ({
          id: contactDocument.id,
          ...contactDocument.data(),
        }));

        setContacts(loadedContacts);
      },
      () => {
        setMessage(
          isEnglish
            ? "The emergency contacts could not be loaded."
            : "Die Notfallkontakte konnten nicht geladen werden."
        );
        setMessageType("error");
      }
    );

    return stopListening;
  }, [isEnglish, user]);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setMessageType("");

    if (!user) {
      setMessage(isEnglish ? "Please sign in first." : "Bitte melde dich zuerst an.");
      return;
    }

    if (contacts.length >= 3) {
      setMessage(isEnglish ? "You can save up to three emergency contacts." : "Du kannst höchstens drei Notfallkontakte speichern.");
      return;
    }

    if (name.trim().length < 2 || phone.trim().length < 5) {
      setMessage(isEnglish ? "Please enter a name and a valid phone number." : "Bitte gib einen Namen und eine gültige Telefonnummer ein.");
      return;
    }

    try {
      await addDoc(
        collection(db, "users", user.uid, "emergencyContacts"),
        {
          name: name.trim(),
          phone: phone.trim(),
          createdAt: serverTimestamp(),
        }
      );

      setName("");
      setPhone("");
      setMessage(
        isEnglish
          ? "Emergency contact saved."
          : "Notfallkontakt wurde gespeichert."
      );
      setMessageType("success");
    } catch {
      setMessage(
        isEnglish
          ? "The emergency contact could not be saved."
          : "Der Notfallkontakt konnte nicht gespeichert werden."
      );
      setMessageType("error");
    }
  }

  async function handleDelete(contactId) {
    if (!user) {
      return;
    }

    try {
      await deleteDoc(
        doc(db, "users", user.uid, "emergencyContacts", contactId)
      );
      setMessage(
        isEnglish ? "Emergency contact deleted." : "Notfallkontakt wurde gelöscht."
      );
      setMessageType("success");
    } catch {
      setMessage(
        isEnglish
          ? "The emergency contact could not be deleted."
          : "Der Notfallkontakt konnte nicht gelöscht werden."
      );
      setMessageType("error");
    }
  }

  function openEmergencyMessage(contact) {
    if (!emergencyCallStarted) {
      setMessage(
        isEnglish
          ? "Start the emergency call first."
          : "Starte zuerst den Notruf."
      );
      setMessageType("error");
      return;
    }

    const emergencyText =
      isEnglish
        ? `I have tried to call emergency services on ${emergencyNumber}. Please contact me and check whether I need help.`
        : `Ich habe versucht, den Notruf ${emergencyNumber} zu kontaktieren. Bitte melde dich bei mir und prüfe, ob ich Hilfe benötige.`;

    const smsLink =
      `sms:${contact.phone}?body=${encodeURIComponent(emergencyText)}`;

    window.open(smsLink, "_self");
  }

  if (!user) {
    return (
      <Text marginTop="6">
        {isEnglish ? "Sign in to save personal emergency contacts." : "Melde dich an, um persönliche Notfallkontakte zu speichern."}
      </Text>
    );
  }

  return (
    <Box marginTop="10">
      <Heading size="lg" marginBottom="4">
        {isEnglish ? "My emergency contacts" : "Meine Notfallkontakte"}
      </Heading>

      <Text marginBottom="5">
        {isEnglish ? "You can save up to three people. A message is not sent automatically; it first opens in your messaging app." : "Du kannst bis zu drei Personen speichern. Eine Nachricht wird nicht automatisch versendet, sondern zuerst in deiner Nachrichten-App geöffnet."}
      </Text>

      <form onSubmit={handleSubmit}>
        <Stack gap="4">
          <Input
            type="text"
            placeholder={isEnglish ? "Emergency contact name" : "Name des Notfallkontakts"}
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <Input
            type="tel"
            placeholder={isEnglish ? "Phone number, for example +491701234567" : "Telefonnummer, zum Beispiel +491701234567"}
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />

          <Button
            type="submit"
            colorPalette="teal"
            disabled={contacts.length >= 3}
          >
            {isEnglish ? "Save emergency contact" : "Notfallkontakt speichern"}
          </Button>
        </Stack>
      </form>

      {message && (
        <Text
          marginTop="4"
          color={messageType === "error" ? "red.700" : "teal.700"}
          fontWeight="600"
          role={messageType === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {message}
        </Text>
      )}

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap="4"
        marginTop="6"
      >
        {contacts.map((contact) => (
          <Box
            key={contact.id}
            borderWidth="1px"
            borderRadius="lg"
            padding="5"
          >
            <Heading size="md">
              {contact.name}
            </Heading>

            <Text marginTop="2">
              {contact.phone}
            </Text>

            <Stack gap="3" marginTop="4">
              {emergencyCallStarted ? (
                <Button
                  background="orange.500"
                  color="white"
                  onClick={() => openEmergencyMessage(contact)}
                >
                  {isEnglish
                    ? "Prepare emergency message"
                    : "Notfallnachricht vorbereiten"}
                </Button>
              ) : (
                <Text fontSize="sm" color="gray.600">
                  {isEnglish
                    ? "After starting the emergency call, you can prepare a message here."
                    : "Nach dem Start des Notrufs kannst du hier eine Nachricht vorbereiten."}
                </Text>
              )}

              <Button
                colorPalette="red"
                variant="outline"
                onClick={() => handleDelete(contact.id)}
              >
                {isEnglish ? "Delete contact" : "Kontakt löschen"}
              </Button>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default EmergencyContacts;
