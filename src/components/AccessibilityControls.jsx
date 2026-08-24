import { useEffect, useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import useLanguage from "../hooks/useLanguage";

const MIN_FONT_SIZE = 90;
const MAX_FONT_SIZE = 130;
const FONT_SIZE_STEP = 10;

function AccessibilityControls() {
  const { isEnglish, toggleLanguage } = useLanguage();
  const [isReading, setIsReading] = useState(false);

  const [fontSize, setFontSize] = useState(() => {
    const savedFontSize = Number(
      localStorage.getItem("medibase-font-size")
    );

    return savedFontSize || 100;
  });

  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem("medibase-high-contrast") === "true";
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem("medibase-font-size", String(fontSize));
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "high-contrast",
      highContrast
    );

    localStorage.setItem(
      "medibase-high-contrast",
      String(highContrast)
    );
  }, [highContrast]);

  useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, []);

  function decreaseFontSize() {
    setFontSize((currentSize) =>
      Math.max(MIN_FONT_SIZE, currentSize - FONT_SIZE_STEP)
    );
  }

  function increaseFontSize() {
    setFontSize((currentSize) =>
      Math.min(MAX_FONT_SIZE, currentSize + FONT_SIZE_STEP)
    );
  }

  function toggleReadAloud() {
    if (!("speechSynthesis" in window)) {
      window.alert(isEnglish ? "Read aloud is not supported by this browser." : "Die Vorlesefunktion wird von diesem Browser nicht unterstützt.");
      return;
    }

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const mainContent = document.querySelector("main");
    const rootContent = document.querySelector("#root");

    const textToRead = mainContent
      ? mainContent.innerText.trim()
      : Array.from(rootContent?.children ?? [])
          .filter(
            (element) =>
              !["HEADER", "FOOTER"].includes(element.tagName)
          )
          .map((element) => element.innerText.trim())
          .filter(Boolean)
          .join(". ");

    if (!textToRead) {
      window.alert(isEnglish ? "No text was found to read aloud on this page." : "Auf dieser Seite wurde kein Text zum Vorlesen gefunden.");
      return;
    }

    const speech = new SpeechSynthesisUtterance(textToRead);
    speech.lang = isEnglish ? "en-US" : "de-DE";
    speech.rate = 0.9;
    speech.onend = () => setIsReading(false);
    speech.onerror = () => setIsReading(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
    setIsReading(true);
  }

  return (
    <Flex
      className="accessibility-controls"
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="center"
      gap="2"
      flexWrap={{ base: "nowrap", md: "wrap" }}
      aria-label={isEnglish ? "Accessibility settings" : "Einstellungen für Barrierefreiheit"}
    >
      <Text className="accessibility-label" fontSize="sm" fontWeight="bold">
        {isEnglish ? "Accessibility:" : "Barrierefreiheit:"}
      </Text>

      <Flex
        className="accessibility-buttons"
        align="center"
        justify="center"
        gap="2"
        flexWrap="wrap"
      >
        <Button
          size="sm"
          variant="outline"
          color="white"
          borderColor="white"
          onClick={decreaseFontSize}
          disabled={fontSize === MIN_FONT_SIZE}
          aria-label={isEnglish ? "Decrease text size" : "Schrift verkleinern"}
        >
          A−
        </Button>

        <Button
          size="sm"
          variant="outline"
          color="white"
          borderColor="white"
          onClick={increaseFontSize}
          disabled={fontSize === MAX_FONT_SIZE}
          aria-label={isEnglish ? "Increase text size" : "Schrift vergrößern"}
        >
          A+
        </Button>

        <Button
          size="sm"
          variant={highContrast ? "solid" : "outline"}
          color={highContrast ? "black" : "white"}
          background={highContrast ? "yellow.300" : "transparent"}
          borderColor="white"
          onClick={() => setHighContrast((currentValue) => !currentValue)}
          aria-pressed={highContrast}
        >
          {highContrast
            ? (isEnglish ? "Standard contrast" : "Normaler Kontrast")
            : (isEnglish ? "High contrast" : "Hoher Kontrast")}
        </Button>

        <Button
          size="sm"
          variant="outline"
          color="white"
          borderColor="white"
          onClick={toggleReadAloud}
          aria-pressed={isReading}
        >
          {isReading
            ? (isEnglish ? "Stop reading" : "Vorlesen stoppen")
            : (isEnglish ? "Read page aloud" : "Seite vorlesen")}
        </Button>

        <Button
          size="sm"
          background="white"
          color="teal.800"
          onClick={toggleLanguage}
          aria-label={isEnglish ? "Switch to German" : "Auf Englisch umstellen"}
        >
          {isEnglish ? "Deutsch" : "English"}
        </Button>
      </Flex>
    </Flex>
  );
}

export default AccessibilityControls;
