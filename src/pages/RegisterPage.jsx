import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] =
    useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Bitte gib deine E-Mail-Adresse ein.");
      return;
    }

    if (password.length < 6) {
      setError("Das Passwort muss mindestens 6 Zeichen lang sein.");
      return;
    }

    if (password !== passwordRepeat) {
      setError("Die beiden Passwörter stimmen nicht überein.");
      return;
    }

    try {
      setIsLoading(true);

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

      await sendEmailVerification(userCredential.user);

      await signOut(auth);

      setRegistrationComplete(true);
    } catch (firebaseError) {
      if (firebaseError.code === "auth/email-already-in-use") {
        setError(
          "Für diese E-Mail-Adresse gibt es bereits ein Konto."
        );
      } else if (firebaseError.code === "auth/invalid-email") {
        setError("Die E-Mail-Adresse ist ungültig.");
      } else if (firebaseError.code === "auth/weak-password") {
        setError("Das gewählte Passwort ist zu unsicher.");
      } else {
        setError(
          "Das Konto konnte nicht erstellt werden."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (registrationComplete) {
    return (
      <Box
        maxWidth="500px"
        margin="0 auto"
        padding="6"
      >
        <Box
          background="green.50"
          borderWidth="1px"
          borderColor="green.200"
          padding="6"
          borderRadius="lg"
        >
          <Heading size="lg" marginBottom="4">
            E-Mail bestätigen
          </Heading>

          <Text marginBottom="4">
            Wir haben dir eine Bestätigungs-E-Mail geschickt.
            Öffne die E-Mail und klicke auf den enthaltenen Link.
          </Text>

          <Text marginBottom="4">
            Danach kannst du dich bei MediBase anmelden.
          </Text>

          <Link to="/login">
            Zur Anmeldung
          </Link>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      maxWidth="500px"
      margin="0 auto"
      padding="6"
    >
      <Heading marginBottom="6">
        Konto erstellen
      </Heading>

      <Box
        as="form"
        onSubmit={handleSubmit}
        background="white"
        padding="6"
        borderRadius="lg"
        boxShadow="md"
      >
        <Stack gap="4">
          <Box>
            <Text marginBottom="2">
              E-Mail-Adresse
            </Text>

            <Input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="name@beispiel.de"
            />
          </Box>

          <Box>
            <Text marginBottom="2">
              Passwort
            </Text>

            <Input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Mindestens 6 Zeichen"
            />
          </Box>

          <Box>
            <Text marginBottom="2">
              Passwort wiederholen
            </Text>

            <Input
              type="password"
              value={passwordRepeat}
              onChange={(event) =>
                setPasswordRepeat(event.target.value)
              }
              placeholder="Passwort erneut eingeben"
            />
          </Box>

          {error && (
            <Text color="red.600">
              {error}
            </Text>
          )}

          <Button
            type="submit"
            colorPalette="teal"
            loading={isLoading}
          >
            Konto erstellen
          </Button>

          <Text fontSize="sm">
            Du hast bereits ein Konto?{" "}
            <Link to="/login">
              Zur Anmeldung
            </Link>
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}

export default RegisterPage;
