import React, { useState } from 'react';

import { Check, X, ShieldAlert, User } from 'lucide-react';
const serverBaseUrl = import.meta.env.VITE_SERVER_URL

export default function VehicleApprovalCard( {cars={}}) {

  const [message, setMessage] = useState("")
  async function handleAccept ()  {
    try{
      setMessage("accepted")
     
   
  
    const response = await fetch(`${serverBaseUrl}/vehicles/v1/update/${cars._id}`,
      {
        method:"PATCH",
        headers:{
          "content-type" : "application/json"
        },
        body: JSON.stringify({availablity_status:"available" })
      }
    )
    console.log(response)} catch(error){
      console.log(error)
    }
  };

  async function handleReject () {
   try{ 
    setMessage("rejected")
    console.log("Vehicle Rejected - Notification sent to owner");
   

      const response = await fetch(`${serverBaseUrl}/vehicles/v1/update/:${cars._id}`,
      {
        method:"PATCH",
        headers:{
          "content-type" : "application/json"
        },
        body: JSON.stringify({availablity_status:"rejected" })
      }
    )
    console.log(response)} catch(error){
      console.log(error)
    }
  };

  return (
    <div className="bg-[#12141c] border border-gray-800/60 rounded-2xl overflow-hidden shadow-xl hover:border-gray-700/60 transition-all duration-300 flex flex-col justify-between max-w-sm">
      <div>
       
        <div className="relative h-48 overflow-hidden bg-[#1a1d26]">
          <img 
            src={cars.image_url}
            alt="Car Image" 
            className="w-full h-full object-cover" 
          />
          
        
          <div className="absolute top-4 left-4 bg-[#12141c]/90 border border-gray-800 px-2 py-1 rounded-md text-[10px] font-mono tracking-widest text-gray-400">
            {cars.registration_number}
          </div>

       
          <div className="absolute top-4 right-4 bg-amber-500/10 backdrop-blur-md border border-amber-500/30 px-2 py-1 rounded-md flex items-center gap-1 text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
            <User className="w-3 h-3" />
            <span>Owner Request</span>
          </div>
        </div>

        
        <div className="p-5 space-y-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-amber-500">Asset Brand: {cars.brand_name}</span>
            <h3 class="text-xl font-bold text-white tracking-tight">{cars.model_name}</h3>
            <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500">
              <span>Year: {cars.model_year}</span>
              <span>•</span>
              <span>Proposed Rate:{cars.per_day_rent}₹/day</span>
            </div>
          </div>

            <div className="p-5 space-y-4">
                        <div>
                             <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500">
                                <span>Owner: {cars.owner_name}</span>
                                <span>•</span>
                                <span>Phone Number:{cars.owner_contact_number}</span>
                            </div>
                        </div>
                        </div>

         
          <div className="bg-[#1a1d26] border border-gray-800/60 rounded-xl p-3 flex justify-between items-center">
            <span className="text-xs text-gray-400 font-medium">Platform Status</span>
            <span id="statusText-1" className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1">
              <ShieldAlert className="w-3 h-3 animate-pulse" />
              Pending Review
            </span>
          </div>
        </div>
      </div>

     
     
    { message == "" ? <div className="px-5 pb-5 pt-0">
        <div className="grid grid-cols-2 gap-3">
        
          <button 
            type="button"
            onClick={() => handleReject()}
            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border border-rose-900/40 bg-rose-950/10 hover:bg-rose-950/30 text-rose-400 text-xs font-bold uppercase tracking-wider transition duration-200"
          >
            <X className="w-4 h-4" />
            <span>Reject</span>
          </button>

         
          <button 
            type="button"
            onClick={() => handleAccept()}
            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider transition duration-200 shadow-lg shadow-emerald-500/10"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Accept</span>
          </button>
        </div>
      </div> : message == "accepted" ? <div  className="px-5 pb-5 pt-0" > <p className=" text-green-400 "> Accepted ✅ </p> </div>: <div>❌ Rejected </ div>}
    </div>
  );
}