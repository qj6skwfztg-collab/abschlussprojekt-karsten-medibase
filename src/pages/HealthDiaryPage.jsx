import { useEffect, useRef, useState } from "react";
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
import { Link, useLocation } from "react-router-dom";
import useHealthEntries from "../hooks/useHealthEntries";
import useUserMedications from "../hooks/useUserMedications";
import useEmergencyProfile from "../hooks/useEmergencyProfile";
import useLanguage from "../hooks/useLanguage";
import HealthTimeline from "../components/HealthTimeline";

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
  medicationId: "",
  measuredAt: getLocalDateTimeValue(),
};

const DOCTOR_EMAIL_STORAGE_KEY = "curaelis-doctor-email";

function formatEntryDate(timestamp, isEnglish) {
  if (!timestamp?.toDate) {
    return isEnglish ? "Date is being saved …" : "Datum wird gespeichert …";
  }

  return new Intl.DateTimeFormat(isEnglish ? "en-GB" : "de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(timestamp.toDate());
}

const metricVisuals = {
  bloodPressure: { icon: "BP", color: "#0f766e" },
  bloodSugar: { icon: "GL", color: "#2563eb" },
  pulse: { icon: "♥", color: "#db2777" },
  weight: { icon: "KG", color: "#7c3aed" },
  oxygen: { icon: "O₂", color: "#0891b2" },
  temperature: { icon: "°", color: "#ea580c" },
  symptom: { icon: "!", color: "#ca8a04" },
};

function getTimestampDate(timestamp) {
  if (timestamp?.toDate) {
    return timestamp.toDate();
  }

  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? null : date;
}

function HealthTrendChart({ entries, type, isEnglish, text }) {
  const plottedEntries = entries
    .filter((entry) => entry.type === type)
    .slice(0, 12)
    .reverse();

  if (plottedEntries.length === 0) {
    return null;
  }

  const isBloodPressure = type === "bloodPressure";
  const series = isBloodPressure
    ? [
        { key: "value", label: text.systolic, color: "#0f766e" },
        { key: "secondaryValue", label: text.diastolicShort, color: "#f59e0b" },
      ]
    : [{ key: "value", label: text.value, color: "#0f766e" }];
  const values = series.flatMap(({ key }) =>
    plottedEntries
      .map((entry) => Number(entry[key]))
      .filter((value) => Number.isFinite(value))
  );
  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);
  const range = Math.max(dataMax - dataMin, 1);
  const min = Math.max(0, dataMin - range * 0.15);
  const max = dataMax + range * 0.15;
  const width = 760;
  const height = 280;
  const padding = { top: 24, right: 20, bottom: 42, left: 56 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const xFor = (index) =>
    padding.left +
    (plottedEntries.length === 1
      ? plotWidth / 2
      : (index / (plottedEntries.length - 1)) * plotWidth);
  const yFor = (value) =>
    padding.top + ((max - value) / (max - min)) * plotHeight;
  const tickValues = Array.from({ length: 4 }, (_, index) =>
    max - ((max - min) / 3) * index
  );
  const formatAxisValue = (value) =>
    Number.isInteger(value) ? String(value) : value.toFixed(1);
  const formatAxisDate = (entry) => {
    const date = getTimestampDate(entry.measuredAt);
    if (!date) return "—";

    return new Intl.DateTimeFormat(isEnglish ? "en-GB" : "de-DE", {
      day: "2-digit",
      month: "2-digit",
    }).format(date);
  };
  const latestEntry = plottedEntries[plottedEntries.length - 1];
  const latestValue = isBloodPressure
    ? `${latestEntry.value}/${latestEntry.secondaryValue}`
    : latestEntry.value;
  const latestUnit = latestEntry.unit || entryTypes[type].unit;
  const dateLabelIndexes = new Set([
    0,
    Math.floor((plottedEntries.length - 1) / 2),
    plottedEntries.length - 1,
  ]);

  return (
    <Box className="health-trend-chart" aria-label={text.trendTitle}>
      <Flex className="health-trend-chart-topline" align="center" justify="space-between" gap="4" wrap="wrap" mb="3">
        <Flex className="health-trend-legend" gap="4" wrap="wrap">
          {series.map((item) => (
            <Flex key={item.key} align="center" gap="2" fontSize="sm" fontWeight="600">
              <Box className="health-trend-legend-dot" background={item.color} />
              <Text>{item.label}</Text>
            </Flex>
          ))}
          <Text color="gray.500" fontSize="sm">
            {text.lastEntries.replace("{count}", String(plottedEntries.length))}
          </Text>
        </Flex>
        <Box className="health-trend-latest">
          <Text className="health-trend-latest-label">{text.latest}</Text>
          <Text className="health-trend-latest-value">
            {latestValue} <Text as="span" className="health-trend-latest-unit">{latestUnit}</Text>
          </Text>
        </Box>
      </Flex>
      <Box overflowX="auto">
        <svg
          className="health-trend-svg"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${text.trendTitle}: ${text.trendArea}`}
        >
          <defs>
            <linearGradient id={`health-trend-fill-${type}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#319795" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#319795" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {tickValues.map((tick, index) => {
            const y = padding.top + (index / 3) * plotHeight;

            return (
              <g key={tick}>
                <line
                  x1={padding.left}
                  x2={width - padding.right}
                  y1={y}
                  y2={y}
                  stroke="#d9e8e7"
                  strokeDasharray="4 6"
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="health-trend-axis-label"
                >
                  {formatAxisValue(tick)}
                </text>
              </g>
            );
          })}
          {series.map((item) => {
            const points = plottedEntries
              .map((entry, index) => {
                const value = Number(entry[item.key]);
                return Number.isFinite(value) ? `${xFor(index)},${yFor(value)}` : null;
              })
              .filter(Boolean)
              .join(" ");
            const areaPoints = `${xFor(0)},${padding.top + plotHeight} ${points} ${xFor(plottedEntries.length - 1)},${padding.top + plotHeight}`;

            return (
              <g key={item.key}>
                {!isBloodPressure && item.key === "value" && (
                  <polygon points={areaPoints} fill={`url(#health-trend-fill-${type})`} />
                )}
                <polyline
                  points={points}
                  fill="none"
                  stroke={item.color}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {plottedEntries.map((entry, index) => {
                  const value = Number(entry[item.key]);
                  if (!Number.isFinite(value)) return null;

                  return (
                    <circle
                      key={`${item.key}-${entry.id}`}
                      cx={xFor(index)}
                      cy={yFor(value)}
                      r="5"
                      fill="#ffffff"
                      stroke={item.color}
                      strokeWidth="3"
                    />
                  );
                })}
              </g>
            );
          })}
          {plottedEntries.map((entry, index) =>
            dateLabelIndexes.has(index) ? (
              <text
                key={`date-${entry.id}`}
                x={xFor(index)}
                y={height - 12}
                textAnchor="middle"
                className="health-trend-axis-label"
              >
                {formatAxisDate(entry)}
              </text>
            ) : null
          )}
        </svg>
      </Box>
    </Box>
  );
}

