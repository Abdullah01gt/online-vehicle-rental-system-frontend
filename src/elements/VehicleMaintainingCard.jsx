import React from 'react'

export default function vehicleMaintainingCard() {
  return (
    <div>
        <div className="bg-[#12141c] border border-gray-800/60 rounded-2xl
         overflow-hidden shadow-xl hover:border-gray-700/60 transition-all duration-300 flex flex-col justify-between">
                <div>
               
                    <div className="relative h-48 overflow-hidden bg-[#1a1d26]">
                        <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600" 
                             alt="Audi R8" className="w-full h-full object-cover" />
                    
                        <div className="absolute top-4 left-4 bg-[#12141c]/90 border border-gray-800 px-2 py-1 rounded-md
                         text-[10px]  font-mono tracking-widest text-gray-400">
                            ID: R8-2023-V10
                        </div>
                    </div>

                  
                    <div className="p-5 space-y-4">
                        <div>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-amber-500">Asset Brand: Audi</span>
                            <h3 className="text-xl font-bold text-white tracking-tight">R8 V10 Performance</h3>
                            <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500">
                                <span>Year: 2023</span>
                                <span>•</span>
                                <span>Base Rate: $645/day</span>
                            </div>
                        </div>

                      
                        <div className="bg-[#1a1d26] border border-gray-800/60 rounded-xl p-3 flex justify-between items-center">
                            <span className="text-xs text-gray-400 font-medium">Platform Status</span>
                         
                            <span id="statusText-1" className="text-xs font-bold text-emerald-400 uppercase tracking-wider
                             bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/20">Active Listing</span>
                        </div>
                    </div>
                </div>

               
                <div className="px-5 pb-5 pt-0">
                    <div className="bg-[#1a1d26] border border-gray-800 rounded-xl p-3.5 flex items-center justify-between">
                        <div className="space-y-0.5">
                            <span className="text-xs font-bold text-white block">Public Visibility</span>
                            <span className="text-[10px] text-gray-500 block">Controls client booking visibility</span>
                        </div>
                        
                     
                        <label className="relative inline-flex items-center cursor-pointer select-none">
                            <input type="checkbox" checked onChange={console.log("clicked")} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full
                             peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                              after:bg-gray-400 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                              peer-checked:bg-amber-500 peer-checked:after:bg-black peer-checked:after:border-black"></div>
                        </label>
                    </div>
                </div>
            </div>
    </div>
  )
}

// {"toggleListingState(this, 'statusText-1')"}
