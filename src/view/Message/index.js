import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Student from './Student'
export default function Message () {
  return ( 
    <View style = {{ flex: 1 }}>
      <Student />
    </View>
  )
}