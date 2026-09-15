import { Box, Button, Heading, List, Text } from "@chakra-ui/react";
import { Capacitor } from "@capacitor/core";
import { Link } from "react-router-dom";
import SafetyNotice from "../components/SafetyNotice";
import useLanguage from "../hooks/useLanguage";

function AboutPage() {
  const { isEnglish } = useLanguage();
  const isNativeApp = Capacitor.isNativePlatform();
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

      {!isNativeApp && (
        <Box className="about-install-card">
          <Heading size="md">
            {isEnglish ? "Use Curaelis like an app" : "Curaelis wie eine App nutzen"}
          </Heading>
          <Text marginTop="2">
            {isEnglish
              ? "Install the Curaelis web app on your device for quick access from the home screen."
              : "Installiere die Curaelis-Web-App auf deinem Gerät und öffne sie schnell über den Startbildschirm."}
          </Text>
          <Button
            as={Link}
            to="/installieren"
            marginTop="4"
            size="lg"
            colorPalette="teal"
            className="about-install-button"
          >
            📱 Curaelis installieren
          </Button>
        </Box>
      )}

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

      <List.Root marginTop="4" className="about-feature-list">
        <List.Item className="about-feature-item">
          {isEnglish ? "Search medications and filter by category" : "Medikamente suchen und nach Kategorien filtern"}
        </List.Item>

        <List.Item className="about-feature-item">
          {isEnglish ? "View detailed information and sources" : "Detailinformationen und Quellen aufrufen"}
        </List.Item>

        <List.Item className="about-feature-item">
          {isEnglish ? "Create personal medication plans with dosage, intake times and notes" : "Persönliche Medikamentenpläne mit Dosierung, Einnahmezeiten und Notizen anlegen"}
        </List.Item>

        <List.Item className="about-feature-item">
          {isEnglish ? "Set up intake reminders and test notifications" : "Einnahmeerinnerungen einrichten und Testbenachrichtigungen senden"}
        </List.Item>

        <List.Item className="about-feature-item">
          {isEnglish ? "Save personal data securely in your user account" : "Persönliche Daten sicher im Benutzerkonto speichern"}
        </List.Item>

        <List.Item className="about-feature-item">
          {isEnglish ? "Record weight, blood pressure, pulse and other health values" : "Gewicht, Blutdruck, Puls und weitere Gesundheitswerte dokumentieren"}
        </List.Item>

        <List.Item className="about-feature-item">
          {isEnglish ? "Edit or delete health entries and view measurements in clear visual trends" : "Gesundheitseinträge bearbeiten oder löschen und Messwerte in klaren grafischen Verläufen ansehen"}
        </List.Item>

        <List.Item className="about-feature-item">
          {isEnglish ? "Manage a private emergency pass with selected medications, health values and emergency details" : "Einen privaten Notfallpass mit ausgewählten Medikamenten, Gesundheitswerten und Notfallangaben verwalten"}
        </List.Item>

        <List.Item className="about-feature-item">
          {isEnglish ? "Save up to three emergency contacts and prepare a help message" : "Bis zu drei Notfallkontakte speichern und eine Hilfenachricht vorbereiten"}
        </List.Item>

        <List.Item className="about-feature-item">
          {isEnglish ? "Prepare a printable doctor overview, attach files or photos and share it by email" : "Eine druckbare Arztübersicht erstellen, Dateien oder Bilder anfügen und per E-Mail teilen"}
        </List.Item>

        <List.Item className="about-feature-item">
          {isEnglish ? "Save a doctor's practice email address for faster report sharing" : "Die E-Mail-Adresse der Arztpraxis für einen schnelleren Versand speichern"}
        </List.Item>

        <List.Item className="about-feature-item">
          {isEnglish ? "Use the first-time setup assistant and reopen it later from your account" : "Den Einrichtungsassistenten beim ersten Start nutzen und später im Konto erneut öffnen"}
        </List.Item>

        <List.Item className="about-feature-item">
          {isEnglish ? "Adjust font size, contrast, read-aloud support and language" : "Schriftgröße, Kontrast, Vorlesefunktion und Sprache anpassen"}
        </List.Item>
      </List.Root>

      <SafetyNotice />
    </Box>
  );
}

export default AboutPage;
