import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
export default function LineText ({
  style = {},
  labelStyle = {},
  prefix,
  suffix,
  label,
  margin = 6,
}) {
  return ( 
    <View style = {[
      styled.textWrapper,
      style
    ]}>
      { prefix }
      <Text style = {[
        styled.label,
        {
          marginLeft: setSpText(margin),
          marginRight: setSpText(margin),
        },
        labelStyle
      ]}>{label}</Text>
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
  }
})