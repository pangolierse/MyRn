import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ScanScreen from '~/component/ScanScreen'
export default function ScanView () {
  return ( 
    <View style = {{ flex: 1,}}>
      <ScanScreen/>
    </View>
  )
}
const styled = StyleSheet.create({
  
})