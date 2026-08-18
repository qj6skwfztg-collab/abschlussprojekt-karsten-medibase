import { Box, Heading, Text } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import SafetyNotice from "../components/SafetyNotice";
import useMedications from "../hooks/useMedications";

function MedicationDetailPage() {
  const { id } = useParams();
  const { medications } = useMedications();

  const medication = medications.find(
    (item) => item.id === id
  );

  if (!medication) {
    return (
      <Box padding="8">
        <Heading>Medikament nicht gefunden</Heading>

        <Text marginTop="4">
          Zu dieser Adresse wurde kein Medikament gefunden.
        </Text>

        <Text marginTop="4" color="teal.700">
          <Link to="/medikamente">
            Zurück zur Übersicht
          </Link>
        </Text>
      </Box>
    );
  }

  return (
    <Box padding="8">
      <Heading>{medication.name}</Heading>

      <Text marginTop="4" fontWeight="bold" color="teal.700">
        {medication.category}
      </Text>

      <Text marginTop="4">
        {medication.description}
      </Text>

      <SafetyNotice />

      {medication.sourceUrl ? (
        <Text marginTop="6" color="teal.700">
          <a
            href={medication.sourceUrl}
            target="_blank"
            rel="noreferrer"
          >
            Informationsquelle: {medication.source}
          </a>
        </Text>
      ) : (
        <Text marginTop="6" fontSize="sm" color="gray.600">
          Informationsquelle: {medication.source}
        </Text>
      )}

      <Text marginTop="6" color="teal.700">
        <Link to="/medikamente">
          Zurück zur Übersicht
        </Link>
      </Text>
    </Box>
  );
}

export default MedicationDetailPage;


