import React from 'react'
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-svg"
export default function ({Svg, label}) {
  return ( 
    <View style = {styles.NavBtnWrapper}>
      <Svg></Svg>
      <Text>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  NavBtnWrapper: {
    height: '100%',
  },
  NavBtn: {

  }
})