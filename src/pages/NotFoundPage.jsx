import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Box
      padding={{ base: "6", md: "10" }}
      textAlign="center"
    >
      <Heading>Seite nicht gefunden</Heading>

      <Text marginTop="4">
        Die gewünschte Seite existiert leider nicht.
      </Text>

      <Button
        asChild
        marginTop="6"
        background="teal.700"
        color="white"
      >
        <Link to="/">
          Zurück zur Startseite
        </Link>
      </Button>
    </Box>
  );
}

export default NotFoundPage;
