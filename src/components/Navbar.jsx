import React from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
export default function Navbar( {panelSwitching , bookings=[]}) {
      const { userDetails, logout } = useAuth()
      const navigate = useNavigate()
    
  return (
   
       <nav className="border-b border-gray-800/60 bg-[#12141c]/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <div className="bg-amber-500 p-2 rounded-xl text-black shadow-lg shadow-amber-500/20">
                    <i data-lucide="car" className="w-5 h-5"></i>
                </div>
                <span className="text-lg font-bold tracking-wider text-white">QUICK DRIVE</span>
            </div>

            <div className="flex items-center space-x-4">
                <button onClick={() => panelSwitching()} className="flex items-center space-x-2 bg-[#1a1d26] hover:bg-[#222632] border border-gray-800 hover:border-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition duration-200 text-gray-200">
                    <i data-lucide="folder-heart" className="w-4 h-4 text-amber-500"></i>
                    <span>My Bookings</span>
                    <span className="bg-amber-500/10 text-amber-400 text-xs px-2 py-0.5 rounded-full border border-amber-500/20">{bookings.length}</span>
                </button>
           
          <button 
            onClick={() => logout()} 
            className= "flex items-center justify-center space-x-2 w-full sm:w-auto bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40 px-5 py-2 rounded-xl text-sm font-semibold transition duration-200 text-rose-400 cursor-pointer"
           >
            <i data-lucide="log-out" className="w-4 h-4 text-rose-400 flex-shrink-0"></i>
            <span className="leading-none">Logout</span>
            <p>⏻</p>
           </button>
                
               
                <button className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-black font-bold text-xs" onClick={() => navigate("/profileupdate")}>
                   {userDetails?.user_name ? userDetails.user_name.slice(0, 2).toUpperCase() : "UN"}
                    </button>
            </div>
        </div>
    </nav>
    
  )
}
