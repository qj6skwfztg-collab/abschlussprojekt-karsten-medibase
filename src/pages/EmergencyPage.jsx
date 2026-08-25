import { useState } from "react";
import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import EmergencyContacts from "../components/EmergencyContacts";
import useLanguage from "../hooks/useLanguage";
import emergencyCountries from "../data/emergencyCountries";

const COUNTRY_STORAGE_KEY = "curaelis-emergency-country";

function EmergencyPage() {
  const { isEnglish } = useLanguage();
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

  function handleCountryChange(event) {
    const countryCode = event.target.value;

    setSelectedCountryCode(countryCode);
    setEmergencyCallStarted(false);
    localStorage.setItem(COUNTRY_STORAGE_KEY, countryCode);
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
            href={`tel:${selectedCountry.ambulanceNumber}`}
            onClick={() => setEmergencyCallStarted(true)}
            background="red.600"
            color="white"
            size="lg"
            minHeight="70px"
            fontSize="xl"
            _hover={{ background: "red.700" }}
          >
            {isEnglish
              ? `${selectedCountry.ambulanceNumber} – Call emergency services`
              : `${selectedCountry.ambulanceNumber} – Rettungsdienst anrufen`}
          </Button>

          <Button
            as="a"
            href={`tel:${selectedCountry.policeNumber}`}
            background="blue.700"
            color="white"
            size="lg"
            minHeight="60px"
            fontSize="lg"
            _hover={{ background: "blue.800" }}
          >
            {isEnglish
              ? `${selectedCountry.policeNumber} – Call the police`
              : `${selectedCountry.policeNumber} – Polizei anrufen`}
          </Button>
        </Stack>

        <Text fontSize="sm" color="gray.700" marginTop="6">
          {isEnglish ? "On a smartphone, the phone function opens. You must then confirm the call." : "Auf einem Smartphone öffnet sich die Telefonfunktion. Der Anruf muss anschließend bestätigt werden."}
        </Text>
      </Box>

      <Text marginTop="6" fontSize="sm" textAlign="center" color="gray.600">
        {isEnglish ? "Curaelis is not an official emergency system. The app cannot determine whether a call was answered or an ambulance was dispatched." : "Curaelis ersetzt kein offizielles Notrufsystem. Die App kann nicht feststellen, ob der Notruf angenommen oder ein Rettungswagen geschickt wurde."}
      </Text>

        <EmergencyContacts
          emergencyNumber={selectedCountry.ambulanceNumber}
          emergencyCallStarted={emergencyCallStarted}
        />
    </Box>
  );
}

export default EmergencyPage;
