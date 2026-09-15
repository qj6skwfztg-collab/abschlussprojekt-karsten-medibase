import { useEffect, useMemo, useState } from "react";
import { Box, Button, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import useLanguage from "../hooks/useLanguage";
import { getMedicationNotificationPermission } from "../native/medicationNotifications";

export const ONBOARDING_PENDING_KEY_PREFIX = "curaelis-onboarding-pending:";
const ONBOARDING_STATE_KEY_PREFIX = "curaelis-onboarding-state:";
const DOCTOR_EMAIL_STORAGE_KEY = "curaelis-doctor-email";

const defaultSelection = {
  medication: true,
  reminders: true,
  health: true,
  emergencyProfile: true,
  contacts: true,
  doctorEmail: true,
};

function getStorageKey(prefix, uid) {
  return `${prefix}${uid}`;
}

function OnboardingWizard() {
  const { isEnglish } = useLanguage();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [selection, setSelection] = useState(defaultSelection);
  const [completed, setCompleted] = useState([]);
  const [skipped, setSkipped] = useState([]);
  const [detected, setDetected] = useState({});
  const [isStarted, setIsStarted] = useState(false);
  const [selectionError, setSelectionError] = useState("");

  const items = useMemo(
    () =>
      isEnglish
        ? [
            { id: "medication", title: "Medication plan", description: "Add your medication, dosage and intake times.", path: "/meine-medikamente" },
            { id: "reminders", title: "Intake reminders", description: "Allow notifications and check that your medication reminders are active.", path: "/meine-medikamente" },
            { id: "health", title: "Health diary", description: "Record your first blood pressure, weight or other health value.", path: "/gesundheitstagebuch" },
            { id: "emergencyProfile", title: "Emergency pass", description: "Add important information for helpers, such as allergies or conditions.", path: "/konto#emergency-profile" },
            { id: "contacts", title: "Emergency contacts", description: "Save people who should be reached if you need help.", path: "/konto#emergency-contacts" },
            { id: "doctorEmail", title: "Doctor's practice email", description: "Save the practice address for your doctor report.", path: "/gesundheitstagebuch#doctor-email" },
          ]
        : [
            { id: "medication", title: "Medikamentenplan", description: "Medikament, Dosierung und Einnahmezeiten anlegen.", path: "/meine-medikamente" },
            { id: "reminders", title: "Einnahmeerinnerungen", description: "Benachrichtigungen erlauben und prüfen, ob deine Einnahmeerinnerungen aktiv sind.", path: "/meine-medikamente" },
            { id: "health", title: "Gesundheitstagebuch", description: "Den ersten Blutdruck, das Gewicht oder einen anderen Gesundheitswert eintragen.", path: "/gesundheitstagebuch" },
            { id: "emergencyProfile", title: "Notfallpass", description: "Wichtige Angaben für Ersthelfende eintragen, zum Beispiel Allergien oder Erkrankungen.", path: "/konto#emergency-profile" },
            { id: "contacts", title: "Notfallkontakte", description: "Menschen speichern, die im Notfall erreicht werden sollen.", path: "/konto#emergency-contacts" },
            { id: "doctorEmail", title: "E-Mail der Arztpraxis", description: "Die Praxisadresse für deine Arztübersicht speichern.", path: "/gesundheitstagebuch#doctor-email" },
          ],
    [isEnglish]
  );

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsDismissed(false);

      if (!currentUser || localStorage.getItem(
        getStorageKey(ONBOARDING_PENDING_KEY_PREFIX, currentUser.uid)
      ) !== "true") {
        return;
      }

      try {
        const savedState = JSON.parse(
          localStorage.getItem(getStorageKey(ONBOARDING_STATE_KEY_PREFIX, currentUser.uid)) || "null"
        );

        if (savedState?.selection) setSelection({ ...defaultSelection, ...savedState.selection });
        if (Array.isArray(savedState?.completed)) setCompleted(savedState.completed);
        if (Array.isArray(savedState?.skipped)) setSkipped(savedState.skipped);
        setIsStarted(Boolean(savedState?.started));
      } catch {
        setSelection(defaultSelection);
        setCompleted([]);
        setSkipped([]);
        setIsStarted(false);
      }
    });
  }, []);

  useEffect(() => {
    if (!user) {
      return undefined;
    }

    let isMounted = true;

    async function detectExistingSetup() {
      try {
        const userReference = (subcollection) =>
          collection(db, "users", user.uid, subcollection);
        const [medications, healthEntries, emergencyContacts, profile, notificationPermission] = await Promise.all([
          getDocs(userReference("medications")),
          getDocs(userReference("healthEntries")),
          getDocs(userReference("emergencyContacts")),
          getDoc(doc(db, "users", user.uid, "emergencyProfile", "main")),
          getMedicationNotificationPermission().catch(() => null),
        ]);

        if (!isMounted) return;

        const profileData = profile.exists() ? profile.data() : {};
        const hasProfileData = [
          profileData.allergies,
          profileData.conditions,
          profileData.bloodGroup,
          profileData.specialNotes,
        ].some((value) => String(value || "").trim());

        setDetected({
          medication: medications.size > 0,
          reminders: notificationPermission?.display === "granted",
          health: healthEntries.size > 0,
          emergencyProfile: hasProfileData,
          contacts: emergencyContacts.size > 0,
          doctorEmail: Boolean(localStorage.getItem(DOCTOR_EMAIL_STORAGE_KEY)?.trim()),
        });
      } catch {
        // The wizard still works with its manually confirmed progress if a
        // temporary network check is unavailable.
      }
    }

    detectExistingSetup();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const isPending = Boolean(
    user &&
      !isDismissed &&
      localStorage.getItem(getStorageKey(ONBOARDING_PENDING_KEY_PREFIX, user.uid)) === "true"
  );

  if (!isPending || !user) {
    return null;
  }

  const selectedItems = items.filter((item) => selection[item.id]);
  const isItemComplete = (item) =>
    completed.includes(item.id) || Boolean(detected[item.id]);
  const nextItem = selectedItems.find(
    (item) => !isItemComplete(item) && !skipped.includes(item.id)
  );
  const completedCount = selectedItems.filter(isItemComplete).length;
  const skippedItems = selectedItems.filter(
    (item) => skipped.includes(item.id) && !isItemComplete(item)
  );

  function saveState(nextSelection, nextCompleted, nextSkipped = skipped, started = true) {
    localStorage.setItem(
      getStorageKey(ONBOARDING_STATE_KEY_PREFIX, user.uid),
      JSON.stringify({
        selection: nextSelection,
        completed: nextCompleted,
        skipped: nextSkipped,
        started,
      })
    );
  }

  function handleSelectionChange(id) {
    setSelection((currentSelection) => ({
      ...currentSelection,
      [id]: !currentSelection[id],
    }));
    setSelectionError("");
  }

  function startSetup() {
    if (selectedItems.length === 0) {
      setSelectionError(isEnglish ? "Select at least one area first." : "Wähle zuerst mindestens einen Bereich aus.");
      return;
    }

    setCompleted([]);
    setSkipped([]);
    setIsStarted(true);
    saveState(selection, [], []);
  }

  function markDone() {
    if (!nextItem) return;

    const nextCompleted = [...completed, nextItem.id];
    setCompleted(nextCompleted);
    const nextSkipped = skipped.filter((id) => id !== nextItem.id);
    setSkipped(nextSkipped);
    saveState(selection, nextCompleted, nextSkipped);
  }

  function skipCurrent() {
    if (!nextItem) return;

    const nextSkipped = [...new Set([...skipped, nextItem.id])];
    setSkipped(nextSkipped);
    saveState(selection, completed, nextSkipped);
  }

  function goBack() {
    const lastActionId = [...selectedItems]
      .reverse()
      .find((item) => completed.includes(item.id) || skipped.includes(item.id))?.id;

    if (!lastActionId) {
      setIsStarted(false);
      saveState(selection, completed, skipped, false);
      return;
    }

    const previousCompleted = completed.filter((id) => id !== lastActionId);
    const previousSkipped = skipped.filter((id) => id !== lastActionId);
    setCompleted(previousCompleted);
    setSkipped(previousSkipped);
    saveState(selection, previousCompleted, previousSkipped);
  }

  function finishSetup() {
    localStorage.removeItem(getStorageKey(ONBOARDING_PENDING_KEY_PREFIX, user.uid));
    localStorage.removeItem(getStorageKey(ONBOARDING_STATE_KEY_PREFIX, user.uid));
    setIsDismissed(true);
    navigate("/meine-medikamente", {
      replace: true,
      state: { onboardingFinished: true },
    });
  }

  return (
    <Box className="curaelis-onboarding" maxW="820px" mx="auto" p={{ base: "5", md: "8" }}>
      <Box className="curaelis-onboarding-card" background="white" borderWidth="2px" borderColor="teal.200" borderRadius="2xl" padding={{ base: "6", md: "9" }} boxShadow="lg">
        <Text color="teal.700" fontWeight="900" letterSpacing="0.12em" textTransform="uppercase">
          {isEnglish ? "Curaelis setup" : "Curaelis Einrichtung"}
        </Text>
        <Heading mt="2" color="teal.900">
          {isEnglish ? "Let's set up Curaelis together" : "Wir richten Curaelis gemeinsam ein"}
        </Heading>
        <Text mt="4" fontSize={{ base: "md", md: "lg" }}>
          {isEnglish
            ? "Choose what you want to prepare now. You can change everything later in your account."
            : "Wähle aus, was du jetzt einrichten möchtest. Alles kann später in deinem Konto geändert werden."}
        </Text>

        {!isStarted ? (
          <Stack gap="3" mt="7">
            {items.map((item) => (
              <label key={item.id} className="curaelis-onboarding-option">
                <input
                  type="checkbox"
                  checked={selection[item.id]}
                  onChange={() => handleSelectionChange(item.id)}
                />
                <Box>
                  <Text fontWeight="800" color="teal.900">{item.title}</Text>
                  <Text fontSize="sm" color="gray.600">{item.description}</Text>
                </Box>
              </label>
            ))}
            {selectionError && <Text color="red.700" fontWeight="700">{selectionError}</Text>}
            <Button colorPalette="teal" size="lg" mt="3" onClick={startSetup}>
              {isEnglish ? "Start setup" : "Einrichtung starten"}
            </Button>
            <Button variant="ghost" onClick={finishSetup}>
              {isEnglish ? "Skip for now" : "Jetzt überspringen"}
            </Button>
          </Stack>
        ) : nextItem ? (
          <Stack gap="5" mt="7">
            <Text color="gray.600" fontWeight="700">
              {isEnglish ? `${completedCount} of ${selectedItems.length} areas completed` : `${completedCount} von ${selectedItems.length} Bereichen erledigt`}
            </Text>
            <Box className="curaelis-onboarding-progress" borderWidth="1px" borderColor="teal.100" borderRadius="xl" padding="4" background="white">
              <Text color="teal.900" fontWeight="800" mb="3">
                {isEnglish ? "Your setup overview" : "Deine Einrichtungsübersicht"}
              </Text>
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap="2">
                {selectedItems.map((item) => {
                  const isComplete = isItemComplete(item);
                  const isDetected = Boolean(detected[item.id]);
                  const isConfirmedWithoutData =
                    completed.includes(item.id) && !isDetected;
                  const isSkipped = skipped.includes(item.id) && !isComplete;
                  const isCurrent = nextItem?.id === item.id;

                  return (
                    <Flex
                      key={item.id}
                      className={`curaelis-onboarding-progress-item${isComplete ? " is-complete" : ""}${isConfirmedWithoutData ? " is-confirmed-without-data" : ""}${isSkipped ? " is-skipped" : ""}${isCurrent ? " is-current" : ""}`}
                      align="center"
                      gap="2"
                      padding="2"
                      borderRadius="lg"
                    >
                      <Text className="curaelis-onboarding-progress-icon" aria-hidden="true">
                        {isComplete ? "✓" : isSkipped ? "↷" : isCurrent ? "→" : "○"}
                      </Text>
                      <Box minWidth="0">
                        <Text fontSize="sm" fontWeight="700" lineHeight="1.2">
                          {item.title}
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                          {isComplete
                            ? (isDetected
                              ? (isEnglish ? "Already present" : "Bereits vorhanden")
                              : (isEnglish ? "Nothing saved yet" : "Noch nichts hinterlegt"))
                            : isSkipped
                              ? (isEnglish ? "Skipped" : "Übersprungen")
                            : isCurrent
                              ? (isEnglish ? "Current step" : "Aktueller Schritt")
                              : (isEnglish ? "Still open" : "Noch offen")}
                        </Text>
                      </Box>
                    </Flex>
                  );
                })}
              </SimpleGrid>
            </Box>
              <Box className="curaelis-onboarding-current" borderWidth="1px" borderColor="teal.200" borderRadius="xl" padding="6" background="teal.50">
              <Heading size="md" color="teal.900">{nextItem.title}</Heading>
              <Text mt="3">{nextItem.description}</Text>
              <Text mt="3" color="teal.800" fontWeight="700">
                {isEnglish
                  ? "Open this area and save your details there."
                  : "Öffne diesen Bereich und speichere deine Angaben dort."}
              </Text>
            </Box>
            <Flex className="curaelis-onboarding-actions" gap="3" wrap="wrap" align="stretch">
              <Button
                variant="outline"
                size="lg"
                onClick={goBack}
                flex="1 1 180px"
                minW="180px"
              >
                {isEnglish ? "Back" : "Zurück"}
              </Button>
              <Button
                variant="outline"
                colorPalette="orange"
                size="lg"
                onClick={skipCurrent}
                flex="1 1 180px"
                minW="180px"
              >
                {isEnglish ? "Skip" : "Überspringen"}
              </Button>
              <Button as={Link} to={nextItem.path} state={{ fromOnboarding: true }} colorPalette="teal" size="lg" flex="1 1 220px" minW="220px">
                {isEnglish ? "Enter data" : "Daten eintragen"}
              </Button>
              <Button variant="outline" size="lg" onClick={markDone} flex="1 1 220px" minW="220px">
                {isEnglish ? "Already done / continue" : "Erledigt / weiter"}
              </Button>
            </Flex>
            <Text fontSize="sm" color="gray.600">
              {isEnglish
                ? "After saving, use the back button to return here and continue."
                : "Nach dem Speichern kannst du mit dem Zurück-Button hierher zurückkehren und fortfahren."}
            </Text>
            <Button variant="ghost" onClick={finishSetup}>
              {isEnglish ? "Finish later" : "Später beenden"}
            </Button>
          </Stack>
        ) : (
          <Stack gap="5" mt="7">
            <Box background={skippedItems.length > 0 ? "orange.50" : "green.50"} borderWidth="1px" borderColor={skippedItems.length > 0 ? "orange.200" : "green.200"} borderRadius="xl" padding="6">
              <Heading size="md" color={skippedItems.length > 0 ? "orange.800" : "green.800"}>
                {skippedItems.length > 0
                  ? (isEnglish ? "Setup paused" : "Einrichtung teilweise abgeschlossen")
                  : (isEnglish ? "Curaelis is ready" : "Curaelis ist eingerichtet")}
              </Heading>
              <Text mt="3">
                {skippedItems.length > 0
                  ? (isEnglish ? "You can complete the skipped areas later in your account." : "Die übersprungenen Bereiche kannst du später in deinem Konto nachholen.")
                  : (isEnglish ? "You can edit your medications, health entries and emergency information at any time." : "Du kannst Medikamente, Gesundheitseinträge und Notfallangaben jederzeit bearbeiten.")}
              </Text>
            </Box>
            {skippedItems.length > 0 && (
              <Button
                variant="outline"
                colorPalette="orange"
                size="lg"
                onClick={() => {
                  setSkipped([]);
                  saveState(selection, completed, []);
                }}
              >
                {isEnglish ? "Complete skipped areas" : "Übersprungene Bereiche nachholen"}
              </Button>
            )}
            <Button colorPalette="teal" size="lg" onClick={finishSetup}>
              {isEnglish ? "Go to my medications" : "Zu meinen Medikamenten"}
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default OnboardingWizard;
