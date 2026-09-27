import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useLanguage from "../hooks/useLanguage";

function InstallPage() {
  const { isEnglish } = useLanguage();

  return (
    <Box maxW="900px" mx="auto" p="6">
      <Heading>
        {isEnglish ? "Use Curaelis" : "Curaelis nutzen"}
      </Heading>

      <Text mt="4" fontSize="lg">
        {isEnglish
          ? "The iOS app is available in the Apple App Store. The web access on this website is intended as a supplement, for example to sign in on a computer and manage your data and entries comfortably there."
          : "Die iOS-App ist im Apple App Store verfügbar. Der Webzugang auf dieser Website ist als Ergänzung gedacht, zum Beispiel um sich am Computer einzuloggen und Daten sowie Einträge dort bequem zu bearbeiten."}
      </Text>

      <Text mt="4" color="gray.700">
        {isEnglish
          ? "For the best mobile experience, please use the iOS app. The browser version is especially useful when you want to work with Curaelis on a larger screen."
          : "Für die beste Nutzung auf dem iPhone verwende bitte die iOS-App. Die Browser-Version ist besonders praktisch, wenn du Curaelis auf einem größeren Bildschirm verwenden möchtest."}
      </Text>

      <Button as={Link} to="/login" mt="6" size="lg" colorPalette="teal">
        {isEnglish ? "Open web access" : "Webzugang öffnen"}
      </Button>
    </Box>
  );
}

export default InstallPage;
