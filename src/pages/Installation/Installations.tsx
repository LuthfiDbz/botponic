import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header"
import { useState } from "react";
import { Sprout} from "lucide-react";
import type { Installation } from "../../interfaces/installations/installation.interface";


export function Installation() {
  const navigate = useNavigate()

  const [installations, _setInstallations] = useState<Installation[]>([
    {
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
      measurementDate: '2024-09-19',
      status: 2,
      plantCount: 20,
      image: '🥬',
      connectionStatus: 'connected'
    },
    {
      id: 2, 
      name: 'Instalasi 2',
      type: 'Dewasa',
      model: 'DFT',
      size: '1x1 meter',
      capacity: 12,
      latestTemperature: 23.2,
      latestPH: 5.8,
      latestHumidity: 80,
      latestNutrients: 800,
      latestWaterVolume: 90,
      measurementDate: '2024-09-18',
      status: 1,
      plantCount: 5,
      image: '🌿',
      connectionStatus: 'connected'
    },
    {
      id: 3, 
      name: 'Instalasi 3',
      type: 'Dewasa',
      model: 'DFT',
      size: '1x1 meter',
      capacity: 12,
      latestTemperature: 23.2,
      latestPH: 5.8,
      latestHumidity: 80,
      latestNutrients: 800,
      latestWaterVolume: 40,
      measurementDate: '2024-09-18',
      status: 0,
      plantCount: 0,
      image: '🌿',
      connectionStatus: 'connected'
    }
  ]);

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
        title={"INSTALLATIONS"}
        // showBack={true}
        // onBack={() => navigate('/')}
      />
      <div className="p-4 space-y-6">
        {/* Installation List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="divide-y divide-gray-100">
            {installations.map(installation => (
              <div 
                key={installation.id}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => {
                  // setSelectedInstallation(installation);
                  // setCurrentView('installation-detail');
                  navigate(`/installation/${installation.id}`, { state: installation })
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
                    {installation.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">{installation.name}</h4>
                        <p className="text-sm text-gray-600">{installation.model} • {installation.type}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Sprout size={14} className="text-green-600" />
                        <span>{installation.plantCount}/{installation.capacity}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      {/* <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLatestDataColor(installation.latestPH, 5.5, 6.5)}`}>
                        pH: {installation.latestPH}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLatestDataColor(installation.latestTemperature, 20, 25)}`}>
                        {installation.latestTemperature}°C
                      </span> */}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLatestDataColor(installation.latestTemperature, 20, 25)}`}>
                        {installation.latestNutrients} PPM
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border me-0 ms-auto ${getStatusColor(installation.status)}`}>
                        {installation?.status == 0 && 'Inactive'}
                        {installation?.status == 1 && 'Active'}
                        {installation?.status == 2 && 'Full'}
                      </span>
                      {/* <div className="flex items-center gap-1">
                        {installation.connectionStatus === 'connected' ? (
                          <Wifi size={12} className="text-green-500" />
                        ) : (
                          <WifiOff size={12} className="text-gray-400" />
                        )}
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}