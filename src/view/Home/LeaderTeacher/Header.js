import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable';
import Wave1 from '~/assets/img/wave1.png'
import Wave2 from '~/assets/img/wave2.png'
export default function Header () {
  const waveAnimate1 = {
    0: {
      left: 0,
    },
    1: {
      left: -600,
    }
  }
  return ( 
    <View style = { styled.headerWrapper }>
      <Animatable.Image
        style = { styled.wave1 } 
        source = { Wave1 }
        animation={waveAnimate1} 
        iterationCount='infinite' 
        easing = 'linear'
        duration = { 9000 }
      />
      <Animatable.Image
        style = {[
          styled.wave1,{
            left: -100,
          }
        ]} 
        source = { Wave2 }
        animation={waveAnimate1} 
        iterationCount='infinite' 
        easing = 'linear'
        duration = { 9000 }
      />
      <Animatable.Image
        style = {[
          styled.wave1,{
            left: -100,
          }
        ]} 
        source = { Wave1 }
        animation={waveAnimate1} 
        iterationCount='infinite' 
        duration = { 9000 }
      />
    </View>
  )
}
const styled = StyleSheet.create({
  headerWrapper: {
    height: setSpText(60),
    overflow: 'hidden',
    transform: [{
      rotate : ('180deg'),
    }],
  },
  wave1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  wave2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  }
})