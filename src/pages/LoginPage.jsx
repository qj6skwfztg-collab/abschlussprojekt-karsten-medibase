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

function LoginPage() {
  const { isEnglish } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCredential.user.emailVerified) {
        await signOut(auth);
        setMessage(isEnglish ? "Please verify your email address first." : "Bitte bestätige zuerst deine E-Mail-Adresse.");
        return;
      }

      navigate("/meine-medikamente");
    } catch {
      setMessage(isEnglish ? "The email address or password is incorrect." : "E-Mail-Adresse oder Passwort ist falsch.");
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
      await sendPasswordResetEmail(auth, email);

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

          <Input
            type="password"
            placeholder={isEnglish ? "Password" : "Passwort"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <Button type="submit" colorPalette="teal">
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
