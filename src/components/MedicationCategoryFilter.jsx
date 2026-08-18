import { Box, Text } from "@chakra-ui/react";

function MedicationCategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <Box marginTop="4" maxWidth="500px">
      <Text
        as="label"
        htmlFor="category-filter"
        fontWeight="bold"
      >
        Nach Kategorie filtern
      </Text>

      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(event) =>
          onCategoryChange(event.target.value)
        }
      >
        <option value="Alle">Alle Kategorien</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </Box>
  );
}

export default MedicationCategoryFilter;
