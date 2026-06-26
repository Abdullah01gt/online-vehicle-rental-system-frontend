import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from './../context/AuthContext.jsx'
const serverBaseUrl = import.meta.env.VITE_SERVER_URL

export default function ProfileUpdate() {
    const { userDetails, login } = useAuth() 
    const navigate = useNavigate()

    const [userName, setUserName] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [contactNumber, setContacNumber] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [gender, setGender] = useState("")
    const [drivingLicenseId, setDrivingLicenseId] = useState("")
    const [address, setAddress] = useState("")
    
    const [errors, setErrors] = useState({})
    const [isUpdating, setIsUpdating] = useState(false)

  
    useEffect(() => {
        if (userDetails) {
            setUserName(userDetails.user_name || "")
            setEmailAddress(userDetails.email_address || "")
            setContacNumber(userDetails.contact_number || "")
            if (userDetails.date_of_birth) {
                setDateOfBirth(userDetails.date_of_birth.split('T')[0])
            }
            setGender(userDetails.gender || "")
            setDrivingLicenseId(userDetails.driving_license_id || "")
            setAddress(userDetails.address || "")
        }
    }, [userDetails])

    function runValidation() {
        let currentErrors = {};
        if (!userName.trim()) currentErrors.userName = "Name cannot be left blank";
        if (!emailAddress.trim()) currentErrors.emailAddress = "Email cannot be empty";
        const cleanPhone = String(contactNumber || "").trim();
        if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        currentErrors.contactNumber = "Provide a valid 10-digit mobile number";
         }
         const cleanDL = String(drivingLicenseId || "").trim();
         if (!/^[A-Z]{2}\d{2}\s?\d{10}$/i.test(cleanDL)) {
         currentErrors.drivingLicenseId = "Invalid Driving License structure pattern";
         }
        if (!/^[A-Z]{2}\d{2}\s?\d{10}$/i.test(drivingLicenseId.trim())) currentErrors.drivingLicenseId = "Invalid Driving License structure pattern";
        if (!address.trim()) currentErrors.address = "Address field is required";
        
        setErrors(currentErrors);
        return Object.keys(currentErrors).length === 0;
    }

    async function handleUpdateSubmit(e) {
        e.preventDefault()
        if (!runValidation()) return;

        setIsUpdating(true)
        try {
            const updatedPayload = {
                user_name: userName.trim(),
                email_address: emailAddress.trim(),
                gender,
                driving_license_id: drivingLicenseId.trim().toUpperCase(),
                date_of_birth: dateOfBirth,
                address: address.trim(),
                contact_number: contactNumber.trim()
            }

            const response = await fetch(`${serverBaseUrl}/users/v1/update/${userDetails._id}`, {
                method: "PATCH",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(updatedPayload)
            })

            const result = await response.json()
            if (response.ok && result.success) {
                alert("Profile changes applied successfully!")
                // Refresh authentication context record wrapper token if needed
                if(login) login(result.data, result.token || localStorage.getItem('token'))
                navigate("/")
            } else {
                alert(result.message || "Failed processing updates.")
            }
        } catch (error) {
            console.error(error)
            alert("Network error connecting to ledger framework.")
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <div className="bg-[#0b0c10] text-gray-100 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-[#12141c] rounded-3xl p-6 sm:p-10 border border-gray-800 shadow-xl">
                <div className="mb-6 border-b border-gray-800 pb-4">
                    <h2 className="text-2xl font-bold text-white">Account Profile Settings</h2>
                    <p className="text-gray-400 text-xs mt-1">Modify your verified operational registry preferences below.</p>
                </div>

                <form className="space-y-4" onSubmit={handleUpdateSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold text-gray-400 uppercase">Full Name</label>
                            <input type="text" className="w-full px-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 mt-1" value={userName} onChange={(e)=>setUserName(e.target.value)} />
                            {errors.userName && <p className="text-red-400 text-xs mt-1">{errors.userName}</p>}
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-400 uppercase">Email Address</label>
                            <input type="email" className="w-full px-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 mt-1" value={emailAddress} onChange={(e)=>setEmailAddress(e.target.value)} />
                            {errors.emailAddress && <p className="text-red-400 text-xs mt-1">{errors.emailAddress}</p>}
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-400 uppercase">Contact Phone</label>
                            <input type="tel" className="w-full px-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 mt-1" value={contactNumber} onChange={(e)=>setContacNumber(e.target.value)} />
                            {errors.contactNumber && <p className="text-red-400 text-xs mt-1">{errors.contactNumber}</p>}
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-400 uppercase">Gender Matrix</label>
                            <select className="w-full px-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 mt-1" value={gender} onChange={(e)=>setGender(e.target.value)}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase">Driving License ID</label>
                        <input type="text" className="w-full px-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 mt-1" value={drivingLicenseId} onChange={(e)=>setDrivingLicenseId(e.target.value)} />
                        {errors.drivingLicenseId && <p className="text-red-400 text-xs mt-1">{errors.drivingLicenseId}</p>}
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase">Residential Address</label>
                        <textarea rows="3" className="w-full px-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 mt-1 resize-none" value={address} onChange={(e)=>setAddress(e.target.value)}></textarea>
                        {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button type="button" onClick={() => navigate("/")} className="w-1/3 border border-gray-800 hover:bg-gray-800 text-gray-300 py-3 rounded-xl transition text-xs font-bold uppercase tracking-wider">
                            Cancel
                        </button>
                        <button type="submit" disabled={isUpdating} className="w-2/3 bg-amber-500 hover:bg-amber-400 text-black py-3 rounded-xl transition text-xs font-bold uppercase tracking-wider">
                            {isUpdating ? "Saving Changes..." : "Save Profile Details"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}