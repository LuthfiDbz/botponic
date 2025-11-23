import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { FormProviderWrapper } from "../../components/Input/FormProviderWrapper";
import { useForm } from "react-hook-form";
import { InputText } from "../../components/Input/InputText";
import { InputNumber } from "../../components/Input/InputNumber";
import { useEffect, useState } from "react";
import { sendPostRequest } from "../../services/requestAdapter";
import { useMasterDataStore } from "../../store/masterdata.store";
import type { FormPlanting } from "../../interfaces/planting/planting.interface";
import { InputSelect } from "../../components/Input/InputSelect";
import { useInstallationStore } from "../../store/installation.store";
import { Button } from "../../components/Button/Button";


const defaultValues: FormPlanting = {
  installationId: "",
  plantId: "",
  qty: 0,
  notes: ""
};

export function AddEditPlanting() {
	const { plants, fetchAllPlants } = useMasterDataStore()
  const { installation, fetchAllInstallation } = useInstallationStore()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const installationId = searchParams.get("id");
  const methods = useForm<FormPlanting>({
    defaultValues, // dipakai kalau ADD
  });


  const [loading, setLoading] = useState(false)


  useEffect(() => {
		fetchAllPlants()
    fetchAllInstallation()
  }, [])

  useEffect(() => {
    installationId && methods?.setValue("installationId", installationId!)
  }, [installation])

  const onSubmit = async (data: FormPlanting) => {
    const payload = {
      installationId: installationId ?? data?.installationId,
			plantId: data?.plantId,
			qty: data?.qty,
			notes: data?.notes,
      plantingNumber: "PL-" + Date.now(),
      plantingDate: new Date(), 
      harvestDate: new Date(), 
    }
		// return
    setLoading(true)
    try {
      await sendPostRequest(`/api/plantings`, payload)
      navigate(`/installation/${installationId}`)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-28">
      <Header
        title={`Input Penanaman ${!installationId ? "Cepat" : ""}`}
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
                <p className="font-medium text-green-800">{watch("")}</p>
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
            <InputSelect 
              name="plantId"
              label="Plant"
              placeholder="Select your plant"
              options={plants}
              required
              rules={{ 
                required: "Tanaman dibutuhkan"
              }}
            />
            <InputNumber
              name="qty"
              label="Quantity"
              placeholder="Input your quantity"
              rules={{ 
                required: "Quantity dibutuhkan",
                min: { value: 1, message: "Quantity dibutuhkan" } 
              }}
              required
            />
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