import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native'
import * as Animatable from 'react-native-animatable';
import defaultImg from '~/assets/img/default.jpg'
import { isVoid } from '~/util'
import IImage from '~/component/IImage'

export default function AnimateAvatar ({ imgSrc, onPress }) {
  const duration = 1000
  const animate1 = {
    0: {
      opacity: 0.5,
      scale: 1.2,
    },
    0.5: {
      opacity: 0,
      scale: 1.1,
    },
    1: {
      opacity: 0.5,
      scale: 1.2,
    },
  }
  const animate2 = {
    0: {
      opacity: 0.5,
      scale: 1.5,
    },
    0.5: {
      opacity: 0.3,
      scale: 1.3,
    },
    1: {
      opacity: 0.5,
      scale: 1.5,
    },
  }
  return (
    <TouchableOpacity 
      style = { styled.avatar }
      activeOpacity = { onPress ? 0.2 : 1}
      onPress = { onPress }
    >
      <Animatable.View 
        style = {styled.avatar_bc1} 
        animation={animate1} 
        iterationCount='infinite' 
        duration = { duration * 1.5 }
      />
      <Animatable.View 
        style = {[
          styled.avatar_bc1,
          styled.avatar_bc2,
        ]} 
        animation={animate2} 
        iterationCount='infinite' 
        duration = { duration }
      />
      <IImage 
        style = { styled.img } 
        src = {imgSrc} 
        onClick = { onPress }
      />
    </TouchableOpacity>
  )
}

const styled = StyleSheet.create({
  avatar: {
    width: setSpText(40),
    height: setSpText(40),
    backgroundColor: 'white',
    borderRadius: setSpText(40),
  },
  avatar_bc1: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderRadius: setSpText(40),
  },
  avatar_bc2: {
    backgroundColor: '#dddddd',
  },
  img: {
    width: setSpText(40),
    height: setSpText(40),
    borderRadius: setSpText(40),
  }
})