import { Box, Heading, Text } from "@chakra-ui/react";

function SafetyNotice() {
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
        Wichtiger medizinischer Hinweis
      </Heading>

      <Text marginTop="2">
        Die Informationen in MediBase dienen nur der allgemeinen
        Orientierung. Sie ersetzen weder die Packungsbeilage noch
        die Beratung durch medizinisches Fachpersonal.
      </Text>
    </Box>
  );
}

export default SafetyNotice;
