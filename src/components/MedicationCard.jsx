import { Card, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useLanguage from "../hooks/useLanguage";

function MedicationCard({ medication }) {
  const { isEnglish } = useLanguage();
  return (
    <Card.Root
      background="white"
      borderWidth="1px"
      borderColor="gray.300"
      boxShadow="md"
    >
      <Card.Body>
        <Heading size="md" color="gray.900">
          {medication.name}
        </Heading>

        <Text marginTop="2" color="teal.700" fontWeight="bold">
          {isEnglish ? medication.categoryEn ?? medication.category : medication.category}
        </Text>

        <Text marginTop="4" color="gray.700">
          {isEnglish ? medication.descriptionEn ?? medication.description : medication.description}
        </Text>

        <Text
          marginTop="4"
          color="teal.700"
          fontWeight="900"
          fontSize="lg"
          textDecoration="underline"
        >
          <Link to={`/medikamente/${medication.id}`}>
            {isEnglish ? "Learn more" : "Mehr erfahren"}
          </Link>
        </Text>
      </Card.Body>
    </Card.Root>
  );
}

export default MedicationCard;
