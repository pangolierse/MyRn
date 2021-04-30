import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
export default function LineText ({
  style = {},
  prefix,
  suffix,
  label,
}) {
  return ( 
    <View style = {[
      styled.textWrapper,
      style
    ]}>
      { prefix }
      <Text style = {styled.label}>{label}</Text>
      { suffix }
    </View>
  )
}
const styled = StyleSheet.create({
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: setSpText(6),
  }
})