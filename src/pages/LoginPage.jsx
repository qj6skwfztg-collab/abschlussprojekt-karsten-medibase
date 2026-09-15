import { useState } from "react";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import useLanguage from "../hooks/useLanguage";
import PasswordField from "../components/PasswordField";
import { ONBOARDING_PENDING_KEY_PREFIX } from "../components/OnboardingWizard";

function LoginPage() {
  const { isEnglish } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      setIsLoading(true);
      const userCredential = await Promise.race([
        signInWithEmailAndPassword(auth, email.trim(), password),
        new Promise((_, reject) => {
          window.setTimeout(
            () => reject({ code: "auth/timeout" }),
            15000
          );
        }),
      ]);

      if (!userCredential.user.emailVerified) {
        await signOut(auth);
        setMessage(isEnglish ? "Please verify your email address first." : "Bitte bestätige zuerst deine E-Mail-Adresse.");
        return;
      }

      const hasPendingOnboarding = localStorage.getItem(
        `${ONBOARDING_PENDING_KEY_PREFIX}${userCredential.user.uid}`
      ) === "true";

      navigate(hasPendingOnboarding ? "/einrichtung" : "/meine-medikamente");
    } catch (firebaseError) {
      if (firebaseError?.code === "auth/timeout") {
        setMessage(
          isEnglish
            ? "The login service did not respond. Please check the simulator's internet connection."
            : "Der Anmeldedienst antwortet nicht. Bitte prüfe die Internetverbindung des Simulators."
        );
      } else if (firebaseError?.code === "auth/network-request-failed") {
        setMessage(
          isEnglish
            ? "No connection to the login service. Please check your internet connection and try again."
            : "Der Anmeldedienst ist nicht erreichbar. Bitte prüfe die Internetverbindung und versuche es erneut."
        );
      } else if (
        ["auth/invalid-credential", "auth/wrong-password", "auth/user-not-found"].includes(
          firebaseError?.code
        )
      ) {
        setMessage(
          isEnglish
            ? "The email address or password is incorrect."
            : "E-Mail-Adresse oder Passwort ist falsch."
        );
      } else {
        setMessage(
          isEnglish
            ? `Sign-in failed (${firebaseError?.code || "unknown error"}).`
            : `Anmeldung fehlgeschlagen (${firebaseError?.code || "unbekannter Fehler"}).`
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePasswordReset() {
    setMessage("");

    if (!email) {
      setMessage(
        isEnglish ? "Please enter your email address first." : "Bitte trage zuerst deine E-Mail-Adresse ein."
      );
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());

      setMessage(
        isEnglish ? "A password reset email has been sent." : "Eine E-Mail zum Zurücksetzen des Passworts wurde gesendet."
      );
    } catch {
      setMessage(
        isEnglish ? "The password reset email could not be sent." : "Die E-Mail zum Zurücksetzen konnte nicht gesendet werden."
      );
    }
  }

  return (
    <Box maxW="500px" mx="auto" p="6">
      <Heading mb="6">{isEnglish ? "Sign in" : "Anmelden"}</Heading>

      <form onSubmit={handleSubmit}>
        <Stack gap="4">
          <Input
            type="email"
            placeholder={isEnglish ? "Email address" : "E-Mail-Adresse"}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <PasswordField
            id="login-password"
            label={isEnglish ? "Password" : "Passwort"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={isEnglish ? "Password" : "Passwort"}
            showText={isEnglish ? "Show" : "Anzeigen"}
            hideText={isEnglish ? "Hide" : "Verbergen"}
            autoComplete="current-password"
            required
          />

          <Button type="submit" colorPalette="teal" disabled={isLoading}>
            {isEnglish ? "Sign in" : "Anmelden"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handlePasswordReset}
          >
            {isEnglish ? "Forgot password" : "Passwort vergessen"}
          </Button>

          <Text>
            {isEnglish ? "No account yet? " : "Noch kein Konto? "}
            <Link to="/registrieren">
              {isEnglish ? "Create account" : "Konto erstellen"}
            </Link>
          </Text>

          {message && <Text>{message}</Text>}
        </Stack>
      </form>
    </Box>
  );
}

export default LoginPage;
