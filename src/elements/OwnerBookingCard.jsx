import React, { useState } from 'react'; 
import { Check, X, ShieldAlert, User } from 'lucide-react';
const serverBaseUrl = import.meta.env.VITE_SERVER_URL

export default function OwnerBookingCard({ booking = {} }) {
 
  const [isCancelledSuccessfully, setIsCancelledSuccessfully] = useState(false);

  
  if (!booking.booking_start || !booking.booking_end) {
    return <div className="text-gray-500 text-xs">Loading booking data...</div>;
  }

  
  const [startYear, startMonth, startDay] = booking.booking_start.split('T')[0].split("-");
  const [endYear, endMonth, endDay] = booking.booking_end.split('T')[0].split("-");

  const displayStartDate = `${startDay}-${startMonth}-${startYear}`;
  const displayEndDate = `${endDay}-${endMonth}-${endYear}`;

  const today = new Date();
  const startDate = new Date(booking.booking_start);
  const endDate = new Date(booking.booking_end);

  
  const getBookingStatus = () => {
    if (booking.booking_status === "cancelled") return "Cancelled";
    if (booking.booking_status === "booked" && today > endDate) return "Completed";
    if (booking.booking_status === "booked" && today < endDate) return "Upcoming";
    return "Unknown";
  };

  const completedStatus = getBookingStatus();
  function handleInvoice() {
    window.open(`${serverBaseUrl}/bookings/v1/invoice/${booking._id}`, "_blank");
  }

  const showCancelButton = 
    completedStatus === "Upcoming" && 
    today < startDate && 
    !isCancelledSuccessfully;

  async function handleSubmit() {
    try { 
      const response = await fetch(`${serverBaseUrl}/bookings/v1/update/${booking._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ booking_status: "cancelled" })
      });

      if (response.ok) {
        
        setIsCancelledSuccessfully(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-[#1a1d26] border border-gray-800 rounded-xl p-4 space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-white text-sm">
            {booking.vehicle_name} {booking.vehicle_model} ({booking.vehicle_year})
          </h4>
          <p className="text-xs text-gray-500">Registration Number: {booking.vehicle_number}</p>
        </div>

        

       
        {(completedStatus === "Cancelled" || isCancelledSuccessfully) ? (
          <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md">
            Cancelled
          </span>
        ) : completedStatus === "Completed" ? (
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md">
            {completedStatus}
          </span>
        ) : completedStatus === "Upcoming" ? (
          <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md">
            {completedStatus}
          </span>
        ) : null}
      </div>

      <p className="text-xs text-gray-400 flex items-center gap-1">Booked On: {displayStartDate}</p>
      <p className="text-xs text-gray-400 flex items-center gap-1">Returned On: {displayEndDate}</p>
      <p className="text-xs text-gray-400 flex items-center gap-1">Booked for {booking.total_days} days</p>
       <p className="text-xs text-gray-400 flex items-center gap-1">Booked By User: {booking.user_name} </p>
        <p className="text-xs text-gray-400 flex items-center gap-1">Phone Number: {booking.user_contact_number} </p>
      <p className="text-xs text-amber-500 font-medium">Total Cost: ₹{booking.total_rent_cost}</p>
      
     
       <div className="flex gap-2 mt-2">
        <button onClick={handleInvoice} className="flex-1 py-2 rounded-xl border border-green-900/40 bg-green-950/10 hover:bg-green-950/30 text-green-400 text-xs font-bold uppercase tracking-wider transition duration-200">
          Get Invoice
        </button>
        </div>
      {showCancelButton && (
        <button 
          type="button"
          onClick={handleSubmit}
          className="flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border border-rose-900/40 bg-rose-950/10 hover:bg-rose-950/30 text-rose-400 text-xs font-bold uppercase tracking-wider transition duration-200 mt-2"
        >
          <X className="w-4 h-4" />
          <span>Cancel Booking</span>
        </button>
      )}

      {isCancelledSuccessfully && (
        <p className="text-xs text-rose-400 font-medium pt-1">
          Cancellation request accepted, refunding will be initiated soon.
        </p>
      )} 
    </div>
  );
}