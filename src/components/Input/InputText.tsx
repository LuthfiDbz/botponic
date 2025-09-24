import { useFormContext } from "react-hook-form";

interface InputTextProps {
  name: string;
  label: string;
  placeholder?: string;
  rules?: object;
  required?: boolean
}

export function InputText({ name, label, placeholder, rules, required }: InputTextProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
      <input
        type="text"
        placeholder={placeholder}
        {...register(name, rules)}
        className={`w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring  bg-gray-50 focus:bg-white transition-all ${errorMessage ? "border-red-500 focus:ring-red-400" : "focus:ring-gray-500 "}`}
      />
      {errorMessage && (
        <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
