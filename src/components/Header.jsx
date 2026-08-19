import { Box, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Box
      as="header"
      background="teal.700"
      color="white"
      padding={{ base: "4", md: "5" }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap="4"
      >
        <Heading size="lg" color="white">
          MediBase
        </Heading>

        <Flex
          as="nav"
          gap={{ base: "3", md: "6" }}
          justify="center"
          flexWrap="wrap"
        >
          <Link to="/">
            Startseite
          </Link>

          <Link to="/medikamente">
            Medikamente
          </Link>

          <Link to="/neuer-eintrag">
            Neuer Eintrag
          </Link>

          <Link to="/ueber">
            Über MediBase
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
