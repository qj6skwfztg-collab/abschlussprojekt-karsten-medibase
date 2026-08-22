import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutPage from "./pages/AboutPage";
import AddMedicationPage from "./pages/AddMedicationPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MedicationDetailPage from "./pages/MedicationDetailPage";
import MedicationsPage from "./pages/MedicationsPage";
import MyMedicationsPage from "./pages/MyMedicationsPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import EmergencyPage from "./pages/EmergencyPage";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/medikamente"
          element={<MedicationsPage />}
        />

        <Route
          path="/medikamente/:id"
          element={<MedicationDetailPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/registrieren"
          element={<RegisterPage />}
        />

        <Route
          path="/meine-medikamente"
          element={
            <ProtectedRoute>
              <MyMedicationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/neuer-eintrag"
          element={
            <ProtectedRoute>
              <AddMedicationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notfall"
          element={<EmergencyPage />}
        />

        <Route
          path="/ueber"
          element={<AboutPage />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
