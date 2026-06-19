import React from 'react'

export default function AdminNavbar() {
  return (
    <div>
      <nav className="border-b border-gray-800/60 bg-[#12141c]/95 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            
          
            <div className="flex items-center space-x-2.5 self-start sm:self-auto">
                <div className="bg-amber-500 p-2 rounded-xl text-black shadow-lg shadow-amber-500/20">
                    <i data-lucide="shield-check" className="w-5 h-5"></i>
                </div>
                <div>
                    <span className="text-lg font-bold tracking-wider text-white">VÉLOCE</span>
                    <span className="text-[10px] text-amber-500 block font-bold tracking-widest uppercase -mt-1">HQ Command</span>
                </div>
            </div>

           
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-start sm:justify-end">
                
              
                <button onclick="alert('Redirecting to Approvals Queue...')" 
                        className="relative flex items-center space-x-2 bg-[#1a1d26] hover:bg-[#222632] border border-gray-800 hover:border-gray-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition duration-200 text-gray-200 group">
                    <i data-lucide="git-pull-request" className="w-4 h-4 text-amber-500 group-hover:scale-110 transition"></i>
                    <span>Approve Vehicles</span>
                    <span className="bg-amber-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">5 New</span>
                </button>

            
                <button onclick="alert('Redirecting to Financial Ledger...')" 
                        className="flex items-center space-x-2 bg-[#1a1d26] hover:bg-[#222632] border border-gray-800 hover:border-gray-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition duration-200 text-gray-200 group">
                    <i data-lucide="wallet" className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition"></i>
                    <span>Payment Records</span>
                </button>

              
                <button onclick="alert('Redirecting to Reservation Database...')" 
                        className="flex items-center space-x-2 bg-[#1a1d26] hover:bg-[#222632] border border-gray-800 hover:border-gray-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition duration-200 text-gray-200 group">
                    <i data-lucide="history" className="w-4 h-4 text-blue-400 group-hover:scale-110 transition"></i>
                    <span>Booking History</span>
                </button>
            </div>
        </div>
    </nav>

    </div>
  )
}
