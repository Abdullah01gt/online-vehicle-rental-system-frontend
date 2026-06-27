import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from './../context/AuthContext.jsx'
const serverBaseUrl = import.meta.env.VITE_SERVER_URL

export default function Signup() {
    const { login } = useAuth()
    const navigate = useNavigate()
    
    const [userName, setUserName] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [password, setPassword] = useState("")
    const [contactNumber, setContacNumber] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [gender, setGender] = useState("")
    const [drivingLicenseId, setDrivingLicenseId] = useState("")
    const [address, setAddress] = useState("")
    
    
    const [errors, setErrors] = useState({})
    const [valuesUpdation, setValuesUpdation] = useState(false)

    
    const validateUsername = (username) => /^[A-Za-z ]{3,30}$/.test(username.trim());
    const validatePhoneNumber = (phone) => /^[6-9]\d{9}$/.test(phone.trim());
    
    const validateDL = (dl) => /^[A-Z]{2}\d{2}\s?\d{10}$/i.test(dl.trim());
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    function runFormValidation() {
        let currentErrors = {};
        
        if (!userName.trim()) currentErrors.userName = "Name is missing or invalid";
        else if (!validateUsername(userName)) currentErrors.userName = "Name should be 3-30 letters";

        if (!emailAddress.trim()) currentErrors.emailAddress = "Email Address is missing";
        else if (!validateEmail(emailAddress)) currentErrors.emailAddress = "Provide a valid email format";

        if (!password.trim()) currentErrors.password = "Password is missing";
        else if (password.length < 6) currentErrors.password = "Password must be at least 6 characters";

        if (!contactNumber.trim()) currentErrors.contactNumber = "Contact number is missing";
        else if (!validatePhoneNumber(contactNumber)) currentErrors.contactNumber = "Mobile number must be exactly 10 digits";

        if (!dateOfBirth) currentErrors.dateOfBirth = "Date of birth is missing";
        if (!gender) currentErrors.gender = "Gender selection is required";

        if (!drivingLicenseId.trim()) currentErrors.drivingLicenseId = "Driving License ID is missing";
        else if (!validateDL(drivingLicenseId)) currentErrors.drivingLicenseId = "Format must match: TN65 1234567890 (2 letters, 2 digits, 10 digits)";

        if (!address.trim()) currentErrors.address = "Residential address is missing";

        setErrors(currentErrors);
        return Object.keys(currentErrors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setValuesUpdation(false);
        
        if (!runFormValidation()) return;

        try {
            const newUser = {
                user_name: userName.trim(),
                email_address: emailAddress.trim(),
                password: password.trim(),
                gender,
                driving_license_id: drivingLicenseId.trim().toUpperCase(),
                date_of_birth: dateOfBirth,
                address: address.trim(),
                contact_number: contactNumber.trim(),
                user_role: "owner"
            };

            const response = await fetch(`${serverBaseUrl}/users/v1/create`, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(newUser)
            });

            const result = await response.json();

            if (response.ok) {
                login(result.data, result.token);
                navigate("/owner");
            } else {
                setValuesUpdation(true);
            }
        } catch (error) {
            console.error(error);
            alert("Signup connection error failed");
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
                        <h1 className="text-3xl font-bold text-white leading-tight">Your key to unparalleled journeys.</h1>
                        <p className="text-gray-400 text-sm leading-relaxed">Create an account to unlock verified access to premium engineering fleet rentals.</p>
                    </div>
                </div>

             
                <div className="w-full md:w-7/12 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 bg-[#12141c]">
                    <div className="mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Create Account</h2>
                        <p className="text-gray-400 text-sm mt-1">Fill out the credentials below to start reserving your fleet.</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                          
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Full Name</label>
                                <input type="text" className="w-full px-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 transition duration-200" 
                                       placeholder="John Doe" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                                {errors.userName && <p className="text-red-400 text-xs mt-0.5">{errors.userName}</p>}
                            </div>

                      
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
                                <input type="email" className="w-full px-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 transition duration-200" 
                                       placeholder="john@example.com" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}/>
                                {errors.emailAddress && <p className="text-red-400 text-xs mt-0.5">{errors.emailAddress}</p>}
                            </div>

                         
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                                <input type="password" className="w-full px-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 transition duration-200" 
                                       placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                                {errors.password && <p className="text-red-400 text-xs mt-0.5">{errors.password}</p>}
                            </div>

                          
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact Number</label>
                                <input type="tel" className="w-full px-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 transition duration-200" 
                                       placeholder="9876543210" value={contactNumber} onChange={(e) => setContacNumber(e.target.value)}/>
                                {errors.contactNumber && <p className="text-red-400 text-xs mt-0.5">{errors.contactNumber}</p>}
                            </div>

                    
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Date of Birth</label>
                                <input type="date" className="w-full px-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 transition duration-200" 
                                       value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
                                {errors.dateOfBirth && <p className="text-red-400 text-xs mt-0.5">{errors.dateOfBirth}</p>}
                            </div>

                          
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Gender</label>
                                <select className="w-full px-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 transition duration-200"
                                        value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="" disabled hidden>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.gender && <p className="text-red-400 text-xs mt-0.5">{errors.gender}</p>}
                            </div>
                        </div>

                       
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Driving License ID</label>
                            <input type="text" className="w-full px-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 transition duration-200" 
                                   placeholder="e.g. TN65 1234567890" value={drivingLicenseId} onChange={(e) => setDrivingLicenseId(e.target.value)} />
                            {errors.drivingLicenseId && <p className="text-red-400 text-xs mt-0.5">{errors.drivingLicenseId}</p>}
                        </div>

                     
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Residential Address</label>
                            <textarea rows="2" className="w-full px-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 transition duration-200 resize-none" 
                                      placeholder="Street address, City, State" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                            {errors.address && <p className="text-red-400 text-xs mt-0.5">{errors.address}</p>}
                        </div>

                      
                        {valuesUpdation && (
                            <p className="text-red-400 text-xs font-medium">An account with this email, phone, or license already exists!</p>
                        )}

                        <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-3 px-4 rounded-xl transition duration-200 mt-2">
                            Create Free Account
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-400 mt-6">
                        Already have an account? <Link className="text-amber-500 font-medium hover:text-amber-400 transition" to="/login">Sign in here</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}