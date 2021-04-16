import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { setSpText, scaleSize} from '@/util/adapt'
import { NativeRouter, Route, Link } from "react-router-native";
import NavBar from './NavBar'
export default function () {
  return ( 
    <View style = {styled.AppWrapper}>
      <View style = {styled.MainWrapper}>

      </View>
      <NavBar />
    </View>
  )
}

const styled = StyleSheet.create({
  AppWrapper: {
    flex: 1,
    backgroundColor: 'black',
  },
  MainWrapper: {
    flex:1,
    backgroundColor: 'green',
  },
})