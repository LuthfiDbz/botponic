import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Home, Settings, Bell, User, Thermometer, Droplets, Eye, ArrowLeft, CheckCircle,
  AlertTriangle, Sprout, Wifi, WifiOff
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
// import { Navbar } from '../../components/Navbar/Navbar';

// TypeScript interfaces
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

interface Reminder {
  id: string;
  user_id?: string;
  installation_id: string;
  plant_id?: string;
  reminder_type: 'watering' | 'nutrient' | 'ph_check' | 'other';
  reminder_date: string;
  status: 'pending' | 'completed';
  created_at?: string;
  updated_at?: string;
}

interface MeasurementHistory {
  date: string;
  temperature: number;
  ph: number;
  humidity: number;
  installation_id: string;
}

interface MeasurementFormData {
  temperature: string;
  ph: string;
  humidity: string;
  nutrients: number;
  notes: string;
}

interface PlantFormData {
  name: string;
  plant_date: string;
  growth_stage: 'benih' | 'vegetatif' | 'generatif';
}

type ViewType = 'dashboard' | 'installations' | 'installation-detail' | 'add-measurement' | 
               'measurement-history' | 'add-plant' | 'plants' | 'reminders' | 'profile';

const HydroponicApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedInstallation, setSelectedInstallation] = useState<Installation | null>(null);
  // const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  // Mock data dengan proper TypeScript typing
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
  ]);

  const [plants, setPlants] = useState<Plant[]>([
    {
      id: 'plant-1',
      installation_id: 'inst-1',
      name: 'Selada Hijau A1',
      plant_date: '2024-09-01',
      growth_stage: 'vegetatif'
    },
    {
      id: 'plant-2',
      installation_id: 'inst-1', 
      name: 'Selada Hijau A2',
      plant_date: '2024-09-01',
      growth_stage: 'vegetatif'
    },
    {
      id: 'plant-3',
      installation_id: 'inst-2',
      name: 'Selada Merah B1',
      plant_date: '2024-09-05',
      growth_stage: 'benih'
    }
  ]);

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: 'rem-1',
      installation_id: 'inst-1',
      reminder_type: 'ph_check',
      reminder_date: '2024-09-20',
      status: 'pending'
    },
    {
      id: 'rem-2',
      installation_id: 'inst-2',
      reminder_type: 'nutrient',
      reminder_date: '2024-09-21',
      status: 'pending'
    }
  ]);

  const [measurementHistory, setMeasurementHistory] = useState<MeasurementHistory[]>([
    { date: '2024-09-15', temperature: 23.5, ph: 6.0, humidity: 72, installation_id: 'inst-1' },
    { date: '2024-09-16', temperature: 24.2, ph: 6.1, humidity: 74, installation_id: 'inst-1' },
    { date: '2024-09-17', temperature: 24.8, ph: 6.3, humidity: 76, installation_id: 'inst-1' },
    { date: '2024-09-18', temperature: 24.1, ph: 6.2, humidity: 75, installation_id: 'inst-1' },
    { date: '2024-09-19', temperature: 24.5, ph: 6.2, humidity: 75, installation_id: 'inst-1' }
  ]);

  // Form state dengan proper typing
  const [measurementForm, setMeasurementForm] = useState<MeasurementFormData>({
    temperature: '',
    ph: '',
    humidity: '',
    nutrients: 0,
    notes: ''
  });

  const [plantForm, setPlantForm] = useState<PlantFormData>({
    name: '',
    plant_date: '',
    growth_stage: 'benih'
  });

  // Utility functions
  const getStatusColor = (value: number, min: number, max: number): string => {
    if (value >= min && value <= max) return 'text-green-600 bg-green-50 border-green-200';
    if (value < min * 0.8 || value > max * 1.2) return 'text-red-600 bg-red-50 border-red-200';
    return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const getInstallationPlants = (installationId: string): Plant[] => {
    return plants.filter(plant => plant.installation_id === installationId);
  };

  const getPendingReminders = (): Reminder[] => {
    return reminders.filter(reminder => reminder.status === 'pending');
  };

  // Modern UI Components
  // interface CircularProgressProps {
  //   percentage: number;
  //   size?: number;
  //   strokeWidth?: number;
  //   color?: string;
  //   label: string;
  //   value: string | number;
  //   unit: string;
  //   showAlert?: boolean;
  // }

  // const CircularProgress: React.FC<CircularProgressProps> = ({ 
  //   percentage, size = 80, strokeWidth = 6, color = '#4CAF50', label, value, unit, showAlert = false 
  // }) => {
  //   const radius = (size - strokeWidth) / 2;
  //   const circumference = radius * 2 * Math.PI;
  //   const offset = circumference - (percentage / 100) * circumference;
    
  //   const alertColor = showAlert ? '#F44336' : color;
    
  //   return (
  //     <div className="relative flex flex-col items-center">
  //       <svg width={size} height={size} className="transform -rotate-90">
  //         <circle
  //           cx={size / 2}
  //           cy={size / 2}
  //           r={radius}
  //           stroke="#E5E7EB"
  //           strokeWidth={strokeWidth}
  //           fill="none"
  //         />
  //         <circle
  //           cx={size / 2}
  //           cy={size / 2}
  //           r={radius}
  //           stroke={alertColor}
  //           strokeWidth={strokeWidth}
  //           fill="none"
  //           strokeDasharray={circumference}
  //           strokeDashoffset={offset}
  //           strokeLinecap="round"
  //           className="transition-all duration-300 ease-in-out"
  //         />
  //       </svg>
  //       <div className="absolute inset-0 flex flex-col items-center justify-center">
  //         {showAlert && <AlertTriangle size={12} className="text-red-500 mb-1" />}
  //         <span className={`text-lg font-bold ${showAlert ? 'text-red-600' : 'text-gray-800'}`}>
  //           {value}{unit}
  //         </span>
  //         <span className="text-xs text-gray-500 text-center">{label}</span>
  //       </div>
  //     </div>
  //   );
  // };

  interface StatusCardProps {
    title: string;
    value: number;
    unit: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    optimal: string;
    status: string;
  }

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

  // interface HeaderProps {
  //   title: string;
  //   showBack?: boolean;
  //   onBack?: () => void;
  // }

  // const Header: React.FC<HeaderProps> = ({ title, showBack = false, onBack }) => (
  //   <div className="bg-white shadow-sm border-b border-gray-100">
  //     <div className="flex items-center justify-between p-4">
  //       <div className="flex items-center gap-3">
  //         {showBack && (
  //           <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
  //             <ArrowLeft size={20} className="text-gray-600" />
  //           </button>
  //         )}
  //         <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
  //       </div>
  //       <div className="flex items-center gap-2">
  //         <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
  //           <Bell size={20} className="text-gray-600" />
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  const Navigation: React.FC = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg max-w-md mx-auto">
      <div className="max-w-md mx-auto flex justify-around py-3">
        {[
          { id: 'dashboard' as ViewType, icon: Home, label: 'Beranda' },
          { id: 'installations' as ViewType, icon: Settings, label: 'Instalasi' },
          { id: 'reminders' as ViewType, icon: Bell, label: 'Pengingat' },
          { id: 'profile' as ViewType, icon: User, label: 'Profil' }
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setCurrentView(id)}
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
              currentView === id 
                ? 'text-green-600 bg-green-50 scale-105' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon size={22} />
            <span className="text-xs mt-1 font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // Handle form submissions with proper typing
  const handleMeasurementSubmit = (): void => {
    if (!measurementForm.temperature || !measurementForm.ph || !measurementForm.humidity) {
      alert('Mohon isi semua field yang wajib!');
      return;
    }
    
    if (!selectedInstallation) return;

    const updatedInstallations = installations.map(inst => 
      inst.id === selectedInstallation.id 
        ? {
            ...inst,
            latest_temperature: parseFloat(measurementForm.temperature),
            latest_ph: parseFloat(measurementForm.ph), 
            latest_humidity: parseFloat(measurementForm.humidity),
            latest_nutrients: measurementForm.nutrients || inst.latest_nutrients,
            measurement_date: new Date().toISOString().split('T')[0]
          }
        : inst
    );
    
    setInstallations(updatedInstallations);
    
    const newHistoryEntry: MeasurementHistory = {
      date: new Date().toISOString().split('T')[0],
      temperature: parseFloat(measurementForm.temperature),
      ph: parseFloat(measurementForm.ph),
      humidity: parseFloat(measurementForm.humidity),
      installation_id: selectedInstallation.id
    };
    
    setMeasurementHistory([...measurementHistory, newHistoryEntry]);
    setMeasurementForm({ temperature: '', ph: '', humidity: '', nutrients: 0, notes: '' });
    setCurrentView('installation-detail');
  };

  // Add Measurement View (dengan modern form styling)
  if (currentView === 'add-measurement' && selectedInstallation) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <Header 
          title="Input Pengukuran Harian"
          showBack={true}
          onBack={() => setCurrentView('installation-detail')}
        />
        
        <div className="p-4 space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
                {selectedInstallation.image}
              </div>
              <div>
                <p className="font-medium text-green-800">{selectedInstallation.name}</p>
                <p className="text-sm text-green-600">{selectedInstallation.model}</p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">Suhu Air (°C) *</label>
              <input
                type="number"
                step="0.1"
                value={measurementForm.temperature}
                onChange={(e) => setMeasurementForm({...measurementForm, temperature: e.target.value})}
                className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 transition-all"
                placeholder="24.5"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">pH Air *</label>
              <input
                type="number"
                step="0.1"
                value={measurementForm.ph}
                onChange={(e) => setMeasurementForm({...measurementForm, ph: e.target.value})}
                className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 transition-all"
                placeholder="6.2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">Kelembaban (%) *</label>
              <input
                type="number"
                value={measurementForm.humidity}
                onChange={(e) => setMeasurementForm({...measurementForm, humidity: e.target.value})}
                className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 transition-all"
                placeholder="75"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">Nutrisi</label>
              <input
                type="text"
                value={measurementForm.nutrients}
                onChange={(e) => setMeasurementForm({...measurementForm, nutrients: Number(e.target.value)})}
                className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 transition-all"
                placeholder="AB Mix 1200ppm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">Catatan</label>
              <textarea
                value={measurementForm.notes}
                onChange={(e) => setMeasurementForm({...measurementForm, notes: e.target.value})}
                className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 transition-all"
                rows={4}
                placeholder="Observasi tambahan..."
              />
            </div>
          </div>
          
          <div className="flex gap-4 pt-6">
            <button
              onClick={() => setCurrentView('installation-detail')}
              className="flex-1 p-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleMeasurementSubmit}
              className="flex-1 p-4 bg-green-600 text-white rounded-2xl font-semibold hover:bg-green-700 transition-colors"
            >
              Simpan Data
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Measurement History View  
  if (currentView === 'measurement-history' && selectedInstallation) {
    const installationHistory = measurementHistory.filter(h => h.installation_id === selectedInstallation.id);
    
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen pb-20">
        <Header 
          title="Riwayat Pengukuran"
          showBack={true}
          onBack={() => setCurrentView('installation-detail')}
        />
        
        <div className="p-4 space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
                {selectedInstallation.image}
              </div>
              <div>
                <p className="font-medium text-green-800">{selectedInstallation.name}</p>
                <p className="text-sm text-green-600">Data 7 hari terakhir</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Droplets size={16} className="text-blue-600" />
                Tingkat pH
              </h3>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={installationHistory.slice(-7)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{fontSize: 10}} 
                    tickFormatter={(value) => new Date(value).getDate() + '/' + (new Date(value).getMonth() + 1)}
                  />
                  <YAxis domain={[5, 7]} tick={{fontSize: 10}} />
                  <Tooltip 
                    labelFormatter={(value) => formatDate(value)}
                    formatter={(value) => [value, 'pH']}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  />
                  <Line type="monotone" dataKey="ph" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Thermometer size={16} className="text-red-600" />
                Suhu Air
              </h3>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={installationHistory.slice(-7)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{fontSize: 10}}
                    tickFormatter={(value) => new Date(value).getDate() + '/' + (new Date(value).getMonth() + 1)}
                  />
                  <YAxis tick={{fontSize: 10}} />
                  <Tooltip 
                    labelFormatter={(value) => formatDate(value)}
                    formatter={(value) => [value + '°C', 'Suhu']}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  />
                  <Line type="monotone" dataKey="temperature" stroke="#dc2626" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Eye size={16} className="text-green-600" />
                Kelembaban
              </h3>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={installationHistory.slice(-7)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{fontSize: 10}}
                    tickFormatter={(value) => new Date(value).getDate() + '/' + (new Date(value).getMonth() + 1)}
                  />
                  <YAxis tick={{fontSize: 10}} />
                  <Tooltip 
                    labelFormatter={(value) => formatDate(value)}
                    formatter={(value) => [value + '%', 'Kelembaban']}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  />
                  <Line type="monotone" dataKey="humidity" stroke="#16a34a" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <Navigation />
      </div>
    );
  }

  // Default fallback view
  const pendingReminders = getPendingReminders();
  const navigate = useNavigate()
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      {/* <Header title="BOTPONIC" /> */}

      <Header title='BOTPONIC' />
      
      {/* <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Memuat aplikasi...</p>
      </div> */}

      <div className="p-4 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Instalasi</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{installations.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <Settings className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tanaman</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{plants.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <Sprout className="text-green-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        {pendingReminders.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="text-yellow-600" size={20} />
              <h3 className="font-semibold text-yellow-800">Pengingat Hari Ini</h3>
            </div>
            <div className="space-y-2">
              {pendingReminders.slice(0, 2).map(reminder => {
                const installation = installations.find(i => i.id === reminder.installation_id);
                const typeLabels: Record<string, string> = {
                  ph_check: 'Cek pH',
                  nutrient: 'Tambah Nutrisi',
                  watering: 'Penyiraman',
                  other: 'Lainnya'
                };
                return (
                  <p key={reminder.id} className="text-sm text-yellow-700">
                    • {typeLabels[reminder.reminder_type]} - {installation?.name}
                  </p>
                );
              })}
            </div>
          </div>
        )}

        {/* Installation List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Instalasi Aktif</h3>
              <button 
                onClick={() => navigate('/installations')}
                className="text-green-600 text-sm font-medium hover:text-green-700 transition-colors"
              >
                Lihat Semua
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {installations.map(installation => (
              <div 
                key={installation.id}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => {
                  setSelectedInstallation(installation);
                  // setCurrentView('installation-detail');
                  navigate('/installation/detail', { state: installation })
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
                    <div className="flex items-center gap-4 mt-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(installation.latest_ph, 5.5, 6.5)}`}>
                        pH: {installation.latest_ph}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(installation.latest_temperature, 20, 25)}`}>
                        {installation.latest_temperature}°C
                      </span>
                      <div className="flex items-center gap-1">
                        {installation.connection_status === 'connected' ? (
                          <Wifi size={12} className="text-green-500" />
                        ) : (
                          <WifiOff size={12} className="text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* <Navigation /> */}
      {/* <Navbar /> */}
    </div>
  );
};

export default HydroponicApp;