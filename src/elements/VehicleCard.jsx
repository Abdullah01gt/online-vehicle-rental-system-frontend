import React, { useState } from 'react'

export default function VehicleCard( {cars={}, currentUser={}}) {
    const [toggle, setToggle] = useState(false)
    const [fromDate, setFromDate] = useState("")
    const [returnDate, setReturnDate] = useState("")
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)
    const [emptyDate, setEmptyDate] = useState(false)
    const [dateError, setDateError] = useState(false)
    function manageToggle(){
        setToggle(prev => !prev)
    }

    function changeFromDate(e){
        setFromDate(e.target.value)
    }
    function changeReturnDate(e){
        setReturnDate(e.target.value)
    }

    function dateValidation(){
        if(new Date(fromDate) >= new Date(returnDate)){
            setDateError(true)
            return false
        }
        return true
    }
    
    async function submitBooking(e){
        e.preventDefault()
        setEmptyDate(false)
        setDateError(false)
        
      try { if(fromDate && returnDate && dateValidation())
           {
            const newBooking = {
            user_id: currentUser._id,
            vehicle_id: cars._id,
            vehicle_name: cars.brand_name,
            vehicle_model:cars.model_name,
            vehicle_year: cars.model_year,
            vehicle_type:cars.vehicle_type,
            vehicle_number: cars.registration_number,
            booking_start: fromDate,
            booking_end: returnDate,

        }
        console.log(newBooking)
        const response = await fetch("http://localhost:3000/bookings/v1/create",
            {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newBooking)
            }
        )

        if(response.ok){
           setSuccess(true)
           setFailure(false)
        }else{
            setFailure(true)
            setSuccess(false)
        }} else{
          setEmptyDate(true)
        }
    }catch(error){
            console.error(error)
        }

    }
  return (
     <div className="bg-[#12141c] border border-gray-800/60 rounded-2xl overflow-hidden shadow-xl hover:border-gray-700/60 transition-all duration-300 flex flex-col justify-between">
                <div>
                    <div className="relative h-48 sm:h-52 overflow-hidden bg-[#1a1d26]">
                        <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600" 
                             alt="Audi R8" className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-4 right-4 bg-[#12141c]/80 backdrop-blur-md border border-emerald-500/30 px-2.5 py-1 rounded-lg flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Available</span>
                        </div>
                    </div>

                    <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <span className="text-[11px] uppercase tracking-widest font-bold text-amber-500">{cars.brand_name}</span>
                                <h3 className="text-xl font-bold text-white tracking-tight">{cars.model_name}</h3>
                                <h4 className="text-l font-bold text-white tracking-tight">{cars.vehicle_type}</h4>
                                <h4 className="text-l font-light text-gray-300 tracking-tight">📍{cars.available_region}</h4>
                                
                            </div>
                            <span className="text-xs bg-gray-800/50 text-gray-400 px-2 py-1 rounded-md font-medium">{cars.model_year}</span>
                        </div>
                        
                        <div className="flex items-baseline space-x-1 mt-4 pt-3 border-t border-gray-800/40">
                            <span className="text-2xl font-bold text-white">₹{cars.per_day_rent}</span>
                            <span className="text-xs text-gray-500">/ day</span>
                        </div>
                    </div>
                </div>

                <div className="px-5 pb-5 pt-0">
                    <button onClick={manageToggle} className="w-full bg-[#1a1d26] hover:bg-[#222632] border border-gray-800 text-white font-medium py-3 px-4 rounded-xl transition duration-200 flex items-center justify-center space-x-2 group">
                       { toggle ? <span>Cancel</span> :<span>Book Now</span>}
                        <i data-lucide="chevron-down" className="w-4 h-4 text-gray-400 group-hover:text-white transition-transform duration-200"></i>
                    </button>

                   { toggle && <div className="mt-4 pt-4 border-t border-gray-800/80 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">From Date</label>
                                <input type="date" className="w-full px-3 py-2 bg-[#1a1d26] border border-gray-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500" 
                                 value={fromDate} onChange={changeFromDate}/>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Return Date</label>
                                <input type="date" className="w-full px-3 py-2 bg-[#1a1d26] border border-gray-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                                  value={returnDate} onChange={changeReturnDate}/>
                            </div>
                        </div>
                         { dateValidation && <div>
                            <p className="text-red-400 text-sm"> From Date should be before Return date</p>
                        </div>}
                       { emptyDate && <div>
                            <p className="text-red-400 text-sm"> From or Return Date's can't be empty </p>
                        </div>}
                       {success && <div>
                            <p className="text-green-400 text-sm">Congratulations, your booking was Successful !</p>
                        </div>}
                         { failure && <div>
                            <p className="text-red-400 text-sm"> These Dates are already booked, Please select a Diffrent Range! </p>
                        </div>}

                        <button onClick={submitBooking} className="w-full bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold py-2.5 rounded-lg transition">
                            Confirm Rental Reservation
                        </button>
                    </div>}
                </div>
            </div>
  )
}
