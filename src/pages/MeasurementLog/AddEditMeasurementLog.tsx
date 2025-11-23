import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { FormProviderWrapper } from "../../components/Input/FormProviderWrapper";
import { useForm } from "react-hook-form";
import { InputText } from "../../components/Input/InputText";
import { InputNumber } from "../../components/Input/InputNumber";
import type { FormInstallationMeasurement } from "../../interfaces/installations/installation.interface";
import { useEffect } from "react";
import { sendPostRequest } from "../../services/requestAdapter";
import { useInstallationStore } from "../../store/installation.store";
import { InputSelect } from "../../components/Input/InputSelect";
import { Button } from "../../components/Button/Button";


const defaultValues: FormInstallationMeasurement = {
  installationId: "",
  nutrient: 0,
  waterVolume: 0,
  notes: "",
  type: "Manual"
};

export function AddEditInstallationMeasurement() {
  const navigate = useNavigate()
  const params = useParams()
  const [searchParams] = useSearchParams();
  const installationId = searchParams.get("id");
  const { loading, setLoading, installation, fetchAllInstallation } = useInstallationStore()
  const methods = useForm<FormInstallationMeasurement>({
    defaultValues, // dipakai kalau ADD
  });

  useEffect(() => {
    fetchAllInstallation()
  }, [])

  useEffect(() => {
    installationId && methods?.setValue("installationId", installationId!)
  }, [installation])

  const onSubmit = async (data: FormInstallationMeasurement) => {
    const payload = {
      ...data
    }
    setLoading(true)
    try {
      await sendPostRequest(`/api/measurement-logs`, payload)
      navigate(`/installation/${params?.id}`)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-28">
      <Header
        title="Input Pengukuran Harian"
        showBack={true}
        onBack={() => navigate(-1)}
      />

      <FormProviderWrapper methods={methods} onSubmit={onSubmit}>
        <div className="p-4">
          {/* <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
                {selectedInstallation.image}
              </div>
              <div>
                <p className="font-medium text-green-800">{selectedInstallation.name}</p>
                <p className="text-sm text-green-600">{selectedInstallation.model}</p>
              </div>
            </div>
          </div> */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-6">
            <InputSelect
              name="installationId"
              label="Installation"
              placeholder="Select your installation"
              options={installation}
              required
              rules={{ 
                required: "Instalasi dibutuhkan"
              }}
              disabled={installationId != undefined}
            />
            <div className="flex items-center gap-2">
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
            </div>
            <InputText
              name="notes"
              label="Catatan"
              placeholder="Input your notes"
            />
            <div className="pt-6 space-y-3">
              <Button
                variant="primary" 
                size="m"
                loading={loading}
                className="w-full"
                type="submit"
              >Simpan Data</Button>
              <Button
                variant="secondary" 
                size="m"
                onClick={() => navigate(-1)}
                className="w-full"
              >Batal</Button>
            </div>
          </div>
        </div>
      </FormProviderWrapper>
    </div>
  );
}