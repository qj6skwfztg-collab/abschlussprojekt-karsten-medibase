import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AboutPage from "./pages/AboutPage";
import AddMedicationPage from "./pages/AddMedicationPage";
import HomePage from "./pages/HomePage";
import MedicationDetailPage from "./pages/MedicationDetailPage";
import MedicationsPage from "./pages/MedicationsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/medikamente"
          element={<MedicationsPage />}
        />

        <Route
          path="/medikamente/:id"
          element={<MedicationDetailPage />}
        />

        <Route
          path="/neuer-eintrag"
          element={<AddMedicationPage />}
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

