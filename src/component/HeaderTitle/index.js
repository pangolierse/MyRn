import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
export default function HeaderTitle ({
  prefix,
  title,
  suffix,
  centerRender,
  tinkColor = 'black',
  backgroundColor = 'white',
}) {
  return ( 
    <View style = { [styled.headerWrapper,{
      backgroundColor: backgroundColor
    }]}>
      <View style = {[ styled.prefix,{
        width: prefix ? setSpText(24) : setSpText(24),
      }]}>
        {prefix}
      </View>      
      <View style = {{flex:7}}>
        {centerRender}
        { title && (
          <Text style = { [styled.title, { color: tinkColor }] }>{ title }</Text>
        )} 
      </View>
      <View style = {[ styled.suffix,{
        width: suffix ? setSpText(24) : setSpText(24),
      }]}>
        {suffix}
      </View>      
    </View>
  )
}
const styled = StyleSheet.create({
  title: {
    fontSize: scaleSize(40),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headerWrapper: {
    height: setSpText(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  prefix: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  suffix: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})