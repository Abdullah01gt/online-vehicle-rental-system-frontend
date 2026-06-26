import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'


export default function OwnerNavbar() {
    const navigate = useNavigate()
    const { logout } = useAuth()
    
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
                
              

          <button onClick={() => navigate("/owner")}
                        className="relative flex items-center space-x-2 bg-[#1a1d26] hover:bg-[#222632] border border-gray-800 hover:border-gray-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition duration-200 text-gray-200 group">
                    <i data-lucide="git-pull-request" className="w-4 h-4 text-amber-500 group-hover:scale-110 transition"></i>
                    <span>Home</span>
                   
                </button>    
                <button onClick={() => navigate("/vehicleregistration")}
                        className="relative flex items-center space-x-2 bg-[#1a1d26] hover:bg-[#222632] border border-gray-800 hover:border-gray-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition duration-200 text-gray-200 group">
                    <i data-lucide="git-pull-request" className="w-4 h-4 text-amber-500 group-hover:scale-110 transition"></i>
                    <span>Register your Vehicle</span>
                    
                </button>

            

              
                <button onClick={() => navigate("/vehiclerentalhistory")}
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
