import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { InstallationDetail } from "./pages/Installation/InstallationsDetail";
import { Installation } from "./pages/Installation/Installations";
import { AddEditInstallationSensor } from "./pages/Installation/AddEditInstallationSensor";
import { InstallationSensorLog } from "./pages/Installation/InstallationSensorLog";

function App() {
  return (
    <div className="w-[100vw]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/installations" element={<Installation />} />
        <Route path="/installation/:id" element={<InstallationDetail />} />
        <Route path="/installation/:id/measurement-sensor-log" element={<InstallationSensorLog />} />
        <Route path="/installation/:id/add-measurement" element={<AddEditInstallationSensor />} />
        <Route path="/installation/:id/edit-measurement" element={<AddEditInstallationSensor />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
