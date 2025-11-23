import {  useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header"
import { useEffect, useState } from "react";
import {  AlertTriangle, CheckCircle,  Eye, Plus, Sprout, Zap } from "lucide-react";
// import type { Planting } from "../../interfaces/planting/planting.interface";
import { differenceInDays, format } from "date-fns";
import { t } from "i18next";
import type { Installation } from "../../interfaces/installations/installation.interface";
import { sendGetRequest } from "../../services/requestAdapter";
import { Loading } from "../../components/Loading";
import { Button } from "../../components/Button/Button";
import type { Planting } from "../../interfaces/planting/planting.interface";
import type { MeasurementLog } from "../../interfaces/measurement-logs/measurement.interface";
import { EmptyData } from "../../components/EmptyData";

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
  const navigate = useNavigate()
  const [installationDetailData, setInstallationDetailData] = useState<Installation>()
  const [plantingData, setPlantingData] = useState<Planting[]>([])
  const [measurementData, setMeasurementData] = useState<MeasurementLog[]>([])

  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    getInstallationsDetail()
    getAllPlanting()
    getAllMeasurementLog()
  }, [])

  const getInstallationsDetail = async () => {
    setLoading(true)
    try {
      const { data } = await sendGetRequest(`/api/installations/${params?.id}`)
      setInstallationDetailData(data?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const getAllPlanting = async () => {
    setLoading(true)
    try {
      const { data } = await sendGetRequest(`/api/plantings?installationId=${params?.id}&limit=5`);
      setPlantingData(data?.data)
    } catch (error) {
      console.error("Gagal memuat data penanaman:", error);
    } finally {
      setLoading(false)
    }
  }

  const getAllMeasurementLog = async () => {
    setLoading(true)
    try {
      const { data } = await sendGetRequest(`/api/measurement-logs?installationId=${params?.id}&limit=5`);
      setMeasurementData(data?.data)
    } catch (error) {
      console.error("Gagal memuat data pengukuran:", error);
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

  const PlantingList = () => {
    if (loading) return <Loading />;
    if (!loading && plantingData?.length == 0) return <EmptyData />;

    return (
      <div className="divide-y divide-gray-100 flex flex-col items-end">
        {plantingData?.map(dat => { 
          return (
            <div key={dat.id} className="p-4 hover:bg-gray-50 transition-colors w-full">
              <div className="flex gap-4 items-center">
                <img src={dat?.plant?.imageUrl} alt="gambar" width={100} height={100}/>
                <div>
                  <h4 className="text-lg font-bold text-gray-800">{dat?.plantingNumber} </h4>
                  <p className="text-sm text-gray-600">{dat?.plant?.name} ({dat?.qty} {t('hole')})</p>
                  <p className="text-sm text-gray-600">{format(dat?.plantingDate, 'dd MMM yyyy')} - {format(dat?.harvestDate, 'dd MMM yyyy')}</p>
                  <p className="text-sm text-gray-600">{differenceInDays(new Date(), new Date(dat?.plantingDate))} {t('daysAfterPlanting')}</p>
                  <div className="mt-3">
                    {getHarvestTimelineStatus(new Date(dat?.harvestDate))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        <Button
          variant="link" 
          size="s"
          onClick={() => navigate(`/plantings?installation=${params?.id}`)}
          className='p-0 my-2 w-fit'
        >{t('seeAll')} →</Button>
      </div>
    );
  }

   const MeasurementList = () => {
    if (loading) return <Loading />;
    if (!loading && plantingData?.length == 0) return <EmptyData />;

    return (
      <div className="divide-y divide-gray-100 flex flex-col items-end ">
        {measurementData?.map(dat => { 
          return (
            <div key={dat.id} className="p-4 hover:bg-gray-50 transition-colors w-full">
              <div className="flex justify-between items-center">
                <div >
                  <p className="text-sm text-gray-600">{dat?.createdAt ? format(new Date(dat.createdAt), 'dd MMM yyyy') : '-'}</p>
                  <p className="text-sm text-gray-600">{dat?.createdAt ? format(new Date(dat.createdAt), 'HH:mm') : '-'}</p>
                </div>
                <div className='flex flex-col items-end gap-1'>
                  <h4 className="text-sm text-gray-800">{dat?.nutrient} PPM</h4>
                  <p className="text-sm text-gray-600">{dat?.waterVolume}%</p>
                </div>
              </div>
            </div>
          )
        })}

        <Button
          variant="link" 
          size="s"
          onClick={() => navigate(`/plantings?installation=${params?.id}`)}
          className='p-0 my-2 w-fit'
        >{t('seeAll')} →</Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      <Header
        title={installationDetailData?.name || ""}
        showBack={true}
        onBack={() => navigate(-1)}
      />
      
      <div className="p-4 space-y-6">

        <div className="grid grid-cols-2 gap-4">
          <StatusCard
            title="Volume Air"
            value={installationDetailData?.latestWaterVolume || 0}
            unit="%"
            icon={Eye}
            optimal="80-90%"
            status={getStatusColor(installationDetailData?.latestWaterVolume!, 80, 90).includes('green') ? 'good' : 
                    getStatusColor(installationDetailData?.latestWaterVolume!, 80, 90).includes('red') ? 'critical' : 'warning'}
          />
          <StatusCard
            title="Nutrisi"
            value={installationDetailData?.latestNutrients || 0}
            unit=" PPM"
            icon={Zap}
            optimal="1200-1300"
            status={getStatusColor(installationDetailData?.latestNutrients!, 1200, 1300).includes('green') ? 'good' : 
                    getStatusColor(installationDetailData?.latestNutrients!, 1200, 1300).includes('red') ? 'critical' : 'warning'}
          />
        </div>

        {/* Plantings in this Installation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800">{t('plantings')}</h3>
                <h4 className="w-fit px-3 py-1 bg-green-600 text-white rounded-full text-xs font-semibold">{installationDetailData?.plantingCount ?? 0}/{installationDetailData?.capacity ?? 0} Lubang</h4>
              </div>
              {installationDetailData?.plantingCount! < installationDetailData?.capacity! &&
                <Button 
                  variant="primary" 
                  size="s" 
                  icon={<Plus size={14} />}
                  onClick={() => navigate(`/add-planting?id=${params?.id}`)}
                >Tambah</Button>
              }
            </div>
          </div>
          <PlantingList />
        </div>

        {/* Measurements in this Installation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Data Pengukuran</h3>
              <Button 
                variant="primary" 
                size="s" 
                icon={<Plus size={14} />}
                onClick={() => navigate(`/add-measurement?id=${params?.id}`)}
              >Tambah</Button>
            </div>
          </div>
          <MeasurementList />
        </div>
      </div>
    </div>
  )
}