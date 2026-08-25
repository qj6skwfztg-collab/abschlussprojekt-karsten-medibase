import { Box, Text } from "@chakra-ui/react";
import useLanguage from "../hooks/useLanguage";

function MedicationCategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  const { isEnglish } = useLanguage();
  return (
    <Box marginTop="4" maxWidth="500px">
      <Text
        as="label"
        htmlFor="category-filter"
        fontWeight="bold"
      >
        {isEnglish ? "Filter by category" : "Nach Kategorie filtern"}
      </Text>

      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(event) =>
          onCategoryChange(event.target.value)
        }
      >
        <option value="Alle">{isEnglish ? "All categories" : "Alle Kategorien"}</option>

        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </Box>
  );
}

export default MedicationCategoryFilter;
