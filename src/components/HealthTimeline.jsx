import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";

function getDateValue(value) {
  if (value?.toDate) {
    return value.toDate();
  }

  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(value, isEnglish) {
  const date = getDateValue(value);
  if (!date) {
    return isEnglish ? "Date is being saved …" : "Datum wird gespeichert …";
  }

  return new Intl.DateTimeFormat(isEnglish ? "en-GB" : "de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getEntryLabel(entry, isEnglish) {
  const labels = {
    bloodPressure: isEnglish ? "Blood pressure" : "Blutdruck",
    bloodSugar: isEnglish ? "Blood glucose" : "Blutzucker",
    pulse: isEnglish ? "Pulse" : "Puls",
    weight: isEnglish ? "Weight" : "Gewicht",
    oxygen: isEnglish ? "Oxygen saturation" : "Sauerstoffsättigung",
    temperature: isEnglish ? "Body temperature" : "Körpertemperatur",
    symptom: isEnglish ? "Symptom" : "Beschwerde",
  };

  return entry.type === "symptom"
    ? entry.context || labels.symptom
    : labels[entry.type] || (isEnglish ? "Health entry" : "Gesundheitseintrag");
}

function getEntryValue(entry) {
  if (entry.type === "bloodPressure") {
    return `${entry.value} / ${entry.secondaryValue} ${entry.unit}`;
  }

  return `${entry.value} ${entry.unit}`;
}

function HealthTimeline({ entries, medications, isEnglish, text }) {
  const items = [
    ...entries.map((entry) => ({
      id: `health-${entry.id}`,
      date: entry.measuredAt,
      kind: "health",
      color: "#0f766e",
      icon: "⌁",
      title: getEntryLabel(entry, isEnglish),
      value: getEntryValue(entry),
      detail: entry.notes || "",
      medicationName: medications.find((medication) => medication.id === entry.medicationId)?.name,
    })),
    ...medications.map((medication) => ({
      id: `medication-${medication.id}`,
      date: medication.createdAt,
      kind: "medication",
      color: "#7c3aed",
      icon: "💊",
      title: medication.name,
      value: medication.dosage,
      detail: Array.isArray(medication.intakeTimes)
        ? medication.intakeTimes.join(", ")
        : medication.intakeTime || "",
    })),
  ]
    .sort((first, second) => {
      const firstTime = getDateValue(first.date)?.getTime() ?? 0;
      const secondTime = getDateValue(second.date)?.getTime() ?? 0;
      return secondTime - firstTime;
    })
    .slice(0, 18);

  if (items.length === 0) {
    return null;
  }

  return (
    <Box className="health-timeline" aria-labelledby="health-timeline-title">
      <Flex align="start" justify="space-between" gap="4" wrap="wrap" mb="5">
        <Box>
          <Heading id="health-timeline-title" size="md" color="teal.900">
            {text.timelineTitle}
          </Heading>
          <Text mt="1" color="gray.600" fontSize="sm">
            {text.timelineHint}
          </Text>
        </Box>
        <Text className="health-timeline-count">
          {text.timelineCount.replace("{count}", String(items.length))}
        </Text>
      </Flex>

      <Stack className="health-timeline-list" gap="0">
        {items.map((item) => (
          <Box key={item.id} className="health-timeline-item">
            <Box
              className="health-timeline-marker"
              borderColor={item.color}
              color={item.color}
              aria-hidden="true"
            >
              {item.icon}
            </Box>
            <Box className="health-timeline-content">
              <Flex align="baseline" justify="space-between" gap="3" wrap="wrap">
                <Text className="health-timeline-kind">
                  {item.kind === "medication" ? text.timelineMedication : text.timelineMeasurement}
                </Text>
                <Text className="health-timeline-date">{formatDate(item.date, isEnglish)}</Text>
              </Flex>
              <Text className="health-timeline-title">{item.title}</Text>
              <Text className="health-timeline-value">{item.value}</Text>
              {item.medicationName && (
                <Text className="health-timeline-context">
                  {text.timelineLinkedMedication.replace("{name}", item.medicationName)}
                </Text>
              )}
              {item.detail && <Text className="health-timeline-context">{item.detail}</Text>}
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default HealthTimeline;
