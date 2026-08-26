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
import { Link } from "react-router-dom";
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
    updateHealthEntry,
    deleteHealthEntry,
  } = useHealthEntries();
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [trendType, setTrendType] = useState("bloodPressure");
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
        myMedications: "Open my medications",
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
        saveChanges: "Save changes",
        edit: "Edit",
        cancel: "Cancel editing",
        editing: "You are editing this entry.",
        saving: "Saving …",
        saved: "Health entry was saved.",
        updated: "Health entry was updated.",
        saveError: "The health entry could not be saved.",
        invalid: "Please check the values and date.",
        entriesTitle: "My entries",
        trendTitle: "Progress by area",
        trendArea: "Area to display",
        exportPdf: "Save as PDF / print",
        email: "Send summary by email",
        reportEmpty: "Add at least one entry before creating a report.",
        reportTitle: "Doctor report",
        reportHint: "Create a printable PDF or send a summary by email.",
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
        myMedications: "Meine Medikamente öffnen",
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
        saveChanges: "Änderungen speichern",
        edit: "Bearbeiten",
        cancel: "Bearbeitung abbrechen",
        editing: "Du bearbeitest diesen Eintrag.",
        saving: "Wird gespeichert …",
        saved: "Gesundheitseintrag wurde gespeichert.",
        updated: "Gesundheitseintrag wurde geändert.",
        saveError: "Der Gesundheitseintrag konnte nicht gespeichert werden.",
        invalid: "Bitte überprüfe die Werte und das Datum.",
        entriesTitle: "Meine Einträge",
        trendTitle: "Verlauf nach Bereich",
        trendArea: "Bereich anzeigen",
        exportPdf: "Als PDF speichern / drucken",
        email: "Zusammenfassung per E-Mail",
        reportEmpty: "Füge zuerst mindestens einen Eintrag hinzu.",
        reportTitle: "Arztübersicht",
        reportHint: "Erstelle eine druckbare PDF-Datei oder sende eine Zusammenfassung per E-Mail.",
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
  const availableTrendTypes = Object.keys(entryTypes).filter((type) =>
    healthEntries.some((entry) => entry.type === type)
  );
  const selectedTrendType = availableTrendTypes.includes(trendType)
    ? trendType
    : availableTrendTypes[0];
  const trendEntries = healthEntries
    .filter((entry) => entry.type === selectedTrendType)
    .slice(0, 10);

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

  function getLocalDateTimeFromTimestamp(timestamp) {
    if (!timestamp?.toDate) {
      return getLocalDateTimeValue();
    }

    const date = timestamp.toDate();
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
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

  function getDisplayContext(entry) {
    if (entry.type !== "bloodSugar") {
      return entry.context || "";
    }

    const contextLabels = {
      fasting: isEnglish ? "Fasting" : "Nüchtern",
      beforeMeal: isEnglish ? "Before a meal" : "Vor einer Mahlzeit",
      afterMeal: isEnglish ? "After a meal" : "Nach einer Mahlzeit",
    };

    return contextLabels[entry.context] || entry.context || "";
  }

  function getTrendLabel(type) {
    return {
      bloodPressure: text.bloodPressure,
      bloodSugar: text.bloodSugar,
      pulse: text.pulse,
      weight: text.weight,
      oxygen: text.oxygen,
      temperature: text.temperature,
      symptom: text.symptom,
    }[type];
  }

  function handleEdit(entry) {
    setEditingId(entry.id);
    setFormData({
      type: entry.type,
      value: String(entry.value ?? ""),
      secondaryValue:
        entry.type === "bloodPressure"
          ? String(entry.secondaryValue ?? "")
          : "",
      unit: entry.unit || entryTypes[entry.type].unit,
      context: entry.context || "",
      notes: entry.notes || "",
      measuredAt: getLocalDateTimeFromTimestamp(entry.measuredAt),
    });
    showMessage(text.editing, "info");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setFormData({ ...emptyForm, measuredAt: getLocalDateTimeValue() });
    setMessage("");
    setMessageType("");
  }

  function getReportLines() {
    return healthEntries.map((entry) => {
      const context = entry.type === "bloodSugar" && entry.context
        ? ` (${getDisplayContext(entry)})`
        : "";

      return `${getDisplayName(entry)}: ${getDisplayValue(entry)}${context} – ${formatEntryDate(entry.measuredAt, isEnglish)}${entry.notes ? ` – ${entry.notes}` : ""}`;
    });
  }

  function handlePrint() {
    if (healthEntries.length === 0) {
      showMessage(text.reportEmpty, "error");
      return;
    }

    window.print();
  }

  function handleEmail() {
    if (healthEntries.length === 0) {
      showMessage(text.reportEmpty, "error");
      return;
    }

    const subject = encodeURIComponent(
      isEnglish ? "Curaelis health diary" : "Curaelis Gesundheitstagebuch"
    );
    const intro = isEnglish
      ? "My Curaelis health diary entries:\n\n"
      : "Meine Gesundheitstagebuch-Einträge aus Curaelis:\n\n";
    const body = encodeURIComponent(`${intro}${getReportLines().join("\n")}`);

    window.location.assign(`mailto:?subject=${subject}&body=${body}`);
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

    const entryData = {
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
    };

    try {
      if (editingId) {
        await updateHealthEntry(editingId, entryData);
        showMessage(text.updated, "success");
      } else {
        await addHealthEntry(entryData);
        showMessage(text.saved, "success");
      }

      setFormData({ ...emptyForm, measuredAt: getLocalDateTimeValue() });
      setEditingId(null);
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
    <Box
      className="health-diary-page"
      maxW="1100px"
      mx="auto"
      p={{ base: "5", md: "8" }}
    >
      <Box className="health-diary-print-area">
      <Box borderBottomWidth="1px" borderColor="teal.100" pb="5" mb="8">
        <Heading color="teal.900">{text.title}</Heading>
        <Text mt="3" maxW="760px" fontSize={{ base: "md", md: "lg" }}>
          {text.description}
        </Text>
        <Text mt="3" color="teal.800" fontWeight="600">
          🔒 {text.privacy}
        </Text>

        <Button
          as={Link}
          to="/meine-medikamente"
          marginTop="5"
          variant="outline"
          colorPalette="teal"
          size="lg"
        >
          💊 {text.myMedications}
        </Button>
      </Box>

      <Box
        className="health-diary-actions"
        borderWidth="1px"
        borderRadius="lg"
        background="white"
        padding={{ base: "5", md: "6" }}
        mb="8"
      >
        <Heading size="md" color="teal.900" mb="2">
          {text.reportTitle}
        </Heading>
        <Text mb="4">{text.reportHint}</Text>
        <Flex direction={{ base: "column", sm: "row" }} gap="3">
          <Button
            type="button"
            variant="outline"
            colorPalette="teal"
            onClick={handlePrint}
            disabled={healthEntries.length === 0}
          >
            🖨️ {text.exportPdf}
          </Button>
          <Button
            type="button"
            variant="outline"
            colorPalette="teal"
            onClick={handleEmail}
            disabled={healthEntries.length === 0}
          >
            ✉️ {text.email}
          </Button>
        </Flex>
      </Box>

      <Box
        className="health-diary-form"
        borderWidth="1px"
        borderRadius="lg"
        background="white"
        padding={{ base: "5", md: "7" }}
        boxShadow="sm"
        mb="8"
      >
        <Heading size="md" color="teal.900" mb="6">
          {editingId ? text.edit : text.addTitle}
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

            <Flex direction={{ base: "column", sm: "row" }} gap="3">
              <Button type="submit" colorPalette="teal" size="lg" disabled={isSaving}>
                {isSaving ? text.saving : editingId ? text.saveChanges : text.save}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" size="lg" onClick={handleCancelEdit}>
                  {text.cancel}
                </Button>
              )}
            </Flex>
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
        className="health-diary-warning"
        padding="4"
        mb="8"
        borderLeftWidth="4px"
        borderColor="orange.400"
        background="orange.50"
      >
        <Text fontWeight="700">{text.notMedicalAdvice}</Text>
      </Box>

      <Box>
        {availableTrendTypes.length > 0 && (
          <Box
            className="health-diary-trend"
            borderWidth="1px"
            borderRadius="lg"
            background="white"
            padding={{ base: "5", md: "6" }}
            mb="8"
          >
            <Heading size="md" color="teal.900" mb="4">
              {text.trendTitle}
            </Heading>
            <Text as="label" htmlFor="health-trend-type" display="block" mb="2">
              {text.trendArea}
            </Text>
            <select
              id="health-trend-type"
              value={selectedTrendType}
              onChange={(event) => setTrendType(event.target.value)}
              style={{ width: "100%", minHeight: "44px", padding: "8px", borderRadius: "6px" }}
            >
              {availableTrendTypes.map((type) => (
                <option key={type} value={type}>
                  {getTrendLabel(type)}
                </option>
              ))}
            </select>
            <Stack gap="3" mt="5">
              {trendEntries.map((entry) => (
                <Flex key={entry.id} justify="space-between" gap="4" wrap="wrap">
                  <Text>{formatEntryDate(entry.measuredAt, isEnglish)}</Text>
                  <Text fontWeight="700">{getDisplayValue(entry)}</Text>
                </Flex>
              ))}
            </Stack>
          </Box>
        )}

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
                      <Text mt="2">{getDisplayContext(entry)}</Text>
                    )}
                    <Text mt="2">{entry.notes || text.noNote}</Text>
                  </Box>
                  <Flex gap="3" direction={{ base: "column", sm: "row" }}>
                  <Button
                    className="health-diary-edit"
                    alignSelf={{ base: "stretch", sm: "flex-start" }}
                    variant="outline"
                    colorPalette="teal"
                    onClick={() => handleEdit(entry)}
                  >
                    {text.edit}
                  </Button>
                  <Button
                    className="health-diary-delete"
                    alignSelf={{ base: "stretch", sm: "flex-start" }}
                    variant="outline"
                    colorPalette="red"
                    onClick={() => handleDelete(entry.id)}
                  >
                    {text.delete}
                  </Button>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
      </Box>
    </Box>
  );
}

export default HealthDiaryPage;
