import React, { createContext, useContext, useState, useEffect} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }){

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const savedUser = localStorage.getItem('user_data')
        const savedToken = localStorage.getItem('auth_token')

        if(savedUser && savedToken){
            setUserDetails(JSON.parse(savedUser));
            setIsAuthenticated(true)

        }

        setLoading(false)
    }, [])

    function login(userObj, token){
        setIsAuthenticated(true)
        setUserDetails(userObj)

        localStorage.setItem('user_data', JSON.stringify(userObj));
        localStorage.setItem('auth_token', token)

    }

    function logout(){
        setIsAuthenticated(false)
        setUserDetails({})
        localStorage.removeItem('user_data');
        localStorage.removeItem('auth_token');
    }

    
    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout, setUserDetails, userDetails, loading}} >
            {!loading ? children : <div className="loading-screen">Loading application...</div>}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)