import React, { Component, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native'
import { setSpText, scaleSize} from '~/util/adapt'
import Header from './Header'
import List from './CourseList'
export default function  () {
  return ( 
    <View style = {styled.homePage}>
      <Header />
      <List />
    </View>
  )
}
const styled = StyleSheet.create({
  homePage: {
    flex:1,
  },
})