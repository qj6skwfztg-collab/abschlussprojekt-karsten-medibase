import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AddMedicationPage from "./pages/AddMedicationPage";
import HomePage from "./pages/HomePage";
import MedicationDetailPage from "./pages/MedicationDetailPage";
import MedicationsPage from "./pages/MedicationsPage";

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
      </Routes>

      <Footer />
    </>
  );
}

export default App;
