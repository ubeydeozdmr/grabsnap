import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState } from 'react'

export const AuthProvider = createContext();

export default function AuthContext({children}) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthProvider.Provider value = {{isAuthenticated, setIsAuthenticated}}>
      {children}
    </AuthProvider.Provider>
  )
}
