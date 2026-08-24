import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import AccessibilityControls from "./AccessibilityControls";
import useLanguage from "../hooks/useLanguage";

function Header() {
  const { isEnglish } = useLanguage();
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
          Curaelis
        </Heading>

        <Flex
          as="nav"
          gap={{ base: "3", md: "6" }}
          align="center"
          justify="center"
          flexWrap="wrap"
        >
          <Link to="/">
            {isEnglish ? "Home" : "Startseite"}
          </Link>

          <Link to="/medikamente">
            {isEnglish ? "Search medications" : "Medikamente suchen"}
          </Link>

          {user && (
            <Link to="/meine-medikamente">
              {isEnglish ? "My medications" : "Meine Medikamente"}
            </Link>
          )}

          {user && (
            <Link to="/konto">
              {isEnglish ? "My account" : "Mein Konto"}
            </Link>
          )}

          {user && (
            <Link to="/neuer-eintrag">
              {isEnglish ? "New entry" : "Neuer Eintrag"}
            </Link>
          )}

          <Link to="/ueber">
            {isEnglish ? "About Curaelis" : "Über Curaelis"}
          </Link>

          <Link
            to="/notfall"
            style={{
            backgroundColor: "#c53030",
            color: "white",
            padding: "10px 16px",
            borderRadius: "8px",
            fontWeight: "bold",
  }}
>
  {isEnglish ? "Emergency help" : "Notfallhilfe"}
</Link>

          {user ? (
            <Button
              size="sm"
              variant="outline"
              color="white"
              borderColor="white"
              onClick={handleLogout}
            >
              {isEnglish ? "Sign out" : "Abmelden"}
            </Button>
          ) : (
            <Flex gap="4" align="center">
              <Link to="/login">
                {isEnglish ? "Sign in" : "Anmelden"}
              </Link>

              <Link to="/registrieren">
                {isEnglish ? "Create account" : "Konto erstellen"}
              </Link>
            </Flex>
          )}
        </Flex>
      </Flex>

      <Box marginTop="4" paddingTop="4" borderTop="1px solid" borderColor="whiteAlpha.400">
        <AccessibilityControls />
      </Box>
    </Box>
  );
}

export default Header;
