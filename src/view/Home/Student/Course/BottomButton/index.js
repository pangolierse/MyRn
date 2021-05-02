import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { paddingSize } from '~/util'
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native'
export default function BottomButton ({
  children,
}) {
  return ( 
    <View style = { styled.userOperateWrapper }>
      {children}  
    </View>
  )
}
const styled = StyleSheet.create({
  userOperateWrapper: {
    width: '100%',
    height: setSpText(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    ...paddingSize(10,10,0,0),
  }
})