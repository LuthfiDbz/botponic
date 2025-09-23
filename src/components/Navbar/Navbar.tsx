import { Bell, Home, Settings, User } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link, useLocation } from "react-router-dom"

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
    label: 'home',
    route: '/'
  },
  // {
  //   id: 'installations',
  //   icon: Settings,
  //   label: 'Instalasi',
  //   route: '/installations'
  // },
  // {
  //   id: 'reminders',
  //   icon: Bell,
  //   label: 'Pengingat',
  //   route: '/reminder'
  // },
  // {
  //   id: 'profile',
  //   icon: User,
  //   label: 'Profil',
  //   route: '/profile'
  // },
]


export function Navbar() {
  const location = useLocation()
  const { t, i18n } = useTranslation();
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg max-w-md mx-auto">
      <div className="max-w-md mx-auto flex justify-around py-3">
        {menu.map(({ id, icon: Icon, label, route }) => (
          <Link to={route}>
            <button
              key={id}
              // onClick={() => setCurrentView(id)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
                location.pathname == route 
                  ? 'text-green-600 bg-green-50 scale-105' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              // className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 text-gray-400 hover:text-gray-600`}
            >
              <Icon size={22} />
              <span className="text-xs mt-1 font-medium">{t(label)}</span>
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
}