import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  ChakraProvider,
  defaultSystem,
} from "@chakra-ui/react";
import MedicationProvider from "./context/MedicationProvider";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <MedicationProvider>
          <App />
        </MedicationProvider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
