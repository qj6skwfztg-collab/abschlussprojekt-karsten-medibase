import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import heroImage from "../assets/medibase-neu.png";
import vitruvianImage from "../assets/medibase-vitruvian.png";
import SafetyNotice from "../components/SafetyNotice";
import useLanguage from "../hooks/useLanguage";

function HomePage() {
  const { isEnglish } = useLanguage();
  return (
    <Box
      padding={{ base: "6", md: "10" }}
      maxWidth="1200px"
      margin="0 auto"
      position="relative"
      overflow="hidden"
    >
      {/* Transparente Figur im Hintergrund */}
      <Image
        src={vitruvianImage}
        alt=""
        aria-hidden="true"
        position="absolute"
        top={{ base: "20px", md: "-60px" }}
        right={{ base: "-80px", md: "-140px" }}
        width={{ base: "280px", md: "520px" }}
        opacity="0.09"
        pointerEvents="none"
        zIndex="0"
      />

      <Box position="relative" zIndex="1">
        <Box textAlign="center">
          <Heading size="2xl">
            {isEnglish ? "Understand your medications" : "Medikamente verständlich nachschlagen"}
          </Heading>

          <Text
            marginTop="4"
            fontSize={{ base: "md", md: "lg" }}
          >
            {isEnglish
              ? "Manage your personal medications, keep track of intake times and save important emergency contacts securely in your user account. In an emergency, you can open the phone function for emergency services on 112 or the police on 110 and inform your emergency contacts with a prepared message."
              : "Verwalte deine persönlichen Medikamente, behalte Einnahmezeiten im Blick und hinterlege wichtige Notfallkontakte – sicher getrennt in deinem Benutzerkonto. In einer Notfallsituation kannst du direkt die Telefonfunktion für den Rettungsdienst unter 112 oder die Polizei unter 110 öffnen und deine Notfallkontakte über eine vorbereitete Nachricht informieren."}
          </Text>

          <Flex
            marginTop="6"
            gap="4"
            justify="center"
            flexWrap="wrap"
          >
            <Button
              asChild
              background="teal.700"
              color="white"
            >
              <Link to="/medikamente">
                {isEnglish ? "View medications" : "Medikamente ansehen"}
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link to="/neuer-eintrag">
                {isEnglish ? "Create an entry" : "Eigenen Eintrag erstellen"}
              </Link>
            </Button>
          </Flex>
        </Box>

        <Image
          src={heroImage}
          alt={isEnglish ? "Illustration about finding medication information" : "Illustration zur Suche nach Medikamenteninformationen"}
          width="100%"
          maxHeight="500px"
          objectFit="cover"
          borderRadius="2xl"
          marginTop="10"
          boxShadow="lg"
        />

        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          gap="6"
          marginTop="10"
        >
          <Box
            asChild
            background="white"
            padding="6"
            borderRadius="xl"
            boxShadow="sm"
            cursor="pointer"
            transition="0.2s"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "md",
            }}
          >
            <Link to="/medikamente">
              <Heading size="md">
                {isEnglish ? "Quick search" : "Schnell suchen"}
              </Heading>

              <Text marginTop="3">
                {isEnglish ? "Find medications by name or category." : "Finde Medikamente nach ihrem Namen oder ihrer Kategorie."}
              </Text>
            </Link>
          </Box>

          <Box
            asChild
            background="white"
            padding="6"
            borderRadius="xl"
            boxShadow="sm"
            cursor="pointer"
            transition="0.2s"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "md",
            }}
          >
            <Link to="/medikamente">
              <Heading size="md">
                {isEnglish ? "Details & sources" : "Details & Quellen"}
              </Heading>

              <Text marginTop="3">
                {isEnglish ? "Open the referenced information sources directly from the detail pages." : "Rufe die hinterlegten Informationsquellen direkt über die Detailseiten auf."}
              </Text>
            </Link>
          </Box>

          <Box
            asChild
            background="white"
            padding="6"
            borderRadius="xl"
            boxShadow="sm"
            cursor="pointer"
            transition="0.2s"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "md",
            }}
          >
            <Link to="/neuer-eintrag">
              <Heading size="md">
                {isEnglish ? "Personal entries" : "Eigene Einträge"}
              </Heading>

              <Text marginTop="3">
                {isEnglish ? "Add personal entries and save them securely in your account." : "Ergänze eigene Einträge und speichere sie sicher in deinem Benutzerkonto."}
              </Text>
            </Link>
          </Box>
        </SimpleGrid>

        <SafetyNotice />
      </Box>
    </Box>
  );
}

export default HomePage;
