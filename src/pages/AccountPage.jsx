import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Textarea,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import useLanguage from "../hooks/useLanguage";
import deleteAccount from "../hooks/useDeleteAccount";
import useEmergencyProfile from "../hooks/useEmergencyProfile";
import PasswordField from "../components/PasswordField";
import EmergencyContacts from "../components/EmergencyContacts";
import {
  ONBOARDING_PENDING_KEY_PREFIX,
  ONBOARDING_RESTART_EVENT,
  ONBOARDING_RETURN_PATH_KEY_PREFIX,
  ONBOARDING_STATE_KEY_PREFIX,
} from "../components/OnboardingWizard";
import { markOnboardingStepComplete } from "../utils/onboarding";

function AccountPage() {
  const { isEnglish } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = auth.currentUser?.email || "";
  const searchParams = new URLSearchParams(location.search);
  const onboardingFocus = searchParams.get("focus");
  const isOnboarding =
    searchParams.get("from") === "einrichtung" ||
    Boolean(location.state?.fromOnboarding);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [isDeletionConfirmed, setIsDeletionConfirmed] = useState(false);
  const [message, setMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    profile,
    isLoading: isProfileLoading,
    error: profileError,
    saveEmergencyProfile,
  } = useEmergencyProfile();
  const [profileDraft, setProfileDraft] = useState(null);
  const [profileMessage, setProfileMessage] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const profileForm = profileDraft || profile;

  function reopenOnboarding() {
    const currentUser = auth.currentUser;

    if (!currentUser) return;

    localStorage.setItem(
      `${ONBOARDING_PENDING_KEY_PREFIX}${currentUser.uid}`,
      "true"
    );
    localStorage.setItem(
      `${ONBOARDING_RETURN_PATH_KEY_PREFIX}${currentUser.uid}`,
      "/konto"
    );
    localStorage.setItem(
      `${ONBOARDING_STATE_KEY_PREFIX}${currentUser.uid}`,
      JSON.stringify({
        completed: [],
        skipped: [],
        started: false,
        restartMode: true,
      })
    );
    window.dispatchEvent(new Event(ONBOARDING_RESTART_EVENT));
    navigate("/einrichtung");
  }

  useEffect(() => {
    const targetId = ["#emergency-contacts", "#emergency-profile"].includes(
      location.hash
    )
      ? location.hash.slice(1)
      : null;

    if (!targetId) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.hash]);

  const text = isEnglish
    ? {
        title: "My account",
        description:
          "Here you can view and manage your personal Curaelis area.",
        overview: "Account overview",
        email: "Email address",
        medications: "Open my medications",
        contacts: "Open emergency contacts",
        emergencyProfileTitle: "Emergency pass & personal emergency details",
        emergencyProfileDescription:
          "Add optional information that should be visible in your private Curaelis emergency pass.",
        fullName: "Name",
        fullNamePlaceholder: "Full name shown in the emergency pass",
        birthDate: "Date of birth",
        birthDatePlaceholder: "For example, 01/31/1970",
        phone: "Phone number",
        phonePlaceholder: "For example, +49 176 1234567",
        address: "Address",
        addressPlaceholder: "Street, postal code and city",
        doctorPractice: "Family doctor / practice",
        doctorPracticePlaceholder: "Name, phone number or practice note",
        allergies: "Allergies",
        allergiesPlaceholder: "For example, penicillin or pollen",
        conditions: "Important conditions",
        conditionsPlaceholder: "For example, diabetes or asthma",
        bloodGroup: "Blood group",
        bloodGroupPlaceholder: "For example, A positive",
        documentsHint: "Important documents",
        documentsHintPlaceholder:
          "For example, living will, power of attorney or organ donor card and where it can be found",
        specialNotes: "Special notes",
        specialNotesPlaceholder:
          "For example, important information for emergency helpers",
        saveEmergencyProfile: "Save emergency pass details",
        savingEmergencyProfile: "Saving …",
        emergencyProfileSaved: "Emergency pass details were saved.",
        emergencyProfileError:
          "The emergency pass details could not be saved.",
        emergencyProfileLoading: "Loading emergency pass details …",
        backToEmergencyPass: "Back to emergency pass",
        dangerTitle: "Danger zone",
        dangerSummary: "Delete account and personal data",
        dataTitle: "Data that will be deleted",
        data:
          "Your personal medications, emergency contacts, emergency pass details, account and local reminder data will be deleted.",
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
        emergencyProfileTitle: "Notfallpass & persönliche Notfalldaten",
        emergencyProfileDescription:
          "Füge optionale Angaben hinzu, die in deinem privaten Curaelis-Notfallpass angezeigt werden sollen.",
        fullName: "Name",
        fullNamePlaceholder: "Vollständiger Name für den Notfallpass",
        birthDate: "Geburtsdatum",
        birthDatePlaceholder: "Zum Beispiel 31.01.1970",
        phone: "Telefonnummer",
        phonePlaceholder: "Zum Beispiel 0176 1234567",
        address: "Adresse",
        addressPlaceholder: "Straße, Postleitzahl und Ort",
        doctorPractice: "Hausarzt / Praxis",
        doctorPracticePlaceholder: "Name, Telefonnummer oder Praxis-Hinweis",
        allergies: "Allergien",
        allergiesPlaceholder: "Zum Beispiel Penicillin oder Pollen",
        conditions: "Wichtige Erkrankungen",
        conditionsPlaceholder: "Zum Beispiel Diabetes oder Asthma",
        bloodGroup: "Blutgruppe",
        bloodGroupPlaceholder: "Zum Beispiel A positiv",
        documentsHint: "Wichtige Dokumente",
        documentsHintPlaceholder:
          "Zum Beispiel Patientenverfügung, Vorsorgevollmacht oder Organspendeausweis und wo sie liegen",
        specialNotes: "Besondere Hinweise",
        specialNotesPlaceholder:
          "Zum Beispiel wichtige Informationen für Ersthelfende",
        saveEmergencyProfile: "Angaben für Notfallpass speichern",
        savingEmergencyProfile: "Wird gespeichert …",
        emergencyProfileSaved: "Angaben für den Notfallpass wurden gespeichert.",
        emergencyProfileError:
          "Die Angaben für den Notfallpass konnten nicht gespeichert werden.",
        emergencyProfileLoading: "Angaben für den Notfallpass werden geladen …",
        backToEmergencyPass: "Zum Notfallpass zurück",
        dangerTitle: "Gefahrenbereich",
        dangerSummary: "Konto und persönliche Daten löschen",
        dataTitle: "Daten, die gelöscht werden",
        data:
          "Deine persönlichen Medikamente, Notfallkontakte, Notfallpass-Angaben, dein Konto und lokale Erinnerungsdaten werden gelöscht.",
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

  const hasEmergencyProfileData = [
    "fullName",
    "birthDate",
    "phone",
    "address",
    "doctorPractice",
    "allergies",
    "conditions",
    "bloodGroup",
    "documentsHint",
    "specialNotes",
  ].some((fieldName) => String(profileForm?.[fieldName] || "").trim());

  function handleProfileChange(event) {
    const { name, value } = event.target;

    setProfileDraft((previousProfile) => ({
      ...(previousProfile || profile),
      [name]: value,
    }));
  }

  async function handleProfileSubmit(event) {
    event.preventDefault();
    setProfileMessage("");
    setIsSavingProfile(true);

    try {
      await saveEmergencyProfile(profileForm);
      markOnboardingStepComplete(auth.currentUser?.uid, "emergencyProfile");
      setProfileMessage(text.emergencyProfileSaved);
    } catch {
      setProfileMessage(text.emergencyProfileError);
    } finally {
      setIsSavingProfile(false);
    }
  }

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
          <Button as={Link} to="/konto#emergency-contacts" variant="outline">
            {text.contacts}
          </Button>
        </Stack>

        <Box className="account-onboarding-reopen" marginTop="6">
          <Heading size="sm" marginBottom="2">
            {isEnglish ? "Curaelis setup" : "Curaelis Einrichtung"}
          </Heading>
          <Text marginBottom="3">
            {isEnglish
              ? "Restart the setup assistant. Existing data stays safe, but selected areas are checked again."
              : "Starte den Einrichtungsassistenten neu. Vorhandene Daten bleiben erhalten, aber die ausgewählten Bereiche werden erneut geprüft."}
          </Text>
          <Button variant="outline" colorPalette="orange" onClick={reopenOnboarding}>
            {isEnglish ? "Restart setup" : "Einrichtung neu starten"}
          </Button>
        </Box>
      </Box>

      <Box
        id="emergency-profile"
        className="account-emergency-profile"
        borderWidth="1px"
        borderColor="teal.200"
        borderRadius="lg"
        background="white"
        padding="6"
        mb="8"
      >
        <Heading size="md" mb="2" color="teal.900">
          {text.emergencyProfileTitle}
        </Heading>
        <Text mb="5">{text.emergencyProfileDescription}</Text>

        <form onSubmit={handleProfileSubmit}>
          <Stack gap="4">
            <Box>
              <Text as="label" htmlFor="profile-full-name" display="block" mb="2" fontWeight="600">
                {text.fullName}
              </Text>
              <Input
                id="profile-full-name"
                name="fullName"
                value={profileForm.fullName}
                onChange={handleProfileChange}
                placeholder={text.fullNamePlaceholder}
                maxLength={120}
              />
            </Box>

            <Box>
              <Text as="label" htmlFor="profile-birth-date" display="block" mb="2" fontWeight="600">
                {text.birthDate}
              </Text>
              <Input
                id="profile-birth-date"
                name="birthDate"
                value={profileForm.birthDate}
                onChange={handleProfileChange}
                placeholder={text.birthDatePlaceholder}
                maxLength={40}
              />
            </Box>

            <Box>
              <Text as="label" htmlFor="profile-phone" display="block" mb="2" fontWeight="600">
                {text.phone}
              </Text>
              <Input
                id="profile-phone"
                name="phone"
                type="tel"
                value={profileForm.phone}
                onChange={handleProfileChange}
                placeholder={text.phonePlaceholder}
                maxLength={80}
              />
            </Box>

            <Box>
              <Text as="label" htmlFor="profile-address" display="block" mb="2" fontWeight="600">
                {text.address}
              </Text>
              <Textarea
                id="profile-address"
                name="address"
                value={profileForm.address}
                onChange={handleProfileChange}
                placeholder={text.addressPlaceholder}
                maxLength={300}
                rows={3}
              />
            </Box>

            <Box>
              <Text as="label" htmlFor="profile-doctor-practice" display="block" mb="2" fontWeight="600">
                {text.doctorPractice}
              </Text>
              <Textarea
                id="profile-doctor-practice"
                name="doctorPractice"
                value={profileForm.doctorPractice}
                onChange={handleProfileChange}
                placeholder={text.doctorPracticePlaceholder}
                maxLength={300}
                rows={3}
              />
            </Box>

            <Box>
              <Text as="label" htmlFor="profile-allergies" display="block" mb="2" fontWeight="600">
                {text.allergies}
              </Text>
              <Input
                id="profile-allergies"
                name="allergies"
                value={profileForm.allergies}
                onChange={handleProfileChange}
                placeholder={text.allergiesPlaceholder}
                maxLength={300}
              />
            </Box>

            <Box>
              <Text as="label" htmlFor="profile-conditions" display="block" mb="2" fontWeight="600">
                {text.conditions}
              </Text>
              <Input
                id="profile-conditions"
                name="conditions"
                value={profileForm.conditions}
                onChange={handleProfileChange}
                placeholder={text.conditionsPlaceholder}
                maxLength={300}
              />
            </Box>

            <Box>
              <Text as="label" htmlFor="profile-blood-group" display="block" mb="2" fontWeight="600">
                {text.bloodGroup}
              </Text>
              <Input
                id="profile-blood-group"
                name="bloodGroup"
                value={profileForm.bloodGroup}
                onChange={handleProfileChange}
                placeholder={text.bloodGroupPlaceholder}
                maxLength={30}
              />
            </Box>

            <Box>
              <Text as="label" htmlFor="profile-documents-hint" display="block" mb="2" fontWeight="600">
                {text.documentsHint}
              </Text>
              <Textarea
                id="profile-documents-hint"
                name="documentsHint"
                value={profileForm.documentsHint}
                onChange={handleProfileChange}
                placeholder={text.documentsHintPlaceholder}
                maxLength={500}
                rows={3}
              />
            </Box>

            <Box>
              <Text as="label" htmlFor="profile-special-notes" display="block" mb="2" fontWeight="600">
                {text.specialNotes}
              </Text>
              <Textarea
                id="profile-special-notes"
                name="specialNotes"
                value={profileForm.specialNotes}
                onChange={handleProfileChange}
                placeholder={text.specialNotesPlaceholder}
                maxLength={500}
                rows={4}
              />
            </Box>

            <Button type="submit" colorPalette="teal" size="lg" disabled={isSavingProfile}>
              {isSavingProfile ? text.savingEmergencyProfile : text.saveEmergencyProfile}
            </Button>

            {isOnboarding && onboardingFocus === "emergency-profile" && (
              <Box
                className="onboarding-focus-banner"
                background="orange.50"
                borderWidth="1px"
                borderColor="orange.200"
                borderRadius="xl"
                padding="4"
                role="status"
              >
                <Text fontWeight="800" color="orange.900">
                  {isEnglish ? "Setup: add emergency pass details" : "Einrichtung: Angaben für den Notfallpass eintragen"}
                </Text>
                <Text mt="1" color="orange.900">
                  {isEnglish
                    ? "Save your details here. Then continue directly with the button below."
                    : "Speichere deine Angaben direkt hier. Danach geht es direkt mit dem Button unten weiter."}
                </Text>
              </Box>
            )}

            {isProfileLoading && <Text color="gray.600">{text.emergencyProfileLoading}</Text>}
            {profileError && <Text color="red.700">{profileError}</Text>}
            {profileMessage && <Text color="teal.700" fontWeight="600">{profileMessage}</Text>}
            {isOnboarding && onboardingFocus === "emergency-profile" && (profileMessage === text.emergencyProfileSaved || hasEmergencyProfileData) && (
              <Button
                as={Link}
                to="/konto?from=einrichtung&focus=emergency-contacts#emergency-contacts"
                onClick={() => markOnboardingStepComplete(auth.currentUser?.uid, "emergencyProfile")}
                colorPalette="orange"
                size="lg"
              >
                {isEnglish ? "Continue to emergency contacts" : "Weiter zu den Notfallkontakten"}
              </Button>
            )}

            <Button
              as={Link}
              to="/notfall#notfallpass"
              variant="outline"
              colorPalette="teal"
              size="lg"
            >
              ↩️ {text.backToEmergencyPass}
            </Button>
          </Stack>
        </form>
      </Box>

      <EmergencyContacts
        managementOnly
        setupHint={
          isOnboarding && onboardingFocus === "emergency-contacts" ? (
            <Box
              className="onboarding-focus-banner"
              background="orange.50"
              borderWidth="1px"
              borderColor="orange.200"
              borderRadius="xl"
              padding="4"
              mt="5"
              role="status"
            >
              <Text fontWeight="800" color="orange.900">
                {isEnglish ? "After saving, continue here" : "Nach dem Speichern hier weiter"}
              </Text>
              <Text mt="1" color="orange.900">
                {isEnglish
                  ? "Save the contact. Curaelis then shows the next button right here."
                  : "Speichere den Kontakt. Danach zeigt Curaelis den nächsten Button direkt hier an."}
              </Text>
            </Box>
          ) : null
        }
        setupContinue={
          isOnboarding && onboardingFocus === "emergency-contacts" ? (
            <Button
              as={Link}
              to="/gesundheitstagebuch?from=einrichtung&focus=doctor-email#doctor-email"
              onClick={() => markOnboardingStepComplete(auth.currentUser?.uid, "contacts")}
              colorPalette="orange"
              size="lg"
              mt="5"
              width="100%"
            >
              {isEnglish ? "Continue to doctor's practice email" : "Weiter zur Arztpraxis-E-Mail"}
            </Button>
          ) : null
        }
      />

      <Box
        as="details"
        borderWidth="1px"
        borderColor="red.200"
        borderRadius="lg"
        padding="4"
        mt="10"
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
