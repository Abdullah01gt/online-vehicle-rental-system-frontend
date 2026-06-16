import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from './../context/AuthContext.jsx'
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
    const [inCorrectEnteredValues, setIncorrectEnteredValues] = useState(false)
    const [valuesUpdation, setValuesUpdation] = useState(false)

    function userNameChange(e){
       setUserName(e.target.value)
    }
    function emailAddressChange(e){
        setEmailAddress(e.target.value)
    }
    function passwordChange(e){
        setPassword(e.target.value)
    }
    function contactNumberChange(e){
        setContacNumber(e.target.value)
    }
    function dateOfBirthChange(e){
        setDateOfBirth(e.target.value)
    }
    function genderChange(e){
        setGender(e.target.value)
    }
    function drivingLicenseIdChange(e){
        setDrivingLicenseId(e.target.value)
    }
    function addressChange(e){
        setAddress(e.target.value)
    }

    function validateUsername(username) {
  // Example: 3-20 alphanumeric characters
  const regex = /^[A-Za-z]{3,20}$/;
  return regex.test(username);
}

function validatePhoneNumber(phone) {
  const regex = /^[6-9]\d{9}$/;   
  return regex.test(phone);
}   



async function checkValidation(){
 try
    {if(validateUsername(userName) 
    && validatePhoneNumber(contactNumber) 
    &&  address.trim() != "" 
    && password.trim() != "" 
    && drivingLicenseId.trim() != ""
    
){
    const newUser = {
        user_name: userName,
        email_address: emailAddress,
        password: password,
        gender: gender,
        driving_license_id: drivingLicenseId,
        date_of_birth: dateOfBirth,
        address: address,
        contact_number: contactNumber,

    }
    console.log(dateOfBirth)
    const response = await fetch("http://localhost:3000/users/v1/create",
        {
            method:"POST",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }
    )

    console.log(response)

    if(response.ok){
        console.log("User Created Successfully")
        return true
        
    }else{
         setValuesUpdation(true)
         return false

    }


}
else{
    setIncorrectEnteredValues(true)
    return false
}} catch(error){
    console.log(error)
    return false
}
}

