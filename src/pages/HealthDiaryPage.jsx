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
import useHealthEntries from "../hooks/useHealthEntries";
import useLanguage from "../hooks/useLanguage";

const entryTypes = {
  bloodPressure: {
    unit: "mmHg",
    valueLabelDe: "Oberer Wert (systolisch)",
    valueLabelEn: "Upper value (systolic)",
  },
  bloodSugar: {
    unit: "mg/dL",
    valueLabelDe: "Blutzuckerwert",
    valueLabelEn: "Blood glucose value",
  },
  pulse: {
    unit: "bpm",
    valueLabelDe: "Puls",
    valueLabelEn: "Pulse",
  },
  weight: {
    unit: "kg",
    valueLabelDe: "Gewicht",
    valueLabelEn: "Weight",
  },
  oxygen: {
    unit: "%",
    valueLabelDe: "Sauerstoffsättigung",
    valueLabelEn: "Oxygen saturation",
  },
  temperature: {
    unit: "°C",
    valueLabelDe: "Körpertemperatur",
    valueLabelEn: "Body temperature",
  },
  symptom: {
    unit: "0–10",
    valueLabelDe: "Stärke der Beschwerde",
    valueLabelEn: "Symptom severity",
  },
};

function getLocalDateTimeValue() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const localDate = new Date(now.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16);
}

const emptyForm = {
  type: "bloodPressure",
  value: "",
  secondaryValue: "",
  unit: "mmHg",
  context: "",
  notes: "",
  measuredAt: getLocalDateTimeValue(),
};

