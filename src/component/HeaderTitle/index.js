import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
export default function HeaderTitle ({
  prefix,
  title,
  suffix,
  tinkColor = 'black',
  backgroundColor = 'white',
}) {
  return ( 
    <View style = { [styled.headerWrapper,{
      backgroundColor: backgroundColor
    }]}>
      <View style = { styled.prefix }>
        {prefix}
      </View>      
      <Text style = { [styled.title, { color: tinkColor }] }>{ title }</Text>
      <View style = { styled.suffix }>
        {suffix}
      </View>      
    </View>
  )
}
const styled = StyleSheet.create({
  title: {
    fontSize: scaleSize(40),
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
    flex: 1,
    alignItems: 'flex-start',
  },
  suffix: {
    flex: 1,
    alignItems: 'flex-end',
  }
})