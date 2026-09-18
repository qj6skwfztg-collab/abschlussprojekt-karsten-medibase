import { Box, Heading, Text } from "@chakra-ui/react";
import useLanguage from "../hooks/useLanguage";

function ImprintPage() {
  const { isEnglish } = useLanguage();

  return (
    <Box maxW="900px" mx="auto" p="6">
      <Heading mb="6">{isEnglish ? "Legal notice" : "Impressum"}</Heading>

      <Heading size="md" mb="3">
        {isEnglish ? "Information according to Section 5 DDG" : "Angaben gemäß § 5 DDG"}
      </Heading>

      <Text>
        Karsten Rabeneck-Ketme
        <br />
        Bielefelder Str. 37
        <br />
        49186 Bad Iburg
        <br />
        Deutschland
      </Text>

      <Heading size="md" mt="8" mb="3">
        {isEnglish ? "Contact" : "Kontakt"}
      </Heading>

      <Text>
        {isEnglish ? "Phone" : "Telefon"}: 0171 2986859
        <br />
        E-Mail:{" "}
        <a href="mailto:karsten.ketme@outlook.com">
          karsten.ketme@outlook.com
        </a>
        <br />
        Support:{" "}
        <a href="mailto:support@curaelis.com">
          support@curaelis.com
        </a>
      </Text>

      <Heading size="md" mt="8" mb="3">
        {isEnglish ? "Notice about use" : "Hinweis zur Anwendung"}
      </Heading>

      <Text>
        {isEnglish
          ? "This application is intended for the personal organization of health information. It does not replace medical advice, diagnosis or treatment. Medical decisions must not be made solely based on the information displayed. If you have questions, please contact a doctor or pharmacy. In an emergency, call your local emergency number."
          : "Diese Anwendung dient der persönlichen Organisation von Gesundheitsinformationen. Sie ersetzt keine ärztliche Beratung, Diagnose oder Behandlung. Medizinische Entscheidungen dürfen nicht allein aufgrund der angezeigten Informationen getroffen werden. Bitte wende dich bei Fragen an Ärztin, Arzt oder Apotheke. Im Notfall rufe deine lokale Notrufnummer an; in Deutschland und vielen EU-Ländern ist das die 112."}
      </Text>

      <Heading size="md" mt="8" mb="3">
        {isEnglish ? "Liability for content" : "Haftung für Inhalte"}
      </Heading>

      <Text>
        {isEnglish
          ? "The content of this application is provided for general orientation only. For individual medical decisions, medical professionals must always be consulted. In an emergency, call your local emergency number."
          : "Die Inhalte dieser Anwendung dienen ausschließlich der allgemeinen Orientierung. Für individuelle medizinische Entscheidungen ist immer medizinisches Fachpersonal zu konsultieren. Im Notfall rufe deine lokale Notrufnummer an; in Deutschland und vielen EU-Ländern ist das die 112."}
      </Text>
    </Box>
  );
}

export default ImprintPage;
