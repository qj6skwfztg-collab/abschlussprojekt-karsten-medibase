import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MedicationCard from "../components/MedicationCard";
import MedicationSearch from "../components/MedicationSearch";
import MedicationCategoryFilter from "../components/MedicationCategoryFilter";
import useMedications from "../hooks/useMedications";
import useLanguage from "../hooks/useLanguage";

function MedicationsPage() {
  const { isEnglish } = useLanguage();
  const { medications } = useMedications();

  const [searchTerm, setSearchTerm] = useState(
    () => new URLSearchParams(window.location.search).get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] =
    useState("Alle");

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;

    window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, []);

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

      const searchableTerms = [
        medication.name,
        medication.activeIngredient,
        medication.category,
        medication.categoryEn,
        ...(medication.aliases ?? []),
      ];

      const matchesSearch = searchableTerms.some((term) =>
        term?.toLowerCase().includes(search)
      );

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

  const cleanedSearchTerm = searchTerm.trim();
  const officialSearchUrl = cleanedSearchTerm
    ? getOfficialMedicationSearchUrl(cleanedSearchTerm)
    : "";
  const ePrescriptionInfoUrl = isEnglish
    ? "https://www.gematik.de/en/applications/e-prescription"
    : "https://www.bundesgesundheitsministerium.de/e-rezept";
  const ePrescriptionAppInfoUrl = "https://www.das-e-rezept-fuer-deutschland.de/app";

  return (
    <Box id="medication-overview" padding={{ base: "6", md: "8" }} maxWidth="1200px" margin="0 auto" scrollMarginTop="24px">
      <Heading>{isEnglish ? "Medication overview" : "Medikamentenübersicht"}</Heading>

      <Text marginTop="4">
        {isEnglish ? "Choose a medication to view more information." : "Wähle ein Medikament aus, um weitere Informationen zu sehen."}
      </Text>

      <MedicationSearch
        id="medication-search"
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
                  ? "This medication is not yet available as a Curaelis card. You can search externally on the official BfArM website or add it manually to your personal medication plan."
                  : "Dieses Medikament ist noch nicht als Curaelis-Karte vorhanden. Du kannst extern auf der offiziellen BfArM-Website suchen oder es manuell in deinen persönlichen Medikamentenplan übernehmen."}
              </Text>

              <Flex marginTop="4" gap="3" wrap="wrap" align="stretch">
                <Button
                  as="a"
                  href={officialSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  colorPalette="teal"
                  flex={{ base: "1 1 100%", md: "0 1 auto" }}
                  minWidth={{ base: "100%", md: "260px" }}
                  whiteSpace="normal"
                  height="auto"
                  minHeight="48px"
                  paddingY="3"
                >
                  {isEnglish
                    ? "Open official BfArM search"
                    : "Offizielle BfArM-Suche öffnen"}
                </Button>

                <Button
                  as={Link}
                  to={`/meine-medikamente?name=${encodeURIComponent(cleanedSearchTerm)}&from=medication-search`}
                  variant="outline"
                  colorPalette="teal"
                  flex={{ base: "1 1 100%", md: "0 1 auto" }}
                  minWidth={{ base: "100%", md: "260px" }}
                  whiteSpace="normal"
                  height="auto"
                  minHeight="48px"
                  paddingY="3"
                >
                  {isEnglish
                    ? "Add manually to my plan"
                    : "Manuell in meinen Plan übernehmen"}
                </Button>

                <Button
                  as="a"
                  href="https://www.apotheken.de/beipackzettelsuche"
                  target="_blank"
                  rel="noopener noreferrer"
                  background="green.600"
                  color="white"
                  _hover={{ background: "green.700" }}
                  flex={{ base: "1 1 100%", md: "0 1 auto" }}
                  minWidth={{ base: "100%", md: "320px" }}
                  whiteSpace="normal"
                  height="auto"
                  minHeight="48px"
                  paddingY="3"
                >
                  {isEnglish
                    ? "Open alternative leaflet search"
                    : "Alternative Beipackzettel-Suche öffnen"}
                </Button>
              </Flex>

              <Text marginTop="2" fontSize="sm" color="gray.600">
                {isEnglish
                  ? `Search term: “${searchTerm.trim()}”`
                  : `Gesuchter Begriff: „${searchTerm.trim()}“`}
              </Text>

              <Text marginTop="2" fontSize="sm" color="gray.600">
                {isEnglish
                  ? "Curaelis does not provide dosage recommendations. Please check the package leaflet and ask a doctor or pharmacy if unsure."
                  : "Curaelis gibt keine Dosierungsempfehlungen. Bitte prüfe die Packungsbeilage und frage bei Unsicherheit Arzt oder Apotheke."}
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

      {filteredMedications.length > 0 && cleanedSearchTerm && (
        <Box marginTop="8" padding="5" borderWidth="1px" borderRadius="lg" background="teal.50">
          <Heading size="sm">
            {isEnglish ? "Need the official source?" : "Offizielle Quelle benötigt?"}
          </Heading>
          <Text marginTop="2">
            {isEnglish
              ? "You can also search the current official BfArM information externally. This opens outside Curaelis."
              : "Du kannst zusätzlich extern in den aktuellen offiziellen BfArM-Informationen suchen. Das öffnet außerhalb von Curaelis."}
          </Text>
          <Button
            as="a"
            href={officialSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            colorPalette="teal"
            marginTop="4"
            whiteSpace="normal"
            height="auto"
            minHeight="48px"
            paddingY="3"
          >
            {isEnglish ? "Open BfArM search" : "BfArM-Suche öffnen"}
          </Button>
        </Box>
      )}

      <Box
        marginTop="8"
        padding={{ base: "5", md: "6" }}
        borderWidth="1px"
        borderColor="teal.200"
        borderRadius="2xl"
        background="linear-gradient(135deg, rgba(240,253,250,0.95), rgba(255,251,235,0.95))"
      >
        <Heading size="md">
          {isEnglish ? "E-prescription & online pharmacy" : "E‑Rezept & Online‑Apotheke"}
        </Heading>

        <Text marginTop="3" color="gray.700">
          {isEnglish
            ? "Curaelis helps you organize your medication plan and reminders. E-prescriptions are redeemed securely outside Curaelis via the official e-prescription app, your health insurance app, or directly at a pharmacy or online pharmacy."
            : "Curaelis hilft dir, deinen Medikamentenplan und Erinnerungen zu organisieren. E‑Rezepte löst du sicher außerhalb von Curaelis ein – über die offizielle E‑Rezept-App, deine Krankenkassen-App oder direkt bei einer Apotheke/Online-Apotheke."}
        </Text>

        <Text marginTop="3" fontSize="sm" color="gray.600">
          {isEnglish
            ? "Curaelis does not process prescription codes, does not transmit prescriptions and does not order medication."
            : "Curaelis verarbeitet keine Rezeptcodes, übermittelt keine Rezepte und bestellt keine Medikamente."}
        </Text>

        <Flex marginTop="5" gap="3" wrap="wrap" align="stretch">
          <Button
            as="a"
            href={ePrescriptionInfoUrl}
            target="_blank"
            rel="noopener noreferrer"
            colorPalette="teal"
            flex={{ base: "1 1 100%", md: "0 1 auto" }}
            minWidth={{ base: "100%", md: "260px" }}
            whiteSpace="normal"
            height="auto"
            minHeight="48px"
            paddingY="3"
          >
            {isEnglish
              ? "Open official information"
              : "Offizielle Infos öffnen"}
          </Button>

          <Button
            as="a"
            href={ePrescriptionAppInfoUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            colorPalette="teal"
            flex={{ base: "1 1 100%", md: "0 1 auto" }}
            minWidth={{ base: "100%", md: "260px" }}
            whiteSpace="normal"
            height="auto"
            minHeight="48px"
            paddingY="3"
          >
            {isEnglish
              ? "Learn about the e-prescription app"
              : "E‑Rezept-App ansehen"}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default MedicationsPage;
