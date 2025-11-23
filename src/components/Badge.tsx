// components/Badge.tsx
import React from 'react';

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

const Badge: React.FC<BadgeProps> = ({ children, className }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
