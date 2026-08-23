import { useEffect } from "react";
import useLanguage from "../hooks/useLanguage";

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

function MedicationReminderWatcher({ medications }) {
  const { isEnglish } = useLanguage();
  useEffect(() => {
    async function checkMedicationTimes() {
      if (!("Notification" in window)) {
        return;
      }

      if (!("serviceWorker" in navigator)) {
        return;
      }

      if (Notification.permission !== "granted") {
        return;
      }

      const now = new Date();

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");

      const currentTime = `${hours}:${minutes}`;
      const currentDate = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
      ].join("-");

      const registration =
        await navigator.serviceWorker.ready;

      for (const medication of medications) {
        if (normalizeTime(medication.intakeTime) !== currentTime) {
          continue;
        }

        const reminderKey =
          `reminder-${medication.id}-${currentDate}-${currentTime}`;

        const reminderWasShown =
          localStorage.getItem(reminderKey);

        if (reminderWasShown) {
          continue;
        }

        await registration.showNotification(
          isEnglish ? "MediPervin reminder" : "MediPervin Erinnerung",
          {
            body:
              isEnglish ? "It is time for a scheduled medication. Open MediPervin for more information." : "Es ist Zeit für eine geplante Medikamenteneinnahme. Öffne MediPervin für weitere Informationen.",
            tag: reminderKey,
          }
        );

        localStorage.setItem(reminderKey, "shown");
      }
    }

    checkMedicationTimes();

    const intervalId = window.setInterval(
      checkMedicationTimes,
      15000
    );

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isEnglish, medications]);

  return null;
}

export default MedicationReminderWatcher;
