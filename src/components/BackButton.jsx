import { Box, Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import useLanguage from "../hooks/useLanguage";

function BackButton() {
  const { isEnglish } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/") {
    return null;
  }

  function handleBack() {
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
        aria-label={isEnglish ? "Go back" : "Zurückgehen"}
      >
        ← {isEnglish ? "Back" : "Zurück"}
      </Button>
    </Box>
  );
}

export default BackButton;
