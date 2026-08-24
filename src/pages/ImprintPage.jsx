import { Box, Heading, Text } from "@chakra-ui/react";

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

      <Text>
        Telefon: 0171 2986859
        <br />
        E-Mail: {" "}
        <a href="mailto:karsten.ketme@outlook.com">
          karsten.ketme@outlook.com
        </a>
      </Text>

      <Heading size="md" mt="8" mb="3">
        Hinweis zum Projekt
      </Heading>

      <Text>
        Curaelis ist ein privates beziehungsweise schulisches
        Abschlussprojekt. Die Anwendung stellt allgemeine Informationen zu
        Medikamenten bereit und ersetzt keine medizinische Beratung.
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
