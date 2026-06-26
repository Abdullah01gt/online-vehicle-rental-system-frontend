import React, { useState, useEffect} from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import VehicleMaintainingCard from '../elements/VehicleMaintainingCard.jsx';
import OwnerNavbar from '../components/OwnerNavbar.jsx'
const serverBaseUrl = import.meta.env.VITE_SERVER_URL




export default function OwnerHome() {
    const { userDetails } = useAuth();
    const [ownerVehicles, setOwnerVehicles] = useState([])
   useEffect(() => {
    fetch(`${serverBaseUrl}/vehicles/v1/`, 
       { method:"POST",
         headers:{
            "content-type": "application/json"
         },
         body: JSON.stringify({owner_id: userDetails._id })
       }
    ).then((response) => response.json() 
         )
      .then((result) => {setOwnerVehicles(result.data)
       }) 
   },[])

  return (
    <div className="bg-[#0b0c10] text-gray-100 min-h-screen">
      <OwnerNavbar />
  
    <header className="max-w-7xl mx-auto px-6 pt-10 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Fleet Asset Control</h1>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">Global tracking matrix. Instantly list or toggle deployment parameters for all registered fleet units.</p>
            </div>
          
            <div className="bg-[#12141c] border border-gray-800/80 rounded-xl px-4 py-2 text-xs flex items-center space-x-4">
                <div><span className="text-gray-500 block uppercase font-bold text-[10px]">Active Listing</span><span className="text-white font-bold text-lg">{ownerVehicles.length} Units</span></div>
                
            </div>
        </div>
    </header>


    <main className="max-w-7xl mx-auto px-6 pb-24 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
           {ownerVehicles.map((element,id) => (
            <VehicleMaintainingCard key={element._id} cars={element} />
           ))}
         
        

        </div>
    </main>
    </div>
  )
}
