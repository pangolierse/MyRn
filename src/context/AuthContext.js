import React, { ReactNode, useState, useEffect } from "react"
import * as Auth from './auth-provider'
export const AuthContext = React.createContext(undefined)

// Authcontext
export default function AuthProvider ({children}) {
  // app 初始加载占用界面
  const [ isLoading, setIsLoading ] = useState(true)
  const [ userType, setUserType ] = useState(null)
  const [ token, setToken ] = useState(null)
  const [ user, setUser ] = useState(null)
  const [ mount, setMount ] = useState(false)
  const reload = () => {
    console.log('reload');
    setMount(true)
    setTimeout(() => {
      setMount(false)
    }, 0);
  }
  const login = (form) => {
    Auth.login(form).then(([token, type]) => {
      setUserType(type)
      setToken(token)
      return Auth.getUserInfo(token) 
    }).then(setUser)
  }
  const logout = () => {
    Auth.logout().then(() => {
      setToken(null)
      setUserType(null)
      setUser(null)
    })
  }
  const refreshInfo = () => {
    Auth.getUserType()
      .then(setUserType)
      .then(() => Auth.getToken())
      .then((token) => {
        setToken(token)
        setIsLoading(false)
        Auth.getUserInfo(token).then(setUser)
      })
  }
  useEffect(()=>{
    setIsLoading(true)
    refreshInfo()
  },[])
  return ( 
    <AuthContext.Provider value = {{
      user,
      refreshInfo,
      token,
      userType,
      isLoading,
      login,
      logout,
      mount, 
      reload
    }}>
      {children}
    </AuthContext.Provider>
  )
}