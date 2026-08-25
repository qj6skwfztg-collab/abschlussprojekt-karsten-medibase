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
    "https://www.bfarm.de/SiteGlobals/Forms/Suche/Expertensuche_Formular.html";

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
                  ? "You can continue searching for this medication in the official BfArM search."
                  : "Du kannst dieses Medikament in der offiziellen BfArM-Suche weiter suchen."}
              </Text>

              <Button
                as="a"
                href={`${officialMedicationSearchUrl}?resourceId=469750&input_=593296&pageLocale=de&templateQueryString=${encodeURIComponent(searchTerm.trim())}#results`}
                target="_blank"
                rel="noreferrer"
                marginTop="4"
                colorPalette="teal"
              >
                {isEnglish
                  ? "Open official BfArM search"
                  : "Offizielle BfArM-Suche öffnen"}
              </Button>

              <Text marginTop="2" fontSize="sm" color="gray.600">
                {isEnglish
                  ? `The search opens with “${searchTerm.trim()}” already entered.`
                  : `Die Suche wird bereits mit „${searchTerm.trim()}“ geöffnet.`}
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
