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
      <Heading>{isEnglish ? "About Curaelis" : "Über Curaelis"}</Heading>

      <Text marginTop="4">
        {isEnglish
          ? "Curaelis brings medication information, personal medication plans, intake reminders, health measurements and emergency details together in one calm, clearly structured place. The goal is to make everyday health organisation easier to understand and easier to manage."
          : "Curaelis verbindet verständliche Medikamenteninformationen, persönliche Medikamentenpläne, Einnahmeerinnerungen, Gesundheitsmesswerte und wichtige Notfalldaten an einem ruhigen, klar strukturierten Ort. So wird die Organisation im Gesundheitsalltag verständlicher und leichter handhabbar."}
      </Text>

      <Box as="details" marginTop="5" className="about-founder-details">
        <Box as="summary" cursor="pointer" color="teal.800" fontWeight="700">
          {isEnglish ? "About the developer" : "Über den Entwickler"}
        </Box>
        <Text marginTop="3" fontStyle="italic" color="gray.600">
          {isEnglish
            ? "This app is dedicated to my beloved wife, Pervin Ketme. Curaelis was developed by Karsten Rabeneck-Ketme."
            : "Diese App ist meiner lieben Ehefrau Pervin Ketme gewidmet. Entwickelt wurde Curaelis von Karsten Rabeneck-Ketme."}
        </Text>
      </Box>

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

        <List.Item>
          {isEnglish ? "Record weight, blood pressure, pulse and other health values" : "Gewicht, Blutdruck, Puls und weitere Gesundheitswerte dokumentieren"}
        </List.Item>

        <List.Item>
          {isEnglish ? "View saved measurements in a clear visual trend" : "Gespeicherte Messwerte in einem klaren grafischen Verlauf ansehen"}
        </List.Item>

        <List.Item>
          {isEnglish ? "Prepare a printable health overview for a medical appointment" : "Eine druckbare Gesundheitsübersicht für den Arzttermin erstellen"}
        </List.Item>
      </List.Root>

      <SafetyNotice />
    </Box>
  );
}

export default AboutPage;
