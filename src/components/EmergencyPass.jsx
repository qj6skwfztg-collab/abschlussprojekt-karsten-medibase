import { syncEmergencyPassToWatch } from "../native/watchConnectivity";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import useLanguage from "../hooks/useLanguage";
import useEmergencyProfile from "../hooks/useEmergencyProfile";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

const OFFLINE_PASS_STORAGE_KEY = "curaelis-emergency-pass-offline";
const OFFLINE_PASS_ENABLED_KEY = "curaelis-emergency-pass-offline-enabled";

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
  const { profile } = useEmergencyProfile();
  const [user, setUser] = useState(null);
  const [medications, setMedications] = useState([]);
  const [healthEntries, setHealthEntries] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isPassVisible, setIsPassVisible] = useState(
    () => window.location.hash === "#notfallpass"
  );
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareOptions, setShareOptions] = useState({
    medications: true,
    health: true,
    profile: false,
  });
  const [offlineEnabled, setOfflineEnabled] = useState(
    () => localStorage.getItem(OFFLINE_PASS_ENABLED_KEY) === "true"
  );
  const [offlineSnapshot, setOfflineSnapshot] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(OFFLINE_PASS_STORAGE_KEY) || "null");
    } catch {
      return null;
    }
  });
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);

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
        medications: "My medications",
        openMedications: "Open my medications",
        noMedications: "No personal medications saved.",
        health: "Recent health measurements",
        noHealth: "No health measurements saved.",
        openHealth: "Open health diary and add measurements",
        contacts: "Emergency contacts",
        noContacts: "No emergency contacts saved.",
        openContacts: "Open and edit emergency contacts",
        contactMessage: "Prepare message",
        messageConfirm:
          "Open your messaging app with an emergency message prepared for your contacts? You must tap Send yourself.",
        messagePrepared:
          "The messaging app was opened. Tap Send to notify your contacts.",
        noContactsMessage: "Save at least one emergency contact first.",
        profile: "Important health details",
        noProfile: "No additional emergency details saved.",
        openAccount: "Add details in my account",
        editPass: "Edit emergency pass details",
        backToEmergencyHelp: "Back to emergency help",
        sharePass: "Share selected pass information",
        sharePassHint: "Choose exactly which information you want to share. Contacts are not included by default.",
        shareMedications: "My medications",
        shareHealth: "Recent health measurements",
        shareProfile: "Important health details",
        shareNow: "Review and share",
        cancelShare: "Cancel",
        shareUnsupported: "Sharing is not available here. You can use the email app that opens next and check the text before sending.",
        shareReady: "The share menu was opened. Check the selected information before sending.",
        offlineTitle: "Offline emergency view",
        offlineDescription: "Keep a read-only copy of your pass on this device for moments without an internet connection.",
        offlineEnable: "Keep an offline copy on this device",
        offlineEnabled: "Offline copy is enabled",
        offlineDelete: "Delete offline copy",
        offlineSaved: "The offline copy was updated.",
        lastUpdated: "Last updated",
        completeness: "Pass completeness",
        completenessHint: "Add the missing sections in your account.",
        allergies: "Allergies",
        conditions: "Important conditions",
        bloodGroup: "Blood group",
        specialNotes: "Special notes",
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
        medications: "Meine Medikamente",
        openMedications: "Meine Medikamente öffnen",
        noMedications: "Keine persönlichen Medikamente gespeichert.",
        health: "Letzte Gesundheitsmesswerte",
        noHealth: "Keine Gesundheitsmesswerte gespeichert.",
        openHealth: "Gesundheitstagebuch öffnen und Messwert hinzufügen",
        contacts: "Notfallkontakte",
        noContacts: "Keine Notfallkontakte gespeichert.",
        openContacts: "Notfallkontakte öffnen und bearbeiten",
        contactMessage: "Nachricht vorbereiten",
        messageConfirm:
          "Soll die Nachrichten-App mit einer Notfallnachricht an deine Kontakte geöffnet werden? Du musst selbst auf Senden tippen.",
        messagePrepared:
          "Die Nachrichten-App wurde geöffnet. Tippe auf Senden, um deine Kontakte zu benachrichtigen.",
        noContactsMessage: "Speichere zuerst mindestens einen Notfallkontakt.",
        profile: "Wichtige Gesundheitsangaben",
        noProfile: "Keine zusätzlichen Notfallangaben gespeichert.",
        openAccount: "Angaben im Konto ergänzen",
        editPass: "Notfallpass bearbeiten",
        backToEmergencyHelp: "Zurück zur Notfallhilfe",
        sharePass: "Ausgewählte Passdaten teilen",
        sharePassHint: "Wähle genau aus, welche Informationen du teilen möchtest. Kontakte werden standardmäßig nicht mitgeteilt.",
        shareMedications: "Meine Medikamente",
        shareHealth: "Letzte Gesundheitsmesswerte",
        shareProfile: "Wichtige Gesundheitsangaben",
        shareNow: "Prüfen und teilen",
        cancelShare: "Abbrechen",
        shareUnsupported: "Das Teilen ist hier nicht verfügbar. Die Mail-App wird geöffnet; prüfe den Text vor dem Senden.",
        shareReady: "Das Teilen-Menü wurde geöffnet. Prüfe die ausgewählten Informationen vor dem Senden.",
        offlineTitle: "Offline-Notfallansicht",
        offlineDescription: "Bewahre eine schreibgeschützte Kopie deines Passes auf diesem Gerät auf, falls kein Internet verfügbar ist.",
        offlineEnable: "Offline-Kopie auf diesem Gerät behalten",
        offlineEnabled: "Offline-Kopie ist aktiviert",
        offlineDelete: "Offline-Kopie löschen",
        offlineSaved: "Die Offline-Kopie wurde aktualisiert.",
        lastUpdated: "Zuletzt aktualisiert",
        completeness: "Vollständigkeit des Passes",
        completenessHint: "Ergänze die fehlenden Bereiche in deinem Konto.",
        allergies: "Allergien",
        conditions: "Wichtige Erkrankungen",
        bloodGroup: "Blutgruppe",
        specialNotes: "Besondere Hinweise",
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
            .sort((first, second) =>
              first.name.localeCompare(second.name)
            )
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

    return () => {
      stopListeners.forEach((stopListening) => stopListening());
    };
  }, [user]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!offlineEnabled || !user?.emailVerified) {
      return;
    }

    const nextSnapshot = {
      savedAt: new Date().toISOString(),
      medications,
      healthEntries,
      profile,
    };

    localStorage.setItem(OFFLINE_PASS_STORAGE_KEY, JSON.stringify(nextSnapshot));
  }, [offlineEnabled, user, medications, healthEntries, profile]);

  useEffect(() => {
    if (!user?.emailVerified || !isPassVisible) {
      return;
    }

    void syncEmergencyPassToWatch({
      medications,
      healthEntries,
      profile,
    });
  }, [
    user,
    isPassVisible,
    medications,
    healthEntries,
    profile,
  ]);

  const passData = !isOnline && offlineSnapshot
    ? offlineSnapshot
    : { medications, healthEntries, profile };
  const passMedications = passData.medications || [];
  const passHealthEntries = passData.healthEntries || [];
  const passProfile = passData.profile || {};
  const hasEmergencyProfile = Object.entries(passProfile).some(
    ([key, value]) => key !== "updatedAt" && typeof value === "string" && value.trim()
  );
  const completenessItems = [
    passMedications.length > 0,
    passHealthEntries.length > 0,
    contacts.length > 0,
    hasEmergencyProfile,
  ];
  const completenessPercent = Math.round(
    (completenessItems.filter(Boolean).length / completenessItems.length) * 100
  );

  function getPassLastUpdated() {
    const dates = [
      passProfile.updatedAt,
      ...passMedications.map((medication) => medication.createdAt),
      ...passHealthEntries.map((entry) => entry.measuredAt),
      ...contacts.map((contact) => contact.createdAt),
    ]
      .map((value) => value?.toDate?.() || (value ? new Date(value) : null))
      .filter((date) => date && !Number.isNaN(date.getTime()));

    if (dates.length === 0) {
      return isEnglish ? "Not yet available" : "Noch nicht vorhanden";
    }

    return new Intl.DateTimeFormat(isEnglish ? "en-GB" : "de-DE", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(Math.max(...dates.map((date) => date.getTime()))));
  }

  function getShareText() {
    const lines = [
      isEnglish ? "Curaelis emergency pass" : "Curaelis-Notfallpass",
      "",
    ];

    if (shareOptions.medications) {
      lines.push(isEnglish ? "My medications:" : "Meine Medikamente:");
      passMedications.forEach((medication) => {
        lines.push(`• ${medication.name} – ${medication.dosage}`);
      });
    }

    if (shareOptions.health) {
      lines.push(isEnglish ? "Recent health measurements:" : "Letzte Gesundheitsmesswerte:");
      passHealthEntries.slice(0, 5).forEach((entry) => {
        lines.push(`• ${getHealthLabel(entry.type, isEnglish)}: ${getHealthValue(entry)} (${formatDate(entry.measuredAt, isEnglish)})`);
      });
    }

    if (shareOptions.profile) {
      lines.push(isEnglish ? "Important health details:" : "Wichtige Gesundheitsangaben:");
      [
        [text.allergies, passProfile.allergies],
        [text.conditions, passProfile.conditions],
        [text.bloodGroup, passProfile.bloodGroup],
        [text.specialNotes, passProfile.specialNotes],
      ].forEach(([label, value]) => {
        if (value) lines.push(`• ${label}: ${value}`);
      });
    }

    lines.push("", isEnglish ? "Shared manually from Curaelis." : "Manuell aus Curaelis geteilt.");
    return lines.join("\n");
  }

  async function handleSharePass() {
    if (!shareOptions.medications && !shareOptions.health && !shareOptions.profile) {
      setMessage(isEnglish ? "Select at least one section first." : "Wähle zuerst mindestens einen Bereich aus.");
      setMessageType("error");
      return;
    }

    const shareText = getShareText();
    setIsShareOpen(false);

    try {
      if (navigator.share) {
        await navigator.share({
          title: text.title,
          text: shareText,
        });
        setMessage(text.shareReady);
        setMessageType("success");
        return;
      }

      window.location.assign(`mailto:?subject=${encodeURIComponent(text.title)}&body=${encodeURIComponent(shareText)}`);
      setMessage(text.shareUnsupported);
      setMessageType("success");
    } catch (error) {
      if (error?.name !== "AbortError") {
        setMessage(text.shareUnsupported);
        setMessageType("error");
      }
    }
  }

  function handleOfflineChange(event) {
    const shouldEnable = event.target.checked;
    setOfflineEnabled(shouldEnable);

    if (shouldEnable) {
      localStorage.setItem(OFFLINE_PASS_ENABLED_KEY, "true");
      const nextSnapshot = {
        savedAt: new Date().toISOString(),
        medications,
        healthEntries,
        profile,
      };
      localStorage.setItem(OFFLINE_PASS_STORAGE_KEY, JSON.stringify(nextSnapshot));
      setOfflineSnapshot(nextSnapshot);
      setMessage(text.offlineSaved);
      setMessageType("success");
    } else {
      localStorage.removeItem(OFFLINE_PASS_ENABLED_KEY);
      localStorage.removeItem(OFFLINE_PASS_STORAGE_KEY);
      setOfflineSnapshot(null);
    }
  }

  function deleteOfflineCopy() {
    localStorage.removeItem(OFFLINE_PASS_STORAGE_KEY);
    setOfflineSnapshot(null);
    setMessageType("success");
    setMessage(isEnglish ? "The offline copy was deleted." : "Die Offline-Kopie wurde gelöscht.");
  }

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
    const recipients = contacts
      .map((contact) => contact.phone.trim())
      .join(",");

    setMessage(text.messagePrepared);
    setMessageType("success");

    window.location.href = `sms:${recipients}?body=${encodeURIComponent(
      emergencyText
    )}`;
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

      <Flex className="emergency-pass-status-row" gap="3" wrap="wrap" marginBottom="5">
        <Box className="emergency-pass-status-card">
          <Text className="emergency-pass-status-label">{text.completeness}</Text>
          <Text className="emergency-pass-status-value">{completenessPercent}%</Text>
        </Box>
        <Box className="emergency-pass-status-card">
          <Text className="emergency-pass-status-label">{text.lastUpdated}</Text>
          <Text className="emergency-pass-status-value emergency-pass-status-date">{getPassLastUpdated()}</Text>
        </Box>
      </Flex>

      {!isOnline && offlineSnapshot && (
        <Box className="emergency-pass-offline-banner" role="status">
          <Text fontWeight="800">{text.offlineTitle}</Text>
          <Text fontSize="sm" mt="1">{text.offlineDescription}</Text>
        </Box>
      )}

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
            <Flex
              gap="3"
              wrap="wrap"
              marginTop="3"
              justify="center"
              className="emergency-pass-navigation"
            >
              <Button
                as={Link}
                to="/konto#emergency-profile"
                variant="outline"
                colorPalette="teal"
                flex="1"
                minWidth={{ base: "100%", sm: "240px" }}
                whiteSpace="normal"
                height="auto"
                minHeight="52px"
                paddingY="3"
                fontWeight="800"
              >
                ✏️ {text.editPass}
              </Button>
              <Button
                as={Link}
                to="/notfall"
                variant="outline"
                colorPalette="gray"
                flex="1"
                minWidth={{ base: "100%", sm: "240px" }}
                whiteSpace="normal"
                height="auto"
                minHeight="52px"
                paddingY="3"
                fontWeight="800"
              >
                ↩️ {text.backToEmergencyHelp}
              </Button>
            </Flex>
          )}

          <Box className="emergency-pass-offline-settings" marginTop="4">
            <label className="emergency-pass-checkbox">
              <input
                type="checkbox"
                checked={offlineEnabled}
                onChange={handleOfflineChange}
              />
              <span>{offlineEnabled ? text.offlineEnabled : text.offlineEnable}</span>
            </label>
            {offlineEnabled && offlineSnapshot && (
              <Button type="button" variant="ghost" size="sm" onClick={deleteOfflineCopy}>
                {text.offlineDelete}
              </Button>
            )}
          </Box>

          {isPassVisible && (
            <Box marginTop="6">
              <Box className="emergency-pass-share-panel">
                <Flex align="center" justify="space-between" gap="4" wrap="wrap">
                  <Box>
                    <Heading size="md" color="teal.900">{text.sharePass}</Heading>
                    <Text mt="1" fontSize="sm" color="gray.600">{text.sharePassHint}</Text>
                  </Box>
                  <Button type="button" colorPalette="teal" onClick={() => setIsShareOpen((value) => !value)}>
                    {isShareOpen ? text.cancelShare : text.shareNow}
                  </Button>
                </Flex>
                {isShareOpen && (
                  <Box marginTop="4">
                    {[
                      ["medications", text.shareMedications],
                      ["health", text.shareHealth],
                      ["profile", text.shareProfile],
                    ].map(([name, label]) => (
                      <label key={name} className="emergency-pass-checkbox">
                        <input
                          type="checkbox"
                          checked={shareOptions[name]}
                          onChange={(event) => setShareOptions((previous) => ({ ...previous, [name]: event.target.checked }))}
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                    <Button type="button" marginTop="3" colorPalette="teal" onClick={handleSharePass}>
                      {text.shareNow}
                    </Button>
                  </Box>
                )}
              </Box>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap="5">
                <Box borderWidth="1px" borderRadius="lg" padding="5">
                  <Heading size="md" color="teal.900" marginBottom="3">
                    💊 {text.medications}
                  </Heading>

                  {passMedications.length === 0 ? (
                    <Text>{text.noMedications}</Text>
                  ) : (
                    <Stack gap="3">
                      {passMedications.map((medication) => (
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

                  <Button
                    as={Link}
                    to="/meine-medikamente"
                    variant="outline"
                    colorPalette="teal"
                    width="100%"
                    marginTop="4"
                    whiteSpace="normal"
                    height="auto"
                    minHeight="58px"
                    paddingY="3"
                    fontWeight="800"
                  >
                    💊 {text.openMedications}
                  </Button>
                </Box>

                <Box borderWidth="1px" borderRadius="lg" padding="5">
                  <Heading size="md" color="teal.900" marginBottom="3">
                    📈 {text.health}
                  </Heading>

                  {passHealthEntries.length === 0 ? (
                    <Text>{text.noHealth}</Text>
                  ) : (
                    <Stack gap="3">
                      {passHealthEntries.map((entry) => (
                        <Box key={entry.id}>
                          <Text fontWeight="700">
                            {entry.type === "symptom"
                              ? entry.context ||
                                getHealthLabel(entry.type, isEnglish)
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

                  <Button
                    as={Link}
                    to="/gesundheitstagebuch"
                    variant="outline"
                    colorPalette="teal"
                    width="100%"
                    marginTop="4"
                    whiteSpace="normal"
                    height="auto"
                    minHeight="58px"
                    paddingY="3"
                    fontWeight="800"
                    flexDirection="column"
                    lineHeight="1.25"
                    textAlign="center"
                  >
                    <span aria-hidden="true">📈</span>
                    <span style={{ overflowWrap: "anywhere" }}>{text.openHealth}</span>
                  </Button>
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

                          <Text
                            as="a"
                            href={`tel:${contact.phone}`}
                            color="teal.700"
                          >
                            {contact.phone}
                          </Text>
                        </Box>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        colorPalette="red"
                        onClick={prepareContactMessage}
                        width="100%"
                        whiteSpace="normal"
                        height="auto"
                        minHeight="58px"
                        paddingY="3"
                        fontWeight="800"
                      >
                        ✉️ {text.contactMessage}
                      </Button>
                    </Stack>
                  )}

                  <Button
                    as={Link}
                    to="/konto#emergency-contacts"
                    variant="outline"
                    colorPalette="teal"
                    width="100%"
                    marginTop="4"
                    whiteSpace="normal"
                    height="auto"
                    minHeight="58px"
                    paddingY="3"
                    fontWeight="800"
                  >
                    👥 {text.openContacts}
                  </Button>
                </Box>
              </SimpleGrid>

              <Box
                marginTop="5"
                borderWidth="1px"
                borderRadius="lg"
                padding="5"
              >
                <Heading size="md" color="teal.900" marginBottom="3">
                  🩺 {text.profile}
                </Heading>

                {!hasEmergencyProfile ? (
                  <>
                    <Text>{text.noProfile}</Text>

                    <Button
                      as={Link}
                      to="/konto#emergency-profile"
                      variant="outline"
                      colorPalette="teal"
                      marginTop="4"
                      whiteSpace="normal"
                      height="auto"
                      minHeight="58px"
                      paddingY="3"
                      fontWeight="800"
                    >
                      ⚙️ {text.openAccount}
                    </Button>
                  </>
                ) : (
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                    {passProfile.allergies && (
                      <Box>
                        <Text fontWeight="700">{text.allergies}</Text>
                        <Text>{passProfile.allergies}</Text>
                      </Box>
                    )}

                    {passProfile.conditions && (
                      <Box>
                        <Text fontWeight="700">{text.conditions}</Text>
                        <Text>{passProfile.conditions}</Text>
                      </Box>
                    )}

                    {passProfile.bloodGroup && (
                      <Box>
                        <Text fontWeight="700">{text.bloodGroup}</Text>
                        <Text>{passProfile.bloodGroup}</Text>
                      </Box>
                    )}

                    {passProfile.specialNotes && (
                      <Box>
                        <Text fontWeight="700">{text.specialNotes}</Text>
                        <Text>{passProfile.specialNotes}</Text>
                      </Box>
                    )}
                  </SimpleGrid>
                )}

                <Button
                  as={Link}
                  to="/konto#emergency-profile"
                  variant="outline"
                  colorPalette="teal"
                  marginTop="4"
                  whiteSpace="normal"
                  height="auto"
                  minHeight="52px"
                  paddingY="3"
                  fontWeight="800"
                >
                  ✏️ {text.editPass}
                </Button>
              </Box>

              {message && (
                <Text
                  marginTop="5"
                  color={
                    messageType === "error" ? "red.700" : "teal.700"
                  }
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
