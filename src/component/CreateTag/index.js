import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useToCreateTag } from '~/router/utils'
export default function CreateTag ({
  color = '#4b1e0e',
  tags,
}) {
  const navigator = useNavigation()
  const onPress = () => {
    useToCreateTag(navigator, tags)
  }
  return ( 
    <TouchableOpacity style = {[ 
      styled.createBtn,
      {
        borderColor: color,
      }
    ]} onPress = {onPress}>
      <Text style = {[
        styled.btn,
        {
          color: color,
        } 
      ]}>+</Text>
    </TouchableOpacity>
  )
}
const width = setSpText(15)
const styled = StyleSheet.create({
  createBtn: {
    height: width,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#4b1e0e',
    borderWidth: setSpText(0.1),
  },
  btn: {
    fontSize: scaleSize(40),
    fontWeight: 'bold',
    color: '#4b1e0e',
  }
})