import React, { ReactNode, useState, useEffect } from "react"
import * as Auth from './auth-provider'
export const AuthContext = React.createContext(undefined)

// Authcontext
export default function AuthProvider ({children}) {
  // app 初始加载占用界面
  const [ isLoading, setIsLoading ] = useState(true)
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
    setIsLoading(true)
    Auth.getUserType()
      .then(setUserType)
      .then(() => Auth.getToken())
      .then((token) => {
        setToken(token)
        setIsLoading(false)
      })
    
  },[user])
  return ( 
    <AuthContext.Provider value = {{
      user,
      token,
      userType,
      isLoading,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}