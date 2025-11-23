import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { InstallationDetail } from "./pages/Installation/InstallationsDetail";
import { Installation } from "./pages/Installation/Installations";
import { AddEditInstallationMeasurement } from "./pages/MeasurementLog/AddEditMeasurementLog";
import { AddEditPlanting } from "./pages/Planting/AddEditPlanting";
import { Planting } from "./pages/Planting/Plantings";
import { MeasurementLogs } from "./pages/MeasurementLog/MeasurementLogs";

function App() {
  return (
    <div className="w-[100vw]">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/installations" element={<Installation />} />
        <Route path="/installation/:id" element={<InstallationDetail />} />
        <Route path="/plantings" element={<Planting />} />
        <Route path="/add-planting" element={<AddEditPlanting />} />
        <Route path="/measurement-logs" element={<MeasurementLogs />} />
        <Route path="/add-measurement" element={<AddEditInstallationMeasurement />} />

        <Route path="/master-data/plants" element={<AddEditPlanting />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
