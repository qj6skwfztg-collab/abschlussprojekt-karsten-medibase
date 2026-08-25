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

function ActionIcon({ symbol }) {
  return (
    <Box
      as="span"
      aria-hidden="true"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      width="10"
      height="10"
      marginRight="3"
      borderRadius="full"
      background="whiteAlpha.300"
      fontSize="xl"
      lineHeight="1"
    >
      {symbol}
    </Box>
  );
}

function FeatureIcon({ symbol, background }) {
  return (
    <Box
      as="span"
      aria-hidden="true"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      width="14"
      height="14"
      marginBottom="4"
      borderRadius="full"
      background={background}
      fontSize="2xl"
      lineHeight="1"
    >
      {symbol}
    </Box>
  );
}

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
            maxWidth="760px"
            marginX="auto"
            fontSize={{ base: "md", md: "lg" }}
          >
            {isEnglish
              ? "Find medication information, manage your personal medications, set intake reminders and reach emergency help quickly."
              : "Finde verständliche Informationen zu Medikamenten, verwalte deine persönlichen Medikamente, richte Einnahmeerinnerungen ein und erreiche im Notfall schnell Hilfe."}
          </Text>

          <Box
            marginTop="7"
            padding={{ base: "4", md: "6" }}
            background="white"
            borderWidth="1px"
            borderColor="teal.100"
            borderRadius="2xl"
            boxShadow="sm"
          >
            <Heading size="md" color="teal.900">
              {isEnglish ? "What would you like to do?" : "Was möchtest du tun?"}
            </Heading>

            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap="4"
              marginTop="4"
              maxWidth="900px"
              marginX="auto"
            >
              <Button
                asChild
                background="teal.700"
                color="white"
                minHeight="76px"
                fontSize="lg"
                width="100%"
              >
                <Link to="/medikamente">
                  <Flex as="span" align="center" justify="center">
                    <ActionIcon symbol="🔎" />
                    {isEnglish ? "Search medications" : "Medikamente suchen"}
                  </Flex>
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                borderWidth="2px"
                minHeight="76px"
                fontSize="lg"
                color="teal.900"
                borderColor="teal.700"
                width="100%"
              >
                <Link to="/meine-medikamente">
                  <Flex as="span" align="center" justify="center">
                    <ActionIcon symbol="💊" />
                    {isEnglish ? "My medications" : "Meine Medikamente"}
                  </Flex>
                </Link>
              </Button>

              <Button
                asChild
                background="red.600"
                color="white"
                minHeight="76px"
                fontSize="lg"
                width="100%"
                _hover={{ background: "red.700" }}
              >
                <Link to="/notfall">
                  <Flex as="span" align="center" justify="center">
                    <ActionIcon symbol="⚠️" />
                    {isEnglish ? "Emergency help" : "Notfallhilfe"}
                  </Flex>
                </Link>
              </Button>
            </SimpleGrid>
          </Box>
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
            padding={{ base: "5", md: "6" }}
            borderRadius="xl"
            borderWidth="1px"
            borderColor="gray.200"
            minHeight={{ base: "150px", md: "170px" }}
            boxShadow="sm"
            cursor="pointer"
            transition="0.2s"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "md",
            }}
            _focusVisible={{
              outline: "3px solid",
              outlineColor: "teal.500",
              outlineOffset: "3px",
            }}
          >
            <Link to="/medikamente">
              <FeatureIcon symbol="🔎" background="teal.100" />

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
            padding={{ base: "5", md: "6" }}
            borderRadius="xl"
            borderWidth="1px"
            borderColor="gray.200"
            minHeight={{ base: "150px", md: "170px" }}
            boxShadow="sm"
            cursor="pointer"
            transition="0.2s"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "md",
            }}
            _focusVisible={{
              outline: "3px solid",
              outlineColor: "teal.500",
              outlineOffset: "3px",
            }}
          >
            <Link to="/medikamente">
              <FeatureIcon symbol="📖" background="orange.100" />

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
            padding={{ base: "5", md: "6" }}
            borderRadius="xl"
            borderWidth="1px"
            borderColor="gray.200"
            minHeight={{ base: "150px", md: "170px" }}
            boxShadow="sm"
            cursor="pointer"
            transition="0.2s"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "md",
            }}
            _focusVisible={{
              outline: "3px solid",
              outlineColor: "teal.500",
              outlineOffset: "3px",
            }}
          >
            <Link to="/meine-medikamente">
              <FeatureIcon symbol="💊" background="blue.100" />

              <Heading size="md">
                {isEnglish ? "My medications" : "Meine Medikamente"}
              </Heading>

              <Text marginTop="3">
                {isEnglish ? "Manage your personal medications and reminders securely in your account." : "Verwalte deine persönlichen Medikamente und Erinnerungen sicher in deinem Benutzerkonto."}
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
