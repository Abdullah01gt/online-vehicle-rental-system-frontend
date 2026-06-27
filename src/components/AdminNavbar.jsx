import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import VehicleApproval from '../pages/VehicleApproval'
import AdminVehicleRentalHistory from '../pages/AdminVehicleRentalHistory'
import { useAuth } from '../context/AuthContext'
const serverBaseUrl = import.meta.env.VITE_SERVER_URL



export default function AdminNavbar() {
    const { logout } = useAuth()
    const [ newApprovals, setNewApprovals] = useState([])
   
      useEffect(() => {
        fetch(`${serverBaseUrl}/vehicles/v1/admincontrol`,
          {
            method:"POST",
            headers:{
              "content-type": "application/json"
            },
            body: JSON.stringify({
              statuses: ["pending"]
            })
                
            
          }
        ).then((response) => response.json())
         .then((result) => {setNewApprovals(result.data)
            
         })
      },[])
    const navigate = useNavigate()
  return (
    <div>
      <nav className="border-b border-gray-800/60 bg-[#12141c]/95 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            
          
            <div className="flex items-center space-x-2.5 self-start sm:self-auto">
                <div className="bg-amber-500 p-2 rounded-xl text-black shadow-lg shadow-amber-500/20">
                    <i data-lucide="shield-check" className="w-5 h-5"></i>
                </div>
                <div>
                    <span className="text-lg font-bold tracking-wider text-white">QUICK DRIVE</span>
                    <span className="text-[10px] text-amber-500 block font-bold tracking-widest uppercase -mt-1">HQ Command</span>
                </div>
            </div>

           
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-start sm:justify-end">

                <button onClick={() => navigate("/admin")}
                        className="relative flex items-center space-x-2 bg-[#1a1d26] hover:bg-[#222632] border border-gray-800 hover:border-gray-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition duration-200 text-gray-200 group">
                    <i data-lucide="git-pull-request" className="w-4 h-4 text-amber-500 group-hover:scale-110 transition"></i>
                    <span>Home</span>
                   
                </button>
                
               <button onClick={() => navigate("/usersinfo")}
                        className="relative flex items-center space-x-2 bg-[#1a1d26] hover:bg-[#222632] border border-gray-800 hover:border-gray-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition duration-200 text-gray-200 group">
                    <i data-lucide="git-pull-request" className="w-4 h-4 text-amber-500 group-hover:scale-110 transition"></i>
                    <span>Users Info</span>
                   
                </button>
                <button onClick={() => navigate("/vehicleapproval")}
                        className="relative flex items-center space-x-2 bg-[#1a1d26] hover:bg-[#222632] border border-gray-800 hover:border-gray-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition duration-200 text-gray-200 group">
                    <i data-lucide="git-pull-request" className="w-4 h-4 text-amber-500 group-hover:scale-110 transition"></i>
                    <span>Vehicle Approvals</span>
                   { newApprovals.length > 0  ? <span className="bg-amber-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">{newApprovals.length} New</span> : <div></div>}
                </button>

            
                <button onClick={() => navigate("/paymentrecords")}
                        className="flex items-center space-x-2 bg-[#1a1d26] hover:bg-[#222632] border border-gray-800 hover:border-gray-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition duration-200 text-gray-200 group">
                    <i data-lucide="wallet" className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition"></i>
                    <span>Payment Records</span>
                </button>

              
                <button onClick={() => navigate("/adminvehiclerentalhistory")}
                        className="flex items-center space-x-2 bg-[#1a1d26] hover:bg-[#222632] border border-gray-800 hover:border-gray-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition duration-200 text-gray-200 group">
                    <i data-lucide="history" className="w-4 h-4 text-blue-400 group-hover:scale-110 transition"></i>
                    <span>Vehicle's Rental History</span>
                </button>

                <button 
            onClick={() => logout()} 
            className= "flex items-center justify-center space-x-2 w-full sm:w-auto bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40 px-5 py-2 rounded-xl text-sm font-semibold transition duration-200 text-rose-400 cursor-pointer"
           >
            <i data-lucide="log-out" className="w-4 h-4 text-rose-400 flex-shrink-0"></i>
            <span className="leading-none">Logout</span>
            <p>⏻</p>
           </button>
            </div>
        </div>
    </nav>

    </div>
  )
}
