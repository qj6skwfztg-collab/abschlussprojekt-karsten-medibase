import { useEffect, useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

const MIN_FONT_SIZE = 90;
const MAX_FONT_SIZE = 130;
const FONT_SIZE_STEP = 10;

function AccessibilityControls() {
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

  function resetAccessibility() {
    setFontSize(100);
    setHighContrast(false);
  }

  function toggleReadAloud() {
    if (!("speechSynthesis" in window)) {
      window.alert("Die Vorlesefunktion wird von diesem Browser nicht unterstützt.");
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
      window.alert("Auf dieser Seite wurde kein Text zum Vorlesen gefunden.");
      return;
    }

    const speech = new SpeechSynthesisUtterance(textToRead);
    speech.lang = "de-DE";
    speech.rate = 0.9;
    speech.onend = () => setIsReading(false);
    speech.onerror = () => setIsReading(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
    setIsReading(true);
  }

  return (
    <Flex
      align="center"
      justify="center"
      gap="2"
      flexWrap="wrap"
      aria-label="Einstellungen für Barrierefreiheit"
    >
      <Text fontSize="sm" fontWeight="bold">
        Barrierefreiheit:
      </Text>

      <Button
        size="sm"
        variant="outline"
        color="white"
        borderColor="white"
        onClick={decreaseFontSize}
        disabled={fontSize === MIN_FONT_SIZE}
        aria-label="Schrift verkleinern"
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
        aria-label="Schrift vergrößern"
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
        Hoher Kontrast
      </Button>

      <Button
        size="sm"
        variant="outline"
        color="white"
        borderColor="white"
        onClick={toggleReadAloud}
        aria-pressed={isReading}
      >
        {isReading ? "Vorlesen stoppen" : "Seite vorlesen"}
      </Button>

      <Button
        size="sm"
        variant="ghost"
        color="white"
        onClick={resetAccessibility}
      >
        Standard
      </Button>
    </Flex>
  );
}

export default AccessibilityControls;
