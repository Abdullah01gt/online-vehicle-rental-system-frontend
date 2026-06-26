import React, { useState, useEffect, useCallback } from 'react'
import Navbar from '../components/Navbar.jsx'
import Header from '../components/Header.jsx'
import SearchBar from '../components/SearchBar.jsx'
import VehicleCard from '../elements/VehicleCard.jsx'
import { useAuth } from '../context/AuthContext.jsx' 
import BookingPanel from '../components/BookingPanel.jsx'
const serverBaseUrl = import.meta.env.VITE_SERVER_URL

export default function Home() {
  const [vehicleList, setVehicleList] = useState([])
  const [toggleBookingPanel, setToggleBookingPanel] = useState(false)
  const { userDetails } = useAuth()
  const [userBookings, setUserBookings] = useState([])

  function togglePanel(){
    setToggleBookingPanel(prevValue => !prevValue)
  }


  const fetchUserBookings = useCallback(() => {
    if (!userDetails?._id) return;
    
    fetch(`${serverBaseUrl}/bookings/v1/booking`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ user_id: userDetails._id })
    })
    .then((response) => response.json())
    .then((result) => {
        if (result.success) {
          setUserBookings(result.data)
        }
    })
    .catch(err => console.error("Error loading user bookings ledger:", err));
  }, [userDetails?._id]);

  
  useEffect(() => {
    fetch(`${serverBaseUrl}/vehicles/v1/`, { 
        method: "POST",
        headers: { "content-type" : "application/json" },
        body: JSON.stringify({ availablity_status: "available" })
    })
    .then((response) => response.json())
    .then((result) => setVehicleList(result.data))
  }, []);

  useEffect(() => {
    fetchUserBookings();
  }, [fetchUserBookings]);

  return (
    <div className="bg-[#0b0c10] text-gray-100 min-h-screen">
    
      <Navbar panelSwitching={togglePanel} bookings={userBookings}/>
      {toggleBookingPanel && (
        <BookingPanel 
          panelSwitching={togglePanel} 
          userBookings={userBookings} 
          refreshBookings={fetchUserBookings} 
        />
      )}
      <Header />
      <SearchBar setVehicleList={setVehicleList} />

      <main className="max-w-7xl mx-auto px-6 pb-24">
         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
             {vehicleList.map((element) => (
                 <VehicleCard 
                     key={element._id} 
                     cars={element} 
                     currentUser={userDetails} 
                     refreshBookings={fetchUserBookings} 
                 />
             ))}
          </div>
      </main>
    </div>
  )
}