import {
  Box,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import MedicationCard from "../components/MedicationCard";
import useMedications from "../hooks/useMedications";

function MedicationsPage() {
  const { medications } = useMedications();

  return (
    <Box padding="8">
      <Heading>Medikamentenübersicht</Heading>

      <Text marginTop="4">
        Wähle ein Medikament aus, um weitere Informationen zu sehen.
      </Text>

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap="6"
        marginTop="6"
      >
        {medications.map((medication) => (
          <MedicationCard
            key={medication.id}
            medication={medication}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default MedicationsPage;
