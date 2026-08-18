import { Box, Heading, Text } from "@chakra-ui/react";

function HomePage() {
  return (
    <Box padding="8">
      <Heading>Willkommen bei MediBase</Heading>

      <Text marginTop="4">
        Medikamente verständlich und übersichtlich nachschlagen.
      </Text>

      <Text marginTop="4" color="gray.600">
        Hinweis: Diese Anwendung ersetzt keine Beratung durch Arzt oder Apotheke.
      </Text>
    </Box>
  );
}

export default HomePage;
