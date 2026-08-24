import { Box, Heading, List, Text } from "@chakra-ui/react";
import useLanguage from "../hooks/useLanguage";

function InstallPage() {
  const { isEnglish } = useLanguage();

  return (
    <Box maxW="900px" mx="auto" p="6">
      <Heading>
        {isEnglish ? "Install Curaelis" : "Curaelis installieren"}
      </Heading>

      <Text mt="4" fontSize="lg">
        {isEnglish
          ? "Curaelis can be added to your device like an app. No App Store download is needed."
          : "Curaelis kann wie eine App auf deinem Gerät hinzugefügt werden. Ein Download aus dem App Store ist dafür nicht nötig."}
      </Text>

      <Heading size="md" mt="8">
        {isEnglish ? "iPhone or iPad" : "iPhone oder iPad"}
      </Heading>
      <List.Root mt="3" pl="6">
        <List.Item>{isEnglish ? "Open Curaelis in Safari." : "Öffne Curaelis in Safari."}</List.Item>
        <List.Item>{isEnglish ? "Tap Share and choose Add to Home Screen." : "Tippe auf Teilen und wähle Zu Home-Bildschirm hinzufügen."}</List.Item>
        <List.Item>{isEnglish ? "Enable Open as Web App, then tap Add." : "Aktiviere Als Web-App öffnen und tippe auf Hinzufügen."}</List.Item>
      </List.Root>

      <Heading size="md" mt="8">
        {isEnglish ? "Android" : "Android"}
      </Heading>
      <List.Root mt="3" pl="6">
        <List.Item>{isEnglish ? "Open Curaelis in Chrome." : "Öffne Curaelis in Chrome."}</List.Item>
        <List.Item>{isEnglish ? "Open the three-dot menu." : "Öffne das Drei-Punkte-Menü."}</List.Item>
        <List.Item>{isEnglish ? "Choose Install or Add to Home Screen." : "Wähle Installieren oder Zum Home-Bildschirm hinzufügen."}</List.Item>
      </List.Root>

      <Heading size="md" mt="8">
        {isEnglish ? "Mac" : "Mac"}
      </Heading>
      <List.Root mt="3" pl="6">
        <List.Item>{isEnglish ? "Open Curaelis in Safari." : "Öffne Curaelis in Safari."}</List.Item>
        <List.Item>{isEnglish ? "Choose Share and then Add to Dock." : "Wähle Teilen und anschließend Zum Dock hinzufügen."}</List.Item>
      </List.Root>

      <Text mt="8" fontSize="sm" color="gray.600">
        {isEnglish
          ? "Curaelis remains a web app. This does not publish it in the Apple App Store."
          : "Curaelis bleibt dabei eine Web-App. Dadurch wird die App nicht automatisch im Apple App Store veröffentlicht."}
      </Text>
    </Box>
  );
}

export default InstallPage;
