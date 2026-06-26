import React, { useState } from 'react'
import { Star, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
const serverBaseUrl = import.meta.env.VITE_SERVER_URL
const razorpayTestKey = import.meta.env.VITE_RAZORPAY_TEST_KEY
const loadRazorpaySDK = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function VehicleCard({ cars = {}, currentUser = {},refreshBookings }) {
    const [toggle, setToggle] = useState(false)
    const [fromDate, setFromDate] = useState("")
    const [returnDate, setReturnDate] = useState("")
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)
    const [failureMessage, setFailureMessage] = useState("")
    const [emptyDate, setEmptyDate] = useState(false)
    const [dateError, setDateError] = useState(false)
    const [loading, setLoading] = useState(false)
    const avgRating = cars.averageRating || 0;
    const reviewCount = cars.reviewCount || 0;
    const reviews = cars.reviewsList || [];
    const [showAllReviews, setShowAllReviews] = useState(false);
    
    function manageToggle() {
        setToggle(prev => !prev)
    }

    function changeFromDate(e) {
        const selectedFrom = e.target.value
        setFromDate(selectedFrom)
        if (returnDate && selectedFrom > returnDate) {
            setReturnDate("");
        }
    }

    function changeReturnDate(e) {
        setReturnDate(e.target.value)
    }

    function dateValidation() {
        if (new Date(fromDate) >= new Date(returnDate)) {
            setDateError(true)
            return false
        }
        return true
    }

    const getTodayDateString = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const getMinToDateString = () => {
        if (!fromDate) return getTodayDateString();
        const date = new Date(fromDate);
        date.setDate(date.getDate() + 1);
        return date.toISOString().split("T")[0];
    };

  
    let totalDays = 0;
    if (fromDate && returnDate) {
        const start = new Date(fromDate);
        const end = new Date(returnDate);
        if (end > start) {
            const diffTime = Math.abs(end - start);
            totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        }
    }
    const totalRentCost = totalDays * cars.per_day_rent;

    async function submitBooking(e) {
        e.preventDefault()
        setEmptyDate(false)
        setDateError(false)
        setFailure(false)
        
        if (!fromDate || !returnDate) {
            return setEmptyDate(true)
        }

        if (!dateValidation()) return;

        setLoading(true);

        try {

            const isLoaded = await loadRazorpaySDK();
        if (!isLoaded) {
            alert("Razorpay SDK failed to load. Check your internet connection.");
            setLoading(false);
            return;
        }
            
            const newBookingData = {
                user_id: currentUser._id,
                vehicle_id: cars._id,
                vehicle_name: cars.brand_name,
                vehicle_model: cars.model_name,
                vehicle_year: cars.model_year,
                vehicle_type: cars.vehicle_type,
                vehicle_number: cars.registration_number,
                booking_start: fromDate,
                booking_end: returnDate,
                user_name: currentUser.user_name,
                user_contact_number: currentUser.contact_number,
                owner_name: cars.owner_name,
                owner_contact_number: cars.owner_contact_number,
                total_days: totalDays,
                total_rent_cost: totalRentCost,
                owner_id: cars.owner_id,
            };

          
            const orderResponse = await fetch(`${serverBaseUrl}/bookings/v1/create`, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    vehicle_id: cars._id,
                    booking_start: fromDate,
                    booking_end: returnDate,
                    total_rent_cost: totalRentCost
                })
            });

            const orderResult = await orderResponse.json();

            if (!orderResponse.ok || !orderResult.success) {
                setFailure(true);
                setFailureMessage(orderResult.error || "These dates are unavailable.");
                setLoading(false);
                return;
            }

       
            const options = {
                key: razorpayTestKey, 
                amount: orderResult.amount,
                currency: "INR",
                name: "RentRide Vehicles",
                description: `Reservation Fee for ${cars.brand_name} ${cars.model_name}`,
                order_id: orderResult.orderId, 
                handler: async function (paymentResponse) {
                    try {
                     
                        const verifyResponse = await fetch(`${serverBaseUrl}/bookings/v1/confirm`, {
                            method: "POST",
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: paymentResponse.razorpay_order_id,
                                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                                razorpay_signature: paymentResponse.razorpay_signature,
                                bookingData: newBookingData, 
                                userEmail: currentUser.email_address
                            })
                        });

                        const verifyResult = await verifyResponse.json();

                        if (verifyResponse.ok && verifyResult.success) {
                            setSuccess(true);
                            setToggle(false);
                            
                          
                            if (refreshBookings) {
                            refreshBookings();
                                                 }
                            
                        } else {
                            setFailure(true);
                            setFailureMessage("Payment verification handshake failed.");
                        }


                    } catch (err) {
                        console.error("Verification processing failed:", err);
                    }
                },
                prefill: {
                    name: currentUser.user_name || "Customer Name",
                    contact: currentUser.contact_number || "9999999999"
                },
                theme: { color: "#f59e0b" },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    }
                }
            };

            const paymentWindow = new window.Razorpay(options);
            paymentWindow.open();

        } catch (error) {
            console.error("Pipeline breakdown error:", error);
            setFailure(true);
            setFailureMessage("Network connectivity problem occurred.");
        } finally {
            setLoading(false);
        }
    }

     

    return (
        <div className="bg-[#12141c] border border-gray-800/60 rounded-2xl overflow-hidden shadow-xl hover:border-gray-700/60 transition-all duration-300 flex flex-col justify-between">
            <div>
                <div className="relative h-48 sm:h-52 overflow-hidden bg-[#1a1d26]">
                    <img src={cars.image_url} alt="Car Image" className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-[#12141c]/80 backdrop-blur-md border border-emerald-500/30 px-2.5 py-1 rounded-lg flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Available</span>
                    </div>
                </div>

                <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <span className="text-[11px] uppercase tracking-widest font-bold text-amber-500">{cars.brand_name}</span>
                            <h3 className="text-xl font-bold text-white tracking-tight"> {cars.model_name}</h3>
                            <h4 className="text-sm font-light text-gray-300 tracking-tight">Registration Number: {cars.registration_number}</h4>
                            <h4 className="text-sm font-light text-gray-300 tracking-tight">📍{cars.available_region}</h4>
                        </div>
                        <span className="text-xs bg-gray-800/50 text-gray-400 px-2 py-1 rounded-md font-medium">{cars.model_year}</span>
                    </div>
                    
                    <div className="flex items-baseline space-x-1 mt-4 pt-3 border-t border-gray-800/40">
                        <span className="text-2xl font-bold text-white">₹{cars.per_day_rent}</span>
                        <span className="text-xs text-gray-500">/ day</span>
                    </div>
                </div>
            </div>
           
          <div className="flex items-center  space-x-1 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-lg">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-xs font-bold text-amber-500">
              {reviewCount > 0 ? avgRating : "New"}
            </span>
          </div>
          
          <div className="border-t border-gray-800/60 pt-2">
        <button
          type="button"
          onClick={() => setShowAllReviews(!showAllReviews)}
          className="flex items-center justify-between w-full text-xs text-gray-400 hover:text-white transition duration-150 py-1"
        >
          <div className="flex items-center space-x-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{reviewCount === 0 ? "No reviews yet" : `Read Reviews (${reviewCount})`}</span>
          </div>
          {reviewCount > 0 && (showAllReviews ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
        </button>

        
        {showAllReviews && reviewCount > 0 && (
          <div className="mt-3 space-y-2 max-h-40 overflow-y-auto pr-1 scrollbar-thin">
            {reviews.map((rev) => (
              <div key={rev._id} className="bg-[#12141c] p-2.5 rounded-xl border border-gray-800/40 space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-semibold text-gray-300">{rev.user_name}</span>
                  <div className="flex items-center space-x-0.5">
                    <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                    <span className="text-amber-500 font-bold">{rev.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

            <div className="px-5 pb-5 pt-0">
                <button onClick={manageToggle} disabled={loading} className="w-full bg-[#1a1d26] hover:bg-[#222632] border border-gray-800 text-white font-medium py-3 px-4 rounded-xl transition duration-200 flex items-center justify-center space-x-2 group disabled:opacity-50">
                    {toggle ? <span>Cancel</span> : <span>Book Now</span>}
                </button>

                {toggle && (
                    <div className="mt-4 pt-4 border-t border-gray-800/80 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">From Date</label>
                                <input type="date" className="w-full px-3 py-2 bg-[#1a1d26] border border-gray-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500" 
                                    value={fromDate} onChange={changeFromDate} min={getTodayDateString()} onKeyDown={(e) => e.preventDefault()}/>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Return Date</label>
                                <input type="date" className="w-full px-3 py-2 bg-[#1a1d26] border border-gray-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                                    value={returnDate} onChange={changeReturnDate} min={getMinToDateString()} onKeyDown={(e) => e.preventDefault()}/>
                            </div>
                        </div>
                       
                        {emptyDate && <p className="text-red-400 text-xs font-semibold">From or Return Date cannot be empty</p>}
                        {dateError && <p className="text-red-400 text-xs font-semibold">Invalid date logic selected</p>}
                        {failure && <p className="text-red-400 text-xs font-semibold">{failureMessage}</p>}
                        
                        {totalDays > 0 && (
                            <div className="bg-[#1a1d26] border border-gray-800/80 p-3 rounded-xl space-y-1">
                                <p className="text-gray-400 text-xs">Total Duration: <span className="text-white font-bold">{totalDays} days</span></p>
                                <p className="text-gray-400 text-xs">Gross Rent Cost: <span className="text-amber-500 font-bold">₹{totalRentCost}</span></p>
                            </div>
                        )}

                        <button 
                            onClick={submitBooking} 
                            disabled={loading}
                            className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/40 text-black text-xs font-bold py-2.5 rounded-lg transition"
                        >
                            {loading ? "Processing Order..." : "Confirm Rental Reservation & Pay"}
                        </button>
                    </div>
                )}

                {success && (
                    <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <p className="text-emerald-400 text-xs font-semibold text-center">Congratulations, your booking was Successful!</p>
                    </div>
                )}
            </div>
        </div>
    )
}