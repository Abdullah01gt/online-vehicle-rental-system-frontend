import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import Header from '../components/Header.jsx'
import SearchBar from '../components/SearchBar.jsx'
import VehicleCard from '../elements/VehicleCard.jsx'
import { useAuth } from '../context/AuthContext.jsx' 
import BookingPanel from '../components/BookingPanel.jsx'

export default function Home() {
  const [vehicleList, setVehicleList] = useState([])
  const [toggleBookingPanel, setToggleBookingPanel] = useState(false)
  const { userDetails } = useAuth()
  const [userBookings,setUserBookings]= useState([])
  
  

  function togglePanel(){
    setToggleBookingPanel(prevValue => !prevValue)
  }
  
  
  useEffect(() => {
    fetch("http://localhost:3000/vehicles/v1/")
    .then((response) => response.json())
    .then((result) => setVehicleList(result.data))
  },[])

  useEffect(() => {
    fetch("http://localhost:3000/bookings/v1/",{
        method:"POST",
        header:{
            "content-type": "application/json"
        },
        body:JSON.stringify({user_id:currentUser._id})
    })
    .then((response) => response.json())
    .then((result) =>{
        console.log(result)
        setUserBookings(result.data)
       })
  },[])

  

  return (
    <div class="bg-[#0b0c10] text-gray-100 min-h-screen">
    <Navbar panelSwitching={togglePanel} />

  { toggleBookingPanel && <BookingPanel panelSwitching={togglePanel} userBookings={userBookings} />}
   <Header />

   <SearchBar />

    <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
                   
           {vehicleList.map((element,index) => (<VehicleCard key={element._id} cars={element} currentUser={userDetails} />))}
            
            
            

        </div>
    </main>
</div>
   
   
  )
}
