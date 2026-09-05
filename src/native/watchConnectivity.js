import { Capacitor, registerPlugin } from "@capacitor/core";

const CuraelisWatch = registerPlugin("CuraelisWatch");

function toIsoDate(timestamp) {
  const date = timestamp?.toDate?.();

  return date instanceof Date ? date.toISOString() : "";
}

export async function syncEmergencyPassToWatch({
  medications,
  healthEntries,
  profile,
}) {
  if (
    !Capacitor.isNativePlatform() ||
    Capacitor.getPlatform() !== "ios"
  ) {
    return;
  }

  const data = {
    medications: medications.map((medication) => ({
      name: medication.name || "",
      dosage: medication.dosage || "",
      intakeTimes: Array.isArray(medication.intakeTimes)
        ? medication.intakeTimes
        : [],
      notes: medication.notes || "",
    })),

    healthEntries: healthEntries.slice(0, 5).map((entry) => ({
      type: entry.type || "",
      value: entry.value || "",
      secondaryValue: entry.secondaryValue || "",
      unit: entry.unit || "",
      context: entry.context || "",
      notes: entry.notes || "",
      measuredAt: toIsoDate(entry.measuredAt),
    })),

    emergencyProfile: {
      allergies: profile.allergies || "",
      conditions: profile.conditions || "",
      bloodGroup: profile.bloodGroup || "",
      specialNotes: profile.specialNotes || "",
    },
  };

  try {
    await CuraelisWatch.syncData({ data });
    console.log("Notfallpass-Daten wurden an die Watch übertragen.");
  } catch (error) {
    console.error(
      "Notfallpass-Daten konnten nicht übertragen werden:",
      error
    );
  }
}
