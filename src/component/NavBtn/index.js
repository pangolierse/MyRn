import React from 'react'
import { StyleSheet, View, Text } from "react-native"
export default function ({children, title, color = 'black'}) {
  return ( 
    <View style = {styles.NavBtnWrapper}>
      {children}
      <Text style = {[styles.title, {color: color}]}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  NavBtnWrapper: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'red'
  }
})