import React, { useState, useEffect} from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import AdminBookingCard from '../elements/AdminBookingCard.jsx';
import AdminNavbar from '../components/AdminNavbar.jsx'
const serverBaseUrl = import.meta.env.VITE_SERVER_URL




export default function AdminVehicleRentalHistory() {
    const { userDetails } = useAuth();
    const [allBookings, setAllBookings] = useState([])
   useEffect(() => {
    fetch(`${serverBaseUrl}/bookings/v1/booking`, 
       { method:"POST",
         headers:{
            "content-type": "application/json"
         },
        
       }
    ).then((response) => response.json() 
         )
      .then((result) => {setAllBookings(result.data)
      }) 
   },[])

  return (
    <div className="bg-[#0b0c10] text-gray-100 min-h-screen">
      <AdminNavbar />
  
    <header className="max-w-7xl mx-auto px-6 pt-10 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Fleet Asset Control</h1>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">Global tracking matrix. Instantly list or toggle deployment parameters for all registered fleet units.</p>
            </div>
          
            
        </div>
    </header>


    <main className="max-w-7xl mx-auto px-6 pb-24 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
           {allBookings.map((element,id) => (
            <AdminBookingCard key={element._id} booking={element} />
           ))}
         
        

        </div>
    </main>
    </div>
  )
}
