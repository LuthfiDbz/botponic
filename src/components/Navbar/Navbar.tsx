import { t } from "i18next"
import { Bell, Home, Mail, MessageCircle, Phone, Plus, Settings, Share2, User } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FloatingActionButton, type FloatingAction } from "../FloatingButton/FloatingButton"

interface Menu {
  id: string,
  icon: any,
  label: string,
  route: string
}

const menu: Menu[] = [
  {
    id: 'dashboard',
    icon: Home,
    label: "menuHome",
    route: '/'
  },
  {
    id: 'installations',
    icon: Settings,
    label: "menuInstallations",
    route: '/installations'
  },
  {
    id: 'fab',
    icon: "",
    label: "a",
    route: 'a'
  },
  {
    id: 'plantings',
    icon: Settings,
    label: "menuPlantings",
    route: '/plantings'
  },
  {
    id: 'measurement-logs',
    icon: Settings,
    label: "menuMeasurementLog",
    route: '/measurement-logs'
  },
]




export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()


  const socialActions: FloatingAction[] = [
    {
      icon: Plus,
      label: 'Measurement',
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => navigate('/add-measurement'),
    },
    {
      icon: Plus,
      label: 'Planting',
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => navigate('/add-planting'),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg max-w-md mx-auto">
      <div className="max-w-md mx-auto flex justify-around py-3">
        {menu.map(({ id, icon: Icon, label, route }) => {
          if(id === "fab") {
            return (
              <FloatingActionButton
                actions={socialActions}
              />
            )
          }
          return (
            <Link to={route}>
              <button
                key={id}
                // onClick={() => setCurrentView(id)}
                className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 cursor-pointer w-20 ${
                  location.pathname == route 
                    ? 'text-green-600 !font-semibold scale-105' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                // className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 text-gray-400 hover:text-gray-600`}
              >
                {<Icon size={location.pathname == route ? 24 : 22} />}
                <span className="text-xs mt-1">{t(label)}</span>
              </button>
            </Link>
          )
        })}
        
      </div>
    </div>
  )
}