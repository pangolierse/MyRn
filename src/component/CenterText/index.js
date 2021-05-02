import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
export default function CenterText ({
  children,
  style = {},
  ...prop
}) {
  return ( 
    <Text style = {[
      styled.text,
      style
    ]} {...prop}>
      {children}
    </Text>
  )
}
const styled = StyleSheet.create({
  text: {
    includeFontPadding: false,
    textAlignVertical: 'center',   
  }
})