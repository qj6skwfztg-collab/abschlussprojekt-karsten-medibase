import { Card, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function MedicationCard({ medication }) {
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
          {medication.category}
        </Text>

        <Text marginTop="4" color="gray.700">
          {medication.description}
        </Text>

        <Text marginTop="4" color="teal.700" fontWeight="bold">
          <Link to={`/medikamente/${medication.id}`}>
            Mehr erfahren
          </Link>
        </Text>
      </Card.Body>
    </Card.Root>
  );
}

export default MedicationCard;
