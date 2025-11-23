import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header"
import { useEffect, useState } from "react";
import { sendGetRequest } from "../../services/requestAdapter";
import { Loading } from "../../components/Loading";
import { t } from "i18next";
import { differenceInDays, format } from "date-fns";
import type { MeasurementLog } from "../../interfaces/measurement-logs/measurement.interface";


export function MeasurementLogs() {
  const navigate = useNavigate()
  const [measurementLogs, setMeasurementLogs] = useState<MeasurementLog[]>([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllMeasurementLogs()
  }, [])

  const getAllMeasurementLogs = async () => {
    setLoading(true)
    try {
      const { data } = await sendGetRequest('/api/measurement-logs')
      setMeasurementLogs(data?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      <Header
        title={t('measurementLog')}
        // showBack={true}
        onBack={() => navigate(-1)}
      />
        {/* Installation List */}
          
        <div className="p-4 space-y-6">
            {loading ? 
              // <div className="p-4 text-center">
              //   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
              // </div>
              <Loading size="lg"/>
              :
              <>
                {measurementLogs.map(measurement => (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="divide-y divide-gray-100">
											<div 
												key={measurement.id}
												className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
												onClick={() => {
													// setSelectedInstallation(installation);
													// setCurrentView('installation-detail');
													// navigate(`/installation/${installation.id}`, { state: installation })
												}}
											>
												<div className="flex items-center gap-4">
													<div className="grid grid-cols-[110px_auto] gap-y-1 text-sm">
														<div>Instalasi</div>
														<div>: {measurement?.installation?.name}</div>

														<div>Nutrisi</div>
														<div>: {measurement?.nutrient} PPM</div>

														<div>Water Volume</div>
														<div>: {measurement?.waterVolume}%</div>

														<div>Tipe</div>
														<div>: {measurement?.type}</div>

														<div>Catatan</div>
														<div>: {measurement?.notes || "-"}</div>

														<div>Tanggal</div>
														<div>: {measurement?.createdAt ? format(new Date(measurement.createdAt), 'dd MMM yyyy') : '-'}</div>

														<div>Jam</div>
														<div>: {measurement?.createdAt ? format(new Date(measurement.createdAt), 'HH:mm') : '-'}</div>
													</div>
												</div>
											</div>
										</div>
                  </div>
                ))}
              </>
            }
            </div>
    </div>
  )
}