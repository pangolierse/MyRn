import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
export default function Divider ({
  margin = 8,
  color = 'black',
  text,
  width = '90%',
  position = 'left',
  fontWeight = 'bold',
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
          width: width,
          backgroundColor: color,
        }
      ]}></View>
      <Text style = {{
        fontSize: scaleSize(40),
        position: 'absolute',
        left: position === 'left' ? '20%' : '80%',
        top: 0,
        backgroundColor: 'white',
        fontWeight: fontWeight,
        transform: [{
          translateY: setSpText(-8),
        }]
      }}>{text}</Text>
    </View>
  )
}
const styled = StyleSheet.create({
  dividerWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  divider: {
    height: setSpText(0.1),
    opacity: 0.2,
  }
})