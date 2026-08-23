import { Box, Heading, List, Text } from "@chakra-ui/react";
import SafetyNotice from "../components/SafetyNotice";
import useLanguage from "../hooks/useLanguage";

function AboutPage() {
  const { isEnglish } = useLanguage();
  return (
    <Box
      padding={{ base: "6", md: "10" }}
      maxWidth="900px"
      margin="0 auto"
    >
      <Heading>{isEnglish ? "About MediPervin" : "Über MediPervin"}</Heading>

      <Text marginTop="4">
        {isEnglish
          ? "MediPervin is a React web application that clearly presents general information about commonly used medications."
          : "MediPervin ist eine React-Webanwendung, die allgemeine Informationen über häufig verwendete Medikamente übersichtlich darstellt."}
      </Text>

      <Text marginTop="4" fontStyle="italic">
        {isEnglish
          ? "The name MediPervin is dedicated to my beloved wife, Pervin Ketme. The application was developed by Karsten Rabeneck-Ketme."
          : "Der Name MediPervin ist meiner lieben Ehefrau Pervin Ketme gewidmet. Entwickelt wurde die Anwendung von Karsten Rabeneck-Ketme."}
      </Text>

      <Heading size="md" marginTop="8">
        {isEnglish ? "Application features" : "Funktionen der Anwendung"}
      </Heading>

      <List.Root marginTop="4" paddingLeft="6">
        <List.Item>
          {isEnglish ? "Search medications and filter by category" : "Medikamente suchen und nach Kategorien filtern"}
        </List.Item>

        <List.Item>
          {isEnglish ? "View detailed information and sources" : "Detailinformationen und Quellen aufrufen"}
        </List.Item>

        <List.Item>
          {isEnglish ? "Create personal medication entries" : "Eigene Medikamenteneinträge erstellen"}
        </List.Item>

        <List.Item>
          {isEnglish ? "Save personal entries securely in the user account" : "Eigene Einträge sicher im Benutzerkonto speichern"}
        </List.Item>
      </List.Root>

      <Heading size="md" marginTop="8">
        {isEnglish ? "Project goal" : "Ziel des Projekts"}
      </Heading>

      <Text marginTop="4">
        {isEnglish
          ? "The project demonstrates modern React techniques such as routing, components, hooks, context and Firebase."
          : "Das Projekt zeigt den Einsatz moderner React-Techniken wie Routing, Komponenten, Hooks, Context und Firebase."}
      </Text>

      <SafetyNotice />
    </Box>
  );
}

export default AboutPage;
