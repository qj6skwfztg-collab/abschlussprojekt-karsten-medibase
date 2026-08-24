import useUserMedications from "../hooks/useUserMedications";
import MedicationReminderWatcher from "./MedicationReminderWatcher";

function PersonalMedicationReminder() {
  const { userMedications } = useUserMedications();

  return <MedicationReminderWatcher medications={userMedications} />;
}

export default PersonalMedicationReminder;
