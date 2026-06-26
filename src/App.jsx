import { useState } from 'react'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import AdminHome from './pages/AdminHome.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import OwnerLogin from './pages/OwnerLogin.jsx'
import OwnerHome from './pages/OwnerHome.jsx'
import OwnerSignup from './pages/OwnerSignup.jsx'
import VehicleRegistration from './pages/VehicleRegistration.jsx'
import VehicleApproval from './pages/VehicleApproval.jsx'
import VehicleRentalHistory from './pages/VehicleRentalHistory.jsx'
import AdminVehicleRentalHistory from './pages/AdminVehicleRentalHistory.jsx'
import PaymentRecords from './pages/PaymentRecords.jsx'
import ProfileUpdate from './pages/ProfileUpdation.jsx'
import UsersInfo from './pages/UsersInfo.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
     <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup"  element={<Signup />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
           <Route path="/ownerlogin" element={<OwnerLogin />} />
              <Route path="/ownersignup" element={<OwnerSignup />} />
        </Routes>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
             <AdminHome />
            </ProtectedRoute>
          } />
           <Route path="/owner" element={
            <ProtectedRoute>
             <OwnerHome />
            </ProtectedRoute>
          } />
           <Route path="/vehicleregistration" element={
            <ProtectedRoute>
             <VehicleRegistration />
            </ProtectedRoute>
          } />
           <Route path="/vehicleapproval" element={
            <ProtectedRoute>
             <VehicleApproval />
            </ProtectedRoute>
          } />
           <Route path="/vehiclerentalhistory" element={
            <ProtectedRoute>
             <VehicleRentalHistory />
            </ProtectedRoute>
          } />
          <Route path="/adminvehiclerentalhistory" element={
            <ProtectedRoute>
             <AdminVehicleRentalHistory />
            </ProtectedRoute>
          } />
            <Route path="/paymentrecords" element={
            <ProtectedRoute>
             <PaymentRecords/>
            </ProtectedRoute>
          } />
           <Route path="/profileupdate" element={
            <ProtectedRoute>
             <ProfileUpdate />
            </ProtectedRoute>
          } />
          <Route path="/usersinfo" element={
            <ProtectedRoute>
             <UsersInfo />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
     </AuthProvider>
   </div>
  )
}

export default App
