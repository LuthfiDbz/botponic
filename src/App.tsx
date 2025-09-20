import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { InstallationDetail } from "./pages/Installation/InstallationsDetail";
import { Installation } from "./pages/Installation/Installations";
import { AddEditMeasurement } from "./pages/Installation/AddEditMeasurement";

function App() {
  return (
    <div className="w-[100vw]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/installations" element={<Installation />} />
        <Route path="/installation/:id" element={<InstallationDetail />} />
        <Route path="/installation/:id/add-measurement" element={<AddEditMeasurement />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
