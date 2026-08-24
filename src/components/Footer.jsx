import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useLanguage from "../hooks/useLanguage";

function Footer() {
  const { isEnglish } = useLanguage();
  return (
    <Box
      as="footer"
      background="teal.800"
      color="white"
      padding="6"
      marginTop="10"
      textAlign="center"
    >
      <Text fontWeight="bold">
        Curaelis
      </Text>

      <Text marginTop="2" fontSize="sm">
        {isEnglish
          ? "Medication information for general guidance. No medical advice."
          : "Arzneimittelinformationen zur allgemeinen Orientierung. Keine medizinische Beratung."}
      </Text>

      <Text marginTop="2" fontSize="sm">
        © 2026 Curaelis – {isEnglish ? "developed by" : "entwickelt von"} Karsten Rabeneck-Ketme
      </Text>

      <Flex justify="center" gap="4" marginTop="4" fontSize="sm">
        <Link to="/impressum">
          {isEnglish ? "Legal notice" : "Impressum"}
        </Link>
        <Link to="/datenschutz">
          {isEnglish ? "Privacy policy" : "Datenschutz"}
        </Link>
      </Flex>
    </Box>
  );
}

export default Footer;
