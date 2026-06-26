import React, { useState, useEffect } from 'react'
import VehicleMaintainingCard from '../elements/VehicleMaintainingCard.jsx'
import AdminNavbar from '../components/AdminNavbar.jsx'
import VehicleApprovalCard from '../elements/VehicleApprovalCard.jsx'
import UserCard from '../elements/UserCard.jsx'
const serverBaseUrl = import.meta.env.VITE_SERVER_URL

export default function UsersInfo() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`${serverBaseUrl}/users/v1/`)
      .then((response) => response.json())
      .then((result) => {
        setUsers(result.data)
       
      })
      .catch(err => console.error("Error fetching users roster:", err))
  }, [])

  return (
    <div className="bg-[#0b0c10] text-gray-100 min-h-screen">
      <AdminNavbar />
  
      <header className="max-w-7xl mx-auto px-6 pt-10 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Registered Core Users</h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Global administration panel. Instantly view, monitor, and audit metadata credentials for your user base.
            </p>
          </div>
        </div>
      </header>

     
      <main className="max-w-7xl mx-auto px-6 pb-24 mt-6">
        
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {users && users.length > 0 ? (
            users.map((user) => (
              <UserCard key={user._id} userData={user} />
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center py-20">
              <p className="text-gray-500 text-sm">No registered records available in current database collection.</p>
            </div>
          )}
        </div>

      </main>
    </div>
  )
}