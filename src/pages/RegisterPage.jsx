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
import useLanguage from "../hooks/useLanguage";

function RegisterPage() {
  const { isEnglish } = useLanguage();
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
      setError(isEnglish ? "Please enter your email address." : "Bitte gib deine E-Mail-Adresse ein.");
      return;
    }

    if (password.length < 6) {
      setError(isEnglish ? "The password must contain at least 6 characters." : "Das Passwort muss mindestens 6 Zeichen lang sein.");
      return;
    }

    if (password !== passwordRepeat) {
      setError(isEnglish ? "The two passwords do not match." : "Die beiden Passwörter stimmen nicht überein.");
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
            {isEnglish ? "Verify your email" : "E-Mail bestätigen"}
          </Heading>

          <Text marginBottom="4">
            {isEnglish ? "We sent you a verification email. Open it and select the link it contains." : "Wir haben dir eine Bestätigungs-E-Mail geschickt. Öffne die E-Mail und klicke auf den enthaltenen Link."}
          </Text>

          <Text marginBottom="4">
            {isEnglish ? "You can then sign in to MediPervin." : "Danach kannst du dich bei MediPervin anmelden."}
          </Text>

          <Link to="/login">
            {isEnglish ? "Go to sign in" : "Zur Anmeldung"}
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
        {isEnglish ? "Create account" : "Konto erstellen"}
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
              {isEnglish ? "Email address" : "E-Mail-Adresse"}
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
              {isEnglish ? "Password" : "Passwort"}
            </Text>

            <Input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder={isEnglish ? "At least 6 characters" : "Mindestens 6 Zeichen"}
            />
          </Box>

          <Box>
            <Text marginBottom="2">
              {isEnglish ? "Repeat password" : "Passwort wiederholen"}
            </Text>

            <Input
              type="password"
              value={passwordRepeat}
              onChange={(event) =>
                setPasswordRepeat(event.target.value)
              }
              placeholder={isEnglish ? "Enter password again" : "Passwort erneut eingeben"}
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
            {isEnglish ? "Create account" : "Konto erstellen"}
          </Button>

          <Text fontSize="sm">
            {isEnglish ? "Already have an account? " : "Du hast bereits ein Konto? "}
            <Link to="/login">
              {isEnglish ? "Go to sign in" : "Zur Anmeldung"}
            </Link>
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}

export default RegisterPage;
