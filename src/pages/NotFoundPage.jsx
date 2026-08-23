import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useLanguage from "../hooks/useLanguage";

function NotFoundPage() {
  const { isEnglish } = useLanguage();
  return (
    <Box
      padding={{ base: "6", md: "10" }}
      textAlign="center"
    >
      <Heading>{isEnglish ? "Page not found" : "Seite nicht gefunden"}</Heading>

      <Text marginTop="4">
        {isEnglish ? "The requested page does not exist." : "Die gewünschte Seite existiert leider nicht."}
      </Text>

      <Button
        asChild
        marginTop="6"
        background="teal.700"
        color="white"
      >
        <Link to="/">
          {isEnglish ? "Back to home" : "Zurück zur Startseite"}
        </Link>
      </Button>
    </Box>
  );
}

export default NotFoundPage;
