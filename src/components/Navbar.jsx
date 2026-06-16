import React from 'react'

export default function Navbar( {panelSwitching}) {
  return (
   
       <nav className="border-b border-gray-800/60 bg-[#12141c]/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <div className="bg-amber-500 p-2 rounded-xl text-black shadow-lg shadow-amber-500/20">
                    <i data-lucide="car" className="w-5 h-5"></i>
                </div>
                <span className="text-lg font-bold tracking-wider text-white">VÉLOCE</span>
            </div>

            <div className="flex items-center space-x-4">
                <button onClick={() => panelSwitching()} className="flex items-center space-x-2 bg-[#1a1d26] hover:bg-[#222632] border border-gray-800 hover:border-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition duration-200 text-gray-200">
                    <i data-lucide="folder-heart" className="w-4 h-4 text-amber-500"></i>
                    <span>My Bookings</span>
                    <span className="bg-amber-500/10 text-amber-400 text-xs px-2 py-0.5 rounded-full border border-amber-500/20">3</span>
                </button>
                
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-black font-bold text-xs">
                    JD
                </div>
            </div>
        </div>
    </nav>
    
  )
}
