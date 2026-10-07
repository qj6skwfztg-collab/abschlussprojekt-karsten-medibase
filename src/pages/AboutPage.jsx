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

      <Box
        marginTop="5"
        padding="5"
        borderRadius="2xl"
        borderWidth="1px"
        borderColor="teal.200"
        background="linear-gradient(135deg, rgba(236,253,245,0.96), rgba(239,246,255,0.96))"
      >
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.800">
          {isEnglish
            ? "Curaelis gives you a clear everyday health companion for a one-time purchase: a carefully built medication database, your own medication plan, saved reminders, health values with timeline and emergency contacts — without ads or a subscription."
            : "Curaelis gibt dir für einen einmaligen Kauf einen klaren Gesundheitsbegleiter für den Alltag: eine sorgfältig aufgebaute Medikamenten-Datenbank, deinen eigenen Medikamentenplan, gespeicherte Erinnerungen, Gesundheitswerte mit Zeitleiste und Notfallkontakte – ohne Werbung und ohne Abo."}
        </Text>
      </Box>

      <Box
        marginTop="6"
        padding="5"
        borderRadius="2xl"
        borderWidth="1px"
        borderColor="teal.200"
        background="linear-gradient(135deg, rgba(240,253,250,0.95), rgba(255,251,235,0.95))"
      >
        <Heading size="md">
          {isEnglish ? "What the one-time price includes" : "Was im Einmalpreis enthalten ist"}
        </Heading>

        <List.Root marginTop="4" gap="2">
          <List.Item>
            {isEnglish
              ? "A medication database for searching medications and active ingredients faster."
              : "Eine Medikamenten-Datenbank, mit der du Medikamente und Wirkstoffe schneller finden kannst."}
          </List.Item>
          <List.Item>
            {isEnglish
              ? "Your own app entries: medication plan, reminders and emergency contacts."
              : "Deine eigenen App-Einträge: Medikamentenplan, Erinnerungen und Notfallkontakte."}
          </List.Item>
          <List.Item>
            {isEnglish
              ? "Self-entered health values such as blood pressure, pulse and weight with a clear timeline."
              : "Selbst eingetragene Gesundheitswerte wie Blutdruck, Puls und Gewicht mit übersichtlicher Zeitleiste."}
          </List.Item>
          <List.Item>
            {isEnglish
              ? "Protected account storage via Firebase by Google Cloud for sign-in and saved app data."
              : "Geschützte Konto-Speicherung über Firebase von Google Cloud für Anmeldung und gespeicherte App-Daten."}
          </List.Item>
          <List.Item>
            {isEnglish
              ? "Independent development, maintenance and technical operation — without advertising-based financing."
              : "Unabhängige Entwicklung, Pflege und technischer Betrieb – ohne werbefinanzierte Nutzung."}
          </List.Item>
        </List.Root>

        <Text marginTop="4" color="gray.700">
          {isEnglish
            ? "If needed, you can share existing information or files yourself from your device, for example by email to a doctor's office. Curaelis does not replace medical documentation and does not store a complete patient record — you decide what you enter and what you share."
            : "Bei Bedarf kannst du vorhandene Informationen oder Dateien selbst über dein Gerät weiterleiten, zum Beispiel per Mail an eine Arztpraxis. Curaelis ersetzt keine ärztliche Dokumentation und speichert keine vollständige Patientenakte – du entscheidest, was du einträgst und was du teilst."}
        </Text>
      </Box>

      {!isNativeApp && (
        <Box className="about-install-card">
          <Heading size="md">
            {isEnglish ? "Use web access on your computer" : "Webzugang am Computer nutzen"}
          </Heading>
          <Text marginTop="2">
            {isEnglish
              ? "Sign in on the website to manage your data and entries comfortably on a larger screen."
              : "Melde dich auf der Website an, um deine Daten und Einträge bequem auf einem größeren Bildschirm zu bearbeiten."}
          </Text>
          <Button
            as={Link}
            to="/login"
            marginTop="4"
            size="lg"
            colorPalette="teal"
            className="about-install-button"
          >
            {isEnglish ? "Open web access" : "Webzugang öffnen"}
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
