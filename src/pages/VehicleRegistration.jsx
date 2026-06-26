
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from './../context/AuthContext.jsx'
const serverBaseUrl = import.meta.env.VITE_SERVER_URL

export default function VehicleRegistration() {
    const { userDetails } = useAuth()
    const navigate = useNavigate()
    
    const [brandName, setBrandName] = useState("")
    const [modelName, setModelName] = useState("")
    const [modelYear, setModelYear ] = useState("")
    const [registrationNumber, setRegistrationNumber] = useState("")
    const [availableRegion, setAvailableRegion] = useState("")
    const [perDayRent, setPerDayRent] = useState("")
    const [vehicleType, setVehicleType] = useState("")
    const [imageUrl, setImageUrl] = useState(null)
    
   
    const [errors, setErrors] = useState({})
    const [valuesUpdation, setValuesUpdation] = useState(false)
    const [loading, setLoading] = useState(false)

    
    const validateVehicleNumber = (num) => /^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/i.test(num.trim());
    const validateYear = (year) => /^(19|20)\d{2}$/.test(year.trim());

    function checkFormValidation() {
        let currentErrors = {};

        if (!brandName.trim()) currentErrors.brandName = "Brand name is missing";
        if (!modelName.trim()) currentErrors.modelName = "Model name is missing";
        
        if (!modelYear.trim()) currentErrors.modelYear = "Model year is missing";
        else if (!validateYear(modelYear)) currentErrors.modelYear = "Provide a valid 4-digit year (e.g. 2019)";

        if (!registrationNumber.trim()) currentErrors.registrationNumber = "Registration number is missing";
        else if (!validateVehicleNumber(registrationNumber)) {
            currentErrors.registrationNumber = "Format must match pattern: TN74AB2347 (2 letters, 2 numbers, 1-2 letters, 4 numbers)";
        }

        if (!availableRegion.trim()) currentErrors.availableRegion = "Available region location is missing";
        
        if (!perDayRent.trim()) currentErrors.perDayRent = "Rent amount per day is missing";
        else if (Number(perDayRent) <= 0) currentErrors.perDayRent = "Rent price must be a positive number";

        if (!vehicleType) currentErrors.vehicleType = "Vehicle tier selection is required";
        if (!imageUrl) currentErrors.imageUrl = "Vehicle preview image upload file is missing";

        setErrors(currentErrors);
        return Object.keys(currentErrors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setValuesUpdation(false)
        
        if (!checkFormValidation()) return;
        setLoading(true);

        try {
            const newVehicle = {
                brand_name: brandName.trim(),
                model_name: modelName.trim(),
                model_year: modelYear.trim(),
                vehicle_type: vehicleType,
                registration_number: registrationNumber.trim().toUpperCase(),
                available_region: availableRegion.trim(),
                per_day_rent: perDayRent.trim(),
                image_url: imageUrl, 
                owner_id: userDetails?._id,
                owner_name: userDetails?.user_name,
                owner_contact_number: userDetails?.contact_number,
                availablity_status: "pending",
            }

            const formData = new FormData()
            for (const [key, val] of Object.entries(newVehicle)) {
                formData.append(key, val)
            }

            const response = await fetch(`${serverBaseUrl}/vehicles/v1/create`, {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                alert("Registration successful! Pending administrative verification clearance.");
                navigate("/owner")
            } else {
                setValuesUpdation(true)
            }
        } catch (error) {
            console.error(error)
            alert("Connection error executing registry save pipeline.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-[#0b0c10] text-gray-100 min-h-screen flex items-center justify-center p-0 sm:p-4 lg:p-8">
            <div className="w-full max-w-6xl min-h-screen sm:min-h-[850px] bg-[#12141c] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-800/50">
                
                
                <div className="hidden md:flex md:w-5/12 relative bg-cover bg-center items-end p-12" 
                     style={{backgroundImage: "linear-gradient(to top, rgba(11, 12, 16, 0.95), rgba(11, 12, 16, 0.3)), url('https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200')"}}>
                    
                    <div className="absolute top-12 left-12 flex items-center space-x-2">
                        <div className="bg-amber-500 p-2.5 rounded-xl text-black shadow-lg shadow-amber-500/20">🚗</div>
                        <span className="text-xl font-bold tracking-wider text-white">QUICK DRIVE</span>
                    </div>

                    <div className="space-y-4 max-w-sm z-10">
                        <h1 className="text-3xl font-bold text-white leading-tight">Welcome to our Car Renting platform.</h1>
                        <p className="text-gray-400 text-sm leading-relaxed">List your car for rent and keep 95% of the fee for each successful rental payout transaction cycle.</p>
                    </div>
                </div>

               
                <div className="w-full md:w-7/12 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 bg-[#12141c]">
                    <div className="mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Register Your vehicle here!</h2>
                        <p className="text-gray-400 text-sm mt-1">Provide exact operational specifications for verification.</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Brand Name</label>
                                <input type="text" className="w-full px-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition duration-200" 
                                       placeholder="Toyota" value={brandName} onChange={(e)=>setBrandName(e.target.value)}/>
                                {errors.brandName && <p className="text-red-400 text-xs mt-0.5">{errors.brandName}</p>}
                            </div>

                           
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Model Name</label>
                                <input type="text" className="w-full px-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition duration-200" 
                                       placeholder="Innova Crysta" value={modelName} onChange={(e)=>setModelName(e.target.value)}/>
                                {errors.modelName && <p className="text-red-400 text-xs mt-0.5">{errors.modelName}</p>}
                            </div>

                           
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Model Year</label>
                                <input type="text" className="w-full px-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition duration-200" 
                                       placeholder="2019" value={modelYear} onChange={(e)=>setModelYear(e.target.value)} />
                                {errors.modelYear && <p className="text-red-400 text-xs mt-0.5">{errors.modelYear}</p>}
                            </div>

                           
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Registration Number</label>
                                <input type="text" className="w-full px-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition duration-200 uppercase" 
                                       placeholder="TN74AB2347" value={registrationNumber} onChange={(e)=>setRegistrationNumber(e.target.value)}/>
                                {errors.registrationNumber && <p className="text-red-400 text-xs mt-0.5">{errors.registrationNumber}</p>}
                            </div>

                          
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Available Region</label>
                                <input type="text" className="w-full px-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition duration-200" 
                                       placeholder="Chennai" value={availableRegion} onChange={(e)=>setAvailableRegion(e.target.value)}/>
                                {errors.availableRegion && <p className="text-red-400 text-xs mt-0.5">{errors.availableRegion}</p>}
                            </div>

                            
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Vehicle Type</label>
                                <select className="w-full px-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 transition duration-200 appearance-none cursor-pointer"
                                        value={vehicleType} onChange={(e)=>setVehicleType(e.target.value)}>
                                    <option value="" disabled hidden>Select Your Vehicle Type</option>
                                    <option value="sedan" className="bg-[#12141c]">Sedan</option>
                                    <option value="hatch_back" className="bg-[#12141c]">Hatch Back</option>
                                    <option value="suv" className="bg-[#12141c]">SUV</option>
                                    <option value="jeep" className="bg-[#12141c]">Jeep</option>
                                    <option value="traveller_van" className="bg-[#12141c]">Travel Van</option>
                                </select>
                                {errors.vehicleType && <p className="text-red-400 text-xs mt-0.5">{errors.vehicleType}</p>}
                            </div>
                        </div>

                       
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Rent Per Day (in ₹)</label>
                            <input type="number" className="w-full px-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition duration-200" 
                                   placeholder="1600" value={perDayRent} onChange={(e)=>setPerDayRent(e.target.value)} />
                            {errors.perDayRent && <p className="text-red-400 text-xs mt-0.5">{errors.perDayRent}</p>}
                        </div>

                       
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Vehicle Image Document</label>
                            <input type="file" accept="image/*" onChange={(e)=>setImageUrl(e.target.files[0])} className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-gray-800 file:text-amber-500 hover:file:bg-gray-700 file:cursor-pointer cursor-pointer" />
                            {errors.imageUrl && <p className="text-red-400 text-xs mt-0.5">{errors.imageUrl}</p>}
                        </div>

                        <div className="flex items-start pt-1">
                            <input type="checkbox" id="terms" required className="w-4 h-4 mt-0.5 rounded bg-[#1a1d26] border-gray-800 text-amber-500 focus:ring-offset-0 accent-amber-500" />
                            <label htmlFor="terms" className="ml-2 text-xs text-gray-400 select-none leading-normal">
                                I declare that all provided details are legally correct and I accept the Rental Terms & Conditions And Please make sure your vehicle has A/C and Basic Infotainment systems.
                            </label>
                        </div>

                        {valuesUpdation && (
                            <p className="text-red-400 text-xs font-medium">This license registration plate variant configuration is already live in our systems!</p>
                        )}

                        <button type="submit" disabled={loading} className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-semibold py-3 px-4 rounded-xl shadow-lg transition duration-200">
                            {loading ? "Registering Vehicle Ledger..." : "Register Fleet Asset"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}