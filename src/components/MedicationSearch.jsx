import { Box, Input, Text } from "@chakra-ui/react";

function MedicationSearch({
  searchTerm,
  onSearchChange,
}) {
  return (
    <Box marginTop="6" maxWidth="500px">
      <Text
        as="label"
        htmlFor="medication-search"
        fontWeight="bold"
      >
        Medikament suchen
      </Text>

      <Input
        id="medication-search"
        type="search"
        value={searchTerm}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
        placeholder="Zum Beispiel Paracetamol"
        marginTop="2"
        background="white"
      />
    </Box>
  );
}

export default MedicationSearch;
