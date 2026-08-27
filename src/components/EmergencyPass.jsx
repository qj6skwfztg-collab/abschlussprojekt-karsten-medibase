import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import useLanguage from "../hooks/useLanguage";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

function formatDate(timestamp, isEnglish) {
  if (!timestamp?.toDate) {
    return isEnglish ? "Date is being saved …" : "Datum wird gespeichert …";
  }

  return new Intl.DateTimeFormat(isEnglish ? "en-GB" : "de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(timestamp.toDate());
}

function getHealthLabel(type, isEnglish) {
  const labels = {
    bloodPressure: isEnglish ? "Blood pressure" : "Blutdruck",
    bloodSugar: isEnglish ? "Blood glucose" : "Blutzucker",
    pulse: isEnglish ? "Pulse" : "Puls",
    weight: isEnglish ? "Weight" : "Gewicht",
    oxygen: isEnglish ? "Oxygen saturation" : "Sauerstoffsättigung",
    temperature: isEnglish ? "Body temperature" : "Körpertemperatur",
    symptom: isEnglish ? "Symptom" : "Beschwerde",
  };

  return labels[type] || (isEnglish ? "Health entry" : "Gesundheitseintrag");
}

function getHealthValue(entry) {
  if (entry.type === "bloodPressure") {
    return `${entry.value} / ${entry.secondaryValue} ${entry.unit}`;
  }

  return `${entry.value} ${entry.unit}`;
}

function EmergencyPass({ selectedCountry }) {
  const { isEnglish } = useLanguage();
  const [user, setUser] = useState(null);
  const [medications, setMedications] = useState([]);
  const [healthEntries, setHealthEntries] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isPassVisible, setIsPassVisible] = useState(
    () => window.location.hash === "#notfallpass"
  );
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const text = isEnglish
    ? {
        title: "Curaelis emergency pass",
        description:
          "Your important personal information in one place for an emergency.",
        privacy:
          "This pass is private. It is shown only after you sign in and choose to display it.",
        signIn:
          "Sign in to use your personal emergency pass with your medications, measurements and contacts.",
        show: "Show emergency pass",
        hide: "Hide emergency pass",
        emergencyCall: "Call emergency services",
        medications: "My medications",
        noMedications: "No personal medications saved.",
        health: "Recent health measurements",
        noHealth: "No health measurements saved.",
        contacts: "Emergency contacts",
        noContacts: "No emergency contacts saved.",
        contactMessage: "Prepare message",
        messageConfirm:
          "Open your messaging app with an emergency message prepared for your contacts? You must tap Send yourself.",
        messagePrepared:
          "The messaging app was opened. Tap Send to notify your contacts.",
        noContactsMessage: "Save at least one emergency contact first.",
        country: "Country",
        callNumber: "Emergency number",
        notMedicalAdvice:
          "This pass is an overview for emergencies and is not a medical diagnosis.",
      }
    : {
        title: "Curaelis-Notfallpass",
        description:
          "Deine wichtigsten persönlichen Informationen an einem Ort für den Notfall.",
        privacy:
          "Dieser Pass ist privat. Er wird erst nach der Anmeldung und deinem bewussten Klick angezeigt.",
        signIn:
          "Melde dich an, um deinen persönlichen Notfallpass mit Medikamenten, Messwerten und Kontakten zu nutzen.",
        show: "Notfallpass anzeigen",
        hide: "Notfallpass ausblenden",
        emergencyCall: "Rettungsdienst anrufen",
        medications: "Meine Medikamente",
        noMedications: "Keine persönlichen Medikamente gespeichert.",
        health: "Letzte Gesundheitsmesswerte",
        noHealth: "Keine Gesundheitsmesswerte gespeichert.",
        contacts: "Notfallkontakte",
        noContacts: "Keine Notfallkontakte gespeichert.",
        contactMessage: "Nachricht vorbereiten",
        messageConfirm:
          "Soll die Nachrichten-App mit einer Notfallnachricht an deine Kontakte geöffnet werden? Du musst selbst auf Senden tippen.",
        messagePrepared:
          "Die Nachrichten-App wurde geöffnet. Tippe auf Senden, um deine Kontakte zu benachrichtigen.",
        noContactsMessage: "Speichere zuerst mindestens einen Notfallkontakt.",
        country: "Land",
        callNumber: "Notrufnummer",
        notMedicalAdvice:
          "Dieser Pass ist eine Übersicht für Notfälle und keine medizinische Diagnose.",
      };

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser || !currentUser.emailVerified) {
        setMedications([]);
        setHealthEntries([]);
        setContacts([]);
        setIsPassVisible(false);
      }
    });
  }, []);

  useEffect(() => {
    if (!user || !user.emailVerified) {
      return undefined;
    }

    const stopListeners = [];
    const userReference = (collectionName) =>
      collection(db, "users", user.uid, collectionName);

    stopListeners.push(
      onSnapshot(userReference("medications"), (snapshot) => {
        setMedications(
          snapshot.docs
            .map((documentSnapshot) => ({
              id: documentSnapshot.id,
              ...documentSnapshot.data(),
            }))
            .sort((first, second) => first.name.localeCompare(second.name))
        );
      })
    );

    stopListeners.push(
      onSnapshot(userReference("healthEntries"), (snapshot) => {
        setHealthEntries(
          snapshot.docs
            .map((documentSnapshot) => ({
              id: documentSnapshot.id,
              ...documentSnapshot.data(),
            }))
            .sort(
              (first, second) =>
                (second.measuredAt?.toMillis?.() ?? 0) -
                (first.measuredAt?.toMillis?.() ?? 0)
            )
            .slice(0, 5)
        );
      })
    );

    stopListeners.push(
      onSnapshot(userReference("emergencyContacts"), (snapshot) => {
        setContacts(
          snapshot.docs.map((documentSnapshot) => ({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          }))
        );
      })
    );

    return () => stopListeners.forEach((stopListening) => stopListening());
  }, [user]);

  function prepareContactMessage() {
    if (contacts.length === 0) {
      setMessage(text.noContactsMessage);
      setMessageType("error");
      return;
    }

    if (!window.confirm(text.messageConfirm)) {
      return;
    }

    const emergencyText = isEnglish
      ? `I may need help. My Curaelis emergency number is ${selectedCountry.ambulanceNumber}. Please contact me.`
      : `Ich brauche möglicherweise Hilfe. Die Curaelis-Notrufnummer für mein Land ist ${selectedCountry.ambulanceNumber}. Bitte melde dich bei mir.`;
    const recipients = contacts.map((contact) => contact.phone.trim()).join(",");

    setMessage(text.messagePrepared);
    setMessageType("success");
    window.location.href = `sms:${recipients}?body=${encodeURIComponent(emergencyText)}`;
  }

  return (
    <Box
      className="emergency-pass"
      id="notfallpass"
      marginTop="8"
      border="2px solid"
      borderColor="teal.300"
      borderRadius="xl"
      background="white"
      padding={{ base: "5", md: "7" }}
      boxShadow="sm"
    >
      <Heading size="lg" color="teal.900" marginBottom="3">
        🪪 {text.title}
      </Heading>
      <Text marginBottom="3">{text.description}</Text>
      <Text color="teal.800" fontWeight="600" marginBottom="5">
        🔒 {text.privacy}
      </Text>

      {!user || !user.emailVerified ? (
        <Text color="gray.700">{text.signIn}</Text>
      ) : (
        <>
          <Button
            type="button"
            colorPalette="teal"
            size="lg"
            width="100%"
            onClick={() => {
              setIsPassVisible((currentValue) => !currentValue);
              setMessage("");
              setMessageType("");
            }}
          >
            {isPassVisible ? text.hide : text.show}
          </Button>

          {isPassVisible && (
            <Box marginTop="6">
              <SimpleGrid columns={{ base: 1, md: 3 }} gap="5">
                <Box borderWidth="1px" borderRadius="lg" padding="5">
                  <Heading size="md" color="teal.900" marginBottom="3">
                    💊 {text.medications}
                  </Heading>
                  {medications.length === 0 ? (
                    <Text>{text.noMedications}</Text>
                  ) : (
                    <Stack gap="3">
                      {medications.map((medication) => (
                        <Box key={medication.id}>
                          <Text fontWeight="700">{medication.name}</Text>
                          <Text>{medication.dosage}</Text>
                          {Array.isArray(medication.intakeTimes) && (
                            <Text fontSize="sm" color="gray.600">
                              {medication.intakeTimes.join(", ")}
                            </Text>
                          )}
                        </Box>
                      ))}
                    </Stack>
                  )}
                </Box>

                <Box borderWidth="1px" borderRadius="lg" padding="5">
                  <Heading size="md" color="teal.900" marginBottom="3">
                    📈 {text.health}
                  </Heading>
                  {healthEntries.length === 0 ? (
                    <>
                      <Text>{text.noHealth}</Text>
                      <Button
                        as={Link}
                        to="/gesundheitstagebuch"
                        variant="outline"
                        colorPalette="teal"
                        width="100%"
                        marginTop="4"
                        whiteSpace="normal"
                        height="auto"
                        paddingY="3"
                      >
                        📈 {isEnglish ? "Open health diary" : "Gesundheitstagebuch öffnen"}
                      </Button>
                    </>
                  ) : (
                    <Stack gap="3">
                      {healthEntries.map((entry) => (
                        <Box key={entry.id}>
                          <Text fontWeight="700">
                            {entry.type === "symptom"
                              ? entry.context || getHealthLabel(entry.type, isEnglish)
                              : getHealthLabel(entry.type, isEnglish)}
                          </Text>
                          <Text>{getHealthValue(entry)}</Text>
                          <Text fontSize="sm" color="gray.600">
                            {formatDate(entry.measuredAt, isEnglish)}
                          </Text>
                        </Box>
                      ))}
                    </Stack>
                  )}
                </Box>

                <Box borderWidth="1px" borderRadius="lg" padding="5">
                  <Heading size="md" color="teal.900" marginBottom="3">
                    📞 {text.contacts}
                  </Heading>
                  {contacts.length === 0 ? (
                    <Text>{text.noContacts}</Text>
                  ) : (
                    <Stack gap="3">
                      {contacts.map((contact) => (
                        <Box key={contact.id}>
                          <Text fontWeight="700">{contact.name}</Text>
                          <Text as="a" href={`tel:${contact.phone}`} color="teal.700">
                            {contact.phone}
                          </Text>
                        </Box>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        colorPalette="teal"
                        onClick={prepareContactMessage}
                        width="100%"
                        whiteSpace="normal"
                        height="auto"
                        paddingY="3"
                      >
                        ✉️ {text.contactMessage}
                      </Button>
                    </Stack>
                  )}
                </Box>
              </SimpleGrid>

              {message && (
                <Text
                  marginTop="5"
                  color={messageType === "error" ? "red.700" : "teal.700"}
                  fontWeight="600"
                  role={messageType === "error" ? "alert" : "status"}
                  aria-live="polite"
                >
                  {message}
                </Text>
              )}

              <Text marginTop="5" fontSize="sm" color="gray.600">
                {text.notMedicalAdvice}
              </Text>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default EmergencyPass;
