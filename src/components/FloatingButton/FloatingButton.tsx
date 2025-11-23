import { Plus } from 'lucide-react';
import { useState } from 'react';

// ===== FLOATING ACTION BUTTON COMPONENT (REUSABLE) =====
export interface FloatingAction {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  color: string;
  onClick: () => void;
}

interface FloatingActionButtonProps {
  actions: FloatingAction[];
  position?: 'left' | 'center' | 'right';
  buttonColor?: string;
}

export function FloatingActionButton({
  actions,
} : FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleActionClick = (action: FloatingAction) => {
    action.onClick();
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`fixed bottom-24 z-50`}>
        <div className="flex flex-col-reverse items-center gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div
                key={index}
                className={`transition-all duration-300 ease-out ${
                  isOpen
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-4 scale-0 pointer-events-none'
                }`}
                style={{
                  transitionDelay: isOpen
                    ? `${index * 50}ms`
                    : `${(actions.length - index - 1) * 30}ms`,
                }}
              >
                <button
                  onClick={() => handleActionClick(action)}
                  className={`${action.color} text-white px-5 py-3 rounded-full shadow-lg transform transition-all duration-200 hover:scale-110 active:scale-95 flex items-center gap-2 cursor-pointer`}
                  aria-label={action.label}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium whitespace-nowrap">
                    {action.label}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`z-50`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`bg-green-600 text-white rounded-full shadow-2xl transform transition-all duration-300 w-12 h-12 hover:scale-110 active:scale-95 cursor-pointer ${
            isOpen ? 'rotate-45' : 'rotate-0'
          }`}
          aria-label="Toggle menu"
        >
          <Plus size={20} className='mx-auto' />
        </button>
      </div>
    </>
  );
};