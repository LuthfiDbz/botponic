import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header"
import { useState } from "react";
import { Sprout} from "lucide-react";
import type { Installation, InstallationSensor } from "../../interfaces/installations/installation.interface";


export function InstallationSensorLog() {
  const navigate = useNavigate()

  const [logData, setLogData] = useState<InstallationSensor[]>([
    {
      id: 1,
      installationId: 1,
      installation: {
        id: 1,
        name: 'Instalasi 1',
        type: 'Dewasa',
        model: 'NFT',
        size: '2x1 meter',
        capacity: 20,
        latestTemperature: 24.5,
        latestPH: 6.2,
        latestHumidity: 75,
        latestNutrients: 1200,
        latestWaterVolume: 80,
        status: 2,
        plantingCount: 20,
        image: '🥬',
      },
      nutrient: 1200,
      waterVolume: 70,
      notes: "",
      type: "Manual"
    },
    {
      id: 2,
      installationId: 1,
      installation: {
        id: 1,
        name: 'Instalasi 1',
        type: 'Dewasa',
        model: 'NFT',
        size: '2x1 meter',
        capacity: 20,
        latestTemperature: 24.5,
        latestPH: 6.2,
        latestHumidity: 75,
        latestNutrients: 1200,
        latestWaterVolume: 80,
        status: 2,
        plantingCount: 20,
        image: '🥬',
      },
      nutrient: 800,
      waterVolume: 60,
      notes: "",
      type: "Automatic"
    },
  ])

  const getLatestDataColor = (value: number, min: number, max: number): string => {
    if (value >= min && value <= max) return 'text-green-600 bg-green-50 border-green-200';
    if (value < min * 0.8 || value > max * 1.2) return 'text-red-600 bg-red-50 border-red-200';
    return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  };

  const getStatusColor = (value: number): string => {
    if (value == 0) return 'bg-red-600 text-white';
    if (value == 1) return 'bg-green-600 text-white';
    return 'bg-yellow-600 text-white';
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      <Header
        title={"SENSOR LOG"}
        showBack={true}
        onBack={() => navigate(-1)}
      />
      <div className="p-4 space-y-6">
        {/* Installation List */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
              {logData[0]?.installation?.image}
            </div>
            <div>
              <p className="font-medium text-green-800">{logData[0]?.installation?.name}</p>
              <p className="text-sm text-green-600">{logData[0]?.installation?.model}</p>
            </div>
          </div>
        </div>
        {logData.map(log => (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-2">
            <div className="divide-y divide-gray-100">
                <div 
                  key={log.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => {
                    // setSelectedInstallation(installation);
                    // setCurrentView('installation-detail');
                    // navigate(`/installation/${installation.id}`, { state: installation })
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="grid grid-cols-[110px_auto] gap-y-1 text-sm">
                      <div>Nutrisi</div>
                      <div>: {log?.nutrient} PPM</div>

                      <div>Water Volume</div>
                      <div>: {log?.waterVolume} %</div>

                      <div>Tipe</div>
                      <div>: {log?.type}</div>

                      <div>Catatan</div>
                      <div>: {log?.notes || "-"}</div>

                      <div>Tanggal</div>
                      <div>: Rabu, 24 September 2025</div>

                      <div>Jam</div>
                      <div>: 13.00 </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}