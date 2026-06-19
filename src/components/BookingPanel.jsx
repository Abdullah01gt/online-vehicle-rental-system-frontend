import React from 'react'
import BookingCard from '../elements/BookingCard'

export default function BookingPanel( {panelSwitching , userBookings=[]}) {

   
  return (
   <div>
  <div id="bookingsPanel" className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    
    {/* 1. Backdrop layer: Fixed and stays in place */}
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => panelSwitching()}></div>
    
    <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
      {/* 2. Sidebar body: Forces exact viewport height (h-full) */}
      <div className="w-screen max-w-md bg-[#12141c] border-l border-gray-800 p-6 flex flex-col h-full">
          
          {/* Header Section */}
          <div className="flex items-center justify-between pb-5 border-b border-gray-800 flex-shrink-0">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <i data-lucide="history" className="text-amber-500 w-5 h-5"></i>Booking Dashboard
              </h2>
              {/* Note: Changed onclick to React-supported onClick syntax */}
              <button onClick={() => panelSwitching()} className="text-gray-400 hover:text-white">
                <i data-lucide="x" className="w-6 h-6"></i>
              </button>
          </div>
          
          {/* 3. Scrolling Layer Core: Only this block scrolls if elements multiply */}
          <div className="flex-1 overflow-y-auto py-4 my-2 pr-1 custom-scrollbar">
              {userBookings.map((element) => (
                <BookingCard key={element._id} booking={element} />
              ))}
          </div>
          
          {/* Footer Section: Locked cleanly to the bottom layout boundary */}
          <div className="border-t border-gray-800 pt-4 text-center flex-shrink-0">
              <p className="text-xs text-gray-500">Showing last 30 days of vehicle rental history</p>
          </div>

      </div>
    </div>
  </div>
</div>
  )
}
