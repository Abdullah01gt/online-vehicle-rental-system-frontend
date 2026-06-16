import { useState } from 'react'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
     <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup"  element={<Signup />} />
        </Routes>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
     </AuthProvider>
   </div>
  )
}

export default App
