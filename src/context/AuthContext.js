import React, { ReactNode } from "react"

const AuthContext = React.createContext(undefined)

// Authcontext
export default function ({children}) {
  const user = {
    id: 123,
    username: 'hahaha',
    password: 123456,
  }
  
  return ( 
    <AuthContext.Provider value = { {user: user } }>
      {children}
    </AuthContext.Provider>
  )
}