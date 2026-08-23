import { useEffect } from "react";
import useLanguage from "../hooks/useLanguage";

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
      const currentDate = now.toISOString().split("T")[0];

      const registration =
        await navigator.serviceWorker.ready;

      for (const medication of medications) {
        if (medication.intakeTime !== currentTime) {
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
