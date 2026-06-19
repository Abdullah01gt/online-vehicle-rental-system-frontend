import React from 'react'
import VehicleMaintainingCard from '../elements/VehicleMaintainingCard.jsx'
import AdminNavbar from '../components/AdminNavbar.jsx'

export default function AdminHome() {
  return (
    <div className="bg-[#0b0c10] text-gray-100 min-h-screen">
      <AdminNavbar />
  
    <header className="max-w-7xl mx-auto px-6 pt-10 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Fleet Asset Control</h1>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">Global tracking matrix. Instantly list or toggle deployment parameters for all registered fleet units.</p>
            </div>
          
            <div className="bg-[#12141c] border border-gray-800/80 rounded-xl px-4 py-2 text-xs flex items-center space-x-4">
                <div><span className="text-gray-500 block uppercase font-bold text-[10px]">Active Listing</span><span className="text-white font-bold text-lg">248 Units</span></div>
                <div className="w-px h-8 bg-gray-800"></div>
                <div><span className="text-gray-500 block uppercase font-bold text-[10px]">In Maintenance</span><span className="text-amber-500 font-bold text-lg">12 Units</span></div>
            </div>
        </div>
    </header>


    <main className="max-w-7xl mx-auto px-6 pb-24 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
           
          <VehicleMaintainingCard />

          <VehicleMaintainingCard />

        </div>
    </main>
    </div>
  )
}
