import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header"
import { useState } from "react";
import { Activity, AlertTriangle, CheckCircle, Droplets, Edit, Eye, Plus, Sprout, Thermometer, Trash2, Wifi, WifiOff, Zap } from "lucide-react";

interface StatusCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  optimal: string;
  status: string;
}

interface Installation {
  id: string;
  user_id?: string;
  name: string;
  type: string;
  model: 'NFT' | 'DFT';
  size: string;
  capacity: number;
  latest_temperature: number;
  latest_ph: number;
  latest_humidity: number;
  latest_nutrients: number;
  measurement_date: string;
  notes?: string;
  status: 0 | 1 | 2;
  created_at?: string;
  updated_at?: string;
  plant_count: number;
  image: string;
  connection_status: 'connected' | 'disconnected';
}

interface Plant {
  id: string;
  installation_id: string;
  name: string;
  plant_date: string;
  growth_stage: 'benih' | 'vegetatif' | 'generatif';
  created_at?: string;
  updated_at?: string;
}

export function Installation() {
  const navigate = useNavigate()

  const [installations, setInstallations] = useState<Installation[]>([
    {
      id: 'inst-1',
      name: 'Instalasi 1',
      type: 'Dewasa',
      model: 'NFT',
      size: '2x1 meter',
      capacity: 20,
      latest_temperature: 24.5,
      latest_ph: 6.2,
      latest_humidity: 75,
      latest_nutrients: 1200,
      measurement_date: '2024-09-19',
      status: 2,
      plant_count: 20,
      image: '🥬',
      connection_status: 'connected'
    },
    {
      id: 'inst-2', 
      name: 'Instalasi 2',
      type: 'Dewasa',
      model: 'DFT',
      size: '1x1 meter',
      capacity: 12,
      latest_temperature: 23.2,
      latest_ph: 5.8,
      latest_humidity: 80,
      latest_nutrients: 800,
      measurement_date: '2024-09-18',
      status: 1,
      plant_count: 5,
      image: '🌿',
      connection_status: 'connected'
    },
    {
      id: 'inst-3', 
      name: 'Instalasi 3',
      type: 'Dewasa',
      model: 'DFT',
      size: '1x1 meter',
      capacity: 12,
      latest_temperature: 23.2,
      latest_ph: 5.8,
      latest_humidity: 80,
      latest_nutrients: 800,
      measurement_date: '2024-09-18',
      status: 0,
      plant_count: 0,
      image: '🌿',
      connection_status: 'connected'
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
                        <span>{installation.plant_count}/{installation.capacity}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      {/* <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLatestDataColor(installation.latest_ph, 5.5, 6.5)}`}>
                        pH: {installation.latest_ph}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLatestDataColor(installation.latest_temperature, 20, 25)}`}>
                        {installation.latest_temperature}°C
                      </span> */}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLatestDataColor(installation.latest_temperature, 20, 25)}`}>
                        {installation.latest_nutrients} PPM
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border me-0 ms-auto ${getStatusColor(installation.status)}`}>
                        {installation?.status == 0 && 'Inactive'}
                        {installation?.status == 1 && 'Active'}
                        {installation?.status == 2 && 'Full'}
                      </span>
                      {/* <div className="flex items-center gap-1">
                        {installation.connection_status === 'connected' ? (
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