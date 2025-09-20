import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { useState } from "react";

interface MeasurementFormData {
  nutrients: number;
  waterVolume: number;
  notes: string;
}

export function AddEditMeasurement() {
  const navigate = useNavigate()
  const [measurementForm, setMeasurementForm] = useState<MeasurementFormData>({
    nutrients: 0,
    waterVolume: 0,
    notes: ''
  });

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-28">
      <Header
        title="Input Pengukuran Harian"
        showBack={true}
        onBack={() => navigate(-1)}
      />
      
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

        <div className="space-y-5">
          
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700">Nutrisi</label>
            <input
              type="text"
              value={measurementForm.nutrients}
              onChange={(e) => setMeasurementForm({...measurementForm, nutrients: Number(e.target.value)})}
              className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 transition-all"
              placeholder="1200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700">Volume Air (%)</label>
            <input
              type="text"
              value={measurementForm.waterVolume}
              onChange={(e) => setMeasurementForm({...measurementForm, waterVolume: Number(e.target.value)})}
              className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 transition-all"
              placeholder="70"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700">Catatan</label>
            <textarea
              value={measurementForm.notes}
              onChange={(e) => setMeasurementForm({...measurementForm, notes: e.target.value})}
              className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 transition-all"
              rows={4}
              placeholder="Observasi tambahan..."
            />
          </div>
        </div>
        
        <div className="flex gap-4 pt-6">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 p-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Batal
          </button>
          <button
            // onClick={handleMeasurementSubmit}
            className="flex-1 p-4 bg-green-600 text-white rounded-2xl font-semibold hover:bg-green-700 transition-colors"
          >
            Simpan Data
          </button>
        </div>
      </div>
    </div>
  );
}