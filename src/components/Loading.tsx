interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  full?: boolean; // full screen overlay
  className?: string;
}

export function Loading({ size = "md", text, full = false, className }: LoadingProps) {
  const sizeMap = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-[3px]",
    lg: "h-10 w-10 border-4",
  };

  const spinner = (
    <div
      className={`animate-spin rounded-full border-gray-300 border-t-gray-700  ${sizeMap[size]}`}
    />
  );

  if (full) {
    return (
      <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex flex-col items-center justify-center z-50">
        {spinner}
        {text && <p className="mt-3 text-gray-700">{text}</p>}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 w-fit mx-auto ${className}`}>
      {spinner}
      {text && <span className="text-gray-600">{text}</span>}
    </div>
  );
}
