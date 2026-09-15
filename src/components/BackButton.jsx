import { Box, Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import useLanguage from "../hooks/useLanguage";

function BackButton() {
  const { isEnglish } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isFromOnboarding =
    Boolean(location.state?.fromOnboarding) ||
    new URLSearchParams(location.search).get("from") === "einrichtung";
  const isAfterOnboarding = Boolean(location.state?.onboardingFinished);

  if (location.pathname === "/") {
    return null;
  }

  function handleBack() {
    if (isFromOnboarding) {
      navigate("/einrichtung");
      return;
    }

    if (isAfterOnboarding) {
      navigate("/", { replace: true });
      return;
    }

    if (location.pathname === "/einrichtung") {
      navigate("/");
      return;
    }

    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  }

  return (
    <Box padding={{ base: "4", md: "6" }} maxWidth="1400px" marginX="auto">
      <Button
        type="button"
        variant="outline"
        colorPalette="teal"
        size="lg"
        minHeight="52px"
        onClick={handleBack}
        aria-label={
          isFromOnboarding
            ? (isEnglish ? "Return to setup" : "Zur Einrichtung zurück")
            : isAfterOnboarding
              ? (isEnglish ? "Return to home page" : "Zur Startseite zurück")
              : (isEnglish ? "Go back" : "Zurückgehen")
        }
      >
        ← {isFromOnboarding
          ? (isEnglish ? "Back to setup" : "Zur Einrichtung")
          : isAfterOnboarding
            ? (isEnglish ? "Home" : "Startseite")
            : (isEnglish ? "Back" : "Zurück")}
      </Button>
    </Box>
  );
}

export default BackButton;
