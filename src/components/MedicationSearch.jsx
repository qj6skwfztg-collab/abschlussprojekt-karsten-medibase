import { Box, Input, Text } from "@chakra-ui/react";
import useLanguage from "../hooks/useLanguage";

function MedicationSearch({
  searchTerm,
  onSearchChange,
}) {
  const { isEnglish } = useLanguage();
  return (
    <Box marginTop="6" maxWidth="500px">
      <Text
        as="label"
        htmlFor="medication-search"
        fontWeight="bold"
      >
        {isEnglish ? "Search medication" : "Medikament suchen"}
      </Text>

      <Input
        id="medication-search"
        type="search"
        value={searchTerm}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
        placeholder={isEnglish ? "For example, paracetamol" : "Zum Beispiel Paracetamol"}
        marginTop="2"
        background="white"
      />
    </Box>
  );
}

export default MedicationSearch;
