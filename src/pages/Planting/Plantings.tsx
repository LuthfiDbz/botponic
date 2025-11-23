import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header"
import { useEffect, useState } from "react";
import { sendGetRequest } from "../../services/requestAdapter";
import { Loading } from "../../components/Loading";
import type { Planting } from "../../interfaces/planting/planting.interface";
import { t } from "i18next";
import { differenceInDays, format } from "date-fns";


export function Planting() {
  const navigate = useNavigate()
  const [plantings, setPlantings] = useState<Planting[]>([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllPlantings()
  }, [])

  const getAllPlantings = async () => {
    setLoading(true)
    try {
      const { data } = await sendGetRequest('/api/plantings')
      setPlantings(data?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      <Header
        title={t('plantings')}
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
                {plantings.map(planting => (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex justify-between items-center">
                        <div>
                        <h4 className=" text-lg font-semibold text-gray-800">{planting?.plantingNumber} </h4>
                        <p className="text-md text-gray-800 mb-2">{planting?.installation?.name}</p>
                        <p className="text-sm text-gray-600">{planting?.plant?.name}</p>
                        <p className="text-sm text-gray-600">{planting?.qty} {t('hole')}</p>
                        </div>
                        <div className='flex flex-col items-end gap-1'>
                        <p className="text-sm text-gray-600">{format(planting?.plantingDate, 'dd/MM/yyyy')} - {format(planting?.harvestDate, 'dd/MM/yyyy')}</p>
                        <p className="text-sm text-gray-600">{differenceInDays(new Date(), new Date(planting?.plantingDate))} {t('daysAfterPlanting')}</p>
                        {/* <div>
                            {getHarvestTimelineStatus(new Date(planting?.harvestDate))}
                        </div> */}
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