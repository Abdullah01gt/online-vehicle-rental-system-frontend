import { useState } from 'react'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import AdminHome from './pages/AdminHome.jsx'
import AdminLogin from './pages/AdminLogin.jsx'

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
        </Routes>
      </Router>
     </AuthProvider>
   </div>
  )
}

export default App
