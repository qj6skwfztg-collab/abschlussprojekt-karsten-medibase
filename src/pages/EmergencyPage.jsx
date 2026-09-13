import { useEffect, useState } from "react";
import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import EmergencyContacts from "../components/EmergencyContacts";
import EmergencyPass from "../components/EmergencyPass";
import useLanguage from "../hooks/useLanguage";
import emergencyCountries from "../data/emergencyCountries";
import { EMERGENCY_CALLS_ENABLED } from "../config/features";

const COUNTRY_STORAGE_KEY = "curaelis-emergency-country";

function EmergencyPage() {
  const { isEnglish } = useLanguage();
  const location = useLocation();
  const [emergencyCallStarted, setEmergencyCallStarted] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState(() => {
    const savedCountryCode = localStorage.getItem(COUNTRY_STORAGE_KEY);

    return emergencyCountries.some(
      (country) => country.code === savedCountryCode
    )
      ? savedCountryCode
      : "DE";
  });

  const selectedCountry = emergencyCountries.find(
    (country) => country.code === selectedCountryCode
  ) || emergencyCountries[0];

  useEffect(() => {
    if (!['#notfallpass', '#emergency-contacts'].includes(location.hash)) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.hash]);

  function handleCountryChange(event) {
    const countryCode = event.target.value;

    setSelectedCountryCode(countryCode);
    setEmergencyCallStarted(false);
    localStorage.setItem(COUNTRY_STORAGE_KEY, countryCode);
  }

  function handleEmergencyCall(event) {
    if (!EMERGENCY_CALLS_ENABLED) {
      event.preventDefault();
      return;
    }

    const confirmationText = isEnglish
      ? `Call emergency services at ${selectedCountry.ambulanceNumber} now? Only confirm if there is an actual emergency.`
      : `Soll der Rettungsdienst unter ${selectedCountry.ambulanceNumber} angerufen werden? Bitte nur bei einem echten Notfall bestätigen.`;

    if (!window.confirm(confirmationText)) {
      event.preventDefault();
      return;
    }

    setEmergencyCallStarted(true);
  }

  return (
    <Box maxWidth="700px" margin="0 auto" padding="6">
      <Box
        background="white"
        borderWidth="1px"
        borderColor="teal.100"
        borderRadius="xl"
        padding="5"
        marginBottom="6"
        boxShadow="sm"
      >
        <Heading size="md" color="teal.900" marginBottom="3">
          {isEnglish ? "Your country" : "Dein Land"}
        </Heading>

        <Text marginBottom="3">
          {isEnglish
            ? "Select your country so the correct emergency numbers are shown."
            : "Wähle dein Land aus, damit die passenden Notrufnummern angezeigt werden."}
        </Text>

        <Text as="label" htmlFor="emergency-country" fontWeight="700">
          {isEnglish ? "Country" : "Land"}
        </Text>

        <select
          id="emergency-country"
          value={selectedCountryCode}
          onChange={handleCountryChange}
          style={{
            display: "block",
            width: "100%",
            marginTop: "8px",
            padding: "10px 12px",
            border: "2px solid #285e61",
            borderRadius: "8px",
            background: "white",
            color: "#1a202c",
            fontSize: "1rem",
          }}
        >
          {emergencyCountries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.flag} {isEnglish ? country.nameEnglish : country.name}
            </option>
          ))}
        </select>

        <Text marginTop="3" fontSize="sm" color="gray.600">
          {isEnglish
            ? `Ambulance/emergency services: ${selectedCountry.ambulanceNumber} · Police: ${selectedCountry.policeNumber}`
            : `Rettungsdienst: ${selectedCountry.ambulanceNumber} · Polizei: ${selectedCountry.policeNumber}`}
        </Text>
      </Box>

      <Box
        background="red.50"
        border="2px solid"
        borderColor="red.500"
        borderRadius="xl"
        padding={{ base: "6", md: "10" }}
        textAlign="center"
      >
        <Heading color="red.700" marginBottom="4">
          {isEnglish ? "Emergency help" : "Notfallhilfe"}
        </Heading>

        <Text fontSize="lg" marginBottom="6">
          {isEnglish ? "If there is an immediate danger to life, call emergency services now." : "Bei akuter Lebensgefahr rufe sofort den Rettungsdienst."}
        </Text>

        <Stack gap="4">
          <Button
            as="a"
            href={EMERGENCY_CALLS_ENABLED ? `tel:${selectedCountry.ambulanceNumber}` : undefined}
            onClick={handleEmergencyCall}
            background="red.600"
            color="white"
            size="lg"
            minHeight="70px"
            fontSize="xl"
            disabled={!EMERGENCY_CALLS_ENABLED}
            _hover={{ background: "red.700" }}
          >
            {isEnglish
              ? `${selectedCountry.ambulanceNumber} – ${EMERGENCY_CALLS_ENABLED ? "Call emergency services" : "Emergency call disabled in demo"}`
              : `${selectedCountry.ambulanceNumber} – ${EMERGENCY_CALLS_ENABLED ? "Rettungsdienst anrufen" : "Notruf in der Demo deaktiviert"}`}
          </Button>

          <Button
            as="a"
            href={EMERGENCY_CALLS_ENABLED ? `tel:${selectedCountry.policeNumber}` : undefined}
            onClick={handleEmergencyCall}
            background="blue.700"
            color="white"
            size="lg"
            minHeight="60px"
            fontSize="lg"
            disabled={!EMERGENCY_CALLS_ENABLED}
            _hover={{ background: "blue.800" }}
          >
            {isEnglish
              ? `${selectedCountry.policeNumber} – ${EMERGENCY_CALLS_ENABLED ? "Call the police" : "Police call disabled in demo"}`
              : `${selectedCountry.policeNumber} – ${EMERGENCY_CALLS_ENABLED ? "Polizei anrufen" : "Polizeinotruf in der Demo deaktiviert"}`}
          </Button>
        </Stack>

        <Text fontSize="sm" color="gray.700" marginTop="6">
          {EMERGENCY_CALLS_ENABLED
            ? (isEnglish ? "On a smartphone, the phone function opens. You must then confirm the call." : "Auf einem Smartphone öffnet sich die Telefonfunktion. Der Anruf muss anschließend bestätigt werden.")
            : (isEnglish ? "Demo notice: Real phone calls are temporarily disabled on this public preview page. They will be enabled in the released app." : "Demo-Hinweis: Echte Telefonanrufe sind auf dieser öffentlichen Vorschauseite vorübergehend deaktiviert. In der veröffentlichten App werden sie aktiviert.")}
        </Text>
      </Box>

      <Text marginTop="6" fontSize="sm" textAlign="center" color="gray.600">
        {isEnglish ? "Curaelis is not an official emergency system. The app cannot determine whether a call was answered or an ambulance was dispatched." : "Curaelis ersetzt kein offizielles Notrufsystem. Die App kann nicht feststellen, ob der Notruf angenommen oder ein Rettungswagen geschickt wurde."}
      </Text>

      <EmergencyPass selectedCountry={selectedCountry} />

        <EmergencyContacts
          emergencyNumber={selectedCountry.ambulanceNumber}
          emergencyCallStarted={emergencyCallStarted}
        />
    </Box>
  );
}

export default EmergencyPage;
