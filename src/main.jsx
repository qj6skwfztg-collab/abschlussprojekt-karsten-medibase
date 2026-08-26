import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  ChakraProvider,
  defaultSystem,
} from "@chakra-ui/react";
import MedicationProvider from "./context/MedicationProvider";
import LanguageProvider from "./context/LanguageProvider";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <LanguageProvider>
          <MedicationProvider>
            <App />
          </MedicationProvider>
        </LanguageProvider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      if (import.meta.env.PROD) {
        await navigator.serviceWorker.register("/medibase-sw.js");

        console.log("Curaelis Service Worker wurde registriert.");
        return;
      }

      const registrations = await navigator.serviceWorker.getRegistrations();

      await Promise.all(
        registrations.map((registration) => registration.unregister())
      );
    } catch (error) {
      console.error("Service Worker konnte nicht eingerichtet werden.", error);
    }
  });
}
