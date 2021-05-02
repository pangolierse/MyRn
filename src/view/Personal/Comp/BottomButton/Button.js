import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { setSpText, scaleSize} from '~/util/adapt'
import { paddingSize } from '~/util'
import Text from '~/component/CenterText'
export default function Button ({
  label,
  onPress = () => {}
}) {
  return ( 
    <TouchableOpacity style = { styled.buttonWrapper} onPress = {onPress}>
      <Text>{label}</Text>  
    </TouchableOpacity>
  )
}
const styled = StyleSheet.create({
  buttonWrapper:{
    ...paddingSize(0,0,15,15),
    justifyContent: 'center',
    backgroundColor: '#bfebf6',
    borderRadius: setSpText(10),
    marginRight: setSpText(5),
    marginLeft: setSpText(5),
  }
})