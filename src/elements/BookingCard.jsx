import React, { useState } from 'react'; 
import { Calendar, X, Star } from 'lucide-react';
const serverBaseUrl = import.meta.env.VITE_SERVER_URL

export default function BookingCard({ booking = {}, onBookingUpdate}) {
  const [isCancelledSuccessfully, setIsCancelledSuccessfully] = useState(false);
  
 
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  let resCancelled = false;

  if (!booking.booking_start || !booking.booking_end) {
    return <div className="text-gray-500 text-xs">Loading booking data...</div>;
  }

  const [showModifyForm, setShowModifyForm] = useState(false);
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

 
  const pricePerDay = booking.total_rent_cost / booking.total_days;
  const todayString = new Date().toISOString().split('T')[0];

  const handleStartChange = (e) => {
    const selectedStart = e.target.value;
    setNewStart(selectedStart);
    
   
    if (newEnd && newEnd <= selectedStart) {
      setNewEnd("");
    }
  };


  const calculateNewMetrics = () => {
    if (!newStart || !newEnd) return { days: 0, cost: 0 };
    const start = new Date(newStart);
    const end = new Date(newEnd);
    const diffTime = Math.abs(end - start);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
    return {
      days: days > 0 ? days : 0,
      cost: days > 0 ? days * pricePerDay : 0
    };
  };

  const getMinReturnDate = () => {
    if (!newStart) return todayString; 
    const nextDay = new Date(newStart);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split('T')[0];
  };

  const { days: newTotalDays, cost: newTotalCost } = calculateNewMetrics();

  async function handleModifyDates(e) {
    e.preventDefault();
    if (newTotalDays <= 0) return alert("Return date must be after start date.");
    
    setIsUpdating(true);
    try {
      const response = await fetch(`${serverBaseUrl}/bookings/v1/modify-dates/${booking._id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          new_start_date: newStart,
          new_end_date: newEnd,
          new_total_days: newTotalDays,
          new_total_cost: newTotalCost
        })
      });

      const result = await response.json();
      if (response.ok && result.success) {
        alert("Reservation rescheduled successfully! Please refresh to view changes.");
        setShowModifyForm(false);
        if (onBookingUpdate) {
        onBookingUpdate();
  }
        
      } else {
        alert(result.message || "Failed to modify dates");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  }

  const [startYear, startMonth, startDay] = booking.booking_start.split('T')[0].split("-");
  const [endYear, endMonth, endDay] = booking.booking_end.split('T')[0].split("-");
  const displayStartDate = `${startDay}-${startMonth}-${startYear}`;
  const displayEndDate = `${endDay}-${endMonth}-${endYear}`;

  const today = new Date();
  const startDate = new Date(booking.booking_start);
  const endDate = new Date(booking.booking_end);
  const isUpcoming = booking.booking_status === "booked" && today < startDate && !isCancelledSuccessfully;

  const getBookingStatus = () => {
    if (booking.booking_status === "cancelled") { 
      resCancelled = true
      return "Cancelled"};
    if (booking.booking_status === "booked" && today > endDate) return "Completed";
    if (booking.booking_status === "booked" && today < endDate) return "Upcoming";
    return "Unknown";
  };

  const completedStatus = getBookingStatus();

  const showCancelButton = completedStatus === "Upcoming" && today < startDate && !isCancelledSuccessfully;
  

  const showReviewButton = completedStatus === "Completed" && !reviewSubmitted;

  async function handleSubmit() {
    try { 
      const response = await fetch(`${serverBaseUrl}/bookings/v1/update/${booking._id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ booking_status: "cancelled" })
      });
      if (response.ok) setIsCancelledSuccessfully(true);
    } catch (error) { console.log(error); }
  }

  function handleInvoice() {
    window.open(`${serverBaseUrl}/bookings/v1/invoice/${booking._id}`, "_blank");
  }

  async function submitReview(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${serverBaseUrl}/reviews/v1/add`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          booking_id: booking._id,
          vehicle_id: booking.vehicle_id,
          user_id: booking.user_id,
          user_name: booking.user_name,
          rating,
          comment
        })
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setReviewSubmitted(true);
        setShowReviewModal(false);
        alert("Thank you for your feedback!");
      } else {
        alert(result.message || "Failed to submit review");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-[#1a1d26] border border-gray-800 rounded-xl p-4 space-y-2 relative">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-white text-sm">
            {booking.vehicle_name} {booking.vehicle_model} ({booking.vehicle_year})
          </h4>
          <p className="text-xs text-gray-500">Registration Number: {booking.vehicle_number}</p>
        </div>

        
        {(completedStatus === "Cancelled" || isCancelledSuccessfully) ? (
          <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md">Cancelled</span>
        ) : completedStatus === "Completed" ? (
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md">{completedStatus}</span>
        ) : completedStatus === "Upcoming" ? (
          <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md">{completedStatus}</span>
        ) : null}
      </div>

      <p className="text-xs text-gray-400">Booked On: {displayStartDate}</p>
      <p className="text-xs text-gray-400">Returned On: {displayEndDate}</p>
      <p className="text-xs text-gray-400">Booked for {booking.total_days} days</p>
      <p className="text-xs text-amber-500 font-medium">Total Cost: ₹{booking.total_rent_cost}</p>
       {resCancelled && <p className='text-xs text-red-400'> Cancelleation accepted, Refund will be intitated soon (May take 3-5 business days).</p>}

      <div className="flex gap-2 mt-2">
        <button onClick={handleInvoice} className="flex-1 py-2 rounded-xl border border-green-900/40 bg-green-950/10 hover:bg-green-950/30 text-green-400 text-xs font-bold uppercase tracking-wider transition duration-200">
          Get Invoice
        </button>

       
        {showReviewButton && (
          <button onClick={() => setShowReviewModal(true)} className="flex-1 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-wider transition duration-200 flex items-center justify-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-500" /> Review
          </button>
        )}
      </div>
     <div className="flex gap-2 mt-3">
        {isUpcoming && !showModifyForm && (
          <button 
            onClick={() => setShowModifyForm(true)} 
            className="flex-1 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-wider transition duration-200 flex items-center justify-center gap-1"
          >
            <Calendar className="w-3.5 h-3.5" /> Reschedule
          </button>
        )}
      </div>
     
  
     {showModifyForm && (
 
  <form 
    onSubmit={handleModifyDates} 
    className="bg-[#12141c] p-3 rounded-lg border border-gray-800 space-y-3 mt-2"
  >
    
    <div className="grid grid-cols-2 gap-2">
      
      
      <div>
        <label className="text-[10px] text-gray-500 block mb-1">Pick-up Date</label>
        <input 
          type="date" 
          required 
          value={newStart} 
          min={todayString}
          onChange={handleStartChange}
          onKeyDown={(e) => e.preventDefault()}
          onClick={(e) => e.target.showPicker && e.target.showPicker()}
          className="w-full bg-[#1a1d26] border border-gray-800 rounded px-2 py-1 text-xs text-white focus:outline-none cursor-pointer" 
        />
      </div>

    
      <div>
        <label className="text-[10px] text-gray-500 block mb-1">Return Date</label>
        <input 
          type="date" 
          required 
          disabled={!newStart}
          value={newEnd} 
          min={getMinReturnDate()}
          onChange={(e) => setNewEnd(e.target.value)}
          onKeyDown={(e) => e.preventDefault()}
          onClick={(e) => e.target.showPicker && e.target.showPicker()}
          className="w-full bg-[#1a1d26] border border-gray-800 rounded px-2 py-1 text-xs text-white focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer" 
        />
      </div>

    </div>
    
   
    {newTotalDays > 0 && (
      <div className="text-[11px] text-amber-400 bg-amber-500/5 border border-amber-500/10 p-2 rounded">
        New Duration: <strong>{newTotalDays} Days</strong> <br />
        Adjusted Total Cost: <strong>₹{newTotalCost}</strong>
      </div>
    )}

    <button 
      type="submit" 
      disabled={isUpdating} 
      className="w-full bg-amber-500 text-black text-xs font-bold py-2 rounded-lg hover:bg-amber-400 transition tracking-wider uppercase disabled:opacity-50"
    >
      {isUpdating ? "Checking Availability..." : "Confirm New Dates"}
    </button>
  </form>
)}
      {showCancelButton && (
        <button onClick={handleSubmit} className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border border-rose-900/40 bg-rose-950/10 hover:bg-rose-950/30 text-rose-400 text-xs font-bold uppercase tracking-wider transition duration-200 mt-2">
          <X className="w-4 h-4" /> <span>Cancel Booking</span>
        </button>
      )}

     
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12141c] border border-gray-800 rounded-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-white font-bold text-base">Review your ride</h3>
              <button onClick={() => setShowReviewModal(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={submitReview} className="space-y-4">
            
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Rating</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button type="button" key={num} onClick={() => setRating(num)} className="transition transform hover:scale-110">
                      <Star className={`w-7 h-7 ${num <= rating ? "text-amber-500 fill-amber-500" : "text-gray-700"}`} />
                    </button>
                  ))}
                </div>
              </div>

            
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Your Experience</label>
                <textarea required rows="4" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="How was the vehicle condition? How was the service experience?" className="w-full px-3 py-2 bg-[#1a1d26] border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500 resize-none"></textarea>
              </div>

              <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold py-3 rounded-xl transition uppercase tracking-wider">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}