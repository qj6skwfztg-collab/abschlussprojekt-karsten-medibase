import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import AccessibilityControls from "./AccessibilityControls";
import useLanguage from "../hooks/useLanguage";

function Header() {
  const { isEnglish } = useLanguage();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHomePage = location.pathname === "/";

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
    setMenuOpen(false);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <Box
      as="header"
      background="teal.700"
      color="white"
      padding={{ base: "4", md: "5" }}
    >
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        gap="4"
      >
        <Flex align="center" gap="3" flexShrink="0">
          <Image
            src="/curaelis-icon.svg"
            alt=""
            aria-hidden="true"
            width={{ base: "9", md: "10" }}
            height={{ base: "9", md: "10" }}
            borderRadius="lg"
          />

          <Heading size="lg" color="white">
            Curaelis
          </Heading>
        </Flex>

        <Button
          display={{ base: "inline-flex", md: "none" }}
          variant="outline"
          color="white"
          borderColor="white"
          aria-controls="main-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((currentValue) => !currentValue)}
        >
          {menuOpen
            ? (isEnglish ? "Close menu" : "Menü schließen")
            : (isEnglish ? "Open menu" : "Menü öffnen")}
        </Button>

        <Flex
          as="nav"
          id="main-navigation"
          aria-label={isEnglish ? "Main navigation" : "Hauptnavigation"}
          display={{ base: menuOpen ? "flex" : "none", md: "flex" }}
          direction={{ base: "column", md: "row" }}
          width={{ base: "100%", md: "auto" }}
          gap={{ base: "2", md: "6" }}
          align={{ base: "stretch", md: "center" }}
          justify="center"
          flexWrap="wrap"
        >
          {!isHomePage && (
            <>
              <Link to="/" onClick={closeMenu} style={{ padding: "8px" }}>
                {isEnglish ? "Home" : "Startseite"}
              </Link>

              <Link to="/medikamente" onClick={closeMenu} style={{ padding: "8px" }}>
                {isEnglish ? "Search medications" : "Medikamente suchen"}
              </Link>

              {user && (
                <Link to="/meine-medikamente" onClick={closeMenu} style={{ padding: "8px" }}>
                  {isEnglish ? "My medications" : "Meine Medikamente"}
                </Link>
              )}
            </>
          )}

          {user && (
            <Link to="/konto" onClick={closeMenu} style={{ padding: "8px" }}>
              {isEnglish ? "My account" : "Mein Konto"}
            </Link>
          )}

          {user && (
            <Link to="/neuer-eintrag" onClick={closeMenu} style={{ padding: "8px" }}>
              {isEnglish ? "New entry" : "Neuer Eintrag"}
            </Link>
          )}

          <Link to="/installieren" onClick={closeMenu} style={{ padding: "8px" }}>
            {isEnglish ? "Install Curaelis" : "Curaelis installieren"}
          </Link>

          <Link to="/ueber" onClick={closeMenu} style={{ padding: "8px" }}>
            {isEnglish ? "About Curaelis" : "Über Curaelis"}
          </Link>

          {!isHomePage && (
            <Link
              to="/notfall"
              onClick={closeMenu}
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
          )}

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
              <Link to="/login" onClick={closeMenu} style={{ padding: "8px" }}>
                {isEnglish ? "Sign in" : "Anmelden"}
              </Link>

              <Link to="/registrieren" onClick={closeMenu} style={{ padding: "8px" }}>
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
