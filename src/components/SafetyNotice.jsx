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
          ? "The information in Curaelis is for general guidance only. It does not replace the package leaflet or advice from a healthcare professional."
          : "Die Informationen in Curaelis dienen nur der allgemeinen Orientierung. Sie ersetzen weder die Packungsbeilage noch die Beratung durch medizinisches Fachpersonal."}
      </Text>
    </Box>
  );
}

export default SafetyNotice;
