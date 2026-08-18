import { Box, Heading, Text } from "@chakra-ui/react";
import MedicationForm from "../components/MedicationForm";

function AddMedicationPage() {
  return (
    <Box padding="8">
      <Heading>Medikament hinzufügen</Heading>

      <Text marginTop="4">
        Trage nur Informationen aus einer verlässlichen Quelle ein.
      </Text>

      <MedicationForm />
    </Box>
  );
}

export default AddMedicationPage;
