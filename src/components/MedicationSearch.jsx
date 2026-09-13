import { Box, Input, Text } from "@chakra-ui/react";
import useLanguage from "../hooks/useLanguage";

function MedicationSearch({
  searchTerm,
  onSearchChange,
  id = "medication-search",
}) {
  const { isEnglish } = useLanguage();
  return (
    <Box id={id} marginTop="6" maxWidth="500px" scrollMarginTop="24px">
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
