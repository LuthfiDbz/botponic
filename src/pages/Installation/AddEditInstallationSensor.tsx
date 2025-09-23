import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { FormProviderWrapper } from "../../components/Input/FormProviderWrapper";
import { useForm } from "react-hook-form";
import { InputText } from "../../components/Input/InputText";
import { InputNumber } from "../../components/Input/InputNumber";
import type { FormInstallationSensor } from "../../interfaces/installations/installation.interface";


const defaultValues: FormInstallationSensor = {
  nutrient: 0,
  waterVolume: 0,
  notes: ""
};

export function AddEditInstallationSensor() {
  const navigate = useNavigate()
  const methods = useForm<FormInstallationSensor>({
    defaultValues, // dipakai kalau ADD
  });

   const onSubmit = (data: FormInstallationSensor) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-28">
      <Header
        title="Input Pengukuran Harian"
        showBack={true}
        onBack={() => navigate(-1)}
      />

      <FormProviderWrapper methods={methods} onSubmit={onSubmit}>
        <div className="p-4 space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
                {/* {selectedInstallation.image} */}
              </div>
              <div>
                {/* <p className="font-medium text-green-800">{selectedInstallation.name}</p> */}
                {/* <p className="text-sm text-green-600">{selectedInstallation.model}</p> */}
              </div>
            </div>
          </div>
          <InputNumber
            name="nutrient"
            label="Nutrisi"
            placeholder="Input your nutrient number"
            rules={{ 
              required: "Nutrisi dibutuhkan",
              min: { value: 1, message: "Nutrisi dibutuhkan" } 
            }}
            required
          />
          <InputNumber
            name="waterVolume"
            label="Volume Air (%)"
            placeholder="Input your water volume"
            rules={{ 
              required: "Volume air dibutuhkan",
              min: { value: 1, message: "Volume air dibutuhkan" } 
            }}
            required
          />
          <InputText
            name="notes"
            label="Catatan"
            placeholder="Input your notes"
          />
          <div className="flex gap-4 pt-6">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 p-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              // onClick={handleMeasurementSubmit}
              className="flex-1 p-4 bg-green-600 text-white rounded-2xl font-semibold hover:bg-green-700 transition-colors"
            >
              Simpan Data
            </button>
          </div>
        </div>
      </FormProviderWrapper>
    </div>
  );
}