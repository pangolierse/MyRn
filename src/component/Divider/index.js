import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
export default function Divider ({
  margin = 8,
  color = 'black',
}) {
  return ( 
    <View style = {[
      styled.dividerWrapper,
      {
        marginTop: setSpText(margin),
        marginBottom: setSpText(margin),
      }
    ]}>
      <View style = {[
        styled.divider,
        {
          backgroundColor: color,
        }
      ]}></View>
    </View>
  )
}
const styled = StyleSheet.create({
  dividerWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  divider: {
    width: '90%',
    height: setSpText(0.1),
    opacity: 0.2,
  }
})