import { useEffect, useMemo, useState } from "react";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import useLanguage from "../hooks/useLanguage";

export const ONBOARDING_PENDING_KEY_PREFIX = "curaelis-onboarding-pending:";
const ONBOARDING_STATE_KEY_PREFIX = "curaelis-onboarding-state:";

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
        setIsStarted(Boolean(savedState?.started));
      } catch {
        setSelection(defaultSelection);
        setCompleted([]);
        setIsStarted(false);
      }
    });
  }, []);

  const isPending = Boolean(
    user &&
      !isDismissed &&
      localStorage.getItem(getStorageKey(ONBOARDING_PENDING_KEY_PREFIX, user.uid)) === "true"
  );

  if (!isPending || !user) {
    return null;
  }

  const selectedItems = items.filter((item) => selection[item.id]);
  const nextItem = selectedItems.find((item) => !completed.includes(item.id));
  const completedCount = selectedItems.filter((item) => completed.includes(item.id)).length;

  function saveState(nextSelection, nextCompleted, started = true) {
    localStorage.setItem(
      getStorageKey(ONBOARDING_STATE_KEY_PREFIX, user.uid),
      JSON.stringify({ selection: nextSelection, completed: nextCompleted, started })
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
    setIsStarted(true);
    saveState(selection, []);
  }

  function markDone() {
    if (!nextItem) return;

    const nextCompleted = [...completed, nextItem.id];
    setCompleted(nextCompleted);
    saveState(selection, nextCompleted);
  }

  function finishSetup() {
    localStorage.removeItem(getStorageKey(ONBOARDING_PENDING_KEY_PREFIX, user.uid));
    localStorage.removeItem(getStorageKey(ONBOARDING_STATE_KEY_PREFIX, user.uid));
    setIsDismissed(true);
    navigate("/meine-medikamente", { replace: true });
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
            <Box className="curaelis-onboarding-current" borderWidth="1px" borderColor="teal.200" borderRadius="xl" padding="6" background="teal.50">
              <Heading size="md" color="teal.900">{nextItem.title}</Heading>
              <Text mt="3">{nextItem.description}</Text>
            </Box>
            <Flex gap="3" wrap="wrap">
              <Button as={Link} to={nextItem.path} colorPalette="teal" size="lg" flex="1" minW="220px">
                {isEnglish ? "Set up now" : "Jetzt einrichten"}
              </Button>
              <Button variant="outline" size="lg" onClick={markDone} flex="1" minW="220px">
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
            <Box background="green.50" borderWidth="1px" borderColor="green.200" borderRadius="xl" padding="6">
              <Heading size="md" color="green.800">{isEnglish ? "Curaelis is ready" : "Curaelis ist eingerichtet"}</Heading>
              <Text mt="3">{isEnglish ? "You can edit your medications, health entries and emergency information at any time." : "Du kannst Medikamente, Gesundheitseinträge und Notfallangaben jederzeit bearbeiten."}</Text>
            </Box>
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
