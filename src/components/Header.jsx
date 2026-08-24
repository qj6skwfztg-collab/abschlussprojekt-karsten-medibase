import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { ADMIN_UID, auth } from "../firebase";
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

  function getNavigationLinkProps(path) {
    const isActive = location.pathname === path;

    return {
      "aria-current": isActive ? "page" : undefined,
      style: {
        padding: "10px 12px",
        borderRadius: "8px",
        fontWeight: isActive ? "700" : "500",
        backgroundColor: isActive
          ? "rgba(255, 255, 255, 0.2)"
          : "transparent",
        textDecoration: isActive ? "underline" : "none",
        textUnderlineOffset: "4px",
        textAlign: "center",
      },
    };
  }

  return (
    <Box
      as="header"
      background="teal.700"
      color="white"
      padding={{ base: "3", md: "5" }}
    >
      <Flex
        className="header-main"
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap="4"
        width="100%"
        maxWidth="1400px"
        marginX="auto"
      >
        <Flex
          className="header-brand"
          align="center"
          justify="center"
          gap="3"
          flexShrink="0"
          width={{ base: "100%", md: "auto" }}
        >
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
          className="header-menu-toggle"
          display={{ base: "inline-flex", md: "none" }}
          variant="outline"
          color="white"
          borderColor="white"
          background="transparent"
          _hover={{ background: "whiteAlpha.200", color: "white" }}
          _active={{ background: "whiteAlpha.300", color: "white" }}
          _focusVisible={{
            background: "transparent",
            color: "white",
            outline: "3px solid white",
            outlineOffset: "3px",
          }}
          aria-controls="main-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((currentValue) => !currentValue)}
          width={{ base: "100%", md: "auto" }}
          maxWidth={{ base: "320px", md: "none" }}
        >
          {menuOpen
            ? (isEnglish ? "Close menu" : "Menü schließen")
            : (isEnglish ? "Open menu" : "Menü öffnen")}
        </Button>

        <Flex
          as="nav"
          className="header-navigation"
          id="main-navigation"
          aria-label={isEnglish ? "Main navigation" : "Hauptnavigation"}
          display={{ base: menuOpen ? "flex" : "none", md: "flex" }}
          direction={{ base: "column", md: "row" }}
          width={{ base: "100%", md: "auto" }}
          gap={{ base: "2", md: "6" }}
          align={{ base: "stretch", md: "center" }}
          justify="center"
          flexWrap="wrap"
          flex={{ base: "none", md: "1" }}
          maxWidth={{ base: "420px", md: "none" }}
          marginX="auto"
        >
          {!isHomePage && (
            <>
              <Link className="header-link" to="/" onClick={closeMenu} {...getNavigationLinkProps("/")}>
                {isEnglish ? "Home" : "Startseite"}
              </Link>

              <Link className="header-link" to="/medikamente" onClick={closeMenu} {...getNavigationLinkProps("/medikamente")}>
                {isEnglish ? "Search medications" : "Medikamente suchen"}
              </Link>

              {user && (
                <Link className="header-link" to="/meine-medikamente" onClick={closeMenu} {...getNavigationLinkProps("/meine-medikamente")}>
                  {isEnglish ? "My medications" : "Meine Medikamente"}
                </Link>
              )}
            </>
          )}

          {user && (
            <Link className="header-link" to="/konto" onClick={closeMenu} {...getNavigationLinkProps("/konto")}>
              {isEnglish ? "My account" : "Mein Konto"}
            </Link>
          )}

          {user?.uid === ADMIN_UID && user.emailVerified && (
            <Link className="header-link" to="/neuer-eintrag" onClick={closeMenu} {...getNavigationLinkProps("/neuer-eintrag")}>
              {isEnglish ? "New entry" : "Neuer Eintrag"}
            </Link>
          )}

          <Link className="header-link" to="/installieren" onClick={closeMenu} {...getNavigationLinkProps("/installieren")}>
            {isEnglish ? "Install Curaelis" : "Curaelis installieren"}
          </Link>

          <Link className="header-link" to="/ueber" onClick={closeMenu} {...getNavigationLinkProps("/ueber")}>
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
                boxShadow:
                  location.pathname === "/notfall"
                    ? "0 0 0 3px rgba(255, 255, 255, 0.8)"
                    : "none",
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
            <Flex className="header-auth-links" gap="4" align="center">
              <Link className="header-link" to="/login" onClick={closeMenu} {...getNavigationLinkProps("/login")}>
                {isEnglish ? "Sign in" : "Anmelden"}
              </Link>

              <Link className="header-link" to="/registrieren" onClick={closeMenu} {...getNavigationLinkProps("/registrieren")}>
                {isEnglish ? "Create account" : "Konto erstellen"}
              </Link>
            </Flex>
          )}
        </Flex>
      </Flex>

      <Box
        marginTop={{ base: "3", md: "4" }}
        paddingTop={{ base: "3", md: "4" }}
        borderTop="1px solid"
        borderColor="whiteAlpha.400"
        maxWidth="1400px"
        marginX="auto"
      >
        <AccessibilityControls />
      </Box>
    </Box>
  );
}

export default Header;
