import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable';
import CarSvg from '~/assets/svg/Car'
export default function AnimateCar () {

  const animate = {
    0: {
      right: setSpText(-20),
    },
    1: {
      right: setSpText(0),
    },
  }
  const carAnimate = {
    0: {
      top: setSpText(0),
    },
    1: {
      top: setSpText(0.5),
    },
  }
  return (
    <View style = { styled.wrapper }>
      <Animatable.View
        style = {{
          position: 'absolute',
          top: setSpText(0),
        }}
        easing = 'linear'
        animation = { carAnimate }
        iterationCount='infinite' 
        duration = { 500 }
      >
        <CarSvg />
      </Animatable.View>
      <Animatable.View 
        style = {{
          width: setSpText(60),
          position: 'absolute',
          borderWidth: setSpText(0.1),
          borderStyle: 'dashed',
          borderRadius: 1,
          top: setSpText(22)
        }}
        easing = 'linear'
        animation = { animate }
        iterationCount='infinite' 
        duration = { 1500 }></Animatable.View>
    </View>
  )
}
const styled = StyleSheet.create({
  wrapper: {
    width: setSpText(28),
    height: setSpText(30),
    alignItems: 'center',
    overflow: 'hidden',
  }
})