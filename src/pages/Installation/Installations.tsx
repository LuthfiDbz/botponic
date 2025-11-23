import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header"
import { useEffect, useState } from "react";
import type { Installation } from "../../interfaces/installations/installation.interface";
import { sendGetRequest } from "../../services/requestAdapter";
import Badge from "../../components/Badge";
import { CommonStatus } from "../../enums/status";
import { getInstallationPPMColor, getInstallationStatusColor } from "../../utils/statusColor";
import { Loading } from "../../components/Loading";


export function Installation() {
  const navigate = useNavigate()
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllInstallations()
  }, [])

  const getAllInstallations = async () => {
    setLoading(true)
    try {
      const { data } = await sendGetRequest('/api/installations')
      setInstallations(data?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      <Header
        title={"INSTALLATIONS"}
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
                {installations.map(installation => (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div 
                      key={installation.id}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => {
                        navigate(`/installation/${installation.id}`)
                      }}
                    >
                      <div className="flex items-center gap-4">
                        {/* <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
                          {installation.image}
                        </div> */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-800">{installation.name}</h4>
                              <p className="text-sm text-gray-600">{installation.model} • {installation.type}</p>
                            </div>
                            {/* <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Sprout size={14} className="text-green-600" />
                              <span>{installation.plantingCount}/{installation.capacity}</span>
                            </div> */}
                          </div>
                          <div className="flex justify-between items-center gap-4 mt-3">
                            <Badge className={getInstallationPPMColor(installation.latestNutrients, 20, 25)}>
                              {installation.latestNutrients} PPM
                            </Badge>

                            <Badge className={getInstallationStatusColor(installation.status)}>
                              {installation.status === CommonStatus.INACTIVE && 'Inactive'}
                              {installation.status === CommonStatus.ACTIVE && 'Active'}
                              {installation.status === CommonStatus.FULL && 'Full'}
                            </Badge>
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
                  </div>
                ))}
              </>
            }
            </div>
    </div>
  )
}