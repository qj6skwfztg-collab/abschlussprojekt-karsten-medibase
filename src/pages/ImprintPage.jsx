import { Box, Heading, Text } from "@chakra-ui/react";
import { PUBLIC_CONTACT_INFO_ENABLED } from "../config/features";

function ImprintPage() {
  return (
    <Box maxW="900px" mx="auto" p="6">
      <Heading mb="6">Impressum</Heading>

      <Heading size="md" mb="3">
        Angaben gemäß § 5 DDG
      </Heading>

      <Text>
        Karsten Rabeneck-Ketme
        <br />
        Bielefelder Str. 37
        <br />
        49186 Bad Iburg
        <br />
        Deutschland
      </Text>

      <Heading size="md" mt="8" mb="3">
        Kontakt
      </Heading>

      {PUBLIC_CONTACT_INFO_ENABLED ? (
        <Text>
          Telefon: 0171 2986859
          <br />
          E-Mail: {" "}
          <a href="mailto:karsten.ketme@outlook.com">
            karsten.ketme@outlook.com
          </a>
          <br />
          Support: {" "}
          <a href="mailto:support@curaelis.com">
            support@curaelis.com
          </a>
        </Text>
      ) : (
        <Box
          className="contact-info-preview"
          aria-label="Kontaktangaben werden zum offiziellen Start sichtbar"
        >
          <Text aria-hidden="true">
            Telefon: 000 00000000
            <br />
            E-Mail: kontakt••••••@••••••.de
            <br />
            Support: support••••••@••••••.com
          </Text>
          <Text mt="3" color="gray.600">
            Die Kontaktangaben werden zum offiziellen Start freigeschaltet.
          </Text>
        </Box>
      )}

      <Heading size="md" mt="8" mb="3">
        Hinweis zur Anwendung
      </Heading>

      <Text>
        Curaelis stellt allgemeine Informationen zu Medikamenten bereit und
        ersetzt keine medizinische Beratung.
      </Text>

      <Heading size="md" mt="8" mb="3">
        Haftung für Inhalte
      </Heading>

      <Text>
        Die Inhalte dieser Anwendung dienen ausschließlich der allgemeinen
        Orientierung. Für individuelle medizinische Entscheidungen ist immer
        medizinisches Fachpersonal zu konsultieren.
      </Text>
    </Box>
  );
}

export default ImprintPage;
