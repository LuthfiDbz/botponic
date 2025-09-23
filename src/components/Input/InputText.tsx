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
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring 
          ${errorMessage ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300"}`}
      />
      {errorMessage && (
        <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
