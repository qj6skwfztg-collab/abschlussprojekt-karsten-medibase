import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { ADMIN_UID, auth } from "../firebase";
import useLanguage from "../hooks/useLanguage";

function AdminRoute({ children }) {
  const { isEnglish } = useLanguage();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stopListening = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return stopListening;
  }, []);

  if (isLoading) {
    return (
      <Text padding="6">
        {isEnglish ? "Checking permissions …" : "Berechtigung wird geprüft …"}
      </Text>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.uid !== ADMIN_UID || !user.emailVerified) {
    return <Navigate to="/medikamente" replace />;
  }

  return children;
}

export default AdminRoute;
