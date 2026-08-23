import {
  Box,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import MedicationCard from "../components/MedicationCard";
import MedicationSearch from "../components/MedicationSearch";
import MedicationCategoryFilter from "../components/MedicationCategoryFilter";
import useMedications from "../hooks/useMedications";
import useLanguage from "../hooks/useLanguage";

function MedicationsPage() {
  const { isEnglish } = useLanguage();
  const { medications } = useMedications();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("Alle");

  const categories = [
    ...new Set(
      medications.map(
        (medication) => medication.category
      )
    ),
  ];

  const filteredMedications = medications.filter(
    (medication) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        medication.name.toLowerCase().includes(search) ||
        medication.category.toLowerCase().includes(search) ||
        (medication.categoryEn ?? "").toLowerCase().includes(search);

      const matchesCategory =
        selectedCategory === "Alle" ||
        medication.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }
  );

  return (
    <Box padding="8">
      <Heading>{isEnglish ? "Medication overview" : "Medikamentenübersicht"}</Heading>

      <Text marginTop="4">
        {isEnglish ? "Choose a medication to view more information." : "Wähle ein Medikament aus, um weitere Informationen zu sehen."}
      </Text>

      <MedicationSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <MedicationCategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {filteredMedications.length === 0 ? (
        <Text marginTop="6">
          {isEnglish ? "No matching medication found." : "Kein passendes Medikament gefunden."}
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
