import {
  Box,
  Button,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMedications from "../hooks/useMedications";
import useLanguage from "../hooks/useLanguage";

function MedicationForm() {
  const { isEnglish } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    source: "",
  });

  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { addMedication } = useMedications();
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const cleanedFormData = {
      name: formData.name.trim(),
      category: formData.category.trim(),
      description: formData.description.trim(),
      source: formData.source.trim(),
    };

    if (
      cleanedFormData.name.length < 2 ||
      cleanedFormData.category.length < 2 ||
      cleanedFormData.description.length < 5 ||
      cleanedFormData.source.length < 5
    ) {
      setError(
        isEnglish ? "Please complete all fields." : "Bitte fülle alle Felder vollständig aus."
      );
      return;
    }

    try {
      setIsSaving(true);

      await addMedication(cleanedFormData);

      navigate("/medikamente");
    } catch {
      setError(
        isEnglish ? "The medication could not be saved." : "Das Medikament konnte nicht gespeichert werden."
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      maxWidth="600px"
      marginTop="6"
    >
      <Stack gap="4">
        <label htmlFor="name">{isEnglish ? "Medication name" : "Name des Medikaments"}</label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          background="white"
        />

        <label htmlFor="category">{isEnglish ? "Category" : "Kategorie"}</label>
        <Input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          background="white"
        />

        <label htmlFor="description">{isEnglish ? "Description" : "Beschreibung"}</label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          background="white"
        />

        <label htmlFor="source">{isEnglish ? "Information source" : "Informationsquelle"}</label>
        <Input
          id="source"
          name="source"
          value={formData.source}
          onChange={handleChange}
          background="white"
        />

        {error && (
          <Text color="red.600" fontWeight="bold">
            {error}
          </Text>
        )}

        <Button
          type="submit"
          colorPalette="teal"
          disabled={isSaving}
        >
          {isSaving
            ? (isEnglish ? "Saving ..." : "Wird gespeichert ...")
            : (isEnglish ? "Save medication" : "Medikament speichern")}
        </Button>
      </Stack>
    </Box>
  );
}

export default MedicationForm;
