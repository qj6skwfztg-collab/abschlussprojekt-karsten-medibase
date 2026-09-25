import { useEffect, useState } from "react";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import useLanguage from "../hooks/useLanguage";
import {
  getMedicationNotificationPermission,
  requestMedicationNotificationPermission,
  scheduleMedicationTestNotification,
  syncNativeMedicationReminders,
} from "../native/medicationNotifications";

function MedicationReminderPermission({ medications = [], onGranted }) {
  const { isEnglish } = useLanguage();
  const [message, setMessage] = useState("");
  const [isNative, setIsNative] = useState(false);
  const [permission, setPermission] = useState(() =>
    "Notification" in window ? Notification.permission : "unsupported"
  );

  useEffect(() => {
    let isMounted = true;

    getMedicationNotificationPermission().then((result) => {
      if (!isMounted) {
        return;
      }

      setIsNative(result.native);
      setPermission(result.display);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  async function handlePermission() {
    if (isNative) {
      const result = await requestMedicationNotificationPermission();
      setPermission(result.display);

      if (result.display === "granted") {
        onGranted?.();
        await syncNativeMedicationReminders(medications);
        setMessage(
          isEnglish
            ? "iPhone reminders are now allowed and scheduled."
            : "iPhone-Erinnerungen sind jetzt erlaubt und eingeplant."
        );
        return;
      }

      setMessage(
        result.display === "denied"
          ? (isEnglish
              ? "Notifications are blocked. Allow them in iPhone Settings."
              : "Benachrichtigungen sind blockiert. Erlaube sie in den iPhone-Einstellungen.")
          : (isEnglish
              ? "Notifications were not allowed."
              : "Benachrichtigungen wurden nicht erlaubt.")
      );
      return;
    }

    if (!("Notification" in window)) {
      setMessage(
        isEnglish ? "This browser does not support notifications." : "Dieser Browser unterstützt keine Benachrichtigungen."
      );
      return;
    }

    const permission =
      await Notification.requestPermission();

    if (permission === "granted") {
      setPermission(permission);
      onGranted?.();
      setMessage(
        isEnglish ? "Notifications are now allowed." : "Benachrichtigungen sind jetzt erlaubt."
      );
      return;
    }

    setPermission(permission);
    setMessage(
      permission === "denied"
        ? (isEnglish
            ? "Notifications are blocked. Please allow them in your browser settings."
            : "Benachrichtigungen sind blockiert. Erlaube sie bitte in den Browsereinstellungen.")
        : (isEnglish
            ? "Notifications were not allowed."
            : "Benachrichtigungen wurden nicht erlaubt.")
    );
  }

  async function handleTestNotification() {
    setMessage("");

    if (isNative) {
      const wasScheduled = await scheduleMedicationTestNotification();

      setMessage(
        wasScheduled
          ? (isEnglish
              ? "A test notification will appear in about five seconds."
              : "Eine Testbenachrichtigung erscheint in ungefähr fünf Sekunden.")
          : (isEnglish
              ? "Please allow notifications first."
              : "Bitte erlaube zuerst die Benachrichtigungen.")
      );
      return;
    }

    if (!("Notification" in window)) {
      setMessage(
        isEnglish ? "This browser does not support notifications." : "Dieser Browser unterstützt keine Benachrichtigungen."
      );
      return;
    }

    if (!("serviceWorker" in navigator)) {
      setMessage(
        isEnglish ? "This browser does not support the background service." : "Dieser Browser unterstützt den Hintergrunddienst nicht."
      );
      return;
    }

    if (Notification.permission !== "granted") {
      setMessage(
        isEnglish ? "Please allow notifications first." : "Bitte erlaube zuerst die Benachrichtigungen."
      );
      return;
    }

    try {
      const registration =
        await navigator.serviceWorker.ready;

      await registration.showNotification(
        "Curaelis Test",
        {
          body:
            isEnglish ? "If you can see this message, notifications are working." : "Wenn du diese Nachricht siehst, funktionieren die Benachrichtigungen.",
          tag: "medibase-test",
        }
      );

      setMessage(
        isEnglish ? "The test notification was triggered." : "Die Testbenachrichtigung wurde ausgelöst."
      );
    } catch {
      setMessage(
        isEnglish ? "The test notification could not be displayed." : "Die Testbenachrichtigung konnte nicht angezeigt werden."
      );
    }
  }

  return (
    <Box
      className="medication-reminders-panel"
      padding="5"
      borderWidth="1px"
      borderRadius="lg"
      background="white"
    >
      <Text fontWeight="bold">
        {isEnglish ? "Medication reminders" : "Einnahmeerinnerungen"}
      </Text>

      <Text marginTop="2">
        {isEnglish ? "Allow notifications so Curaelis can remind you of your scheduled intake times." : "Erlaube Benachrichtigungen, damit Curaelis dich an deine Einnahmezeiten erinnern kann."}
      </Text>

      <Text marginTop="2" fontSize="sm" fontWeight="600">
        {permission === "granted"
          ? (isEnglish ? "Status: notifications allowed." : "Status: Benachrichtigungen erlaubt.")
          : permission === "denied"
            ? (isEnglish ? "Status: notifications blocked." : "Status: Benachrichtigungen blockiert.")
            : permission === "unsupported"
              ? (isEnglish ? "This browser does not support notifications." : "Dieser Browser unterstützt keine Benachrichtigungen.")
              : (isEnglish ? "Status: permission not decided yet." : "Status: Berechtigung noch nicht festgelegt.")}
      </Text>

      <Text marginTop="2" fontSize="sm" color="gray.600">
        {isNative
          ? (isEnglish
              ? "On iPhone, reminders are scheduled locally and can appear even when Curaelis is closed."
              : "Auf dem iPhone werden Erinnerungen lokal eingeplant und können auch erscheinen, wenn Curaelis geschlossen ist.")
          : (isEnglish
              ? "In the browser, reminders require Curaelis to be open or active as a web app."
              : "Im Browser muss Curaelis für Erinnerungen geöffnet oder als Web-App aktiv sein.")}
      </Text>

      <Stack
        className="medication-reminders-actions"
        marginTop="4"
        direction={{ base: "column", md: "row" }}
        gap="3"
      >
        <Button
          className="medication-reminders-primary"
          colorPalette="teal"
          onClick={handlePermission}
        >
          {isEnglish ? "Allow notifications" : "Benachrichtigungen erlauben"}
        </Button>

        <Button
          className="medication-reminders-secondary"
          variant="outline"
          colorPalette="teal"
          onClick={handleTestNotification}
        >
          {isEnglish ? "Send test notification" : "Testbenachrichtigung senden"}
        </Button>
      </Stack>

      {message && (
        <Text marginTop="3">
          {message}
        </Text>
      )}
    </Box>
  );
}

export default MedicationReminderPermission;
