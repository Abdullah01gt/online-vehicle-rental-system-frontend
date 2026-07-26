import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Navbar from '../components/Navbar.jsx'
import Header from '../components/Header.jsx'
import SearchBar from '../components/SearchBar.jsx'
import VehicleCard from '../elements/VehicleCard.jsx'
import FilterControls from '../components/FilterControls.jsx' // We'll create this next
import { useAuth } from '../context/AuthContext.jsx' 
import BookingPanel from '../components/BookingPanel.jsx'

const serverBaseUrl = import.meta.env.VITE_SERVER_URL

export default function Home() {
  const [vehicles, setVehicles] = useState([]) // Master vehicle list from API
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [sortOrder, setSortOrder] = useState('default') // 'default', 'lowToHigh', 'highToLow'
  const [toggleBookingPanel, setToggleBookingPanel] = useState(false)
  const { userDetails } = useAuth()
  const [userBookings, setUserBookings] = useState([])

  function togglePanel() {
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
    .then((result) => setVehicles(result.data || []))
  }, []);

  useEffect(() => {
    fetchUserBookings();
  }, [fetchUserBookings]);

  // Extract unique locations dynamically from loaded vehicles
  const locations = useMemo(() => {
    const locs = vehicles.map(v => v.available_region).filter(Boolean);
    return ['All', ...new Set(locs)];
  }, [vehicles]);

  // Filter and sort vehicles without mutating original state
  const filteredVehicles = useMemo(() => {
    let result = [...vehicles];

    // 1. Filter by location
    if (selectedLocation !== 'All') {
      result = result.filter(v => v.available_region === selectedLocation);
    }

    // 2. Sort by price
    if (sortOrder === 'lowToHigh') {
      result.sort((a, b) => a.per_day_rent - b.per_day_rent);
    } else if (sortOrder === 'highToLow') {
      result.sort((a, b) => b.per_day_rent - a.per_day_rent);
    }

    return result;
  }, [vehicles, selectedLocation, sortOrder]);

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
      
      {/* Search updates master vehicles list */}
      <SearchBar setVehicles={setVehicles} />

      {/* Filter and Sort Bar */}
      <FilterControls 
        locations={locations}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <main className="max-w-7xl mx-auto px-6 pb-24">
        {filteredVehicles.length === 0 ? (
          <p className="text-center text-gray-400 my-12">No vehicles found matching your selection.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {filteredVehicles.map((element) => (
              <VehicleCard 
                key={element._id} 
                cars={element} 
                currentUser={userDetails} 
                refreshBookings={fetchUserBookings} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}