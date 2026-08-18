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

function MedicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    source: "",
  });

  const [error, setError] = useState("");

  const { addMedication } = useMedications();
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const hasEmptyField = Object.values(formData).some(
      (value) => value.trim() === ""
    );

    if (hasEmptyField) {
      setError("Bitte fülle alle Felder aus.");
      return;
    }

    const id =
      formData.name
        .toLowerCase()
        .replaceAll(" ", "-") +
      "-" +
      Date.now();

    addMedication({
      id,
      ...formData,
    });

    navigate("/medikamente");
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      maxWidth="600px"
      marginTop="6"
    >
      <Stack gap="4">
        <label htmlFor="name">Name des Medikaments</label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          background="white"
        />

        <label htmlFor="category">Kategorie</label>
        <Input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          background="white"
        />

        <label htmlFor="description">Beschreibung</label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          background="white"
        />

        <label htmlFor="source">Informationsquelle</label>
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

        <Button type="submit" colorPalette="teal">
          Medikament speichern
        </Button>
      </Stack>
    </Box>
  );
}

export default MedicationForm;
