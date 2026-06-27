import React, { useState } from 'react';
const serverBaseUrl = import.meta.env.VITE_SERVER_URL

export default function VehicleMaintainingCard({ cars = {} }) {
 
  const [status, setStatus] = useState(cars.availablity_status === "available");
  const [loading, setLoading] = useState(false);

  // Defensive check
  if (!cars._id) return null;

  async function handleChange() {
    if (loading) return;

    
    const nextStatus = !status; 
    const targetPayload = nextStatus ? "available" : "maintenance";

    setLoading(true);

    try {
      console.log(`Updating vehicle ${cars._id} to: ${targetPayload}`);
      
      const response = await fetch(`${serverBaseUrl}/vehicles/v1/update/${cars._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ availablity_status: targetPayload })
      });

      if (response.ok) {
        
        setStatus(nextStatus);
      } else {
        console.error("Server rejected the status update");
      }
    } catch (error) {
      console.error("Network error updating status:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="bg-[#12141c] border border-gray-800/60 rounded-2xl overflow-hidden shadow-xl hover:border-gray-700/60 transition-all duration-300 flex flex-col justify-between">
        <div>
          <div className="relative h-48 overflow-hidden bg-[#1a1d26]">
            <img src={cars.image_url} alt="Car Image" className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 bg-[#12141c]/90 border border-gray-800 px-2 py-1 rounded-md text-[10px] font-mono tracking-widest text-gray-400">
              {cars.registration_number}
            </div>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-amber-500">Brand Name: {cars.brand_name}</span>
              <h3 className="text-xl font-bold text-white tracking-tight">{cars.model_name}</h3>
              <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500">
                <span>Year: {cars.model_year}</span>
                <span>•</span>
                <span>Per Day Rent: ₹{cars.per_day_rent}</span>
              </div>
              <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500">
                <span>Owner: {cars.owner_name}</span>
                <span>•</span>
                <span>Phone Number: {cars.owner_contact_number}</span>
              </div>
            </div>
             

            <div className="bg-[#1a1d26] border border-gray-800/60 rounded-xl p-3 flex justify-between items-center">
              <span className="text-xs text-gray-400 font-medium">Platform Status</span>

             
             
              <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                status 
                  ? "text-emerald-400 bg-emerald-500/5 border-emerald-500/20" 
                  : "text-amber-500 bg-amber-500/5 border-amber-500/20"
              }`}>
                {status ? "Available" : "Maintenance"}
              </span>
            </div>
          </div>
        </div>

        {cars.availablity_status !== "pending" && cars.availablity_status !== "rejected" ? (
          <div className="px-5 pb-5 pt-0">
            <div className={`bg-[#1a1d26] border border-gray-800 rounded-xl p-3.5 flex items-center justify-between transition-opacity ${loading ? "opacity-50" : ""}`}>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white block">Public Visibility</span>
                <span className="text-[10px] text-gray-500 block">Controls client booking visibility</span>
              </div>

              <label className="relative inline-flex items-center cursor-pointer select-none">
              
                <input 
                  type="checkbox" 
                  checked={status} 
                  disabled={loading}
                  onChange={handleChange} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full
                 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                 after:bg-gray-400 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                 peer-checked:bg-amber-500 peer-checked:after:bg-black peer-checked:after:border-black"></div>
              </label>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

