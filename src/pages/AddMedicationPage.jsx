import { Box, Heading, Text } from "@chakra-ui/react";
import MedicationForm from "../components/MedicationForm";
import useLanguage from "../hooks/useLanguage";

function AddMedicationPage() {
  const { isEnglish } = useLanguage();
  return (
    <Box padding="8">
      <Heading>{isEnglish ? "Add medication" : "Medikament hinzufügen"}</Heading>

      <Text marginTop="4">
        {isEnglish ? "Only enter information from a reliable source." : "Trage nur Informationen aus einer verlässlichen Quelle ein."}
      </Text>

      <MedicationForm />
    </Box>
  );
}

export default AddMedicationPage;
