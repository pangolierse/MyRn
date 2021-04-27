import React, { ReactNode, useState, useEffect } from "react"
import * as Auth from './auth-provider'
export const AuthContext = React.createContext(undefined)

// Authcontext
export default function AuthProvider ({children}) {
  const [ userType, setUserType ] = useState(0)
  const [ token, setToken ] = useState(null)
  const [ user, setUser ] = useState({})
  const login = (form) => {
    Auth.login(form).then(setUser)
  }
  const logout = () => {
    Auth.logout().then(() => {
      setUser(null)
      setToken(null)
      setUserType(null)
    })
  }
  useEffect(()=>{
    Auth.getUserType().then(setUserType)
    Auth.getToken().then(setToken)
  },[user])
  return ( 
    <AuthContext.Provider value = {{
      user,
      token,
      userType,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}