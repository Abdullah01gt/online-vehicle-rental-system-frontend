import React from 'react'

export default function SearchBar() {
  return (
     <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="bg-[#12141c] border border-gray-800/80 rounded-2xl p-4 sm:p-6 shadow-xl">
            <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end" onsubmit="event.preventDefault();">
                
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                        <i data-lucide="map-pin" className="w-3.5 h-3.5 text-amber-500"></i> Location
                    </label>
                    <div className="relative">
                        <input type="text" placeholder="e.g. Beverly Hills, CA" 
                               className="w-full pl-4 pr-4 py-3 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition" />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                        <i data-lucide="layers" className="w-3.5 h-3.5 text-amber-500"></i> Vehicle Type
                    </label>
                    <div className="relative">
                        <select className="w-full pl-4 pr-10 py-3 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 transition appearance-none cursor-pointer">
                            <option value="all">All Vehicle Types</option>
                            <option value="hypercar">Hypercar / Supercar</option>
                            <option value="suv">Luxury SUV</option>
                            <option value="sedan">Executive Sedan</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-500">
                            <i data-lucide="chevron-down" className="w-4 h-4"></i>
                        </div>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                        <i data-lucide="dollar-sign" className="w-3.5 h-3.5 text-amber-500"></i> Max Price (Per Day)
                    </label>
                    <div className="relative">
                        <select className="w-full pl-4 pr-10 py-3 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 transition appearance-none cursor-pointer">
                            <option value="any">Any Price Range</option>
                            <option value="300">Under $300 / day</option>
                            <option value="600">Under $600 / day</option>
                            <option value="1200">Under $1,200 / day</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-500">
                            <i data-lucide="chevron-down" className="w-4 h-4"></i>
                        </div>
                    </div>
                </div>

                <div>
                    <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-3 px-4 rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition duration-200 flex items-center justify-center space-x-2">
                        <i data-lucide="sliders-horizontal" className="w-4 h-4"></i>
                        <span>Apply Filters</span>
                    </button>
                </div>
            </form>
        </div>
    </section>
  )
}
