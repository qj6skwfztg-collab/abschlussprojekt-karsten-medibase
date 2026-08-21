import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stopListening = auth.onAuthStateChanged(
      (currentUser) => {
        setUser(currentUser);
      }
    );

    return stopListening;
  }, []);

  async function handleLogout() {
    await signOut(auth);
  }

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
          align="center"
          justify="center"
          flexWrap="wrap"
        >
          <Link to="/">
            Startseite
          </Link>

          <Link to="/medikamente">
            Medikamente
          </Link>

          {user && (
            <Link to="/meine-medikamente">
              Meine Medikamente
            </Link>
          )}

          {user && (
            <Link to="/neuer-eintrag">
              Neuer Eintrag
            </Link>
          )}

          <Link to="/ueber">
            Über MediBase
          </Link>

          {user ? (
            <Button
              size="sm"
              variant="outline"
              color="white"
              borderColor="white"
              onClick={handleLogout}
            >
              Abmelden
            </Button>
          ) : (
            <Flex gap="4" align="center">
              <Link to="/login">
                Anmelden
              </Link>

              <Link to="/registrieren">
                Konto erstellen
              </Link>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
