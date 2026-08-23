import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import useUserMedications from "../hooks/useUserMedications";

const emptyForm = {
  name: "",
  dosage: "",
  intakeTime: "",
  notes: "",
};

function normalizeTime(value) {
  const time = String(value ?? "").trim();

  if (/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time)) {
    return time;
  }

  const twelveHourMatch = time.match(
    /^(\d{1,2}):([0-5]\d)\s*(AM|PM)$/i
  );

  if (!twelveHourMatch) {
    return "";
  }

  let hour = Number(twelveHourMatch[1]);
  const minutes = twelveHourMatch[2];
  const period = twelveHourMatch[3].toUpperCase();

  if (hour < 1 || hour > 12) {
    return "";
  }

  if (period === "PM" && hour !== 12) {
    hour += 12;
  }

  if (period === "AM" && hour === 12) {
    hour = 0;
  }

  return `${String(hour).padStart(2, "0")}:${minutes}`;
}

function MyMedicationsPage() {
  const {
    userMedications,
    isLoading,
    error,
    addUserMedication,
    updateUserMedication,
    deleteUserMedication,
  } = useUserMedications();

  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [notificationPermission, setNotificationPermission] = useState(
    typeof Notification !== "undefined"
      ? Notification.permission
      : "unsupported"
  );

  const sentReminders = useRef(new Set());

  useEffect(() => {
    if (
      typeof Notification === "undefined" ||
      Notification.permission !== "granted"
    ) {
      return;
    }

    function checkMedicationTimes() {
      const now = new Date();

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const currentTime = `${hours}:${minutes}`;
      const currentDay = now.toISOString().slice(0, 10);

      userMedications.forEach((medication) => {
        const reminderKey =
          `${medication.id}-${currentDay}-${currentTime}`;
        const medicationTime = normalizeTime(medication.intakeTime);

        if (
          medicationTime === currentTime &&
          !sentReminders.current.has(reminderKey)
        ) {
          new Notification("MediPervin – Medikamentenerinnerung", {
            body: `${medication.name} – ${medication.dosage}`,
          });

          sentReminders.current.add(reminderKey);
        }
      });
    }

    checkMedicationTimes();

    const intervalId = window.setInterval(
      checkMedicationTimes,
      30000
    );

    return () => {
      window.clearInterval(intervalId);
    };
  }, [userMedications]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function resetForm() {
    setFormData(emptyForm);
    setEditingId(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const normalizedTime = normalizeTime(formData.intakeTime);

    if (!normalizedTime) {
      setMessage("Bitte gib die Einnahmezeit im Format 13:00 ein.");
      return;
    }

    const medicationData = {
      ...formData,
      intakeTime: normalizedTime,
    };

    try {
      if (editingId) {
        await updateUserMedication(editingId, medicationData);
        setMessage("Die Änderungen wurden gespeichert.");
      } else {
        await addUserMedication(medicationData);
        setMessage("Medikament wurde gespeichert.");
      }

      resetForm();
    } catch {
      setMessage("Das Medikament konnte nicht gespeichert werden.");
    }
  }

  function handleEdit(medication) {
    setEditingId(medication.id);

    setFormData({
      name: medication.name || "",
      dosage: medication.dosage || "",
      intakeTime: normalizeTime(medication.intakeTime),
      notes: medication.notes || "",
    });

    setMessage("Du bearbeitest jetzt dieses Medikament.");
  }

  function handleCancelEdit() {
    resetForm();
    setMessage("Bearbeitung wurde abgebrochen.");
  }

  async function handleDelete(medicationId) {
    const shouldDelete = window.confirm(
      "Möchtest du dieses Medikament wirklich löschen?"
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteUserMedication(medicationId);

      if (editingId === medicationId) {
        resetForm();
      }

      setMessage("Medikament wurde gelöscht.");
    } catch {
      setMessage("Das Medikament konnte nicht gelöscht werden.");
    }
  }

  async function requestNotifications() {
    if (typeof Notification === "undefined") {
      setMessage(
        "Dieser Browser unterstützt keine Benachrichtigungen."
      );
      return;
    }

    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);

    if (permission === "granted") {
      setMessage("Benachrichtigungen wurden erlaubt.");
    } else {
      setMessage("Benachrichtigungen wurden nicht erlaubt.");
    }
  }

  function sendTestNotification() {
    if (
      typeof Notification === "undefined" ||
      Notification.permission !== "granted"
    ) {
      setMessage("Erlaube zuerst die Benachrichtigungen.");
      return;
    }

    new Notification("MediPervin – Test", {
      body: "Die Medikamentenerinnerung funktioniert.",
    });

    setMessage("Testbenachrichtigung wurde ausgelöst.");
  }

  return (
    <Box maxW="1200px" mx="auto" p="6">
      <Heading mb="4">Meine Medikamente</Heading>

      <Text mb="8">
        Hier kannst du deine persönlichen Medikamente und
        Einnahmezeiten verwalten.
      </Text>

      <Box
        borderWidth="1px"
        borderRadius="lg"
        background="white"
        padding="6"
        mb="8"
      >
        <Heading size="md" mb="4">
          Erinnerungen
        </Heading>

        <Stack direction={{ base: "column", md: "row" }} gap="3">
          <Button
            colorPalette="teal"
            onClick={requestNotifications}
          >
            Benachrichtigungen erlauben
          </Button>

          <Button
            variant="outline"
            onClick={sendTestNotification}
            disabled={notificationPermission !== "granted"}
          >
            Testbenachrichtigung senden
          </Button>
        </Stack>

        <Text mt="3" fontSize="sm">
          Status: {notificationPermission}
        </Text>
      </Box>

      <Box
        borderWidth="1px"
        borderRadius="lg"
        background="white"
        padding="6"
        mb="10"
      >
        <Heading size="md" mb="6">
          {editingId
            ? "Persönliches Medikament bearbeiten"
            : "Persönliches Medikament hinzufügen"}
        </Heading>

        <form onSubmit={handleSubmit}>
          <Stack gap="5">
            <Box>
              <Text as="label" htmlFor="name" display="block" mb="2">
                Name des Medikaments
              </Text>

              <Input
                id="name"
                name="name"
                placeholder="Zum Beispiel Ibuprofen"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Box>

            <Box>
              <Text as="label" htmlFor="dosage" display="block" mb="2">
                Dosierung laut deinem Medikamentenplan
              </Text>

              <Input
                id="dosage"
                name="dosage"
                placeholder="Zum Beispiel 400 mg"
                value={formData.dosage}
                onChange={handleChange}
                required
              />
            </Box>

            <Box>
              <Text
                as="label"
                htmlFor="intakeTime"
                display="block"
                mb="2"
              >
                Einnahmezeit
              </Text>

              <Input
                id="intakeTime"
                name="intakeTime"
                type="text"
                inputMode="numeric"
                placeholder="13:00"
                maxLength={8}
                value={formData.intakeTime}
                onChange={handleChange}
                onBlur={() =>
                  setFormData((previousData) => ({
                    ...previousData,
                    intakeTime: normalizeTime(previousData.intakeTime),
                  }))
                }
                required
              />
            </Box>

            <Box>
              <Text as="label" htmlFor="notes" display="block" mb="2">
                Persönliche Notiz
              </Text>

              <Textarea
                id="notes"
                name="notes"
                placeholder="Zum Beispiel: nach dem Frühstück"
                value={formData.notes}
                onChange={handleChange}
              />
            </Box>

            <Button type="submit" colorPalette="teal">
              {editingId
                ? "Änderungen speichern"
                : "Persönliches Medikament speichern"}
            </Button>

            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelEdit}
              >
                Bearbeitung abbrechen
              </Button>
            )}

            {message && <Text>{message}</Text>}
          </Stack>
        </form>
      </Box>

      <Heading size="lg" mb="6">
        Meine gespeicherten Medikamente
      </Heading>

      {isLoading && <Text>Medikamente werden geladen …</Text>}

      {error && <Text color="red.600">{error}</Text>}

      {!isLoading &&
        !error &&
        userMedications.length === 0 && (
          <Text>Du hast noch keine Medikamente gespeichert.</Text>
        )}

      <SimpleGrid minChildWidth="280px" gap="6">
        {userMedications.map((medication) => (
          <Box
            key={medication.id}
            borderWidth="1px"
            borderRadius="lg"
            background="white"
            padding="6"
          >
            <Heading size="md" mb="4">
              {medication.name}
            </Heading>

            <Text mb="2">
              <strong>Dosierung:</strong> {medication.dosage}
            </Text>

            <Text mb="2">
              <strong>Einnahmezeit:</strong>{" "}
              {normalizeTime(medication.intakeTime) || medication.intakeTime} Uhr
            </Text>

            <Text mb="5">
              <strong>Notiz:</strong>{" "}
              {medication.notes || "Keine Notiz"}
            </Text>

            <Stack direction={{ base: "column", sm: "row" }} gap="3">
              <Button
                colorPalette="teal"
                variant="outline"
                onClick={() => handleEdit(medication)}
              >
                Bearbeiten
              </Button>

              <Button
                colorPalette="red"
                variant="outline"
                onClick={() => handleDelete(medication.id)}
              >
                Löschen
              </Button>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default MyMedicationsPage;
