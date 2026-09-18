import { Box, Heading, Link, List, Text } from "@chakra-ui/react";
import useLanguage from "../hooks/useLanguage";

function PrivacyPage() {
  const { isEnglish } = useLanguage();

  return (
    <Box maxW="900px" mx="auto" p="6">
      <Heading mb="6">{isEnglish ? "Privacy policy" : "Datenschutzerklärung"}</Heading>

      <Text mb="6">
        {isEnglish ? "Last updated: 23 August 2026" : "Stand: 23. August 2026"}
      </Text>

      <Heading size="md" mb="3">
        {isEnglish ? "1. Controller" : "1. Verantwortlicher"}
      </Heading>

      <Text>
        {isEnglish
          ? "The controller responsible for the processing of personal data in this application is:"
          : "Verantwortlich für die Verarbeitung personenbezogener Daten in dieser Anwendung ist:"}
        <br />
        <br />
        Karsten Rabeneck-Ketme
        <br />
        Bielefelder Str. 37
        <br />
        49186 Bad Iburg
        <br />
        <br />
        E-Mail:{" "}
        <a href="mailto:karsten.ketme@outlook.com">
          karsten.ketme@outlook.com
        </a>
        <br />
        {isEnglish ? "Phone" : "Telefon"}: 0171 2986859
      </Text>

      <Heading size="md" mt="8" mb="3">
        {isEnglish ? "2. What data is processed" : "2. Welche Daten verarbeitet werden"}
      </Heading>

      <List.Root pl="6">
        <List.Item>
          {isEnglish
            ? "During registration, the email address and account data required for login are processed."
            : "Bei der Registrierung werden die E-Mail-Adresse und die für die Anmeldung erforderlichen Kontodaten verarbeitet."}
        </List.Item>
        <List.Item>
          {isEnglish
            ? "Personal medications can be stored with name, dosage, intake time and personal note."
            : "Persönliche Medikamente können mit Name, Dosierung, Einnahmezeit und persönlicher Notiz gespeichert werden."}
        </List.Item>
        <List.Item>
          {isEnglish
            ? "Emergency contacts can be stored with name and phone number."
            : "Notfallkontakte können mit Name und Telefonnummer gespeichert werden."}
        </List.Item>
        <List.Item>
          {isEnglish
            ? "Language, font size, contrast setting and reminder status can be stored locally in the browser."
            : "Sprache, Schriftgröße, Kontrast-Einstellung und Erinnerungsstatus können lokal im Browser gespeichert werden."}
        </List.Item>
        <List.Item>
          {isEnglish
            ? "Browser notifications are only used if you explicitly allow them in your browser."
            : "Browser-Benachrichtigungen werden nur verwendet, wenn du sie in deinem Browser ausdrücklich erlaubst."}
        </List.Item>
      </List.Root>

      <Heading size="md" mt="8" mb="3">
        {isEnglish ? "3. Purpose and legal basis" : "3. Zweck und Rechtsgrundlage"}
      </Heading>

      <Text>
        {isEnglish
          ? "The data is processed to enable registration, login, personal medication management, emergency contacts and reminders within the application. Where necessary, processing takes place to provide the functions requested by you and to technically secure the application."
          : "Die Daten werden verarbeitet, um Registrierung, Anmeldung, persönliche Medikamentenverwaltung, Notfallkontakte und Erinnerungen innerhalb der Anwendung zu ermöglichen. Die Verarbeitung erfolgt, soweit erforderlich, zur Durchführung der von dir gewünschten Funktionen und zur technischen Absicherung der Anwendung."}
      </Text>

      <Heading size="md" mt="8" mb="3">
        {isEnglish ? "4. Firebase and technical service providers" : "4. Firebase und technische Dienstleister"}
      </Heading>

      <Text>
        {isEnglish
          ? "For authentication and storage, Curaelis uses Firebase Authentication and Cloud Firestore. Firebase App Check with reCAPTCHA Enterprise is also used to protect the application. The application is provided via Vercel. Technical connection data may be processed as part of hosting and security functions."
          : "Für Authentifizierung und Speicherung verwendet Curaelis Firebase Authentication und Cloud Firestore. Für den Schutz der Anwendung wird außerdem Firebase App Check mit reCAPTCHA Enterprise eingesetzt. Die Anwendung wird über Vercel bereitgestellt. Dabei können technische Verbindungsdaten im Rahmen des Hostings und der Sicherheitsfunktionen verarbeitet werden."}
      </Text>

      <Text mt="3">
        {isEnglish
          ? "Further information can be found in the privacy notices of "
          : "Weitere Informationen findest du in den Datenschutzhinweisen von "}
        <Link
          href="https://firebase.google.com/support/privacy"
          target="_blank"
          rel="noreferrer"
        >
          Firebase/Google
        </Link>
        {isEnglish ? " and " : " und "}
        <Link
          href="https://vercel.com/legal/privacy-policy"
          target="_blank"
          rel="noreferrer"
        >
          Vercel
        </Link>
        .
      </Text>

      <Heading size="md" mt="8" mb="3">
        {isEnglish ? "5. Storage period and deletion" : "5. Speicherdauer und Löschung"}
      </Heading>

      <Text>
        {isEnglish
          ? "Personal data is generally stored for as long as your user account and the respective functions are used. You can permanently delete your user account, personal medications and emergency contacts at any time in the My account area. Deletion or information can also be requested via the contact option listed above."
          : "Persönliche Daten werden grundsätzlich so lange gespeichert, wie dein Benutzerkonto und die jeweiligen Funktionen genutzt werden. Du kannst dein Benutzerkonto sowie deine persönlichen Medikamente und Notfallkontakte jederzeit über den Bereich „Mein Konto“ dauerhaft löschen. Eine Löschung oder Auskunft kann zusätzlich über die oben genannte Kontaktmöglichkeit angefragt werden."}
      </Text>

      <Heading size="md" mt="8" mb="3">
        {isEnglish ? "6. Your rights" : "6. Deine Rechte"}
      </Heading>

      <Text>
        {isEnglish
          ? "Within the legal requirements, you have in particular the right to access, rectification, deletion, restriction of processing, data portability and objection. You also have the right to lodge a complaint with a data protection supervisory authority."
          : "Du hast im Rahmen der gesetzlichen Voraussetzungen insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Außerdem besteht ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde."}
      </Text>

      <Heading size="md" mt="8" mb="3">
        {isEnglish ? "7. Medical notice" : "7. Medizinischer Hinweis"}
      </Heading>

      <Text>
        {isEnglish
          ? "This application is intended for the personal organization of health information. It does not replace medical advice, diagnosis or treatment. Medical decisions must not be made solely based on the information displayed. If you have questions, please contact a doctor or pharmacy. In an emergency, call your local emergency number."
          : "Diese Anwendung dient der persönlichen Organisation von Gesundheitsinformationen. Sie ersetzt keine ärztliche Beratung, Diagnose oder Behandlung. Medizinische Entscheidungen dürfen nicht allein aufgrund der angezeigten Informationen getroffen werden. Bitte wende dich bei Fragen an Ärztin, Arzt oder Apotheke. Im Notfall rufe deine lokale Notrufnummer an; in Deutschland und vielen EU-Ländern ist das die 112."}
      </Text>
    </Box>
  );
}

export default PrivacyPage;
