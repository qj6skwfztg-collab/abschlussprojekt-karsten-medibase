import { Box, Heading, Text } from "@chakra-ui/react";
import useLanguage from "../hooks/useLanguage";

function SafetyNotice() {
  const { isEnglish } = useLanguage();
  return (
    <Box
      background="orange.50"
      borderLeftWidth="4px"
      borderLeftColor="orange.500"
      padding="4"
      marginTop="6"
      color="gray.900"
    >
      <Heading size="sm">
        {isEnglish ? "Important medical notice" : "Wichtiger medizinischer Hinweis"}
      </Heading>

      <Text marginTop="2">
        {isEnglish
          ? "This application is intended for the personal organization of health information. It does not replace medical advice, diagnosis or treatment. Medical decisions must not be made solely based on the information displayed. If you have questions, please contact a doctor or pharmacy. In an emergency, call your local emergency number."
          : "Diese Anwendung dient der persönlichen Organisation von Gesundheitsinformationen. Sie ersetzt keine ärztliche Beratung, Diagnose oder Behandlung. Medizinische Entscheidungen dürfen nicht allein aufgrund der angezeigten Informationen getroffen werden. Bitte wende dich bei Fragen an Ärztin, Arzt oder Apotheke. Im Notfall rufe deine lokale Notrufnummer an; in Deutschland und vielen EU-Ländern ist das die 112."}
      </Text>
    </Box>
  );
}

export default SafetyNotice;
