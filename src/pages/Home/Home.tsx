import React, { useEffect, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Sprout,
  Settings, 
  Bell, 
  // Home, 
  // User, Thermometer, Droplets, Eye, CheckCircle,
  // AlertTriangle,  Wifi, WifiOff,
  // Edit,
  // Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import type { Planting } from '../../interfaces/planting/planting.interface';
import { differenceInDays, format } from 'date-fns';
import { t } from 'i18next';
import { getInstallationPPMColor } from '../../utils/statusColor';
import { useInstallationStore } from '../../store/installation.store';
import { CommonStatus } from '../../enums/status';
import { sendGetRequest } from '../../services/requestAdapter';
import { Button } from '../../components/Button/Button';
// import { Navbar } from '../../components/Navbar/Navbar';

interface Reminder {
  id: string;
  user_id?: string;
  installation_id: string | number;
  plant_id?: string;
  reminder_type: 'watering' | 'nutrient' | 'ph_check' | 'other';
  reminder_date: string;
  status: 'pending' | 'completed';
  created_at?: string;
  updated_at?: string;
}

const HydroponicApp: React.FC = () => {
  const { installation, fetchAllInstallation } = useInstallationStore()
  const [plantingData, setPlantingData] = useState<Planting[]>([])
  const [widgetData, setWidgetData] = useState<any[]>([])
  const [reminders, _setReminders] = useState<Reminder[]>([
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

  useEffect(() => {
    fetchAllInstallation(`?status=${CommonStatus.ACTIVE}`)
    getAllPlanting()
    getAllWidget()
  }, [])

  const getAllPlanting = async () => {
    // set({ loading: true });
    try {
      const { data } = await sendGetRequest(`/api/plantings`);
      setPlantingData(data?.data)
    } catch (error) {
      console.error("Gagal memuat data penanaman:", error);
    } finally {
      // set({ loading: false });
    }
  }

  const getAllWidget = async () => {
    // set({ loading: true });
    try {
      const { data } = await sendGetRequest(`/api/dashboard/widgets`);
      setWidgetData(data?.data)
    } catch (error) {
      console.error("Gagal memuat data widget:", error);
    } finally {
      // set({ loading: false });
    }
  }


  const getPendingReminders = (): Reminder[] => {
    return reminders.filter(reminder => reminder.status === 'pending');
  };


  // Default fallback view
  const pendingReminders = getPendingReminders();
  const navigate = useNavigate()

  const getHarvestTimelineStatus = (harvestDate: Date | string)  => {
    const diff = differenceInDays(new Date(), new Date(harvestDate));

    if (diff < 0 && diff > -5) {
      return <span className={`px-3 py-1 rounded-lg text-xs font-medium border text-yellow-600 bg-yellow-50 border-yellow-200`}>{t('harvestUpcoming').toUpperCase()}</span>;
    } else if (diff === 0 || diff === 1) {
      return <span className={`px-3 py-1 rounded-lg text-xs font-medium border text-green-600 bg-green-50 border-green-200`}>{t('harvestReady').toUpperCase()}</span>;
    } else if (diff >= 2) {
      return <span className={`px-3 py-1 rounded-lg text-xs font-medium border text-red-600 bg-red-50 border-red-200`}>{t('harvestOverdue').toUpperCase()}</span>;
    }
    return <span className={`px-3 py-1 rounded-lg text-xs font-medium border text-blue-600 bg-blue-50 border-blue-200`}>{t('growing').toUpperCase()}</span>;
  }
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      <Header title='BOTPONIC' />
      

      
      {/* <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Memuat aplikasi...</p>
        </div> */}

      <div className="p-4 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-4">
          {widgetData?.map(wid => {
            return (
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{t(`${wid?.name}`)}</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">{wid?.value}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                    <Settings className="text-green-600" size={24} />
                  </div>
                </div>
              </div>
            )
          })}
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
                const inst = installation.find(i => i.id === reminder.installation_id);
                const typeLabels: Record<string, string> = {
                  ph_check: 'Cek pH',
                  nutrient: 'Tambah Nutrisi',
                  watering: 'Penyiraman',
                  other: 'Lainnya'
                };
                return (
                  <p key={reminder.id} className="text-sm text-yellow-700">
                    • {typeLabels[reminder.reminder_type]} - {inst?.name}
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
            </div>
          </div>
          <div className="divide-y divide-gray-100 flex flex-col items-end">
            {installation.map(installation => (
              <div 
                key={installation.id}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors w-full"
                onClick={() => {
                  navigate(`/installation/${installation.id}`, { state: installation })
                }}
              >
                <div className="flex items-center gap-4">
                  {/* <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
                    {installation.image}
                  </div> */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-800">{installation.name}</h4>
                        <p className="text-sm text-gray-600">{installation.model} • {installation.type}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getInstallationPPMColor(installation.latestNutrients, 5.5, 6.5)}`}>
                          {installation.latestNutrients} PPM
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getInstallationPPMColor(installation.latestWaterVolume, 5.5, 6.5)}`}>
                          {installation.latestWaterVolume}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="link"  
              size="s"
              onClick={() => navigate('/installations')}
              className='p-0 my-2 w-fit'
            >{t('seeAll')} →</Button>
          </div>
        </div>

        {/* Planting List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">{t('mustHarvest')}</h3>
              {/* <button 
                onClick={() => navigate('/plantings')}
                className="text-green-600 text-sm font-medium hover:text-green-700 transition-colors"
              >
                {t('seeAll')}
              </button> */}
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {plantingData?.map(dat => (
              <div key={dat.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className=" text-lg font-semibold text-gray-800">{dat?.plantingNumber} </h4>
                    <p className="text-md text-gray-800 mb-2">{dat?.installation?.name}</p>
                    <p className="text-sm text-gray-600">{dat?.plant?.name}</p>
                    <p className="text-sm text-gray-600">{dat?.qty} {t('hole')}</p>
                  </div>
                  <div className='flex flex-col items-end gap-1'>
                    <p className="text-sm text-gray-600">{format(dat?.plantingDate, 'dd/MM/yyyy')} - {format(dat?.harvestDate, 'dd/MM/yyyy')}</p>
                    <p className="text-sm text-gray-600">{differenceInDays(new Date(), new Date(dat?.plantingDate))} {t('daysAfterPlanting')}</p>
                    <div>
                      {getHarvestTimelineStatus(new Date(dat?.harvestDate))}
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