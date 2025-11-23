import React from "react";
import clsx from "clsx";
import { Loading } from "../Loading";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "outline" | "link";
  size?: "s" | "m" | "l";
  icon?: React.ReactNode;
  className?: string;
	loading?: boolean
}

export function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "m",
  icon,
  className,
	loading = false
}: ButtonProps) {
  const base = "inline-flex justify-center items-center gap-2 font-semibold transition-all cursor-pointer";

  // 🔹 Size styles
  const sizes = {
    s: "text-sm px-4 py-2 rounded-lg",
    m: "text-base px-6 py-3 rounded-xl",
    l: "text-lg px-6 py-4 rounded-2xl"
  };

  // 🔹 Variant styles
  const variants = {
    primary:
      "bg-green-600 text-white hover:bg-green-700 active:scale-95",
		secondary:
      "bg-transparent text-gray-700 hover:text-gray-500 active:scale-95",
    outline:
      "bg-blue-50 text-blue-600 border border-blue-300 hover:bg-blue-100 active:scale-95",
    link:
      "text-green-600 hover:text-green-700 active:scale-95 px-0 py-0" // link gak pakai padding
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(base, sizes[size], variants[variant], className)}
    >
			{!loading && icon}
			{loading && <Loading size="md"/>}
			{children}
    </button>
  );
}
