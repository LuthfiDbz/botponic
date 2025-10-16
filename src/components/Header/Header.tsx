import { ArrowLeft, Bell } from "lucide-react"

interface HeaderProps {
    title: string;
    showBack?: boolean;
    onBack?: () => void;
  }

export function Header({ title, showBack = false, onBack }: HeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b border-gray-100">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {showBack && (
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
          )}
          <h1 className="text-2xl font-bold text-green-800">{title}</h1>
        </div>
        {/* <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <Bell size={20} className="text-gray-600" />
          </button>
        </div> */}
      </div>
    </div>
  )
}