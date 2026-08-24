import {
  Box,
  Button,
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

  const officialMedicationSearchUrl =
    "https://www.bfarm.de/DE/Arzneimittel/Arzneimittelinformationen/Arzneimittel-recherchieren/AMIce/_node.html";

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
        <Box marginTop="6" padding="5" borderWidth="1px" borderRadius="lg">
          <Text>
            {isEnglish
              ? "No matching Curaelis entry was found."
              : "Es wurde kein passender Curaelis-Eintrag gefunden."}
          </Text>

          {searchTerm.trim() && (
            <>
              <Text marginTop="2">
                {isEnglish
                  ? "You can search for this medication in the official German medicines database."
                  : "Du kannst dieses Medikament in der offiziellen deutschen Arzneimitteldatenbank suchen."}
              </Text>

              <Button
                as="a"
                href={officialMedicationSearchUrl}
                target="_blank"
                rel="noreferrer"
                marginTop="4"
                colorPalette="teal"
              >
                {isEnglish
                  ? "Open official medicines search"
                  : "Offizielle Arzneimittelsuche öffnen"}
              </Button>

              <Text marginTop="2" fontSize="sm" color="gray.600">
                {isEnglish
                  ? "The search term must be entered again on the official website."
                  : "Der Suchbegriff muss auf der offiziellen Seite erneut eingegeben werden."}
              </Text>
            </>
          )}
        </Box>
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
