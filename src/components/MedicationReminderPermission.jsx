import { useState } from "react";
import { Box, Button, Stack, Text } from "@chakra-ui/react";

function MedicationReminderPermission() {
  const [message, setMessage] = useState("");

  async function handlePermission() {
    if (!("Notification" in window)) {
      setMessage(
        "Dieser Browser unterstützt keine Benachrichtigungen."
      );
      return;
    }

    const permission =
      await Notification.requestPermission();

    if (permission === "granted") {
      setMessage(
        "Benachrichtigungen sind jetzt erlaubt."
      );
      return;
    }

    setMessage(
      "Benachrichtigungen wurden nicht erlaubt."
    );
  }

  async function handleTestNotification() {
    setMessage("");

    if (!("Notification" in window)) {
      setMessage(
        "Dieser Browser unterstützt keine Benachrichtigungen."
      );
      return;
    }

    if (!("serviceWorker" in navigator)) {
      setMessage(
        "Dieser Browser unterstützt den Hintergrunddienst nicht."
      );
      return;
    }

    if (Notification.permission !== "granted") {
      setMessage(
        "Bitte erlaube zuerst die Benachrichtigungen."
      );
      return;
    }

    try {
      const registration =
        await navigator.serviceWorker.ready;

      await registration.showNotification(
        "MediBase Test",
        {
          body:
            "Wenn du diese Nachricht siehst, funktionieren die Benachrichtigungen.",
          tag: "medibase-test",
        }
      );

      setMessage(
        "Die Testbenachrichtigung wurde ausgelöst."
      );
    } catch {
      setMessage(
        "Die Testbenachrichtigung konnte nicht angezeigt werden."
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
        Einnahmeerinnerungen
      </Text>

      <Text marginTop="2">
        Erlaube Benachrichtigungen, damit MediBase dich an
        deine Einnahmezeiten erinnern kann.
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
          Benachrichtigungen erlauben
        </Button>

        <Button
          variant="outline"
          colorPalette="teal"
          onClick={handleTestNotification}
        >
          Testbenachrichtigung senden
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
