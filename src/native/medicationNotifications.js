import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";

const REMINDER_IDS_KEY = "curaelis-native-reminder-ids";

function isNativeNotificationsAvailable() {
  return Capacitor.isNativePlatform();
}

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

function getMedicationTimes(medication) {
  const savedTimes = Array.isArray(medication.intakeTimes)
    ? medication.intakeTimes
    : [medication.intakeTime];

  return [
    ...new Set(savedTimes.map(normalizeTime).filter(Boolean)),
  ];
}

function getStoredReminderIds() {
  try {
    return JSON.parse(
      localStorage.getItem(REMINDER_IDS_KEY) || "[]"
    ).filter(Number.isInteger);
  } catch {
    return [];
  }
}

function storeReminderIds(ids) {
  localStorage.setItem(REMINDER_IDS_KEY, JSON.stringify(ids));
}

function createReminderId(medicationId, intakeTime) {
  const source = `${medicationId}-${intakeTime}`;
  let hash = 0;

  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 31 + source.charCodeAt(index)) | 0;
  }

  return Math.abs(hash % 2147480000) + 1;
}

export async function getMedicationNotificationPermission() {
  if (!isNativeNotificationsAvailable()) {
    return { native: false, display: "unsupported" };
  }

  const permission = await LocalNotifications.checkPermissions();
  return { native: true, display: permission.display };
}

export async function requestMedicationNotificationPermission() {
  if (!isNativeNotificationsAvailable()) {
    return { native: false, display: "unsupported" };
  }

  const permission = await LocalNotifications.requestPermissions();
  return { native: true, display: permission.display };
}

export async function scheduleMedicationTestNotification() {
  if (!isNativeNotificationsAvailable()) {
    return false;
  }

  const permission = await getMedicationNotificationPermission();

  if (permission.display !== "granted") {
    return false;
  }

  await LocalNotifications.schedule({
    notifications: [
      {
        id: Math.floor(Date.now() / 1000),
        title: "Curaelis Test",
        body: "Wenn du diese Meldung siehst, funktionieren die iPhone-Erinnerungen.",
        schedule: {
          at: new Date(Date.now() + 5000),
        },
        foreground: true,
      },
    ],
  });

  return true;
}

export async function syncNativeMedicationReminders(medications) {
  if (!isNativeNotificationsAvailable()) {
    return { native: false, scheduled: 0 };
  }

  const permission = await getMedicationNotificationPermission();

  if (permission.display !== "granted") {
    return { native: true, scheduled: 0, permissionRequired: true };
  }

  const previousIds = getStoredReminderIds();

  if (previousIds.length > 0) {
    await LocalNotifications.cancel({
      notifications: previousIds.map((id) => ({ id })),
    });
  }

  const notifications = medications.flatMap((medication) =>
    getMedicationTimes(medication).map((intakeTime) => {
      const [hour, minute] = intakeTime.split(":").map(Number);
      const id = createReminderId(medication.id, intakeTime);

      return {
        id,
        title: "Curaelis – Einnahmeerinnerung",
        body: `Es ist Zeit für ${medication.name}${medication.dosage ? ` (${medication.dosage})` : ""}.`,
        schedule: {
          on: { hour, minute },
        },
        extra: { url: "/meine-medikamente", medicationId: medication.id },
        foreground: true,
      };
    })
  );

  if (notifications.length > 0) {
    await LocalNotifications.schedule({ notifications });
  }

  storeReminderIds(notifications.map(({ id }) => id));

  return { native: true, scheduled: notifications.length };
}
