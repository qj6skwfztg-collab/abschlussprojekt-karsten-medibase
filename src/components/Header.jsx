import { Box, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Box as="header" background="teal.700" color="white" padding="4">
      <Flex align="center" justify="space-between">
        <Heading size="lg">MediBase</Heading>

        <Flex gap="6">
          <Link to="/">Startseite</Link>
          <Link to="/medikamente">Medikamente</Link>
          <Link to="/neuer-eintrag">Neuer Eintrag</Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