function formatEntryDate(timestamp, isEnglish) {
  if (!timestamp?.toDate) {
    return isEnglish ? "Date is being saved …" : "Datum wird gespeichert …";
  }

  return new Intl.DateTimeFormat(isEnglish ? "en-GB" : "de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(timestamp.toDate());
}

function HealthDiaryPage() {
  const { isEnglish } = useLanguage();
  const {
    healthEntries,
    isLoading,
    error,
    addHealthEntry,
    deleteHealthEntry,
  } = useHealthEntries();
  const [formData, setFormData] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const text = isEnglish
    ? {
        title: "Health diary",
        description:
          "Record important measurements, symptoms and medication-related observations in one place.",
        privacy:
          "These entries are private and can only be seen in your own account.",
        addTitle: "Add health entry",
        type: "What would you like to record?",
        bloodPressure: "Blood pressure",
        bloodSugar: "Blood glucose",
        pulse: "Pulse",
        weight: "Weight",
        oxygen: "Oxygen saturation",
        temperature: "Body temperature",
        symptom: "Symptom or discomfort",
        value: "Value",
        diastolic: "Lower value (diastolic)",
        glucoseUnit: "Blood glucose unit",
        context: "Timing / context",
        fasting: "Fasting",
        beforeMeal: "Before a meal",
        afterMeal: "After a meal",
        symptomName: "Symptom",
        symptomPlaceholder: "For example, dizziness",
        severity: "Severity from 0 to 10",
        measuredAt: "Date and time",
        notes: "Note",
        notesPlaceholder: "For example, after taking a medication",
        save: "Save entry",
        saving: "Saving …",
        saved: "Health entry was saved.",
        saveError: "The health entry could not be saved.",
        invalid: "Please check the values and date.",
        entriesTitle: "My entries",
        loading: "Loading entries …",
        empty: "You have not recorded any health data yet.",
        emptyHint: "Your saved measurements will appear here.",
        delete: "Delete",
        deleteConfirm: "Do you really want to delete this entry?",
        deleted: "Entry was deleted.",
        deleteError: "The entry could not be deleted.",
        noNote: "No note",
        noSymptom: "Symptom",
        notMedicalAdvice:
          "Curaelis documents your entries but does not diagnose illnesses. In an emergency, call the emergency services.",
      }
    : {
        title: "Gesundheitstagebuch",
        description:
          "Dokumentiere wichtige Messwerte, Beschwerden und Beobachtungen zu deinen Medikamenten an einem Ort.",
        privacy:
          "Diese Einträge sind privat und nur in deinem eigenen Konto sichtbar.",
        addTitle: "Gesundheitseintrag hinzufügen",
        type: "Was möchtest du eintragen?",
        bloodPressure: "Blutdruck",
        bloodSugar: "Blutzucker",
        pulse: "Puls",
        weight: "Gewicht",
        oxygen: "Sauerstoffsättigung",
        temperature: "Körpertemperatur",
        symptom: "Beschwerde oder Symptom",
        value: "Wert",
        diastolic: "Unterer Wert (diastolisch)",
        glucoseUnit: "Einheit des Blutzuckers",
        context: "Zeitpunkt / Zusammenhang",
        fasting: "Nüchtern",
        beforeMeal: "Vor einer Mahlzeit",
        afterMeal: "Nach einer Mahlzeit",
        symptomName: "Beschwerde",
        symptomPlaceholder: "Zum Beispiel Schwindel",
        severity: "Stärke von 0 bis 10",
        measuredAt: "Datum und Uhrzeit",
        notes: "Notiz",
        notesPlaceholder: "Zum Beispiel nach der Einnahme eines Medikaments",
        save: "Eintrag speichern",
        saving: "Wird gespeichert …",
        saved: "Gesundheitseintrag wurde gespeichert.",
        saveError: "Der Gesundheitseintrag konnte nicht gespeichert werden.",
        invalid: "Bitte überprüfe die Werte und das Datum.",
        entriesTitle: "Meine Einträge",
        loading: "Einträge werden geladen …",
        empty: "Du hast noch keine Gesundheitsdaten eingetragen.",
        emptyHint: "Deine gespeicherten Messwerte erscheinen hier.",
        delete: "Löschen",
        deleteConfirm: "Möchtest du diesen Eintrag wirklich löschen?",
        deleted: "Eintrag wurde gelöscht.",
        deleteError: "Der Eintrag konnte nicht gelöscht werden.",
        noNote: "Keine Notiz",
        noSymptom: "Beschwerde",
        notMedicalAdvice:
          "Curaelis dokumentiert deine Einträge, stellt aber keine Diagnosen. Rufe im Notfall den Rettungsdienst.",
      };

  const selectedType = entryTypes[formData.type];

  function showMessage(value, type) {
    setMessage(value);
    setMessageType(type);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
      ...(name === "type"
        ? {
            unit: entryTypes[value].unit,
            value: "",
            secondaryValue: "",
            context: "",
          }
        : {}),
    }));
  }

  function getDisplayName(entry) {
    if (entry.type === "bloodPressure") {
      return isEnglish ? "Blood pressure" : "Blutdruck";
    }

    if (entry.type === "bloodSugar") {
      return isEnglish ? "Blood glucose" : "Blutzucker";
    }

    if (entry.type === "pulse") return isEnglish ? "Pulse" : "Puls";
    if (entry.type === "weight") return isEnglish ? "Weight" : "Gewicht";
    if (entry.type === "oxygen") {
      return isEnglish ? "Oxygen saturation" : "Sauerstoffsättigung";
    }
    if (entry.type === "temperature") {
      return isEnglish ? "Body temperature" : "Körpertemperatur";
    }

    return entry.context || text.noSymptom;
  }

  function getDisplayValue(entry) {
    if (entry.type === "bloodPressure") {
      return `${entry.value} / ${entry.secondaryValue} ${entry.unit}`;
    }

    return `${entry.value} ${entry.unit}`;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setMessageType("");

    const measuredAt = new Date(formData.measuredAt);
    const value = Number(formData.value);
    const secondaryValue = Number(formData.secondaryValue || 0);

    if (
      !Number.isFinite(value) ||
      value < 0 ||
      !formData.measuredAt ||
      Number.isNaN(measuredAt.getTime()) ||
      (formData.type === "bloodPressure" &&
        (!Number.isFinite(secondaryValue) || secondaryValue <= 0))
    ) {
      showMessage(text.invalid, "error");
      return;
    }

    setIsSaving(true);

    try {
      await addHealthEntry({
        type: formData.type,
        value,
        secondaryValue,
        unit: formData.unit,
        context:
          formData.type === "symptom"
            ? formData.context.trim() || text.noSymptom
            : formData.context,
        notes: formData.notes,
        measuredAt,
      });

      setFormData({ ...emptyForm, measuredAt: getLocalDateTimeValue() });
      showMessage(text.saved, "success");
    } catch {
      showMessage(text.saveError, "error");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(entryId) {
    if (!window.confirm(text.deleteConfirm)) {
      return;
    }

    try {
      await deleteHealthEntry(entryId);
      showMessage(text.deleted, "success");
    } catch {
      showMessage(text.deleteError, "error");
    }
  }

  return (
    <Box maxW="1100px" mx="auto" p={{ base: "5", md: "8" }}>
      <Box borderBottomWidth="1px" borderColor="teal.100" pb="5" mb="8">
        <Heading color="teal.900">{text.title}</Heading>
        <Text mt="3" maxW="760px" fontSize={{ base: "md", md: "lg" }}>
          {text.description}
        </Text>
        <Text mt="3" color="teal.800" fontWeight="600">
          🔒 {text.privacy}
        </Text>
      </Box>

      <Box
        borderWidth="1px"
        borderRadius="lg"
        background="white"
        padding={{ base: "5", md: "7" }}
        boxShadow="sm"
        mb="8"
      >
        <Heading size="md" color="teal.900" mb="6">
          {text.addTitle}
        </Heading>

        <form onSubmit={handleSubmit}>
          <Stack gap="5">
            <Box>
              <Text as="label" htmlFor="health-type" display="block" mb="2" fontWeight="600">
                {text.type}
              </Text>
              <select
                id="health-type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                style={{ width: "100%", minHeight: "44px", padding: "8px", borderRadius: "6px" }}
              >
                <option value="bloodPressure">{text.bloodPressure}</option>
                <option value="bloodSugar">{text.bloodSugar}</option>
                <option value="pulse">{text.pulse}</option>
                <option value="weight">{text.weight}</option>
                <option value="oxygen">{text.oxygen}</option>
                <option value="temperature">{text.temperature}</option>
                <option value="symptom">{text.symptom}</option>
              </select>
            </Box>

            {formData.type === "symptom" ? (
              <SimpleGrid columns={{ base: 1, md: 2 }} gap="5">
                <Box>
                  <Text as="label" htmlFor="health-context" display="block" mb="2">
                    {text.symptomName}
                  </Text>
                  <Input
                    id="health-context"
                    name="context"
                    value={formData.context}
                    onChange={handleChange}
                    placeholder={text.symptomPlaceholder}
                    required
                  />
                </Box>
                <Box>
                  <Text as="label" htmlFor="health-value" display="block" mb="2">
                    {text.severity}
                  </Text>
                  <Input
                    id="health-value"
                    name="value"
                    type="number"
                    min="0"
                    max="10"
                    step="1"
                    value={formData.value}
                    onChange={handleChange}
                    required
                  />
                </Box>
              </SimpleGrid>
            ) : (
              <SimpleGrid columns={{ base: 1, md: formData.type === "bloodPressure" ? 2 : 1 }} gap="5">
                <Box>
                  <Text as="label" htmlFor="health-value" display="block" mb="2">
                    {selectedType[isEnglish ? "valueLabelEn" : "valueLabelDe"]}
                  </Text>
                  <Input
                    id="health-value"
                    name="value"
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.value}
                    onChange={handleChange}
                    required
                  />
                </Box>

                {formData.type === "bloodPressure" && (
                  <Box>
                    <Text as="label" htmlFor="health-secondary-value" display="block" mb="2">
                      {text.diastolic}
                    </Text>
                    <Input
                      id="health-secondary-value"
                      name="secondaryValue"
                      type="number"
                      min="0"
                      step="1"
                      value={formData.secondaryValue}
                      onChange={handleChange}
                      required
                    />
                  </Box>
                )}
              </SimpleGrid>
            )}

            {formData.type === "bloodSugar" && (
              <Box>
                <Text as="label" htmlFor="health-unit" display="block" mb="2">
                  {text.glucoseUnit}
                </Text>
                <select
                  id="health-unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  style={{ width: "100%", minHeight: "44px", padding: "8px", borderRadius: "6px" }}
                >
                  <option value="mg/dL">mg/dL</option>
                  <option value="mmol/L">mmol/L</option>
                </select>
              </Box>
            )}

            {formData.type === "bloodSugar" && (
              <Box>
                <Text as="label" htmlFor="health-context" display="block" mb="2">
                  {text.context}
                </Text>
                <select
                  id="health-context"
                  name="context"
                  value={formData.context}
                  onChange={handleChange}
                  style={{ width: "100%", minHeight: "44px", padding: "8px", borderRadius: "6px" }}
                >
                  <option value="">—</option>
                  <option value="fasting">{text.fasting}</option>
                  <option value="beforeMeal">{text.beforeMeal}</option>
                  <option value="afterMeal">{text.afterMeal}</option>
                </select>
              </Box>
            )}

            <SimpleGrid columns={{ base: 1, md: 2 }} gap="5">
              <Box>
                <Text as="label" htmlFor="health-measured-at" display="block" mb="2">
                  {text.measuredAt}
                </Text>
                <Input
                  id="health-measured-at"
                  name="measuredAt"
                  type="datetime-local"
                  value={formData.measuredAt}
                  onChange={handleChange}
                  required
                />
              </Box>
              <Box>
                <Text as="label" htmlFor="health-notes" display="block" mb="2">
                  {text.notes}
                </Text>
                <Textarea
                  id="health-notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder={text.notesPlaceholder}
                  maxLength={500}
                  rows={2}
                />
              </Box>
            </SimpleGrid>

            <Button type="submit" colorPalette="teal" size="lg" disabled={isSaving}>
              {isSaving ? text.saving : text.save}
            </Button>
          </Stack>
        </form>

        {message && (
          <Box
            mt="5"
            padding="4"
            borderRadius="md"
            background={messageType === "error" ? "red.50" : "green.50"}
            color={messageType === "error" ? "red.800" : "green.800"}
            borderWidth="1px"
            borderColor={messageType === "error" ? "red.200" : "green.200"}
            role="status"
          >
            {message}
          </Box>
        )}
      </Box>

      <Box
        padding="4"
        mb="8"
        borderLeftWidth="4px"
        borderColor="orange.400"
        background="orange.50"
      >
        <Text fontWeight="700">{text.notMedicalAdvice}</Text>
      </Box>

      <Box>
        <Heading size="md" color="teal.900" mb="5">
          {text.entriesTitle}
        </Heading>

        {error && <Text color="red.700" mb="4">{error}</Text>}
        {isLoading && <Text>{text.loading}</Text>}

        {!isLoading && healthEntries.length === 0 && (
          <Box padding="6" borderWidth="1px" borderRadius="lg" background="white">
            <Text fontWeight="700">{text.empty}</Text>
            <Text mt="2">{text.emptyHint}</Text>
          </Box>
        )}

        {!isLoading && healthEntries.length > 0 && (
          <Stack gap="4">
            {healthEntries.map((entry) => (
              <Box key={entry.id} padding="5" borderWidth="1px" borderRadius="lg" background="white" boxShadow="sm">
                <Flex direction={{ base: "column", sm: "row" }} justify="space-between" gap="4">
                  <Box>
                    <Heading size="sm" color="teal.900">
                      {getDisplayName(entry)}
                    </Heading>
                    <Text fontSize="2xl" fontWeight="700" mt="2">
                      {getDisplayValue(entry)}
                    </Text>
                    <Text color="gray.600" mt="1">
                      {formatEntryDate(entry.measuredAt, isEnglish)}
                    </Text>
                    {entry.type === "bloodSugar" && entry.context && (
                      <Text mt="2">{entry.context}</Text>
                    )}
                    <Text mt="2">{entry.notes || text.noNote}</Text>
                  </Box>
                  <Button
                    alignSelf={{ base: "stretch", sm: "flex-start" }}
                    variant="outline"
                    colorPalette="red"
                    onClick={() => handleDelete(entry.id)}
                  >
                    {text.delete}
                  </Button>
                </Flex>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default HealthDiaryPage;
