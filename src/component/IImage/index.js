import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native'
import Loading from '~/component/Loading'
import defaultImg from '~/assets/img/default.jpg'
export default function IImage ({
  src,
  style = {},
  onClick = () => {}
}) {
  
  return ( 
    <TouchableOpacity onPress = {onClick}>
      <Image style = { styled.image } source = { src || defaultImg} onLoad = {() => {}}/>
    </TouchableOpacity>
  )
}
const styled = StyleSheet.create({
  image: {
    width: setSpText(56),
    height: setSpText(56),
    margin: setSpText(2),
  }
})