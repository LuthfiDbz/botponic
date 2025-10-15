import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header"
import { useEffect, useState } from "react";
import { Activity, AlertTriangle, CheckCircle, Edit, Eye, Plus, Sprout, Trash2, Zap } from "lucide-react";
import type { Planting } from "../../interfaces/planting/planting.interface";
import { differenceInDays, format } from "date-fns";
import { t } from "i18next";
import type { Installation } from "../../interfaces/installations/installation.interface";
import { sendGetRequest } from "../../services/requestAdapter";

interface StatusCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  optimal: string;
  status: string;
}


export function InstallationDetail() {
  const params = useParams()
  const location = useLocation();
  const navigate = useNavigate()
  const detailData = location.state || {}
  const [installationDetailData, setInstallationDetailData] = useState<Installation>()
  const [plantingData, _setPlantingData] = useState<Planting[]>([
    {
      id: 'plant-1',
      installationId: '1',
      plantingNumber: 'PL-A1',
      plantingDate: '2025-09-14',
      harvestDate: '2025-09-29',
      growthStage: 'vegetatif',
      qty: 2,
      plant: {
        id: 1,
        name: "Selada Hijau",
        hss: "60-65",
        hst: "45-50",
        ppm: "1000-1200",
        ph: "6.5 - 7.5"
      },
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
    },
    {
      id: 'plant-2',
      installationId: '1', 
      plantingNumber: 'PL-A2',
      plantingDate: '2025-08-11',
      harvestDate: '2025-09-22',
      growthStage: 'vegetatif',
      qty: 8,
      plant: {
        id: 1,
        name: "Selada Hijau",
        hss: "60-65",
        hst: "45-50",
        ppm: "1000-1200",
        ph: "6.5 - 7.5"
      },
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
    },
    {
      id: 'plant-3',
      installationId: '2',
      plantingNumber: 'PL-A3',
      plantingDate: '2025-08-13',
      harvestDate: '2025-09-23',
      growthStage: 'benih',
      qty: 5,
      plant: {
        id: 2,
        name: "Selada Merah",
        hss: "60-65",
        hst: "45-50",
        ppm: "800-1200",
        ph: "6.5 - 7.5"
      },
      installation: {
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
        status: 1,
        plantingCount: 5,
        image: '🌿',
      },
      
    },
    {
      id: 'plant-4',
      installationId: '1', 
      plantingNumber: 'PL-A4',
      plantingDate: '2025-09-14',
      harvestDate: '2025-10-14',
      growthStage: 'vegetatif',
      qty: 10,
      plant: {
        id: 1,
        name: "Selada Hijau",
        hss: "60-65",
        hst: "45-50",
        ppm: "1000-1200",
        ph: "6.5 - 7.5"
      },
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
    },
  ]);

  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    getInstallationsDetail()
  }, [])

  const getInstallationsDetail = async () => {
    setLoading(true)
    try {
      const { data } = await sendGetRequest(`/api/installations/${params?.id}`)
      console.log(data?.data)
      setInstallationDetailData(data?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
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

  const getStatusColor = (value: number, min: number, max: number): string => {
    if (value >= min && value <= max) return 'text-green-600 bg-green-50 border-green-200';
    if (value < min * 0.8 || value > max * 1.2) return 'text-red-600 bg-red-50 border-red-200';
    return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  };

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
      <Header
        title={detailData.name}
        showBack={true}
        onBack={() => navigate(-1)}
      />
      
      <div className="p-4 space-y-6">
        {/* Modern Status Cards */}
        {/* <div className="grid grid-cols-2 gap-4">
          <StatusCard
            title="pH"
            value={detailData.latestPH}
            unit=""
            icon={Droplets}
            optimal="5.5-6.5"
            status={getStatusColor(detailData.latestPH, 5.5, 6.5).includes('green') ? 'good' : 
                    getStatusColor(detailData.latestPH, 5.5, 6.5).includes('red') ? 'critical' : 'warning'}
          />
          <StatusCard
            title="Suhu"
            value={detailData.latestTemperature}
            unit="°C"
            icon={Thermometer}
            optimal="20-25°C"
            status={getStatusColor(detailData.latestTemperature, 20, 25).includes('green') ? 'good' : 
                    getStatusColor(detailData.latestTemperature, 20, 25).includes('red') ? 'critical' : 'warning'}
          />
        </div> */}

        <div className="grid grid-cols-2 gap-4">
          <StatusCard
            title="Volume Air"
            value={installationDetailData?.latestWaterVolume!}
            unit="%"
            icon={Eye}
            optimal="70-85%"
            status={getStatusColor(detailData.latestWaterVolume, 70, 85).includes('green') ? 'good' : 
                    getStatusColor(detailData.latestWaterVolume, 70, 85).includes('red') ? 'critical' : 'warning'}
          />
          <StatusCard
            title="Volume Air"
            value={installationDetailData?.latestNutrients!}
            unit=" PPM"
            icon={Zap}
            optimal="800-1300"
            status={getStatusColor(detailData.latestNutrients, 70, 85).includes('green') ? 'good' : 
                    getStatusColor(detailData.latestNutrients, 70, 85).includes('red') ? 'critical' : 'warning'}
          />
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
              onClick={() => navigate('measurement-sensor-log')}
              className="flex items-center justify-center gap-2 p-4 bg-blue-50 text-blue-600 rounded-2xl border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              <Activity size={16} />
              <span className="text-sm font-medium">Lihat Riwayat</span>
            </button>
          </div>
        </div>

        {/* Plants in this Installation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Tanaman ({installationDetailData?.plantingCount}/{installationDetailData?.capacity} Lubang Tanam)</h3>
              {installationDetailData?.plantingCount! < installationDetailData?.capacity! &&
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
            {installationDetailData?.plantings?.map(dat => { 
              return (
                <div key={dat.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{dat?.plantingNumber} </h4>
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
              )
            })}
            {/* {plantingData?.map(dat => (
              <div key={dat.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className=" text-xl font-semibold text-gray-800">{dat?.name}</h1>
                    <p className="text-sm text-gray-600 mb-2">{dat?.plant?.name} ({dat?.qty} {t('hole')})</p>
                    <p className="text-sm text-gray-600">{format(dat?.plantingDate, 'dd MMM yyyy')} - {format(dat?.harvestDate, 'dd MMM yyyy')}</p>
                    <p className="text-sm text-gray-600 mb-2">{differenceInDays(new Date(), new Date(dat?.plantingDate))} {t('daysAfterPlanting')}</p>
                    <div>
                      {getHarvestTimelineStatus(new Date(dat?.harvestDate))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                      <Edit size={24} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                      <Trash2 size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))} */}
            {plantingData.length === 0 && (
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