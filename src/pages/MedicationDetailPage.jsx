import { Box, Heading, Text } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import SafetyNotice from "../components/SafetyNotice";
import useMedications from "../hooks/useMedications";
import useLanguage from "../hooks/useLanguage";

function MedicationDetailPage() {
  const { isEnglish } = useLanguage();
  const { id } = useParams();
  const { medications } = useMedications();

  const medication = medications.find(
    (item) => item.id === id
  );

  if (!medication) {
    return (
      <Box padding="8">
        <Heading>{isEnglish ? "Medication not found" : "Medikament nicht gefunden"}</Heading>

        <Text marginTop="4">
          {isEnglish ? "No medication was found at this address." : "Zu dieser Adresse wurde kein Medikament gefunden."}
        </Text>

        <Text marginTop="4" color="teal.700">
          <Link to="/medikamente">
            {isEnglish ? "Back to overview" : "Zurück zur Übersicht"}
          </Link>
        </Text>
      </Box>
    );
  }

  return (
    <Box padding="8">
      <Heading>{medication.name}</Heading>

      <Text marginTop="4" fontWeight="800" color="teal.900">
        {isEnglish ? medication.categoryEn ?? medication.category : medication.category}
      </Text>

      <Text marginTop="4">
        {isEnglish ? medication.descriptionEn ?? medication.description : medication.description}
      </Text>

      <SafetyNotice />

      {medication.sourceUrl ? (
        <Text
          marginTop="6"
          color="teal.900"
          fontSize="lg"
          fontWeight="700"
        >
          <a
            href={medication.sourceUrl}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "underline" }}
          >
            {isEnglish ? "Information source" : "Informationsquelle"}: {medication.source}
          </a>
        </Text>
      ) : (
        <Text marginTop="6" fontSize="sm" color="gray.600">
          {isEnglish ? "Information source" : "Informationsquelle"}: {medication.source}
        </Text>
      )}

      <Text
        marginTop="6"
        color="teal.900"
        fontSize="lg"
        fontWeight="700"
        textDecoration="underline"
      >
        <Link to="/medikamente">
          {isEnglish ? "Back to overview" : "Zurück zur Übersicht"}
        </Link>
      </Text>
    </Box>
  );
}

export default MedicationDetailPage;
