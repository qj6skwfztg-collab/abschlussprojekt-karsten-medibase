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

function HomePage() {
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
            Medikamente verständlich nachschlagen
          </Heading>

          <Text
            marginTop="4"
            fontSize={{ base: "md", md: "lg" }}
          >
            MediBase bietet dir eine schnelle Übersicht über häufig
            verwendete Medikamente und ihre allgemeinen
            Anwendungsbereiche.
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
                Medikamente ansehen
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link to="/neuer-eintrag">
                Eigenen Eintrag erstellen
              </Link>
            </Button>
          </Flex>
        </Box>

        <Image
          src={heroImage}
          alt="Illustration zur Suche nach Medikamenteninformationen"
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
                Schnell suchen
              </Heading>

              <Text marginTop="3">
                Finde Medikamente nach ihrem Namen oder ihrer
                Kategorie.
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
                Details & Quellen
              </Heading>

              <Text marginTop="3">
                Rufe die hinterlegten Informationsquellen direkt
                über die Detailseiten auf.
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
                Eigene Einträge
              </Heading>

              <Text marginTop="3">
                Ergänze eigene Einträge und speichere sie dauerhaft
                in deinem Browser.
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
