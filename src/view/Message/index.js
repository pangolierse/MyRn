import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '~/context/useAuth'
import Student from './Student'
import Teacher from './Teacher'
export default function Message () {
  const {
    userType
  } = useAuth()
  return ( 
    <View style = {{ flex: 1 }}>
      { 
        userType === 0 
        ? <Student />
        : userType === 1
        ? <Student />
        : <Teacher />
      }
      
    </View>
  )
}