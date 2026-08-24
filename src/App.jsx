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
import ImprintPage from "./pages/ImprintPage";
import PrivacyPage from "./pages/PrivacyPage";
import AccountPage from "./pages/AccountPage";
import InstallPage from "./pages/InstallPage";
import PersonalMedicationReminder from "./components/PersonalMedicationReminder";

function App() {
  return (
    <>
      <Header />
      <PersonalMedicationReminder />

      <main id="main-content">
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
          path="/konto"
          element={
            <ProtectedRoute>
              <AccountPage />
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
            path="/installieren"
            element={<InstallPage />}
          />

          <Route
            path="/impressum"
            element={<ImprintPage />}
          />

          <Route
            path="/datenschutz"
            element={<PrivacyPage />}
          />

          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
