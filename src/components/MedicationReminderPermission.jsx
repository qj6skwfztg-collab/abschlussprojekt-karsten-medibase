import { useState } from "react";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import useLanguage from "../hooks/useLanguage";

function MedicationReminderPermission() {
  const { isEnglish } = useLanguage();
  const [message, setMessage] = useState("");
  const [permission, setPermission] = useState(() =>
    "Notification" in window ? Notification.permission : "unsupported"
  );

  async function handlePermission() {
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
        {isEnglish
          ? "For now, reminders require Curaelis to be open or active as a web app."
          : "Aktuell muss Curaelis für Erinnerungen geöffnet oder als Web-App aktiv sein."}
      </Text>

      <Stack
        marginTop="4"
        direction={{ base: "column", md: "row" }}
        gap="3"
      >
        <Button
          colorPalette="teal"
          onClick={handlePermission}
        >
          {isEnglish ? "Allow notifications" : "Benachrichtigungen erlauben"}
        </Button>

        <Button
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
