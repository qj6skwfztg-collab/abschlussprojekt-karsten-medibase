import { Box, Heading, List, Text } from "@chakra-ui/react";
import SafetyNotice from "../components/SafetyNotice";

function AboutPage() {
  return (
    <Box
      padding={{ base: "6", md: "10" }}
      maxWidth="900px"
      margin="0 auto"
    >
      <Heading>Über MediBase</Heading>

      <Text marginTop="4">
        MediBase ist eine React-Webanwendung, die allgemeine
        Informationen über häufig verwendete Medikamente
        übersichtlich darstellt.
      </Text>

      <Heading size="md" marginTop="8">
        Funktionen der Anwendung
      </Heading>

      <List.Root marginTop="4" paddingLeft="6">
        <List.Item>
          Medikamente suchen und nach Kategorien filtern
        </List.Item>

        <List.Item>
          Detailinformationen und Quellen aufrufen
        </List.Item>

        <List.Item>
          Eigene Medikamenteneinträge erstellen
        </List.Item>

        <List.Item>
          Eigene Einträge dauerhaft im Browser speichern
        </List.Item>
      </List.Root>

      <Heading size="md" marginTop="8">
        Ziel des Projekts
      </Heading>

      <Text marginTop="4">
        Das Projekt zeigt den Einsatz moderner React-Techniken
        wie Routing, Komponenten, Hooks, Context und
        localStorage.
      </Text>

      <SafetyNotice />
    </Box>
  );
}

export default AboutPage;
