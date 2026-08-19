import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Box, Button, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { auth } from "../firebase";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Anmeldung erfolgreich.");
      setEmail("");
      setPassword("");
    } catch {
      setMessage("E-Mail-Adresse oder Passwort ist falsch.");
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

          {message && <Text>{message}</Text>}
        </Stack>
      </form>
    </Box>
  );
}

export default LoginPage;
