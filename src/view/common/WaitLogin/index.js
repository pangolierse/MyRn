import React, { Component, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, ScrollView, View, Alert } from 'react-native'
import { setSpText, scaleSize} from '~/util/adapt'
import { useRoute } from '@react-navigation/core'
import AnimateAvatar from '~/component/AnimateAvatar'
import FixTag from '~/component/FixTag'

const strPlaceholder1 = '未知'
const strPlaceholder2 = '--'
export default function WaitLogin () {

  return ( 
    <>
      <View style = { styled.container }>
        <AnimateAvatar/>
      </View>
    </>
  )
}
const styled = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#108ee9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: setSpText(100),
  }, 
})