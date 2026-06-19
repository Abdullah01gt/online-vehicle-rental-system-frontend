import React from 'react'

export default function BookingCard( {booking = {}}) {

    const [startYear, startMonth, startDay] = booking.booking_start.split('T')[0].split("-")
     const [endYear, endMonth, endDay] = booking.booking_end.split('T')[0].split("-")

     const displayStartDate = `${startDay}-${startMonth}-${startYear}`;
     const displayEndDate = `${ endDay}-${endMonth}-${endYear}`;
  return (
       <div className="mt-6 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]pr-2">
                        <div className="bg-[#1a1d26] border border-gray-800 rounded-xl p-4 space-y-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold text-white text-sm">{booking.vehicle_name} {booking.vehicle_model}  ({booking.vehicle_year})</h4>
                                    <p className="text-xs text-gray-500">Registration Number: {booking.vehicle_number}</p>
                                </div>
                                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md">Completed</span>
                            </div>
                            <p className="text-xs text-gray-400 flex items-center gap-1"><i data-lucide="calendar" className="w-3 h-3"></i> Booked On :{displayStartDate} </p>
                            <p className="text-xs text-gray-400 flex items-center gap-1"><i data-lucide="calendar" className="w-3 h-3"></i> Returned On : {displayEndDate} </p>
                            <p className="text-xs text-amber-500 font-medium"></p>
                        </div>
                    </div>
  )
}
