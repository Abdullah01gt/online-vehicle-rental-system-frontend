import React, { useState, useEffect} from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import AdminNavbar from '../components/AdminNavbar.jsx';
import TransactionMonitor from '../components/TransactionMonitor.jsx';
const serverBaseUrl = import.meta.env.VITE_SERVER_URL





export default function PaymentRecords() {
    const { userDetails } = useAuth();
   

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


   

    <TransactionMonitor />
    </div>
  )
}
