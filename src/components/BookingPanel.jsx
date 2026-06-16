import React from 'react'

export default function BookingPanel( {panelSwitching, userBookings = [], vehicleList = []}) {
  return (
    <div>
        <div id="bookingsPanel" className=" fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => panelSwitching()}></div>
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#12141c] border-l border-gray-800 p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between pb-5 border-b border-gray-800">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2"><i data-lucide="history" className="text-amber-500 w-5 h-5"></i>Booking Dashboard</h2>
                        <button onclick="toggleDashboard()" className="text-gray-400 hover:text-white"><i data-lucide="x" className="w-6 h-6"></i></button>
                    </div>
                    
                    <div className="mt-6 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]pr-2">
                        <div className="bg-[#1a1d26] border border-gray-800 rounded-xl p-4 space-y-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold text-white text-sm">Porsche 911 GT3 RS</h4>
                                    <p className="text-xs text-gray-500">ID: #VEL-8923</p>
                                </div>
                                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md">Completed</span>
                            </div>
                            <p className="text-xs text-gray-400 flex items-center gap-1"><i data-lucide="calendar" className="w-3 h-3"></i> June 01 - June 04, 2026</p>
                            <p className="text-xs text-amber-500 font-medium">$2,550.00 Total</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-4 text-center">
                    <p className="text-xs text-gray-500">Showing last 30 days of vehicle rental history</p>
                </div>
            </div>
        </div>
    </div>

    </div>
  )
}
