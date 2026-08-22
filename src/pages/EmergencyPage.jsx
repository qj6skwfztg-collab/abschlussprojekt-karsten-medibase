import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import EmergencyContacts from "../components/EmergencyContacts";

function EmergencyPage() {
  return (
    <Box maxWidth="700px" margin="0 auto" padding="6">
      <Box
        background="red.50"
        border="2px solid"
        borderColor="red.500"
        borderRadius="xl"
        padding={{ base: "6", md: "10" }}
        textAlign="center"
      >
        <Heading color="red.700" marginBottom="4">
          Notfallhilfe
        </Heading>

        <Text fontSize="lg" marginBottom="6">
          Bei akuter Lebensgefahr rufe sofort den Rettungsdienst.
        </Text>

        <Stack gap="4">
          <Button
            as="a"
            href="tel:112"
            background="red.600"
            color="white"
            size="lg"
            minHeight="70px"
            fontSize="xl"
            _hover={{ background: "red.700" }}
          >
            112 – Rettungsdienst anrufen
          </Button>

          <Button
            as="a"
            href="tel:110"
            background="blue.700"
            color="white"
            size="lg"
            minHeight="60px"
            fontSize="lg"
            _hover={{ background: "blue.800" }}
          >
            110 – Polizei anrufen
          </Button>
        </Stack>

        <Text fontSize="sm" color="gray.700" marginTop="6">
          Auf einem Smartphone öffnet sich die Telefonfunktion. Der Anruf muss
          anschließend bestätigt werden.
        </Text>
      </Box>

      <Text marginTop="6" fontSize="sm" textAlign="center" color="gray.600">
        MediBase ersetzt kein offizielles Notrufsystem. Die App kann nicht
        feststellen, ob der Notruf angenommen oder ein Rettungswagen geschickt
        wurde.
      </Text>

        <EmergencyContacts />
    </Box>
  );
}

export default EmergencyPage;