async function handleSubmit(e){
    e.preventDefault()
    const valid = await checkValidation()
    if(valid){
        login()
        navigate("/")
        
    }else{
        alert("signup Failed")
    }
}



  return (
    <div className="bg-[#0b0c10] text-gray-100 min-h-screen flex items-center justify-center p-0 sm:p-4 lg:p-8">
      <div className="w-full max-w-6xl min-h-screen sm:min-h-[850px] bg-[#12141c] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-800/50">
        
        <div className="hidden md:flex md:w-5/12 relative bg-cover bg-center items-end p-12" 
             style={{backgroundImage: "linear-gradient(to top, rgba(11, 12, 16, 0.95), rgba(11, 12, 16, 0.3))", url:'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200'}}>
            
            <div className="absolute top-12 left-12 flex items-center space-x-2">
                <div className="bg-amber-500 p-2.5 rounded-xl text-black shadow-lg shadow-amber-500/20">
                    <i data-lucide="car" className="w-6 h-6"></i>
                </div>
                <span className="text-xl font-bold tracking-wider text-white">VÉLOCE</span>
            </div>

            <div className="space-y-4 max-w-sm z-10">
                <div className="flex text-amber-400 space-x-1">
                    <i data-lucide="star" className="w-4 h-4 fill-amber-400"></i>
                    <i data-lucide="star" className="w-4 h-4 fill-amber-400"></i>
                    <i data-lucide="star" className="w-4 h-4 fill-amber-400"></i>
                    <i data-lucide="star" className="w-4 h-4 fill-amber-400"></i>
                    <i data-lucide="star" className="w-4 h-4 fill-amber-400"></i>
                </div>
                <h1 className="text-3xl font-bold text-white leading-tight">Your key to unparalleled journeys.</h1>
                <p className="text-gray-400 text-sm leading-relaxed">Create an account in minutes to unlock verified access to elite engineering, exceptional track dynamics, and bespoke concierge services.</p>
                <div className="pt-4 border-t border-gray-800/60 flex items-center justify-between text-xs text-gray-500">
                    <span>Instant Verification</span>
                    <span>Safety Guaranteed</span>
                </div>
            </div>
        </div>

        <div className="w-full md:w-7/12 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 bg-[#12141c]">
            
            <div className="flex items-center space-x-2 md:hidden mb-6 self-center">
                <div className="bg-amber-500 p-2 rounded-lg text-black">
                    <i data-lucide="car" className="w-5 h-5"></i>
                </div>
                <span className="text-lg font-bold tracking-wider text-white">VÉLOCE</span>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Create Account</h2>
                <p className="text-gray-400 text-sm mt-1">Fill out the credentials below to start reserving your fleet.</p>
            </div>

            <form className="space-y-4" >
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                                <i data-lucide="user" className="w-4 h-4"></i>
                            </div>
                            <input type="text" id="name" required
                                   className="w-full pl-10 pr-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition duration-200" 
                                   placeholder="John Doe" value={userName} onChange={userNameChange}/>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                                <i data-lucide="mail" className="w-4 h-4"></i>
                            </div>
                            <input type="email" id="email" required
                                   className="w-full pl-10 pr-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition duration-200" 
                                   placeholder="john@example.com" value={emailAddress} onChange={emailAddressChange}/>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="password" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                                <i data-lucide="lock" className="w-4 h-4"></i>
                            </div>
                            <input type="password" id="password" required
                                   className="w-full pl-10 pr-10 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition duration-200" 
                                   placeholder="••••••••" value={password} onChange={passwordChange} />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="phone" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact Number</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                                <i data-lucide="phone" className="w-4 h-4"></i>
                            </div>
                            <input type="tel" id="phone" required
                                   className="w-full pl-10 pr-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition duration-200" 
                                   placeholder="+1 (555) 000-0000" value={contactNumber} onChange={contactNumberChange}/>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="dob" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Date of Birth</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                                <i data-lucide="calendar" className="w-4 h-4"></i>
                            </div>
                            <input type="date" id="dob" required
                                   className="w-full pl-10 pr-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition duration-200" 
                                   value={dateOfBirth} onChange={dateOfBirthChange}/>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="gender" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Gender</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                                <i data-lucide="user-check" className="w-4 h-4"></i>
                            </div>
                            <select id="gender" required
                                    className="w-full pl-10 pr-10 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition duration-200 appearance-none cursor-pointer"
                                    value={gender} onChange={genderChange}>
                                <option value="" disabled  hidden>Select Gender</option>
                                <option value="male" className="bg-[#12141c]">Male</option>
                                <option value="female" className="bg-[#12141c]">Female</option>
                                <option value="other" className="bg-[#12141c]">Other</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-500">
                                <i data-lucide="chevron-down" className="w-4 h-4"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="license" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Driving License ID</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                            <i data-lucide="file-text" className="w-4 h-4"></i>
                        </div>
                        <input type="text" id="license" required
                               className="w-full pl-10 pr-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition duration-200" 
                               placeholder="e.g. DL-1234567890" value={drivingLicenseId} onChange={drivingLicenseIdChange} />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="address" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Residential Address</label>
                    <div className="relative">
                        <div className="absolute top-3 left-3.5 pointer-events-none text-gray-500">
                            <i data-lucide="map-pin" className="w-4 h-4"></i>
                        </div>
                        <textarea id="address" required rows="2"
                                  className="w-full pl-10 pr-4 py-2.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition duration-200 resize-none" 
                                  placeholder="Street address, City, State, ZIP" value={address} onChange={addressChange}></textarea>
                    </div>
                </div>

                <div className="flex items-start pt-1">
                    <input type="checkbox" id="terms" required
                           className="w-4 h-4 mt-0.5 rounded bg-[#1a1d26] border-gray-800 text-amber-500 focus:ring-amber-500/20 focus:ring-offset-0 accent-amber-500" />
                    <label htmlFor="terms" className="ml-2 text-xs text-gray-400 select-none leading-normal">
                        I declare that all provided details are legally correct and I accept the 
                        <a href="#" className="text-amber-500 hover:underline">Rental Terms & Conditions</a>.
                    </label>
                </div>
                 { inCorrectEnteredValues && <div>
                    <p className="text-red-400 text-sm"> Please Provide The Correct Values for the Corresponding values in correct format! </p>
                </div>}
                 { valuesUpdation && <div>
                    <p className="text-red-400 text-sm"> The Account with same email, contact number or driving license id is already present! Please login </p>
                </div>}

                <button type="submit" 
                        className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-3 px-4 rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition duration-200 flex items-center justify-center space-x-2 group mt-2"
                        onClick={handleSubmit}>
                    <span>Create Free Account</span>
                    <i data-lucide="arrow-right" className="w-4 h-4 transform group-hover:translate-x-1 transition duration-200"></i>
                </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
                Already have an account? 
                {/* <a href="#" className="text-amber-500 font-medium hover:text-amber-400 transition inline-flex items-center">
                    Sign in here
                </a> */}

                < Link  className="text-amber-500 font-medium hover:text-amber-400 transition inline-flex items-center" to="/login">Sign in here</Link>
            </p>
        </div>
    </div>

    <script>
        lucide.createIcons();
    </script>
    </div>
  )
}
