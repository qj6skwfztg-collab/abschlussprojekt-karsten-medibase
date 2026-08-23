import { Box, Heading, Link, List, Text } from "@chakra-ui/react";

function PrivacyPage() {
  return (
    <Box maxW="900px" mx="auto" p="6">
      <Heading mb="6">Datenschutzerklärung</Heading>

      <Text mb="6">
        Stand: 23. August 2026
      </Text>

      <Heading size="md" mb="3">
        1. Verantwortlicher
      </Heading>

      <Text>
        Verantwortlich für die Verarbeitung personenbezogener Daten in dieser
        Anwendung ist:
        <br />
        <br />
        Karsten Rabeneck-Ketme
        <br />
        Bielefelder Str. 37
        <br />
        49186 Bad Iburg
        <br />
        E-Mail: {" "}
        <a href="mailto:karsten.ketme@outlook.com">
          karsten.ketme@outlook.com
        </a>
        <br />
        Telefon: 0171 2986859
      </Text>

      <Heading size="md" mt="8" mb="3">
        2. Welche Daten verarbeitet werden
      </Heading>

      <List.Root pl="6">
        <List.Item>
          Bei der Registrierung werden die E-Mail-Adresse und die für die
          Anmeldung erforderlichen Kontodaten verarbeitet.
        </List.Item>
        <List.Item>
          Persönliche Medikamente können mit Name, Dosierung, Einnahmezeit und
          persönlicher Notiz gespeichert werden.
        </List.Item>
        <List.Item>
          Notfallkontakte können mit Name und Telefonnummer gespeichert werden.
        </List.Item>
        <List.Item>
          Sprache, Schriftgröße, Kontrast-Einstellung und Erinnerungsstatus
          können lokal im Browser gespeichert werden.
        </List.Item>
        <List.Item>
          Browser-Benachrichtigungen werden nur verwendet, wenn du sie in deinem
          Browser ausdrücklich erlaubst.
        </List.Item>
      </List.Root>

      <Heading size="md" mt="8" mb="3">
        3. Zweck und Rechtsgrundlage
      </Heading>

      <Text>
        Die Daten werden verarbeitet, um Registrierung, Anmeldung, persönliche
        Medikamentenverwaltung, Notfallkontakte und Erinnerungen innerhalb der
        Anwendung zu ermöglichen. Die Verarbeitung erfolgt, soweit erforderlich,
        zur Durchführung der von dir gewünschten Funktionen und zur technischen
        Absicherung der Anwendung.
      </Text>

      <Heading size="md" mt="8" mb="3">
        4. Firebase und technische Dienstleister
      </Heading>

      <Text>
        Für Authentifizierung und Speicherung verwendet MediPervin Firebase
        Authentication und Cloud Firestore. Für den Schutz der Anwendung wird
        außerdem Firebase App Check mit reCAPTCHA Enterprise eingesetzt. Die
        Anwendung wird über Vercel bereitgestellt. Dabei können technische
        Verbindungsdaten im Rahmen des Hostings und der Sicherheitsfunktionen
        verarbeitet werden.
      </Text>

      <Text mt="3">
        Weitere Informationen findest du in den Datenschutzhinweisen von {" "}
        <Link
          href="https://firebase.google.com/support/privacy"
          target="_blank"
          rel="noreferrer"
        >
          Firebase/Google
        </Link>
        {" "}und{ " "}
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
        5. Speicherdauer und Löschung
      </Heading>

      <Text>
        Persönliche Daten werden grundsätzlich so lange gespeichert, wie dein
        Benutzerkonto und die jeweiligen Funktionen genutzt werden. Eine
        Löschung oder Auskunft kann über die oben genannte Kontaktadresse
        angefragt werden.
      </Text>

      <Heading size="md" mt="8" mb="3">
        6. Deine Rechte
      </Heading>

      <Text>
        Du hast im Rahmen der gesetzlichen Voraussetzungen insbesondere das
        Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
        Verarbeitung, Datenübertragbarkeit und Widerspruch. Außerdem besteht
        ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde.
      </Text>

      <Heading size="md" mt="8" mb="3">
        7. Medizinischer Hinweis
      </Heading>

      <Text>
        MediPervin verarbeitet persönliche Angaben zur Nutzung der Anwendung,
        bietet aber keine medizinische Beratung. Medikamenteninformationen sind
        nur allgemeine Orientierung und ersetzen keine Packungsbeilage oder
        Beratung durch medizinisches Fachpersonal.
      </Text>
    </Box>
  );
}

export default PrivacyPage;
