import {
  Box,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import MedicationCard from "../components/MedicationCard";
import MedicationSearch from "../components/MedicationSearch";
import useMedications from "../hooks/useMedications";

function MedicationsPage() {
  const { medications } = useMedications();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMedications = medications.filter(
    (medication) => {
      const search = searchTerm.toLowerCase();

      return (
        medication.name.toLowerCase().includes(search) ||
        medication.category.toLowerCase().includes(search)
      );
    }
  );

  return (
    <Box padding="8">
      <Heading>Medikamentenübersicht</Heading>

      <Text marginTop="4">
        Wähle ein Medikament aus, um weitere Informationen zu sehen.
      </Text>

      <MedicationSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {filteredMedications.length === 0 ? (
        <Text marginTop="6">
          Kein passendes Medikament gefunden.
        </Text>
      ) : (
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap="6"
          marginTop="6"
        >
          {filteredMedications.map((medication) => (
            <MedicationCard
              key={medication.id}
              medication={medication}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default MedicationsPage;
