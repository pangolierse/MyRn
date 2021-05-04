import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AnimateAvatar from '~/component/AnimateAvatar'
export function ParentHeader () {
  const styled = StyleSheet.create({
    header: {
      height: setSpText(90),
      marginTop: setSpText(20),
    }
  })
  return ( 
    <View style = { styled.header }>
      <AnimateAvatar />
    </View>
  )
}