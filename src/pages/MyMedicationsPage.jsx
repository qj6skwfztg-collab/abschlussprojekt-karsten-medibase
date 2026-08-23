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
import useLanguage from "../hooks/useLanguage";

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
  const { isEnglish } = useLanguage();
  const {
    userMedications,
    isLoading,
    error,
    addUserMedication,
    updateUserMedication,
    deleteUserMedication,
  } = useUserMedications();

  const text = isEnglish
    ? {
        title: "My medications",
        description:
          "Here you can manage your personal medications and intake times.",
        reminders: "Reminders",
        allowNotifications: "Allow notifications",
        testNotification: "Send test notification",
        status: "Status",
        editTitle: "Edit personal medication",
        addTitle: "Add personal medication",
        name: "Medication name",
        namePlaceholder: "For example, ibuprofen",
        dosage: "Dosage according to your medication plan",
        dosagePlaceholder: "For example, 400 mg",
        intakeTime: "Intake time",
        notes: "Personal note",
        notesPlaceholder: "For example: after breakfast",
        saveChanges: "Save changes",
        save: "Save personal medication",
        cancel: "Cancel editing",
        savedHeading: "My saved medications",
        loading: "Loading medications …",
        empty: "You have not saved any medications yet.",
        dosageShort: "Dosage:",
        timeShort: "Intake time:",
        noteShort: "Note:",
        noNote: "No note",
        edit: "Edit",
        delete: "Delete",
        invalidTime: "Please enter the intake time in the format 13:00.",
        savedChanges: "The changes were saved.",
        saved: "Medication was saved.",
        saveError: "The medication could not be saved.",
        editing: "You are now editing this medication.",
        cancelled: "Editing was cancelled.",
        deleteConfirm: "Do you really want to delete this medication?",
        deleted: "Medication was deleted.",
        deleteError: "The medication could not be deleted.",
        unsupported: "This browser does not support notifications.",
        allowed: "Notifications were allowed.",
        notAllowed: "Notifications were not allowed.",
        allowFirst: "Allow notifications first.",
        testBody: "The medication reminder is working.",
        testTriggered: "Test notification was triggered.",
        reminderTitle: "MediPervin – Medication reminder",
        testTitle: "MediPervin – Test",
      }
    : {
        title: "Meine Medikamente",
        description:
          "Hier kannst du deine persönlichen Medikamente und Einnahmezeiten verwalten.",
        reminders: "Erinnerungen",
        allowNotifications: "Benachrichtigungen erlauben",
        testNotification: "Testbenachrichtigung senden",
        status: "Status",
        editTitle: "Persönliches Medikament bearbeiten",
        addTitle: "Persönliches Medikament hinzufügen",
        name: "Name des Medikaments",
        namePlaceholder: "Zum Beispiel Ibuprofen",
        dosage: "Dosierung laut deinem Medikamentenplan",
        dosagePlaceholder: "Zum Beispiel 400 mg",
        intakeTime: "Einnahmezeit",
        notes: "Persönliche Notiz",
        notesPlaceholder: "Zum Beispiel: nach dem Frühstück",
        saveChanges: "Änderungen speichern",
        save: "Persönliches Medikament speichern",
        cancel: "Bearbeitung abbrechen",
        savedHeading: "Meine gespeicherten Medikamente",
        loading: "Medikamente werden geladen …",
        empty: "Du hast noch keine Medikamente gespeichert.",
        dosageShort: "Dosierung:",
        timeShort: "Einnahmezeit:",
        noteShort: "Notiz:",
        noNote: "Keine Notiz",
        edit: "Bearbeiten",
        delete: "Löschen",
        invalidTime: "Bitte gib die Einnahmezeit im Format 13:00 ein.",
        savedChanges: "Die Änderungen wurden gespeichert.",
        saved: "Medikament wurde gespeichert.",
        saveError: "Das Medikament konnte nicht gespeichert werden.",
        editing: "Du bearbeitest jetzt dieses Medikament.",
        cancelled: "Bearbeitung wurde abgebrochen.",
        deleteConfirm: "Möchtest du dieses Medikament wirklich löschen?",
        deleted: "Medikament wurde gelöscht.",
        deleteError: "Das Medikament konnte nicht gelöscht werden.",
        unsupported: "Dieser Browser unterstützt keine Benachrichtigungen.",
        allowed: "Benachrichtigungen wurden erlaubt.",
        notAllowed: "Benachrichtigungen wurden nicht erlaubt.",
        allowFirst: "Erlaube zuerst die Benachrichtigungen.",
        testBody: "Die Medikamentenerinnerung funktioniert.",
        testTriggered: "Testbenachrichtigung wurde ausgelöst.",
        reminderTitle: "MediPervin – Medikamentenerinnerung",
        testTitle: "MediPervin – Test",
      };

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
          new Notification(text.reminderTitle, {
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
  }, [isEnglish, text.reminderTitle, userMedications]);

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
      setMessage(text.invalidTime);
      return;
    }

    const medicationData = {
      ...formData,
      intakeTime: normalizedTime,
    };

    try {
      if (editingId) {
        await updateUserMedication(editingId, medicationData);
        setMessage(text.savedChanges);
      } else {
        await addUserMedication(medicationData);
        setMessage(text.saved);
      }

      resetForm();
    } catch {
      setMessage(text.saveError);
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

    setMessage(text.editing);
  }

  function handleCancelEdit() {
    resetForm();
    setMessage(text.cancelled);
  }

  async function handleDelete(medicationId) {
    const shouldDelete = window.confirm(
      text.deleteConfirm
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteUserMedication(medicationId);

      if (editingId === medicationId) {
        resetForm();
      }

      setMessage(text.deleted);
    } catch {
      setMessage(text.deleteError);
    }
  }

  async function requestNotifications() {
    if (typeof Notification === "undefined") {
      setMessage(
        text.unsupported
      );
      return;
    }

    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);

    if (permission === "granted") {
      setMessage(text.allowed);
    } else {
      setMessage(text.notAllowed);
    }
  }

  function sendTestNotification() {
    if (
      typeof Notification === "undefined" ||
      Notification.permission !== "granted"
    ) {
      setMessage(text.allowFirst);
      return;
    }

    new Notification(text.testTitle, {
      body: text.testBody,
    });

    setMessage(text.testTriggered);
  }

  return (
    <Box maxW="1200px" mx="auto" p="6">
      <Heading mb="4">{text.title}</Heading>

      <Text mb="8">{text.description}</Text>

      <Box
        borderWidth="1px"
        borderRadius="lg"
        background="white"
        padding="6"
        mb="8"
      >
        <Heading size="md" mb="4">
          {text.reminders}
        </Heading>

        <Stack direction={{ base: "column", md: "row" }} gap="3">
          <Button
            colorPalette="teal"
            onClick={requestNotifications}
          >
            {text.allowNotifications}
          </Button>

          <Button
            variant="outline"
            onClick={sendTestNotification}
            disabled={notificationPermission !== "granted"}
          >
            {text.testNotification}
          </Button>
        </Stack>

        <Text mt="3" fontSize="sm">
          {text.status}: {notificationPermission}
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
            ? text.editTitle
            : text.addTitle}
        </Heading>

        <form onSubmit={handleSubmit}>
          <Stack gap="5">
            <Box>
              <Text as="label" htmlFor="name" display="block" mb="2">
                {text.name}
              </Text>

              <Input
                id="name"
                name="name"
                placeholder={text.namePlaceholder}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Box>

            <Box>
              <Text as="label" htmlFor="dosage" display="block" mb="2">
                {text.dosage}
              </Text>

              <Input
                id="dosage"
                name="dosage"
                placeholder={text.dosagePlaceholder}
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
                {text.intakeTime}
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
                {text.notes}
              </Text>

              <Textarea
                id="notes"
                name="notes"
                placeholder={text.notesPlaceholder}
                value={formData.notes}
                onChange={handleChange}
              />
            </Box>

            <Button type="submit" colorPalette="teal">
              {editingId
                ? text.saveChanges
                : text.save}
            </Button>

            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelEdit}
              >
                {text.cancel}
              </Button>
            )}

            {message && <Text>{message}</Text>}
          </Stack>
        </form>
      </Box>

      <Heading size="lg" mb="6">
        {text.savedHeading}
      </Heading>

      {isLoading && <Text>{text.loading}</Text>}

      {error && <Text color="red.600">{error}</Text>}

      {!isLoading &&
        !error &&
        userMedications.length === 0 && (
          <Text>{text.empty}</Text>
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
              <strong>{text.dosageShort}</strong> {medication.dosage}
            </Text>

            <Text mb="2">
              <strong>{text.timeShort}</strong>{" "}
              {normalizeTime(medication.intakeTime) || medication.intakeTime} Uhr
            </Text>

            <Text mb="5">
              <strong>{text.noteShort}</strong>{" "}
              {medication.notes || text.noNote}
            </Text>

            <Stack direction={{ base: "column", sm: "row" }} gap="3">
              <Button
                colorPalette="teal"
                variant="outline"
                onClick={() => handleEdit(medication)}
              >
                {text.edit}
              </Button>

              <Button
                colorPalette="red"
                variant="outline"
                onClick={() => handleDelete(medication.id)}
              >
                {text.delete}
              </Button>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default MyMedicationsPage;
