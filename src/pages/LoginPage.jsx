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

function LoginPage() {
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
        setMessage("Bitte bestätige zuerst deine E-Mail-Adresse.");
        return;
      }

      navigate("/meine-medikamente");
    } catch {
      setMessage("E-Mail-Adresse oder Passwort ist falsch.");
    }
  }

  async function handlePasswordReset() {
    setMessage("");

    if (!email) {
      setMessage(
        "Bitte trage zuerst deine E-Mail-Adresse ein."
      );
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);

      setMessage(
        "Eine E-Mail zum Zurücksetzen des Passworts wurde gesendet."
      );
    } catch {
      setMessage(
        "Die E-Mail zum Zurücksetzen konnte nicht gesendet werden."
      );
    }
  }

  return (
    <Box maxW="500px" mx="auto" p="6">
      <Heading mb="6">Anmelden</Heading>

      <form onSubmit={handleSubmit}>
        <Stack gap="4">
          <Input
            type="email"
            placeholder="E-Mail-Adresse"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <Button type="submit" colorPalette="teal">
            Anmelden
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handlePasswordReset}
          >
            Passwort vergessen
          </Button>

          <Text>
            Noch kein Konto?{" "}
            <Link to="/registrieren">
              Konto erstellen
            </Link>
          </Text>

          {message && <Text>{message}</Text>}
        </Stack>
      </form>
    </Box>
  );
}

export default LoginPage;
