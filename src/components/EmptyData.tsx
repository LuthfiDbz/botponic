import React from "react";
import { Sprout } from "lucide-react";

interface EmptyDataProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyData: React.FC<EmptyDataProps> = ({
  title = "Tidak ada data",
  description = "Data masih kosong atau belum tersedia.",
  icon,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 text-gray-500 ${className}`}
    >
      <div className="mb-3 opacity-50">
        {icon ?? <Sprout size={40} />}
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      {description && (
        <p className="text-sm text-gray-400 mt-1">
          {description}
        </p>
      )}
    </div>
  );
};
