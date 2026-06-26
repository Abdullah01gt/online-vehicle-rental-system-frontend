import React,{ useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router';
const serverBaseUrl = import.meta.env.VITE_SERVER_URL




export default function AdminLogin() {

  const [emailAddress, setEmailAddress] = useState("")   
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { login, setUserDetails, userDetails } = useAuth()
  const [wrongCredentials, setWrongCredentials] = useState(false)
 

  function emailAddressChange(e){
   setEmailAddress(e.target.value)
  }

  function passwordChange(e){
    setPassword(e.target.value)
  }

  async function checkValidation(values){
   try
   {  const response = await fetch(`${serverBaseUrl}/users/v1/user`,
        { method: "POST" ,
          headers: {
            'Content-Type' : 'application/json '

          }  ,
          body: JSON.stringify(values)
        }
     );
     const return_data = await response.json();
    
     if(return_data.data.length > 0){
      
       return return_data
     } 
     else{
        return false
     }
    } catch(error){
         console.log('Error:', error)
     }
  }
  
   async function handleSubmit(e){
    e.preventDefault()
    setWrongCredentials(false)
    console.log("Entered the validation")
      const credentials ={
        email_address: emailAddress,
        password: password
      }

      const validation = await checkValidation(credentials)
      if(validation && validation.data && validation.data.length > 0 && validation.data[0].user_role === "admin"){
        
        login(validation.data[0], validation.token);
        
        navigate('/admin')
      }else{
        navigate("/adminlogin");
        setWrongCredentials(true)
      }


  }



  return (
    <div className="bg-[#0b0c10] text-gray-100 min-h-screen flex items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-6xl h-screen sm:h-[850px] bg-[#12141c] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-800/50">
        
        <div className="hidden md:flex md:w-1/2 relative bg-cover bg-center items-end p-12" 
            style={{backgroundImage: "linear-gradient(to top, rgba(11, 12, 16, 0.95), rgba(11, 12, 16, 0.3)), url('https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200')"}}>
            
            <div className="absolute top-12 left-12 flex items-center space-x-2">
                <div className="bg-amber-500 p-2.5 rounded-xl text-black shadow-lg shadow-amber-500/20">
                    <i data-lucide="car" className="w-6 h-6"></i>
                </div>
                <span className="text-xl font-bold tracking-wider text-white">QUICK DRIVE</span>
            </div>

            <div className="space-y-4 max-w-md z-10">
                <div className="flex text-amber-400 space-x-1">
                    <i data-lucide="star" className="w-4 h-4 fill-amber-400"></i>
                    <i data-lucide="star" className="w-4 h-4 fill-amber-400"></i>
                    <i data-lucide="star" className="w-4 h-4 fill-amber-400"></i>
                    <i data-lucide="star" className="w-4 h-4 fill-amber-400"></i>
                    <i data-lucide="star" className="w-4 h-4 fill-amber-400"></i>
                </div>
                <h1 className="text-3xl font-bold text-white leading-tight">Experience the pinnacle of luxury motion.</h1>
                <p className="text-gray-400 text-sm leading-relaxed">Access the world's most exclusive fleet. Your journey to unparalleled performance and comfort begins with a single click.</p>
                <div className="pt-4 border-t border-gray-800/60 flex items-center justify-between text-xs text-gray-500">
                    <span>Premium Fleet • 24/7 Concierge</span>
                    <span>© 2026 QUICK DRIVE Inc.</span>
                </div>
            </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-12 sm:px-16 lg:px-20 bg-[#12141c]">
            
            <div className="flex items-center space-x-2 md:hidden mb-8 self-center">
                <div className="bg-amber-500 p-2 rounded-lg text-black">
                    <i data-lucide="car" className="w-5 h-5"></i>
                </div>
                <span className="text-lg font-bold tracking-wider text-white">QUICK DRIVE</span>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Admin Login</h2>
                <p className="text-gray-400 text-sm mt-2">If you're an admin, Please enter your credentials here.</p>
            </div>

      

            <form className="space-y-5" >
                <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                            <i data-lucide="mail" className="w-5 h-5"></i>
                        </div>
                        <input type="email" id="email" required
                               className="w-full pl-11 pr-4 py-3.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition duration-200" 
                               placeholder="name@example.com" value={emailAddress} onChange={emailAddressChange}/>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label htmlFor="password" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                       
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                            <i data-lucide="lock" className="w-5 h-5"></i>
                        </div>
                        <input type="password" id="password" required
                               className="w-full pl-11 pr-12 py-3.5 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition duration-200" 
                               placeholder="••••••••" value={password} onChange={passwordChange}/>
                        <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300">
                            <i data-lucide="eye" className="w-5 h-5"></i>
                        </button>
                    </div>
                </div>
                { wrongCredentials && <div>
                    <p className="text-red-400 text-sm"> The Username or Password That you Have Entered is incorrect, Please Try again! </p>
                </div>}

               

                <button type="submit" 
                        className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition duration-200 flex items-center justify-center space-x-2 group" onClick={handleSubmit}>
                    <span>Sign In to Dashboard</span>
                    <i data-lucide="arrow-right" className="w-4 h-4 transform group-hover:translate-x-1 transition duration-200"></i>
                </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-8">
                Not an admin? To login as an user
               
                <Link to="/login"  className="text-amber-500 font-medium hover:text-amber-400 transition inline-flex items-center group">
                click here
                </Link>
            </p>
        </div>
    </div>

    <script>
        lucide.createIcons();
    </script>
    </div>
  )
}
