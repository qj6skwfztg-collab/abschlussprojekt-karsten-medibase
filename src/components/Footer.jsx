import { Box, Text } from "@chakra-ui/react";

function Footer() {
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
        MediBase
      </Text>

      <Text marginTop="2" fontSize="sm">
        Arzneimittelinformationen zur allgemeinen Orientierung.
        Keine medizinische Beratung.
      </Text>

      <Text marginTop="2" fontSize="sm">
        © 2026 MediBase – entwickelt von Karsten Rabeneck-Ketme
      </Text>
    </Box>
  );
}

export default Footer;
