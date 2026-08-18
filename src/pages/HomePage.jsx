import { Box, Heading, Text } from "@chakra-ui/react";
import SafetyNotice from "../components/SafetyNotice";

function HomePage() {
  return (
    <Box padding="8">
      <Heading>Willkommen bei MediBase</Heading>

      <Text marginTop="4">
        Medikamente verständlich und übersichtlich nachschlagen.
      </Text>

      <Text marginTop="4">
        Nutze die Medikamentenübersicht, um allgemeine Informationen
        zu verschiedenen Wirkstoffen aufzurufen.
      </Text>

      <SafetyNotice />
    </Box>
  );
}

export default HomePage;
