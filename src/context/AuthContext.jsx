import React, { createContext, useContext, useState} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }){

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState({})

    function login(userObj){
        setIsAuthenticated(true)
        setUserDetails(userObj)
    }

    function logout(){
        setIsAuthenticated(false)
        setUserDetails({})
    }

    
    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout, setUserDetails, userDetails}} >
            { children }
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)