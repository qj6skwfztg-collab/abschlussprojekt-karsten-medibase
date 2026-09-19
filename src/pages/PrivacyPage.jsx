import { Box, Heading, Link, List, Text } from "@chakra-ui/react";
import useLanguage from "../hooks/useLanguage";

function PrivacyPage() {
  const { isEnglish } = useLanguage();

  return (
    <Box maxW="900px" mx="auto" p="6">
      <Heading mb="6">{isEnglish ? "Privacy policy" : "Datenschutzerklärung"}</Heading>

      <Text mb="6">
        {isEnglish ? "Last updated: 20 September 2026" : "Stand: 20. September 2026"}
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

      <Text mb="3">
        {isEnglish
          ? "Curaelis processes the information that you enter yourself or that is required to provide the app functions. This may include in particular:"
          : "Curaelis verarbeitet die Informationen, die du selbst eingibst oder die zur Bereitstellung der App-Funktionen erforderlich sind. Dazu können insbesondere gehören:"}
      </Text>

      <List.Root pl="6">
        <List.Item>
          {isEnglish
            ? "registration and login data, in particular email address and technical account ID;"
            : "Registrierungs- und Anmeldedaten, insbesondere E-Mail-Adresse und technische Benutzer-ID;"}
        </List.Item>
        <List.Item>
          {isEnglish
            ? "personal medication data such as medication name, dosage, intake times, reminder settings and personal notes;"
            : "persönliche Medikamentendaten wie Medikamentenname, Dosierung, Einnahmezeiten, Erinnerungseinstellungen und persönliche Notizen;"}
        </List.Item>
        <List.Item>
          {isEnglish
            ? "health diary entries and health values, for example blood pressure, pulse, blood sugar or other values entered by you;"
            : "Gesundheitstagebuch-Einträge und Gesundheitswerte, zum Beispiel Blutdruck, Puls, Blutzucker oder andere von dir eingegebene Werte;"}
        </List.Item>
        <List.Item>
          {isEnglish
            ? "emergency pass data such as name, date of birth, phone number, address, doctor or practice, blood group and special notes;"
            : "Notfallpass-Daten wie Name, Geburtsdatum, Telefonnummer, Adresse, Hausarzt oder Praxis, Blutgruppe und besondere Hinweise;"}
        </List.Item>
        <List.Item>
          {isEnglish
            ? "emergency contacts with name and phone number;"
            : "Notfallkontakte mit Name und Telefonnummer;"}
        </List.Item>
        <List.Item>
          {isEnglish
            ? "doctor package and PDF preparation data, if you use these functions to prepare an overview for medical appointments;"
            : "Arztpaket- und PDF-Vorbereitungsdaten, wenn du diese Funktionen nutzt, um eine Übersicht für Arzttermine vorzubereiten;"}
        </List.Item>
        <List.Item>
          {isEnglish
            ? "email address of a medical practice, if you store it voluntarily;"
            : "E-Mail-Adresse einer Arztpraxis, wenn du sie freiwillig speicherst;"}
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

      <Text mt="3">
        {isEnglish
          ? "Health information is particularly sensitive. Curaelis only processes this information to provide the functions selected by you. The app does not use this data for advertising or tracking."
          : "Gesundheitsinformationen sind besonders sensibel. Curaelis verarbeitet diese Informationen nur, um die von dir ausgewählten Funktionen bereitzustellen. Die App nutzt diese Daten nicht für Werbung oder Tracking."}
      </Text>

      <Heading size="md" mt="8" mb="3">
        {isEnglish ? "3. Purpose and legal basis" : "3. Zweck und Rechtsgrundlage"}
      </Heading>

      <Text>
        {isEnglish
          ? "The data is processed to enable registration, login, personal medication management, reminders, health diary functions, emergency contacts, emergency pass functions and document preparation within the application. The legal basis is, where applicable, the performance of the app usage contract or pre-contractual measures, your voluntary use of the respective functions and, for technical protection of the application, our legitimate interest in secure and reliable operation."
          : "Die Daten werden verarbeitet, um Registrierung, Anmeldung, persönliche Medikamentenverwaltung, Erinnerungen, Gesundheitstagebuch-Funktionen, Notfallkontakte, Notfallpass-Funktionen und die Dokumentenvorbereitung innerhalb der Anwendung zu ermöglichen. Rechtsgrundlage ist, soweit einschlägig, die Durchführung des App-Nutzungsverhältnisses beziehungsweise vorvertraglicher Maßnahmen, deine freiwillige Nutzung der jeweiligen Funktionen sowie für die technische Absicherung der Anwendung unser berechtigtes Interesse an einem sicheren und zuverlässigen Betrieb."}
      </Text>

      <Text mt="3">
        {isEnglish
          ? "Health-related entries are provided voluntarily by you. You decide which health information you enter, edit or delete. Curaelis does not create medical diagnoses, treatment decisions or therapy recommendations."
          : "Gesundheitsbezogene Angaben machst du freiwillig. Du entscheidest selbst, welche Gesundheitsinformationen du eingibst, bearbeitest oder löschst. Curaelis erstellt keine medizinischen Diagnosen, Behandlungsentscheidungen oder Therapieempfehlungen."}
      </Text>

      <Heading size="md" mt="8" mb="3">
        {isEnglish ? "4. Firebase and technical service providers" : "4. Firebase und technische Dienstleister"}
      </Heading>

      <Text>
        {isEnglish
          ? "For authentication and storage, Curaelis uses Firebase Authentication and Cloud Firestore provided by Google. Firebase Authentication is used for login and account management. Cloud Firestore is used to store the personal data and app content entered by you under your user account. Firebase App Check with reCAPTCHA Enterprise is also used to protect the application against misuse and unauthorized automated access. The application and website are provided via Vercel. Technical connection data may be processed as part of hosting, security and delivery functions."
          : "Für Authentifizierung und Speicherung verwendet Curaelis Firebase Authentication und Cloud Firestore von Google. Firebase Authentication dient der Anmeldung und Kontoverwaltung. Cloud Firestore speichert die von dir eingegebenen persönlichen Daten und App-Inhalte unter deinem Benutzerkonto. Für den Schutz der Anwendung vor Missbrauch und unberechtigten automatisierten Zugriffen wird außerdem Firebase App Check mit reCAPTCHA Enterprise eingesetzt. Die Anwendung und Website werden über Vercel bereitgestellt. Dabei können technische Verbindungsdaten im Rahmen von Hosting, Sicherheit und Auslieferung verarbeitet werden."}
      </Text>

      <Text mt="3">
        {isEnglish
          ? "Depending on the technical setup of the service providers, data may also be processed outside the European Union. In such cases, appropriate safeguards are used where required by law, for example contractual data protection mechanisms of the providers."
          : "Je nach technischer Ausgestaltung der Dienstleister kann eine Verarbeitung auch außerhalb der Europäischen Union erfolgen. Soweit gesetzlich erforderlich, werden hierfür geeignete Schutzmaßnahmen genutzt, zum Beispiel vertragliche Datenschutzmechanismen der Anbieter."}
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
        {isEnglish ? "5. No advertising tracking" : "5. Kein Werbe-Tracking"}
      </Heading>

      <Text>
        {isEnglish
          ? "Curaelis does not use the personal health and account data entered by you for third-party advertising, advertising tracking or profiling for advertising purposes. Data is not sold to advertising networks."
          : "Curaelis nutzt die von dir eingegebenen persönlichen Gesundheits- und Kontodaten nicht für Drittanbieter-Werbung, Werbe-Tracking oder Profilbildung zu Werbezwecken. Daten werden nicht an Werbenetzwerke verkauft."}
      </Text>

      <Heading size="md" mt="8" mb="3">
        {isEnglish ? "6. Storage period and deletion" : "6. Speicherdauer und Löschung"}
      </Heading>

      <Text>
        {isEnglish
          ? "Personal data is generally stored for as long as your user account and the respective functions are used. You can permanently delete your user account and the personal data stored in your account at any time in the My account area. Individual entries, such as medications, health diary entries, emergency contacts or emergency pass information, can be edited or deleted within the app. Deletion or information can also be requested via the contact option listed above."
          : "Persönliche Daten werden grundsätzlich so lange gespeichert, wie dein Benutzerkonto und die jeweiligen Funktionen genutzt werden. Du kannst dein Benutzerkonto und die in deinem Konto gespeicherten persönlichen Daten jederzeit über den Bereich „Mein Konto“ dauerhaft löschen. Einzelne Einträge, zum Beispiel Medikamente, Gesundheitstagebuch-Einträge, Notfallkontakte oder Notfallpass-Angaben, können innerhalb der App bearbeitet oder gelöscht werden. Eine Löschung oder Auskunft kann zusätzlich über die oben genannte Kontaktmöglichkeit angefragt werden."}
      </Text>

      <Heading size="md" mt="8" mb="3">
        {isEnglish ? "7. Your rights" : "7. Deine Rechte"}
      </Heading>

      <Text>
        {isEnglish
          ? "Within the legal requirements, you have in particular the right to access, rectification, deletion, restriction of processing, data portability and objection. If processing is based on consent, you can withdraw this consent for the future. You also have the right to lodge a complaint with a data protection supervisory authority."
          : "Du hast im Rahmen der gesetzlichen Voraussetzungen insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Soweit eine Verarbeitung auf einer Einwilligung beruht, kannst du diese Einwilligung mit Wirkung für die Zukunft widerrufen. Außerdem besteht ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde."}
      </Text>

      <Heading size="md" mt="8" mb="3">
        {isEnglish ? "8. Medical notice" : "8. Medizinischer Hinweis"}
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
