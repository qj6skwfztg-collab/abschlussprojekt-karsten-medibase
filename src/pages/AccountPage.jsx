import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import useLanguage from "../hooks/useLanguage";
import deleteAccount from "../hooks/useDeleteAccount";
import PasswordField from "../components/PasswordField";

function AccountPage() {
  const { isEnglish } = useLanguage();
  const navigate = useNavigate();
  const userEmail = auth.currentUser?.email || "";
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [isDeletionConfirmed, setIsDeletionConfirmed] = useState(false);
  const [message, setMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const text = isEnglish
    ? {
        title: "My account",
        description:
          "Here you can view and manage your personal Curaelis area.",
        overview: "Account overview",
        email: "Email address",
        medications: "Open my medications",
        contacts: "Open emergency contacts",
        dangerTitle: "Danger zone",
        dangerSummary: "Delete account and personal data",
        dataTitle: "Data that will be deleted",
        data:
          "Your personal medications, emergency contacts, account and local reminder data will be deleted.",
        warning: "This action cannot be undone.",
        password: "Current password",
        passwordPlaceholder: "Enter your current password",
        confirmation: 'Type "DELETE ACCOUNT" to confirm',
        confirmationValue: "DELETE ACCOUNT",
        delete: "Permanently delete account",
        deleting: "Deleting account …",
        checkbox:
          "I understand that my account and personal data will be permanently deleted.",
        checkboxRequired:
          "Please confirm the checkbox before continuing.",
        finalConfirm:
          "Are you absolutely sure you want to permanently delete this account and all personal data? This cannot be undone.",
        required:
          'Please enter "DELETE ACCOUNT" exactly as shown.',
        error:
          "The account could not be deleted. Please check your password and try again.",
        recentLogin:
          "For security reasons, please sign in again and then repeat the deletion.",
      }
    : {
        title: "Mein Konto",
        description:
          "Hier kannst du deinen persönlichen Curaelis-Bereich ansehen und verwalten.",
        overview: "Kontoübersicht",
        email: "E-Mail-Adresse",
        medications: "Meine Medikamente öffnen",
        contacts: "Notfallkontakte öffnen",
        dangerTitle: "Gefahrenbereich",
        dangerSummary: "Konto und persönliche Daten löschen",
        dataTitle: "Daten, die gelöscht werden",
        data:
          "Deine persönlichen Medikamente, Notfallkontakte, dein Konto und lokale Erinnerungsdaten werden gelöscht.",
        warning: "Diese Aktion kann nicht rückgängig gemacht werden.",
        password: "Aktuelles Passwort",
        passwordPlaceholder: "Gib dein aktuelles Passwort ein",
        confirmation: 'Gib zur Bestätigung „KONTO LÖSCHEN“ ein',
        confirmationValue: "KONTO LÖSCHEN",
        delete: "Konto dauerhaft löschen",
        deleting: "Konto wird gelöscht …",
        checkbox:
          "Ich habe verstanden, dass mein Konto und meine persönlichen Daten dauerhaft gelöscht werden.",
        checkboxRequired:
          "Bitte bestätige zuerst das Kästchen, bevor du fortfährst.",
        finalConfirm:
          "Möchtest du dieses Konto und alle persönlichen Daten wirklich dauerhaft löschen? Diese Aktion kann nicht rückgängig gemacht werden.",
        required:
          'Bitte gib „KONTO LÖSCHEN“ genau wie angezeigt ein.',
        error:
          "Das Konto konnte nicht gelöscht werden. Bitte überprüfe dein Passwort und versuche es erneut.",
        recentLogin:
          "Aus Sicherheitsgründen musst du dich erneut anmelden und die Löschung danach wiederholen.",
      };

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (confirmation.trim() !== text.confirmationValue) {
      setMessage(text.required);
      return;
    }

    if (!isDeletionConfirmed) {
      setMessage(text.checkboxRequired);
      return;
    }

    const shouldDelete = window.confirm(text.finalConfirm);

    if (!shouldDelete) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteAccount(password);
      navigate("/", { replace: true });
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        setMessage(text.recentLogin);
      } else {
        setMessage(text.error);
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Box maxW="700px" mx="auto" p="6">
      <Heading mb="4">{text.title}</Heading>

      <Text mb="6">{text.description}</Text>

      <Box
        borderWidth="1px"
        borderColor="teal.200"
        borderRadius="lg"
        background="white"
        padding="6"
        mb="8"
      >
        <Heading size="md" mb="4">
          {text.overview}
        </Heading>

        <Text mb="5">
          <strong>{text.email}:</strong> {userEmail}
        </Text>

        <Stack direction={{ base: "column", sm: "row" }} gap="3">
          <Button as={Link} to="/meine-medikamente" colorPalette="teal">
            {text.medications}
          </Button>
          <Button as={Link} to="/notfall" variant="outline">
            {text.contacts}
          </Button>
        </Stack>
      </Box>

      <Box
        as="details"
        borderWidth="1px"
        borderColor="red.200"
        borderRadius="lg"
        padding="4"
      >
        <Box
          as="summary"
          cursor="pointer"
          color="red.700"
          fontWeight="bold"
        >
          {text.dangerTitle}: {text.dangerSummary}
        </Box>

        <Box paddingTop="5">
          <Heading size="md" mb="3" color="red.700">
            {text.dataTitle}
          </Heading>

          <Text mb="3">{text.data}</Text>
          <Text fontWeight="bold" color="red.700" mb="6">
            {text.warning}
          </Text>

          <form onSubmit={handleSubmit}>
            <Stack gap="4">
              <PasswordField
                id="account-password"
                label={text.password}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={text.passwordPlaceholder}
                showText={isEnglish ? "Show" : "Anzeigen"}
                hideText={isEnglish ? "Hide" : "Verbergen"}
                autoComplete="current-password"
                required
              />

              <Box>
                <Text as="label" htmlFor="account-confirmation" display="block" mb="2">
                  {text.confirmation}
                </Text>
                <Input
                  id="account-confirmation"
                  value={confirmation}
                  onChange={(event) => setConfirmation(event.target.value)}
                  required
                />
              </Box>

              <Flex align="flex-start" gap="3">
                <input
                  id="account-deletion-confirmation"
                  type="checkbox"
                  checked={isDeletionConfirmed}
                  onChange={(event) =>
                    setIsDeletionConfirmed(event.target.checked)
                  }
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    marginTop: "0.2rem",
                    flexShrink: 0,
                  }}
                />

                <Text as="label" htmlFor="account-deletion-confirmation">
                  {text.checkbox}
                </Text>
              </Flex>

              <Button
                type="submit"
                colorPalette="red"
                loading={isDeleting}
                disabled={!isDeletionConfirmed}
              >
                {isDeleting ? text.deleting : text.delete}
              </Button>

              {message && <Text color="red.700">{message}</Text>}
            </Stack>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default AccountPage;
