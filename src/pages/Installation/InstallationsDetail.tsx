import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header"
import { useState } from "react";
import { Activity, AlertTriangle, CheckCircle, Droplets, Edit, Eye, Plus, Sprout, Thermometer, Trash2, Zap } from "lucide-react";

interface StatusCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  optimal: string;
  status: string;
}

interface Planting {
  id: string;
  installation_id: string;
  name: string;
  plant_date: string;
  harvest_date: string;
  growth_stage: 'benih' | 'vegetatif' | 'generatif';
  qty: number,
  plant: {
    name: string,
    hss: number,
    hst: number,
    ppm: string,
    pH: string
  }
  created_at?: string;
  updated_at?: string;
}

export function InstallationDetail() {
  const location = useLocation();
  const navigate = useNavigate()
  const detailData = location.state || {}
  const [plantingData, setPlantingData] = useState<Planting[]>([
    {
      id: 'plant-1',
      installation_id: 'inst-1',
      name: 'PL-A1',
      plant_date: '2024-09-01',
      harvest_date: '2024-09-30',
      growth_stage: 'vegetatif',
      qty: 2,
      plant: {
        name: "Selada Hijau",
        hss: 2,
        hst: 4,
        ppm: "1000-1200",
        pH: "6.5 - 7.5"
      }
    },
    {
      id: 'plant-2',
      installation_id: 'inst-1', 
      name: 'PL-A2',
      plant_date: '2024-09-01',
      harvest_date: '2024-09-30',
      growth_stage: 'vegetatif',
      qty: 18,
      plant: {
        name: "Selada Hijau",
        hss: 2,
        hst: 4,
        ppm: "1000-1200",
        pH: "6.5 - 7.5"
      }
    },
    {
      id: 'plant-3',
      installation_id: 'inst-2',
      name: 'PL-A3',
      plant_date: '2024-09-05',
      harvest_date: '2024-09-30',
      growth_stage: 'benih',
      qty: 5,
      plant: {
        name: "Selada Merah",
        hss: 2,
        hst: 4,
        ppm: "800-1200",
        pH: "6.5 - 7.5"
      }
    }
  ]);

  const StatusCard: React.FC<StatusCardProps> = ({ title, value, unit, icon: Icon, optimal, status }) => {
    const statusColors: Record<string, string> = {
      good: 'bg-green-100 border-green-300 text-green-800',
      warning: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      critical: 'bg-red-100 border-red-300 text-red-800'
    };

    return (
      <div className={`p-4 rounded-2xl border-2 ${statusColors[status]} shadow-sm`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Icon size={20} />
              <span className="font-medium">{title}</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {value}{unit}
            </div>
            <div className="text-sm opacity-75 mt-1">
              Optimal: {optimal}
            </div>
          </div>
          <div className="text-right">
            {status === 'good' && <CheckCircle size={24} className="text-green-600" />}
            {status === 'warning' && <AlertTriangle size={24} className="text-yellow-600" />}
            {status === 'critical' && <AlertTriangle size={24} className="text-red-600" />}
          </div>
        </div>
      </div>
    );
  };

  const getStatusColor = (value: number, min: number, max: number): string => {
    if (value >= min && value <= max) return 'text-green-600 bg-green-50 border-green-200';
    if (value < min * 0.8 || value > max * 1.2) return 'text-red-600 bg-red-50 border-red-200';
    return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  };

  const getInstallationPlants = (installationId: string): Planting[] => {
    return plantingData.filter(plant => plant.installation_id === installationId);
  };

  const installationPlants = getInstallationPlants(detailData.id);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    setPlantingData(plantingData)
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      <Header
        title={detailData.name}
        showBack={true}
        onBack={() => navigate(-1)}
      />
      
      <div className="p-4 space-y-6">
        {/* Modern Status Cards */}
        <div className="grid grid-cols-2 gap-4">
          <StatusCard
            title="pH"
            value={detailData.latest_ph}
            unit=""
            icon={Droplets}
            optimal="5.5-6.5"
            status={getStatusColor(detailData.latest_ph, 5.5, 6.5).includes('green') ? 'good' : 
                    getStatusColor(detailData.latest_ph, 5.5, 6.5).includes('red') ? 'critical' : 'warning'}
          />
          <StatusCard
            title="Suhu"
            value={detailData.latest_temperature}
            unit="°C"
            icon={Thermometer}
            optimal="20-25°C"
            status={getStatusColor(detailData.latest_temperature, 20, 25).includes('green') ? 'good' : 
                    getStatusColor(detailData.latest_temperature, 20, 25).includes('red') ? 'critical' : 'warning'}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatusCard
            title="Kelembaban"
            value={detailData.latest_humidity}
            unit="%"
            icon={Eye}
            optimal="70-85%"
            status={getStatusColor(detailData.latest_humidity, 70, 85).includes('green') ? 'good' : 
                    getStatusColor(detailData.latest_humidity, 70, 85).includes('red') ? 'critical' : 'warning'}
          />
          <div className="p-4 rounded-2xl border-2 bg-blue-50 border-blue-200 text-blue-600 shadow-sm">
            <div className="flex items-center gap-2">
              <Zap size={20} />
              <span className="font-medium">Nutrisi</span>
            </div>
            <div className="text-sm font-bold mt-2 break-words">{detailData.latest_nutrients}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-semibold mb-4 text-gray-800">Aksi Cepat</h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => navigate('add-measurement')}
              className="flex items-center justify-center gap-2 p-4 bg-green-600 text-white rounded-2xl shadow-sm hover:bg-green-700 transition-colors"
            >
              <Plus size={16} />
              <span className="text-sm font-medium">Input Data</span>
            </button>
            <button 
              // onClick={() => setCurrentView('measurement-history')}
              className="flex items-center justify-center gap-2 p-4 bg-blue-50 text-blue-600 rounded-2xl border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              <Activity size={16} />
              <span className="text-sm font-medium">Lihat Grafik</span>
            </button>
          </div>
        </div>

        {/* Plants in this Installation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Tanaman ({installationPlants.reduce((acc, plant) => acc + plant.qty, 0)}/{detailData.capacity} Lubang Tanam)</h3>
              {installationPlants.reduce((acc, plant) => acc + plant.qty, 0) < detailData.capacity &&
                <button 
                  // onClick={() => setCurrentView('add-plant')}
                  className="text-green-600 text-sm font-medium flex items-center gap-1 hover:text-green-700 transition-colors"
                >
                  <Plus size={14} />
                  Tambah
                </button>
              }
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {installationPlants.map(plant => (
              <div key={plant.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800">{plant.name}</h4>
                    <p className="text-sm text-gray-600">{plant.plant.name} ({plant.qty} Lubang)</p>
                    <p className="text-sm text-gray-600">{formatDate(plant.plant_date)} - {formatDate(plant.harvest_date)}</p>
                    {/* <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full font-medium">
                      {plant.growth_stage}
                    </span> */}
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {installationPlants.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <Sprout size={32} className="mx-auto mb-2 opacity-50" />
                <p>Belum ada tanaman</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}