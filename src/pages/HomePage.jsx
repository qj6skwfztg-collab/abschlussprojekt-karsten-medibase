import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "../assets/medibase-neu.png";
import vitruvianImage from "../assets/medibase-vitruvian.png";
import founderCharacter from "../assets/curaelis-karsten-anime.png";
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

function QuickSearchDialog({ isOpen, onClose, isEnglish }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  function handleSubmit(event) {
    event.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;

    navigate(`/medikamente?search=${encodeURIComponent(term)}#medication-search`);
  }

  return (
    <Box className="quick-search-modal-backdrop" onClick={onClose}>
      <Box
        as="section"
        className="quick-search-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-search-title"
        onClick={(event) => event.stopPropagation()}
      >
        <Flex align="start" justify="space-between" gap="4">
          <Box>
            <Text className="quick-search-kicker">CURAELIS</Text>
            <Heading id="quick-search-title" size="lg" color="teal.900">
              {isEnglish ? "Find a medication" : "Medikament schnell suchen"}
            </Heading>
            <Text mt="2" color="gray.600">
              {isEnglish
                ? "Enter a name or active ingredient to open the matching Curaelis information."
                : "Gib einen Namen oder Wirkstoff ein und öffne direkt die passende Curaelis-Information."}
            </Text>
          </Box>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label={isEnglish ? "Close search" : "Suche schließen"}
            onClick={onClose}
          >
            ×
          </Button>
        </Flex>

        <form onSubmit={handleSubmit}>
          <Text as="label" htmlFor="quick-medication-search" display="block" mt="6" mb="2" fontWeight="700">
            {isEnglish ? "Medication name or active ingredient" : "Medikament oder Wirkstoff"}
          </Text>
          <Input
            id="quick-medication-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={isEnglish ? "For example, paracetamol" : "Zum Beispiel Paracetamol"}
            autoFocus
            size="lg"
          />
          <Flex justify="end" gap="3" mt="6" wrap="wrap">
            <Button type="button" variant="outline" onClick={onClose}>
              {isEnglish ? "Cancel" : "Abbrechen"}
            </Button>
            <Button type="submit" colorPalette="teal" disabled={!searchTerm.trim()}>
              {isEnglish ? "Search now" : "Jetzt suchen"}
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}

function HomePage() {
  const { isEnglish } = useLanguage();
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);
  return (
    <Box
      className="home-page"
      padding={{ base: "6", md: "10" }}
      maxWidth="1200px"
      margin="0 auto"
      position="relative"
      overflow="visible"
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
            {isEnglish ? "Your health. Clearer every day." : "Deine Gesundheit. Klarer im Alltag."}
          </Heading>

          <Text
            marginTop="4"
            maxWidth="760px"
            marginX="auto"
            fontSize={{ base: "md", md: "lg" }}
          >
            {isEnglish
              ? "Understand medications, manage your personal plan, track health values, set reminders and keep important safety information close at hand."
              : "Verstehe Medikamente, verwalte deinen persönlichen Plan, dokumentiere Gesundheitswerte, richte Erinnerungen ein und behalte wichtige Sicherheitsinformationen griffbereit."}
          </Text>

          <Box
            display={{ base: "none", md: "block" }}
            position="absolute"
            top={{ base: "20px", md: "350px" }}
            left={{ base: "0", md: "-10px" }}
            width="190px"
            padding="2"
            borderRadius="3xl"
            background="linear-gradient(135deg, rgba(230, 255, 250, 0.95), rgba(255, 255, 255, 0.85))"
            border="1px solid"
            borderColor="teal.100"
            boxShadow="0 14px 30px rgba(13, 148, 136, 0.16)"
            zIndex="2"
          >
            <Box
              marginBottom="2"
              padding="2"
              borderRadius="xl"
              background="white"
              border="1px solid"
              borderColor="teal.200"
              color="teal.900"
              fontSize="xs"
              fontWeight="700"
              lineHeight="1.3"
              textAlign="center"
              boxShadow="sm"
            >
              {isEnglish ? "Take a look at what Curaelis can do!" : "Schau dir an, was Curaelis kann!"}
            </Box>

            <Image
              src={founderCharacter}
              alt={isEnglish ? "Anime illustration of the Curaelis developer presenting the app" : "Anime-Illustration des Curaelis-Entwicklers, der die App präsentiert"}
              width="100%"
              maxHeight="205px"
              objectFit="contain"
              objectPosition="bottom"
              filter="drop-shadow(0 10px 12px rgba(15, 118, 110, 0.18))"
            />

            <Text
              marginTop="1"
              color="gray.600"
              fontSize="2xs"
              lineHeight="1.2"
              textAlign="center"
            >
              {isEnglish
                ? "Demo image – removed again before publication."
                : "Demo-Bild – wird vor der Veröffentlichung wieder entfernt."}
            </Text>
          </Box>

          <Box
            className="home-action-panel"
            marginTop="7"
            marginLeft="0"
            width="100%"
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
                className="home-action-button"
                background="teal.700"
                color="white"
                minHeight="76px"
                fontSize="lg"
                width="100%"
                borderRadius="2xl"
                boxShadow="0 8px 18px rgba(15, 118, 110, 0.18)"
                _hover={{
                  background: "teal.800",
                  transform: "translateY(-3px)",
                  boxShadow: "0 14px 24px rgba(15, 118, 110, 0.24)",
                }}
              >
                <Link to="/medikamente#medication-search">
                  <Flex as="span" align="center" justify="center">
                    <ActionIcon symbol="🔎" />
                    {isEnglish ? "Search medications" : "Medikamente suchen"}
                  </Flex>
                </Link>
              </Button>

              <Button
                asChild
                className="home-action-button"
                variant="outline"
                borderWidth="2px"
                minHeight="76px"
                fontSize="lg"
                color="teal.900"
                borderColor="teal.700"
                width="100%"
                borderRadius="2xl"
                background="white"
                boxShadow="0 8px 18px rgba(45, 55, 72, 0.08)"
                _hover={{
                  background: "teal.50",
                  transform: "translateY(-3px)",
                  boxShadow: "0 14px 24px rgba(45, 55, 72, 0.14)",
                }}
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
                className="home-action-button"
                background="red.600"
                color="white"
                minHeight="76px"
                fontSize="lg"
                width="100%"
                borderRadius="2xl"
                boxShadow="0 8px 18px rgba(229, 62, 62, 0.18)"
                _hover={{
                  background: "red.700",
                  transform: "translateY(-3px)",
                  boxShadow: "0 14px 24px rgba(229, 62, 62, 0.24)",
                }}
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
          className="home-hero-image"
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
            as="div"
            role="button"
            tabIndex="0"
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
            onClick={() => setIsQuickSearchOpen(true)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setIsQuickSearchOpen(true);
              }
            }}
            aria-haspopup="dialog"
            aria-expanded={isQuickSearchOpen}
            textAlign="left"
          >
            <FeatureIcon symbol="🔎" background="teal.100" />

            <Heading size="md">
              {isEnglish ? "Quick search" : "Schnell suchen"}
            </Heading>

            <Text marginTop="3">
              {isEnglish ? "Search by name or active ingredient without leaving the start page." : "Suche nach Name oder Wirkstoff, ohne die Startseite zu verlassen."}
            </Text>
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
            <Link to="/gesundheitstagebuch">
              <FeatureIcon symbol="📖" background="orange.100" />

              <Heading size="md">
                {isEnglish ? "Health overview" : "Gesundheitsübersicht"}
              </Heading>

              <Text marginTop="3">
                {isEnglish ? "Track weight, blood pressure and other values in a clear trend." : "Verfolge Gewicht, Blutdruck und weitere Werte in einem klaren Verlauf."}
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

      <QuickSearchDialog
        isOpen={isQuickSearchOpen}
        onClose={() => setIsQuickSearchOpen(false)}
        isEnglish={isEnglish}
      />
    </Box>
  );
}

export default HomePage;
