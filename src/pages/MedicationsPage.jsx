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
    ...new Map(
      medications.map((medication) => [
        medication.category,
        {
          value: medication.category,
          label: isEnglish
            ? medication.categoryEn ?? medication.category
            : medication.category,
        },
      ])
    ).values(),
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

  function getOfficialMedicationSearchUrl(term) {
    const searchParams = new URLSearchParams({
      resourceId: "468548",
      input_: "593296",
      pageLocale: "de",
      templateQueryString: term.trim(),
    });

    return `https://www.bfarm.de/SiteGlobals/Forms/Suche/Servicesuche_Formular.html?${searchParams.toString()}`;
  }

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
                  ? "This medication is not yet available as a Curaelis card. You can search for it directly on the official BfArM website."
                  : "Dieses Medikament ist noch nicht als Curaelis-Karte vorhanden. Du kannst es direkt auf der offiziellen BfArM-Website suchen."}
              </Text>

              <Button
                as="a"
                href={getOfficialMedicationSearchUrl(searchTerm)}
                target="_blank"
                rel="noopener noreferrer"
                marginTop="4"
                colorPalette="teal"
              >
                {isEnglish
                  ? "Search on the official BfArM website"
                  : "Offizielle BfArM-Suche öffnen"}
              </Button>

              <Text marginTop="2" fontSize="sm" color="gray.600">
                {isEnglish
                  ? `Search term: “${searchTerm.trim()}”`
                  : `Gesuchter Begriff: „${searchTerm.trim()}“`}
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
