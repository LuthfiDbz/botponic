import { useFormContext } from "react-hook-form";

interface InputSelectProps {
  name: string;
  label: string;
  options: { label?: string; id: string | number, name?: string }[];
  placeholder?: string;
  rules?: object;
  required?: boolean;
  disabled?: boolean;
}

export function InputSelect({ name, label, options, placeholder, rules, required, disabled }: InputSelectProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <select
        {...register(name, rules)}
        className={`w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring disabled:bg-gray-200 disabled:text-gray-500 bg-gray-50 focus:bg-white transition-all ${
          errorMessage ? "border-red-500 focus:ring-red-400" : "focus:ring-gray-500"
        }`}
        defaultValue=""
        disabled={disabled}
      >
        <option value="" disabled hidden>
          {placeholder || "Select..."}
        </option>

        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label || opt.name}
          </option>
        ))}
      </select>

      {errorMessage && <p className="text-sm text-red-500 mt-1">{errorMessage}</p>}
    </div>
  );
}
