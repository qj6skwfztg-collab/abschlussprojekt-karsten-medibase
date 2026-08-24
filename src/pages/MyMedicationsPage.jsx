import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import useUserMedications from "../hooks/useUserMedications";
import useLanguage from "../hooks/useLanguage";
import MedicationReminderPermission from "../components/MedicationReminderPermission";

const emptyForm = {
  name: "",
  dosage: "",
  intakeTimes: [""],
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

function formatTimeInput(value) {
  const digits = String(value ?? "")
    .replace(/\D/g, "")
    .slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
}

function getMedicationTimes(medication) {
  const savedTimes = Array.isArray(medication.intakeTimes)
    ? medication.intakeTimes
    : [medication.intakeTime];

  const normalizedTimes = savedTimes
    .map((time) => normalizeTime(time))
    .filter(Boolean);

  return normalizedTimes.length > 0 ? normalizedTimes : [""];
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
        editTitle: "Edit personal medication",
        addTitle: "Add personal medication",
        name: "Medication name",
        namePlaceholder: "For example, ibuprofen",
        dosage: "Dosage according to your medication plan",
        dosagePlaceholder: "For example, 400 mg",
        intakeTime: "Intake times",
        timeHint: "You can enter 13:30 or simply 1330.",
        addTime: "Add another intake time",
        removeTime: "Remove",
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
        reminderSet: "Reminder times saved",
        emptyHint: "Use the form above to save your first personal medication.",
        edit: "Edit",
        delete: "Delete",
        invalidTime: "Please enter every intake time in the format 13:00.",
        duplicateTime: "Please enter each intake time only once.",
        savedChanges: "The changes were saved.",
        saved: "Medication was saved.",
        saveError: "The medication could not be saved.",
        editing: "You are now editing this medication.",
        cancelled: "Editing was cancelled.",
        deleteConfirm: "Do you really want to delete this medication?",
        deleted: "Medication was deleted.",
        deleteError: "The medication could not be deleted.",
      }
    : {
        title: "Meine Medikamente",
        description:
          "Hier kannst du deine persönlichen Medikamente und Einnahmezeiten verwalten.",
        reminders: "Erinnerungen",
        editTitle: "Persönliches Medikament bearbeiten",
        addTitle: "Persönliches Medikament hinzufügen",
        name: "Name des Medikaments",
        namePlaceholder: "Zum Beispiel Ibuprofen",
        dosage: "Dosierung laut deinem Medikamentenplan",
        dosagePlaceholder: "Zum Beispiel 400 mg",
        intakeTime: "Einnahmezeiten",
        timeHint: "Du kannst 13:30 oder einfach 1330 eingeben.",
        addTime: "Weitere Einnahmezeit hinzufügen",
        removeTime: "Entfernen",
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
        reminderSet: "Erinnerungszeiten gespeichert",
        emptyHint: "Nutze das Formular oben, um dein erstes persönliches Medikament zu speichern.",
        edit: "Bearbeiten",
        delete: "Löschen",
        invalidTime: "Bitte gib jede Einnahmezeit im Format 13:00 ein.",
        duplicateTime: "Bitte gib jede Einnahmezeit nur einmal ein.",
        savedChanges: "Die Änderungen wurden gespeichert.",
        saved: "Medikament wurde gespeichert.",
        saveError: "Das Medikament konnte nicht gespeichert werden.",
        editing: "Du bearbeitest jetzt dieses Medikament.",
        cancelled: "Bearbeitung wurde abgebrochen.",
        deleteConfirm: "Möchtest du dieses Medikament wirklich löschen?",
        deleted: "Medikament wurde gelöscht.",
        deleteError: "Das Medikament konnte nicht gelöscht werden.",
      };

  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  function showMessage(value, type) {
    setMessage(value);
    setMessageType(type);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleIntakeTimeChange(index, event) {
    setFormData((previousData) => ({
      ...previousData,
      intakeTimes: previousData.intakeTimes.map((time, timeIndex) =>
        timeIndex === index ? formatTimeInput(event.target.value) : time
      ),
    }));
  }

  function addIntakeTime() {
    setFormData((previousData) => ({
      ...previousData,
      intakeTimes: [...previousData.intakeTimes, ""],
    }));
  }

  function removeIntakeTime(index) {
    setFormData((previousData) => ({
      ...previousData,
      intakeTimes: previousData.intakeTimes.filter(
        (_, timeIndex) => timeIndex !== index
      ),
    }));
  }

  function resetForm() {
    setFormData(emptyForm);
    setEditingId(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setMessageType("");

    const normalizedTimes = formData.intakeTimes.map((time) =>
      normalizeTime(time)
    );

    if (normalizedTimes.length === 0 || normalizedTimes.some((time) => !time)) {
      showMessage(text.invalidTime, "error");
      return;
    }

    if (new Set(normalizedTimes).size !== normalizedTimes.length) {
      showMessage(text.duplicateTime, "error");
      return;
    }

    const medicationData = {
      ...formData,
      intakeTime: normalizedTimes[0],
      intakeTimes: normalizedTimes,
    };

    try {
      if (editingId) {
        await updateUserMedication(editingId, medicationData);
        showMessage(text.savedChanges, "success");
      } else {
        await addUserMedication(medicationData);
        showMessage(text.saved, "success");
      }

      resetForm();
    } catch {
      showMessage(text.saveError, "error");
    }
  }

  function handleEdit(medication) {
    setEditingId(medication.id);

    setFormData({
      name: medication.name || "",
      dosage: medication.dosage || "",
      intakeTimes: getMedicationTimes(medication),
      notes: medication.notes || "",
    });

    showMessage(text.editing, "info");
  }

  function handleCancelEdit() {
    resetForm();
    showMessage(text.cancelled, "info");
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

      showMessage(text.deleted, "success");
    } catch {
      showMessage(text.deleteError, "error");
    }
  }

  return (
    <Box maxW="1200px" mx="auto" p={{ base: "5", md: "8" }}>
      <Box
        borderBottomWidth="1px"
        borderColor="teal.100"
        paddingBottom="5"
        marginBottom="8"
      >
        <Heading color="teal.900">{text.title}</Heading>

        <Text marginTop="3" maxW="700px" fontSize={{ base: "md", md: "lg" }}>
          {text.description}
        </Text>
      </Box>

      <Box mb="8" boxShadow="sm">
        <MedicationReminderPermission />
      </Box>

      <Box
        borderWidth="1px"
        borderRadius="lg"
        background="white"
        padding="6"
        boxShadow="sm"
        mb="10"
      >
        <Heading size="md" color="teal.900" mb="6">
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
              <Text display="block" mb="2" fontWeight="600">
                {text.intakeTime}
              </Text>

              <Stack gap="3">
                {formData.intakeTimes.map((time, index) => {
                  const inputId = `intakeTime-${index}`;

                  return (
                    <Flex
                      key={inputId}
                      direction={{ base: "column", sm: "row" }}
                      align={{ base: "stretch", sm: "flex-end" }}
                      gap="3"
                    >
                      <Box flex="1" width="100%">
                        {formData.intakeTimes.length > 1 && (
                          <Text
                            as="label"
                            htmlFor={inputId}
                            display="block"
                            mb="2"
                            fontSize="sm"
                            fontWeight="600"
                          >
                            {text.intakeTime} {index + 1}
                          </Text>
                        )}

                        <Input
                          id={inputId}
                          type="text"
                          inputMode="numeric"
                          placeholder="13:00"
                          maxLength={8}
                          value={time}
                          onChange={(event) =>
                            handleIntakeTimeChange(index, event)
                          }
                          onBlur={() =>
                            setFormData((previousData) => ({
                              ...previousData,
                              intakeTimes: previousData.intakeTimes.map(
                                (currentTime, timeIndex) =>
                                  timeIndex === index
                                    ? normalizeTime(currentTime) || currentTime
                                    : currentTime
                              ),
                            }))
                          }
                        />
                      </Box>

                      {formData.intakeTimes.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          colorPalette="red"
                          onClick={() => removeIntakeTime(index)}
                        >
                          {text.removeTime}
                        </Button>
                      )}
                    </Flex>
                  );
                })}

                <Button
                  type="button"
                  variant="outline"
                  colorPalette="teal"
                  onClick={addIntakeTime}
                  disabled={formData.intakeTimes.length >= 8}
                >
                  + {text.addTime}
                </Button>
              </Stack>

              <Text marginTop="2" fontSize="sm" color="gray.600">
                {text.timeHint}
              </Text>
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

            {message && (
              <Box
                role={messageType === "error" ? "alert" : "status"}
                aria-live="polite"
                background={messageType === "error" ? "red.50" : "teal.50"}
                borderLeftWidth="4px"
                borderColor={messageType === "error" ? "red.500" : "teal.500"}
                padding="3"
                borderRadius="md"
              >
                <Text
                  fontWeight="600"
                  color={messageType === "error" ? "red.800" : "teal.900"}
                >
                  {message}
                </Text>
              </Box>
            )}
          </Stack>
        </form>
      </Box>

      <Box marginBottom="6">
        <Heading size="lg" color="teal.900">
          {text.savedHeading}
        </Heading>
      </Box>

      {isLoading && <Text>{text.loading}</Text>}

      {error && <Text color="red.600">{error}</Text>}

      {!isLoading &&
        !error &&
        userMedications.length === 0 && (
          <Box
            role="status"
            background="teal.50"
            borderLeftWidth="4px"
            borderColor="teal.500"
            padding="4"
            borderRadius="md"
            marginBottom="6"
          >
            <Text fontWeight="700" color="teal.900">
              {text.empty}
            </Text>
            <Text marginTop="2">{text.emptyHint}</Text>
          </Box>
        )}

      <SimpleGrid minChildWidth="280px" gap="6">
        {userMedications.map((medication) => (
          <MedicationCard
            key={medication.id}
            medication={medication}
            text={text}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

function MedicationCard({ medication, text, onEdit, onDelete }) {
  const medicationTimes = getMedicationTimes(medication);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.200"
      background="white"
      padding={{ base: "5", md: "6" }}
      boxShadow="sm"
    >
    <Flex
      direction={{ base: "column", sm: "row" }}
      align={{ base: "flex-start", sm: "center" }}
      justify="space-between"
      gap="3"
      mb="5"
    >
      <Heading size="md" color="teal.900">
        {medication.name}
      </Heading>

      <Box
        as="span"
        flexShrink="0"
        background="teal.50"
        color="teal.900"
        borderRadius="full"
        paddingX="3"
        paddingY="1"
        fontSize="sm"
        fontWeight="700"
      >
        ✓ {text.reminderSet}
      </Box>
    </Flex>

    <Box
      background="teal.50"
      borderLeftWidth="4px"
      borderColor="teal.500"
      borderRadius="md"
      padding="4"
      mb="4"
    >
      <Text fontSize="sm" fontWeight="700" color="teal.800">
        {text.timeShort}
      </Text>

      <SimpleGrid
        columns={{ base: 1, sm: 2 }}
        gap="2"
        marginTop="2"
      >
        {medicationTimes.map((time, index) => (
          <Box
            key={`${medication.id}-${time}-${index}`}
            background="white"
            borderRadius="md"
            paddingX="3"
            paddingY="2"
          >
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="800"
              color="teal.900"
            >
              {time} Uhr
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>

    <Text mb="3">
      <strong>{text.dosageShort}</strong> {medication.dosage}
    </Text>

    <Box
      background="gray.50"
      borderRadius="md"
      padding="3"
      mb="5"
    >
      <Text>
        <strong>{text.noteShort}</strong>{" "}
        {medication.notes || text.noNote}
      </Text>
    </Box>

    <Stack direction={{ base: "column", sm: "row" }} gap="3">
      <Button
        colorPalette="teal"
        variant="outline"
        size="lg"
        flex="1"
        onClick={() => onEdit(medication)}
      >
        {text.edit}
      </Button>

      <Button
        colorPalette="red"
        variant="outline"
        size="lg"
        flex="1"
        onClick={() => onDelete(medication.id)}
      >
        {text.delete}
      </Button>
    </Stack>
    </Box>
  );
}

export default MyMedicationsPage;