function HealthDiaryPage() {
  const { isEnglish } = useLanguage();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const onboardingFocus = searchParams.get("focus");
  const isOnboarding =
    searchParams.get("from") === "einrichtung" ||
    Boolean(location.state?.fromOnboarding);
  const {
    healthEntries,
    isLoading,
    error,
    addHealthEntry,
    updateHealthEntry,
    deleteHealthEntry,
  } = useHealthEntries();
  const { userMedications } = useUserMedications();
  const { profile } = useEmergencyProfile();
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [trendType, setTrendType] = useState("bloodPressure");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showOnboardingContinue, setShowOnboardingContinue] = useState(false);
  const [printMessage, setPrintMessage] = useState("");
  const [pdfDownloadInfo, setPdfDownloadInfo] = useState(false);
  const [emailFallbackUrl, setEmailFallbackUrl] = useState("");
  const healthFormRef = useRef(null);
  const reportFileInputRef = useRef(null);
  const [reportFiles, setReportFiles] = useState([]);
  const [reportOptions, setReportOptions] = useState({
    health: true,
    medications: true,
    emergencyProfile: false,
  });
  const [doctorEmail, setDoctorEmail] = useState(
    () => localStorage.getItem(DOCTOR_EMAIL_STORAGE_KEY) || ""
  );

  useEffect(() => {
    const targetId = onboardingFocus === "health" || onboardingFocus === "doctor-email"
      ? onboardingFocus === "health" ? "health-entry-form" : "doctor-email"
      : location.hash === "#doctor-email" ? "doctor-email" : null;

    if (!targetId) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      const target = document.getElementById(targetId);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });

      if (targetId === "doctor-email") {
        window.setTimeout(() => target?.focus(), 350);
      }
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [location.hash, onboardingFocus]);

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
        saveChanges: "Save changes",
        edit: "Edit",
        cancel: "Cancel editing",
        editing: "You are editing this entry.",
        saving: "Saving …",
        saved: "Health entry was saved.",
        updated: "Health entry was updated.",
        saveError: "The health entry could not be saved.",
        invalid: "Please check the values and date.",
        invalidBloodPressure: "Please enter a valid blood pressure. The upper value must be greater than the lower value.",
        entriesTitle: "My entries",
        trendTitle: "Progress by area",
        trendArea: "Area to display",
        overviewTitle: "Your health snapshot",
        overviewHint: "A clear view of your latest saved measurements.",
        latest: "Latest",
        records: "{count} records",
        lastEntries: "Last {count} measurements",
        systolic: "Systolic",
        diastolicShort: "Diastolic",
        exportPdf: "Create PDF",
        email: "Send email to doctor's practice",
        shareContacts: "Share PDF + files",
        reportContents: "Contents of the doctor package",
        reportHealth: "Health diary entries and trend",
        reportMedications: "My current medication plan",
        reportEmergencyProfile: "Emergency pass details",
        reportNoSelection: "Select at least one section for the doctor package.",
        timelineTitle: "Your health timeline",
        timelineHint: "Measurements and medication starts together in chronological order.",
        timelineCount: "{count} timeline entries",
        timelineMeasurement: "Measurement",
        timelineMedication: "Medication plan",
        timelineLinkedMedication: "Linked medication: {name}",
        linkedMedication: "Related medication (optional)",
        noMedicationLink: "No medication selected",
        openMedications: "Open / edit medications",
        doctorEmail: "Email address of doctor's practice (optional)",
        doctorEmailPlaceholder: "practice@example.com",
        doctorEmailHint:
          "Saved only on this device. Enter it once on each device and check the address before sending.",
        emailMissing: "Please enter the doctor's practice email address first.",
        emailInvalid: "Please check the email address.",
        emailAttachmentNote:
          "Please attach the PDF you saved or printed from Curaelis.",
        reportEmpty: "Add at least one entry before creating a report.",
        reportTitle: "Doctor report",
        reportHint:
          "Create a clear PDF for a medical appointment. Then choose whether to open an email to the practice or share the PDF and additional files.",
        attachFiles: "Attach files",
        filesSelected: "Selected files",
        fileHint: "Choose photos or documents from your phone. They stay on this device until you share them.",
        shareFilesHint: "On a phone, use “Share PDF / send by email” to include the selected files.",
        pdfCreating: "The PDF is being created …",
        pdfSaved: "The PDF was created. On a computer it is usually saved to Downloads. On iPhone, choose Save to Files in the share menu.",
        pdfLocation: "File: {fileName}. On a computer it is usually in Downloads. On iPhone, it is saved wherever you choose in Files.",
        pdfError: "The PDF could not be created. Please try again.",
        sharePdf: "Share PDF + files",
        emailOpening: "Opening your email app …",
        emailOpened: "The email app should now be open. Attach the saved PDF before sending.",
        emailFallback: "If your email app does not open, please check that an email app is installed and set up on this device.",
        emailRetry: "Open email app again",
        emailCopy: "Copy practice address",
        emailCopied: "Practice address copied.",
        shareCancelled: "Sharing was cancelled. Your PDF is still available to save or share.",
        shareUnsupported:
          "No sharing app is available here. Download the PDF and attach it manually in your email app.",
        shareReady:
          "The share menu was opened. Choose your email app and check the data before sending.",
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
        saveChanges: "Änderungen speichern",
        edit: "Bearbeiten",
        cancel: "Bearbeitung abbrechen",
        editing: "Du bearbeitest diesen Eintrag.",
        saving: "Wird gespeichert …",
        saved: "Gesundheitseintrag wurde gespeichert.",
        updated: "Gesundheitseintrag wurde geändert.",
        saveError: "Der Gesundheitseintrag konnte nicht gespeichert werden.",
        invalid: "Bitte überprüfe die Werte und das Datum.",
        invalidBloodPressure: "Bitte gib einen gültigen Blutdruck ein. Der obere Wert muss größer sein als der untere Wert.",
        entriesTitle: "Meine Einträge",
        trendTitle: "Verlauf nach Bereich",
        trendArea: "Bereich anzeigen",
        overviewTitle: "Deine Gesundheitsübersicht",
        overviewHint: "Deine zuletzt gespeicherten Messwerte auf einen Blick.",
        latest: "Zuletzt",
        records: "{count} Einträge",
        lastEntries: "Letzte {count} Messungen",
        systolic: "Systolisch",
        diastolicShort: "Diastolisch",
        exportPdf: "PDF erstellen",
        email: "E-Mail an Arztpraxis senden",
        shareContacts: "PDF + Dateien teilen",
        reportContents: "Inhalte des Arztpakets",
        reportHealth: "Gesundheitstagebuch und Verlauf",
        reportMedications: "Mein aktueller Medikamentenplan",
        reportEmergencyProfile: "Angaben aus dem Notfallpass",
        reportNoSelection: "Wähle mindestens einen Bereich für das Arztpaket aus.",
        timelineTitle: "Deine Gesundheits-Zeitleiste",
        timelineHint: "Messwerte und Medikamentenstarts gemeinsam chronologisch geordnet.",
        timelineCount: "{count} Zeitleisten-Einträge",
        timelineMeasurement: "Messwert",
        timelineMedication: "Medikamentenplan",
        timelineLinkedMedication: "Verknüpftes Medikament: {name}",
        linkedMedication: "Zugehöriges Medikament (optional)",
        noMedicationLink: "Kein Medikament ausgewählt",
        openMedications: "Medikamente öffnen / bearbeiten",
        doctorEmail: "E-Mail-Adresse der Arztpraxis (optional)",
        doctorEmailPlaceholder: "praxis@beispiel.de",
        doctorEmailHint:
          "Wird nur auf diesem Gerät gespeichert. Auf jedem Gerät einmal eintragen und vor dem Versand prüfen.",
        emailMissing: "Gib zuerst die E-Mail-Adresse der Arztpraxis ein.",
        emailInvalid: "Bitte überprüfe die E-Mail-Adresse.",
        emailAttachmentNote:
          "Bitte füge die zuvor gespeicherte oder gedruckte PDF aus Curaelis als Anhang hinzu.",
        reportEmpty: "Füge zuerst mindestens einen Eintrag hinzu.",
        reportTitle: "Arztübersicht",
        reportHint:
          "Erstelle eine übersichtliche PDF für den Arzttermin. Danach kannst du eine Mail an die Praxis öffnen oder die PDF zusammen mit zusätzlichen Dateien teilen.",
        attachFiles: "Dateien anfügen",
        filesSelected: "Ausgewählte Dateien",
        fileHint: "Wähle Bilder oder Dokumente vom Handy aus. Sie bleiben auf diesem Gerät, bis du sie teilst.",
        shareFilesHint: "Auf dem Handy nutzt du anschließend „PDF teilen / per E-Mail senden“, damit die Dateien mitgegeben werden.",
        pdfCreating: "Die PDF wird erstellt …",
        pdfSaved: "Die PDF wurde erstellt. Am PC liegt sie normalerweise im Ordner Downloads. Auf dem iPhone wählst du im Teilen-Menü „In Dateien sichern“.",
        pdfLocation: "Datei: {fileName}. Am PC liegt sie normalerweise im Ordner Downloads. Auf dem iPhone liegt sie dort, wo du sie in Dateien sicherst.",
        pdfError: "Die PDF konnte nicht erstellt werden. Bitte versuche es erneut.",
        sharePdf: "PDF + Dateien teilen",
        emailOpening: "Die Mail-App wird geöffnet …",
        emailOpened: "Die Mail-App sollte jetzt geöffnet sein. Füge die gespeicherte PDF vor dem Senden als Anhang hinzu.",
        emailFallback: "Wenn sich die Mail-App nicht öffnet, prüfe bitte, ob eine Mail-App auf diesem Gerät installiert und eingerichtet ist.",
        emailRetry: "Mail-App erneut öffnen",
        emailCopy: "Praxisadresse kopieren",
        emailCopied: "Praxisadresse wurde kopiert.",
        shareCancelled: "Das Teilen wurde abgebrochen. Deine PDF kann weiterhin gespeichert oder geteilt werden.",
        shareUnsupported:
          "Hier ist keine Teilen-App verfügbar. Lade die PDF herunter und füge sie anschließend manuell in deiner Mail-App an.",
        shareReady:
          "Das Teilen-Menü wurde geöffnet. Wähle deine Mail-App und prüfe die Daten vor dem Senden.",
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
  const hasEmergencyProfileData = Object.entries(profile).some(
    ([key, value]) => key !== "updatedAt" && typeof value === "string" && value.trim()
  );
  const hasReportSelection =
    reportOptions.health || reportOptions.medications || reportOptions.emergencyProfile;
  const hasReportData =
    (reportOptions.health && healthEntries.length > 0) ||
    (reportOptions.medications && userMedications.length > 0) ||
    (reportOptions.emergencyProfile && hasEmergencyProfileData);

  function getOverviewValue(type) {
    const latestEntry = healthEntries.find((entry) => entry.type === type);
    if (!latestEntry) return "—";

    return latestEntry.type === "bloodPressure"
      ? `${latestEntry.value}/${latestEntry.secondaryValue}`
      : String(latestEntry.value);
  }

  function getOverviewUnit(type) {
    const latestEntry = healthEntries.find((entry) => entry.type === type);
    return latestEntry?.unit || entryTypes[type].unit;
  }

  function showMessage(value, type) {
    setMessage(value);
    setMessageType(type);
  }

  function handleDoctorEmailChange(event) {
    const value = event.target.value;

    setDoctorEmail(value);
    localStorage.setItem(DOCTOR_EMAIL_STORAGE_KEY, value);
  }

  function focusDoctorEmailField() {
    const field = document.getElementById("doctor-email");

    field?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => field?.focus(), 350);
  }

  function handleReportFilesChange(event) {
    setReportFiles(Array.from(event.target.files || []));
  }

  function handleReportOptionChange(event) {
    const { name, checked } = event.target;
    setReportOptions((previousOptions) => ({
      ...previousOptions,
      [name]: checked,
    }));
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
      medicationId: entry.medicationId || "",
      measuredAt: getLocalDateTimeFromTimestamp(entry.measuredAt),
    });
    showMessage(text.editing, "info");
    window.requestAnimationFrame(() => {
      healthFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById("health-value")?.focus({ preventScroll: true });
    });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setFormData({ ...emptyForm, measuredAt: getLocalDateTimeValue() });
    setMessage("");
    setMessageType("");
  }

  function getReportLines() {
    const lines = [];

    if (reportOptions.medications) {
      lines.push(isEnglish ? "CURRENT MEDICATION PLAN" : "AKTUELLER MEDIKAMENTENPLAN");
      if (userMedications.length === 0) {
        lines.push(isEnglish ? "No personal medications saved." : "Keine persönlichen Medikamente gespeichert.");
      } else {
        userMedications.forEach((medication) => {
          const intakeTimes = Array.isArray(medication.intakeTimes)
            ? medication.intakeTimes.join(", ")
            : medication.intakeTime || "";
          lines.push(`${medication.name}: ${medication.dosage}${intakeTimes ? ` – ${intakeTimes}` : ""}${medication.notes ? ` – ${medication.notes}` : ""}`);
        });
      }
    }

    if (reportOptions.emergencyProfile) {
      lines.push(isEnglish ? "EMERGENCY PASS DETAILS" : "ANGABEN AUS DEM NOTFALLPASS");
      const profileLines = [
        [isEnglish ? "Allergies" : "Allergien", profile.allergies],
        [isEnglish ? "Important conditions" : "Wichtige Erkrankungen", profile.conditions],
        [isEnglish ? "Blood group" : "Blutgruppe", profile.bloodGroup],
        [isEnglish ? "Special notes" : "Besondere Hinweise", profile.specialNotes],
      ].filter(([, value]) => value?.trim());

      if (profileLines.length === 0) {
        lines.push(isEnglish ? "No additional emergency details saved." : "Keine zusätzlichen Notfallangaben gespeichert.");
      } else {
        profileLines.forEach(([label, value]) => lines.push(`${label}: ${value}`));
      }
    }

    if (reportOptions.health) {
      lines.push(isEnglish ? "HEALTH DIARY ENTRIES" : "GESUNDHEITSTAGEBUCH-EINTRÄGE");
      healthEntries.forEach((entry) => {
        const context = entry.type === "bloodSugar" && entry.context
          ? ` (${getDisplayContext(entry)})`
          : "";
        const linkedMedication = userMedications.find(
          (medication) => medication.id === entry.medicationId
        );

        lines.push(`${getDisplayName(entry)}: ${getDisplayValue(entry)}${context} – ${formatEntryDate(entry.measuredAt, isEnglish)}${linkedMedication ? ` – ${isEnglish ? "Medication" : "Medikament"}: ${linkedMedication.name}` : ""}${entry.notes ? ` – ${entry.notes}` : ""}`);
      });
    }

    return lines;
  }

  function getReportFileName() {
    return `curaelis-arztuebersicht-${new Date().toISOString().slice(0, 10)}.pdf`;
  }

  async function createReportPdf() {
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 16;
    const textWidth = pageWidth - margin * 2;
    let yPosition = 20;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text(text.reportTitle, margin, yPosition);
    yPosition += 8;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text(
      isEnglish ? "Curaelis health diary" : "Curaelis Gesundheitstagebuch",
      margin,
      yPosition
    );
    yPosition += 10;

    const reportTrendType = selectedTrendType || availableTrendTypes[0];
    const reportTrendEntries = reportOptions.health && reportTrendType
      ? healthEntries
          .filter((entry) => entry.type === reportTrendType)
          .slice(0, 8)
          .reverse()
      : [];

    if (reportTrendEntries.length >= 2) {
      const chartX = margin;
      const chartY = yPosition;
      const chartWidth = textWidth;
      const chartHeight = 58;
      const chartLeft = chartX + 10;
      const chartRight = chartX + chartWidth - 10;
      const chartTop = chartY + 20;
      const chartBottom = chartY + chartHeight - 12;
      const chartValues = reportTrendEntries
        .map((entry) => Number(entry.value))
        .filter((value) => Number.isFinite(value));
      const chartMin = Math.min(...chartValues);
      const chartMax = Math.max(...chartValues);
      const chartRange = Math.max(chartMax - chartMin, 1);
      const chartValueMin = Math.max(0, chartMin - chartRange * 0.15);
      const chartValueMax = chartMax + chartRange * 0.15;
      const chartXFor = (index) =>
        chartLeft +
        (index / (reportTrendEntries.length - 1)) * (chartRight - chartLeft);
      const chartYFor = (value) =>
        chartTop +
        ((chartValueMax - value) / (chartValueMax - chartValueMin)) *
          (chartBottom - chartTop);

      pdf.setFillColor(240, 253, 250);
      pdf.setDrawColor(190, 226, 222);
      pdf.roundedRect(chartX, chartY, chartWidth, chartHeight, 4, 4, "FD");
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(23, 63, 66);
      pdf.text(
        `${text.trendTitle}: ${getTrendLabel(reportTrendType)}${reportTrendType === "bloodPressure" ? ` (${text.systolic})` : ""}`,
        chartX + 10,
        chartY + 13
      );
      pdf.setDrawColor(15, 118, 110);
      pdf.setLineWidth(0.8);
      reportTrendEntries.forEach((entry, index) => {
        const value = Number(entry.value);
        if (!Number.isFinite(value) || index === 0) return;

        const previousValue = Number(reportTrendEntries[index - 1].value);
        if (!Number.isFinite(previousValue)) return;

        pdf.line(
          chartXFor(index - 1),
          chartYFor(previousValue),
          chartXFor(index),
          chartYFor(value)
        );
      });
      reportTrendEntries.forEach((entry, index) => {
        const value = Number(entry.value);
        if (!Number.isFinite(value)) return;

        pdf.setFillColor(255, 255, 255);
        pdf.setDrawColor(15, 118, 110);
        pdf.circle(chartXFor(index), chartYFor(value), 1.5, "FD");
      });
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7);
      pdf.setTextColor(113, 128, 150);
      pdf.text(formatEntryDate(reportTrendEntries[0].measuredAt, isEnglish).slice(0, 10), chartLeft, chartY + chartHeight - 4);
      pdf.text(formatEntryDate(reportTrendEntries[reportTrendEntries.length - 1].measuredAt, isEnglish).slice(0, 10), chartRight, chartY + chartHeight - 4, { align: "right" });
      yPosition += chartHeight + 10;
    }

    getReportLines()
      .flatMap((line) => pdf.splitTextToSize(line, textWidth))
      .forEach((line) => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.text(line, margin, yPosition);
        yPosition += 6;
      });

    return pdf;
  }

  function triggerPdfDownload(pdf, fileName) {
    const blob = pdf.output("blob");
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }

  function createReportFile(pdf) {
    return new File([pdf.output("blob")], getReportFileName(), {
      type: "application/pdf",
    });
  }

  function getDoctorMailtoUrl(recipient = doctorEmail.trim()) {
    if (!recipient) {
      return "";
    }

    const subject = encodeURIComponent(
      isEnglish ? "Curaelis health diary" : "Curaelis Gesundheitstagebuch"
    );
    const intro = isEnglish
      ? "My Curaelis health diary entries:\n\n"
      : "Meine Gesundheitstagebuch-Einträge aus Curaelis:\n\n";
    const body = encodeURIComponent(
      `${intro}${getReportLines().join("\n")}\n\n${text.emailAttachmentNote}`
    );

    return `mailto:${recipient}?subject=${subject}&body=${body}`;
  }

  async function handlePrint() {
    if (!hasReportSelection) {
      setPrintMessage(text.reportNoSelection);
      return;
    }

    if (!hasReportData) {
      setPrintMessage(text.reportEmpty);
      return;
    }

    setPrintMessage(text.pdfCreating);
    setPdfDownloadInfo(false);

    try {
      const pdf = await createReportPdf();
      const file = createReportFile(pdf);

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          title: text.reportTitle,
          text: text.reportTitle,
          files: [file],
        });
      } else {
        triggerPdfDownload(pdf, getReportFileName());
      }

      setPrintMessage(text.pdfSaved);
      setPdfDownloadInfo(true);
      window.setTimeout(() => {
        document.documentElement.style.zoom = "";
        document.body.style.zoom = "";
      }, 250);
    } catch (error) {
      setPrintMessage(
        error?.name === "AbortError" ? text.shareCancelled : text.pdfError
      );
    }
  }

  async function handleSharePdf() {
    if (!hasReportSelection) {
      showMessage(text.reportNoSelection, "error");
      return;
    }

    if (!hasReportData) {
      showMessage(text.reportEmpty, "error");
      return;
    }

    setPrintMessage(text.pdfCreating);
    setPdfDownloadInfo(false);

    try {
      const pdf = await createReportPdf();
      const file = createReportFile(pdf);

      const shareFiles = [file, ...reportFiles];

      if (
        !navigator.share ||
        !navigator.canShare ||
        !navigator.canShare({ files: shareFiles })
      ) {
        triggerPdfDownload(pdf, getReportFileName());
        setPdfDownloadInfo(true);
        setPrintMessage(text.shareUnsupported);
        return;
      }

      const intro = isEnglish
        ? "My Curaelis health diary entries:\n\n"
        : "Meine Gesundheitstagebuch-Einträge aus Curaelis:\n\n";

      await navigator.share({
        title: text.reportTitle,
        text: `${intro}${getReportLines().join("\n")}`,
        files: shareFiles,
      });
      setPrintMessage(text.shareReady);
    } catch (error) {
      setPrintMessage(
        error?.name === "AbortError" ? text.shareCancelled : text.pdfError
      );
    }
  }

  function handleEmail() {
    if (!hasReportSelection) {
      showMessage(text.reportNoSelection, "error");
      return;
    }

    if (!hasReportData) {
      showMessage(text.reportEmpty, "error");
      return;
    }

    const recipient = doctorEmail.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!recipient) {
      setPrintMessage(text.emailMissing);
      focusDoctorEmailField();
      return;
    }

    if (!emailPattern.test(recipient)) {
      setPrintMessage(text.emailInvalid);
      focusDoctorEmailField();
      return;
    }

    const mailtoUrl = getDoctorMailtoUrl(recipient);

    setEmailFallbackUrl(mailtoUrl);
    setPrintMessage(text.emailOpening);
    window.setTimeout(() => setPrintMessage(text.emailOpened), 700);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setMessageType("");

    const measuredAt = new Date(formData.measuredAt);
    const value = Number(formData.value);
    const secondaryValue = Number(formData.secondaryValue || 0);

    if (
      formData.type === "bloodPressure" &&
      (!Number.isFinite(value) ||
        value < 50 ||
        value > 300 ||
        !Number.isFinite(secondaryValue) ||
        secondaryValue < 30 ||
        secondaryValue > 200 ||
        secondaryValue >= value)
    ) {
      showMessage(text.invalidBloodPressure, "error");
      return;
    }

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
        medicationId: formData.medicationId,
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

      if (isOnboarding && onboardingFocus === "health") {
        setShowOnboardingContinue(true);
      }
      setFormData({ ...emptyForm, measuredAt: getLocalDateTimeValue() });
      setEditingId(null);
    } catch (saveError) {
      console.error("Curaelis health entry save failed", saveError);
      const errorCode = saveError?.code?.replace("firestore/", "");

      if (errorCode === "permission-denied") {
        showMessage(
          `${text.saveError} ${isEnglish ? "Firebase denied access to this entry." : "Firebase hat den Zugriff auf diesen Eintrag abgelehnt."}`,
          "error"
        );
      } else if (errorCode === "unavailable") {
        showMessage(
          `${text.saveError} ${isEnglish ? "The database is currently unavailable." : "Die Datenbank ist momentan nicht erreichbar."}`,
          "error"
        );
      } else {
        showMessage(
          errorCode ? `${text.saveError} (Firebase: ${errorCode})` : text.saveError,
          "error"
        );
      }
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
        {printMessage && (
          <Box
            className="health-report-print-message"
            mt="4"
            padding="3"
            borderRadius="md"
            background="teal.50"
            color="teal.800"
            borderWidth="1px"
            borderColor="teal.200"
            role="status"
            aria-live="polite"
          >
            {printMessage}
          </Box>
        )}
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
        <Box className="health-report-send-guide" mb="5">
          <Text fontWeight="800" color="teal.900">
            {isEnglish ? "PDF created – what happens next?" : "PDF erstellt – wie geht es weiter?"}
          </Text>
          <Text mt="1" fontSize="sm" color="gray.700">
            {isEnglish
              ? "Email to practice opens your email app with the address prepared; attach the saved PDF before sending. Share PDF opens Apple's share menu for Mail, Messages or saving to Files."
              : "Die Mail an die Praxis öffnet deine Mail-App mit vorbereiteter Adresse; füge die gespeicherte PDF vor dem Senden als Anhang hinzu. „PDF teilen“ öffnet das Apple-Teilen-Menü für Mail, Nachrichten oder das Sichern in Dateien."}
          </Text>
        </Box>
        <Box className="health-report-options" mb="5">
          <Text className="health-report-options-title">{text.reportContents}</Text>
          <Flex gap="3" wrap="wrap" mt="3">
            {[
              ["health", text.reportHealth],
              ["medications", text.reportMedications],
              ["emergencyProfile", text.reportEmergencyProfile],
            ].map(([name, label]) => (
              <label key={name} className="health-report-option">
                <input
                  type="checkbox"
                  name={name}
                  checked={reportOptions[name]}
                  onChange={handleReportOptionChange}
                />
                <span>{label}</span>
              </label>
            ))}
          </Flex>
        </Box>
        <Flex className="health-report-visual" align="center" gap="4" mb="5">
          <Box className="health-report-visual-icon" aria-hidden="true">PDF</Box>
          <Box>
            <Text fontWeight="800" color="teal.900">{text.trendTitle} + PDF</Text>
            <Text fontSize="sm" color="gray.600">{text.fileHint}</Text>
          </Box>
        </Flex>
        <Box mb="5">
          <Text as="label" htmlFor="doctor-email" display="block" mb="2" fontWeight="600">
            {text.doctorEmail}
          </Text>
          <Input
            id="doctor-email"
            type="email"
            value={doctorEmail}
            onChange={handleDoctorEmailChange}
            placeholder={text.doctorEmailPlaceholder}
            autoComplete="email"
          />
          <Text mt="2" fontSize="sm" color="gray.600">
            {text.doctorEmailHint}
          </Text>
          {isOnboarding && onboardingFocus === "doctor-email" && (
            <Box
              className="onboarding-focus-banner"
              background="orange.50"
              borderWidth="1px"
              borderColor="orange.200"
              borderRadius="xl"
              padding="4"
              mt="4"
              role="status"
            >
              <Text fontWeight="800" color="orange.900">
                {isEnglish ? "Setup: save the doctor's practice email" : "Einrichtung: E-Mail der Arztpraxis speichern"}
              </Text>
              <Text mt="1" color="orange.900">
                {isEnglish
                  ? "Enter the practice email here. Then return to the setup overview with the button below."
                  : "Trage die Praxis-E-Mail hier ein. Danach kommst du mit dem Button unten zurück zur Einrichtungsübersicht."}
              </Text>
            </Box>
          )}
          {isOnboarding && onboardingFocus === "doctor-email" && doctorEmail.trim() && (
            <Button
              as={Link}
              to="/einrichtung"
              colorPalette="orange"
              size="lg"
              mt="4"
              width="100%"
            >
              {isEnglish ? "Back to setup overview" : "Zurück zur Einrichtungsübersicht"}
            </Button>
          )}
        </Box>
        <input
          ref={reportFileInputRef}
          id="health-report-files"
          type="file"
          accept="image/*,.pdf,.doc,.docx"
          multiple
          onChange={handleReportFilesChange}
          hidden
        />
        {reportFiles.length > 0 && (
          <Box className="health-report-files" mt="4">
            <Text fontWeight="800" color="teal.900">{text.filesSelected}</Text>
            <Stack gap="1" mt="2">
              {reportFiles.map((file, index) => (
                <Text key={`${file.name}-${index}`} fontSize="sm" color="gray.700">
                  📄 {file.name}
                </Text>
              ))}
            </Stack>
            <Text mt="2" fontSize="sm" color="gray.600">{text.shareFilesHint}</Text>
          </Box>
        )}
        <Box className="health-report-attachment-basket" mt="4" role="status">
          <Text fontWeight="800" color="teal.900">
            {isEnglish ? "Your sending folder" : "Deine Versandmappe"}
          </Text>
          <Stack gap="1" mt="2">
            <Text fontSize="sm" color={pdfDownloadInfo ? "teal.800" : "gray.600"}>
              {pdfDownloadInfo ? "✅" : "⬜️"} {getReportFileName()}
            </Text>
            {reportFiles.map((file, index) => (
              <Text key={`basket-${file.name}-${index}`} fontSize="sm" color="gray.700">
                📎 {file.name}
              </Text>
            ))}
          </Stack>
          <Text mt="2" fontSize="sm" color="gray.600">
            {isEnglish
              ? "The PDF and selected files are prepared together for the Share button below."
              : "Die PDF und ausgewählten Dateien werden gemeinsam für den Teilen-Button unten vorbereitet."}
          </Text>
        </Box>
        <Box className="health-report-action-group" mb="4">
          <Text className="health-report-action-title">
            {isEnglish ? "1. Prepare the PDF and files" : "1. PDF und Dateien vorbereiten"}
          </Text>
          <Flex className="health-report-buttons" direction={{ base: "column", md: "row" }} gap="3" align="stretch" mt="3">
            <Button
              type="button"
              className="health-report-attach"
              colorPalette="teal"
              size="lg"
              borderRadius="xl"
              onClick={() => reportFileInputRef.current?.click()}
            >
              📎 {text.attachFiles}
            </Button>
            <Button
              type="button"
              className="health-report-pdf-button"
              colorPalette="teal"
              size="lg"
              borderRadius="xl"
              onClick={handlePrint}
              disabled={!hasReportData}
            >
              🖨️ {text.exportPdf}
            </Button>
          </Flex>
          <Text className="health-report-action-hint" mt="2">
            {isEnglish
              ? "Save the PDF first. On iPhone, choose Share → Save to Files and remember the shown file name."
              : "Speichere die PDF zuerst. Auf dem iPhone wählst du Teilen → In Dateien sichern und merkst dir den angezeigten Dateinamen."}
          </Text>
        </Box>

        <Box className="health-report-action-group">
          <Text className="health-report-action-title">
            {isEnglish ? "2. Choose how to send it" : "2. Versand auswählen"}
          </Text>
          <Box className="health-report-share-callout" mt="3" mb="3">
            <Text as="span" className="health-report-share-arrow" aria-hidden="true">➜</Text>
            <Text as="span">
              {isEnglish
                ? "To send the PDF and selected files together, tap this button:"
                : "Für Mail mit PDF und ausgewählten Dateien diesen Button nutzen:"}
            </Text>
          </Box>
          <Flex className="health-report-buttons" direction={{ base: "column", md: "row" }} gap="3" align="stretch" mt="3">
            <Button
              type="button"
              className="health-report-share-button"
              colorPalette="teal"
              size="lg"
              borderRadius="xl"
              onClick={handleSharePdf}
              disabled={!hasReportData}
            >
              📤 {text.sharePdf}
            </Button>
            <Button
              as={doctorEmail.trim() && hasReportData ? "a" : "button"}
              type="button"
              className="health-report-doctor-button"
              colorPalette="teal"
              size="lg"
              borderRadius="xl"
              href={doctorEmail.trim() && hasReportData ? getDoctorMailtoUrl() : undefined}
              onClick={handleEmail}
              disabled={!hasReportData}
            >
              🩺 {text.email}
            </Button>
          </Flex>
          <Text className="health-report-action-hint" mt="2">
            {isEnglish
              ? "Email opens the practice address without attaching automatically. Share PDF opens Apple's menu and can include the PDF and selected files together."
              : "Die Praxis-Mail öffnet nur die Adresse. Mit PDF + Dateien teilen kannst du die PDF und weitere Dateien zusammen über Mail oder Dateien weitergeben."}
          </Text>
        </Box>
        {emailFallbackUrl && (
          <Box className="health-report-email-fallback" mt="4" role="status" aria-live="polite">
            <Text fontWeight="800" color="teal.900">{text.emailFallback}</Text>
            <Flex gap="3" wrap="wrap" mt="3">
              <Button
                as="a"
                href={emailFallbackUrl}
                variant="outline"
                colorPalette="teal"
              >
                ✉️ {text.emailRetry}
              </Button>
              <Button
                type="button"
                variant="outline"
                colorPalette="gray"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(doctorEmail.trim());
                    setPrintMessage(text.emailCopied);
                  } catch {
                    setPrintMessage(text.emailFallback);
                  }
                }}
              >
                📋 {text.emailCopy}
              </Button>
            </Flex>
          </Box>
        )}
        {printMessage && (
          <Box
            className="health-report-print-message"
            mt="4"
            padding="3"
            borderRadius="md"
            background="teal.50"
            color="teal.800"
            borderWidth="1px"
            borderColor="teal.200"
            role="status"
            aria-live="polite"
          >
            {printMessage}
          </Box>
        )}
        {pdfDownloadInfo && (
          <Box className="health-report-download-info" mt="3" role="status" aria-live="polite">
            <Text fontWeight="800" color="teal.900">
              {isEnglish ? "PDF saved" : "PDF gespeichert"}
            </Text>
            <Text mt="1" fontSize="sm" color="gray.700">
              {text.pdfLocation.replace("{fileName}", getReportFileName())}
            </Text>
          </Box>
        )}
      </Box>

      <Box
        ref={healthFormRef}
        id="health-entry-form"
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

            <Box>
              <Text as="label" htmlFor="health-medication" display="block" mb="2" fontWeight="600">
                {text.linkedMedication}
              </Text>
              <select
                id="health-medication"
                name="medicationId"
                value={formData.medicationId}
                onChange={handleChange}
                style={{ width: "100%", minHeight: "44px", padding: "8px", borderRadius: "6px" }}
              >
                <option value="">{text.noMedicationLink}</option>
                {userMedications.map((medication) => (
                  <option key={medication.id} value={medication.id}>
                    {medication.name} · {medication.dosage}
                  </option>
                ))}
              </select>
              <Button
                as={Link}
                to="/meine-medikamente"
                variant="outline"
                colorPalette="teal"
                size="sm"
                mt="3"
              >
                {text.openMedications}
              </Button>
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
            {isOnboarding && onboardingFocus === "health" && (
              <Box
                className="onboarding-focus-banner"
                background="orange.50"
                borderWidth="1px"
                borderColor="orange.200"
                borderRadius="xl"
                padding="4"
                role="status"
              >
                <Text fontWeight="800" color="orange.900">
                  {isEnglish ? "Setup: add your first health value" : "Einrichtung: ersten Gesundheitswert eintragen"}
                </Text>
                <Text mt="1" color="orange.900">
                  {isEnglish
                    ? "Save your health value here. Then continue directly with the button below."
                    : "Speichere deinen Gesundheitswert hier. Danach geht es direkt mit dem Button unten weiter."}
                </Text>
              </Box>
            )}
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
        {isOnboarding && onboardingFocus === "health" && showOnboardingContinue && (
          <Button
            as={Link}
            to="/konto?from=einrichtung&focus=emergency-contacts#emergency-contacts"
            colorPalette="orange"
            size="lg"
            mt="5"
            width="100%"
          >
            {isEnglish ? "Continue to emergency contacts" : "Weiter zu den Notfallkontakten"}
          </Button>
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

      <HealthTimeline
        entries={healthEntries}
        medications={userMedications}
        isEnglish={isEnglish}
        text={text}
      />

      <Box>
        {availableTrendTypes.length > 0 && (
          <Box className="health-diary-overview" mb="8">
            <Flex className="health-overview-heading" align="end" justify="space-between" gap="4" wrap="wrap" mb="5">
              <Box>
                <Heading size="lg" color="teal.900">
                  {text.overviewTitle}
                </Heading>
                <Text mt="2" color="gray.600">
                  {text.overviewHint}
                </Text>
              </Box>
              <Box className="health-overview-accent" aria-hidden="true" />
            </Flex>

            <SimpleGrid className="health-overview-grid" columns={{ base: 1, sm: 2, lg: 4 }} gap="4" mb="5">
              {availableTrendTypes.map((type) => {
                const visual = metricVisuals[type];
                const count = healthEntries.filter((entry) => entry.type === type).length;

                return (
                  <Box key={type} className="health-metric-card" borderTopColor={visual.color}>
                    <Flex align="center" justify="space-between" gap="3">
                      <Text className="health-metric-icon" color={visual.color}>
                        {visual.icon}
                      </Text>
                      <Text className="health-metric-count">
                        {text.records.replace("{count}", String(count))}
                      </Text>
                    </Flex>
                    <Text className="health-metric-label">{getTrendLabel(type)}</Text>
                    <Flex align="baseline" gap="2" mt="2">
                      <Text className="health-metric-value">{getOverviewValue(type)}</Text>
                      <Text className="health-metric-unit">{getOverviewUnit(type)}</Text>
                    </Flex>
                    <Text className="health-metric-latest" mt="2">{text.latest}</Text>
                  </Box>
                );
              })}
            </SimpleGrid>

            <Box className="health-trend-panel">
              <Flex align={{ base: "stretch", md: "center" }} justify="space-between" gap="4" direction={{ base: "column", md: "row" }} mb="4">
                <Box>
                  <Heading size="md" color="teal.900">
                    {text.trendTitle}
                  </Heading>
                  <Text mt="1" color="gray.600" fontSize="sm">
                    {text.trendArea}
                  </Text>
                </Box>
                <select
                  id="health-trend-type"
                  value={selectedTrendType || ""}
                  onChange={(event) => setTrendType(event.target.value)}
                  aria-label={text.trendArea}
                  className="health-trend-select"
                >
                  {availableTrendTypes.map((type) => (
                    <option key={type} value={type}>
                      {getTrendLabel(type)}
                    </option>
                  ))}
                </select>
              </Flex>
              <HealthTrendChart
                entries={healthEntries}
                type={selectedTrendType}
                isEnglish={isEnglish}
                text={text}
              />
            </Box>
          </Box>
        )}

        <Box className="health-diary-entries">
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
                    {entry.medicationId && (
                      <Text mt="2" color="teal.700" fontWeight="600">
                        {text.timelineLinkedMedication.replace(
                          "{name}",
                          userMedications.find(
                            (medication) => medication.id === entry.medicationId
                          )?.name || text.noMedicationLink
                        )}
                      </Text>
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
    </Box>
  );
}

export default HealthDiaryPage;
