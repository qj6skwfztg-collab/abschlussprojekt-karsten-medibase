import { useState } from "react";
import {
    Box,
    Button,
    Heading,
    Input,
    SimpleGrid,
    Stack,
    Text,
    Textarea,
} from "@chakra-ui/react";
import useUserMedications from "../hooks/useUserMedications";

function MyMedicationsPage() {
    const {
        userMedications,
        isLoading,
        error,
        addUserMedication,
        deleteUserMedication,
    } = useUserMedications();

    const [name, setName] = useState("");
    const [dosage, setDosage] = useState("");
    const [intakeTime, setIntakeTime] = useState("");
    const [notes, setNotes] = useState("");
    const [formMessage, setFormMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setFormMessage("");

        if (!name.trim()) {
            setFormMessage("Bitte gib den Namen des Medikaments ein.");
            return;
        }

        if (!dosage.trim()) {
            setFormMessage("Bitte gib die Dosierung ein.");
            return;
        }

        const validTime =
            /^([01]\d|2[0-3]):[0-5]\d$/.test(intakeTime);

        if (!validTime) {
            setFormMessage(
                "Bitte gib die Uhrzeit im Format HH:MM ein, zum Beispiel 13:30."
            );
            return;
        }

        try {
            setIsSaving(true);

            await addUserMedication({
                name,
                dosage,
                intakeTime,
                notes,
            });

            setName("");
            setDosage("");
            setIntakeTime("");
            setNotes("");
            setFormMessage("Medikament wurde gespeichert.");
        } catch {
            setFormMessage(
                "Das Medikament konnte nicht gespeichert werden."
            );
        } finally {
            setIsSaving(false);
        }
    }

    async function handleDelete(medicationId) {
        const shouldDelete = window.confirm(
            "Möchtest du dieses Medikament wirklich löschen?"
        );

        if (!shouldDelete) {
            return;
        }

        try {
            await deleteUserMedication(medicationId);
        } catch {
            setFormMessage(
                "Das Medikament konnte nicht gelöscht werden."
            );
        }
    }

    return (
        <Box
            maxWidth="1100px"
            margin="0 auto"
            padding="6"
        >
            <Heading marginBottom="2">
                Meine Medikamente
            </Heading>

            <Text marginBottom="8">
                Hier kannst du deine persönlichen Medikamente und
                Einnahmezeiten verwalten.
            </Text>

            <Box
                as="form"
                onSubmit={handleSubmit}
                background="white"
                padding="6"
                borderRadius="lg"
                boxShadow="md"
                marginBottom="10"
            >
                <Heading size="md" marginBottom="5">
                    Persönliches Medikament hinzufügen
                </Heading>

                <Stack gap="4">
                    <Box>
                        <Text marginBottom="2">
                            Name des Medikaments
                        </Text>

                        <Input
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder="Zum Beispiel Ibuprofen"
                        />
                    </Box>

                    <Box>
                        <Text marginBottom="2">
                            Dosierung laut deinem Medikamentenplan
                        </Text>

                        <Input
                            value={dosage}
                            onChange={(event) =>
                                setDosage(event.target.value)
                            }
                            placeholder="Zum Beispiel 400 mg"
                        />
                    </Box>

                    <Box>
                        <Text marginBottom="2">
                            Einnahmezeit
                        </Text>

                        <Input
                            type="text"
                            inputMode="numeric"
                            value={intakeTime}
                            onChange={(event) =>
                                setIntakeTime(event.target.value)
                            }
                            placeholder="Zum Beispiel 13:30"
                            maxLength={5}
                        />

                        <Text
                            marginTop="2"
                            fontSize="sm"
                            color="gray.600"
                        >
                            Bitte im 24-Stunden-Format eingeben, zum Beispiel 08:00
                            oder 13:30.
                        </Text>
                    </Box>

                    <Box>
                        <Text marginBottom="2">
                            Persönliche Notiz
                        </Text>

                        <Textarea
                            value={notes}
                            onChange={(event) =>
                                setNotes(event.target.value)
                            }
                            placeholder="Zum Beispiel: nach dem Frühstück"
                            maxLength={500}
                        />
                    </Box>

                    <Button
                        type="submit"
                        colorPalette="teal"
                        loading={isSaving}
                    >
                        Persönliches Medikament speichern
                    </Button>

                    {formMessage && (
                        <Text>
                            {formMessage}
                        </Text>
                    )}
                </Stack>
            </Box>

            <Heading size="lg" marginBottom="5">
                Meine gespeicherten Medikamente
            </Heading>

            {isLoading && (
                <Text>
                    Medikamente werden geladen …
                </Text>
            )}

            {error && (
                <Text color="red.600">
                    {error}
                </Text>
            )}

            {!isLoading &&
                !error &&
                userMedications.length === 0 && (
                    <Text>
                        Du hast noch keine persönlichen Medikamente
                        gespeichert.
                    </Text>
                )}

            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                gap="5"
            >
                {userMedications.map((medication) => (
                    <Box
                        key={medication.id}
                        background="white"
                        padding="5"
                        borderRadius="lg"
                        boxShadow="md"
                    >
                        <Heading size="md" marginBottom="3">
                            {medication.name}
                        </Heading>

                        <Text>
                            <strong>Dosierung:</strong>{" "}
                            {medication.dosage}
                        </Text>

                        <Text marginTop="2">
                            <strong>Einnahmezeit:</strong>{" "}
                            {medication.intakeTime} Uhr
                        </Text>

                        {medication.notes && (
                            <Text marginTop="2">
                                <strong>Notiz:</strong>{" "}
                                {medication.notes}
                            </Text>
                        )}

                        <Button
                            marginTop="5"
                            size="sm"
                            colorPalette="red"
                            variant="outline"
                            onClick={() =>
                                handleDelete(medication.id)
                            }
                        >
                            Löschen
                        </Button>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
}

export default MyMedicationsPage;
