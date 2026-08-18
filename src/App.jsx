import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import MedicationsPage from "./pages/MedicationsPage";
import MedicationDetailPage from "./pages/MedicationDetailPage";
import AddMedicationPage from "./pages/AddMedicationPage";

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
    </>
  );
}

export default App;
