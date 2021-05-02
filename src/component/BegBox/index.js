import React, { Component, useEffect, useState } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { paddingSize, marginSize } from '~/util'
import BegSvg from '~/assets/svg/Beg'
export default function BegBox ({
  active = false,
  name = '--',
  locate = '--',
}) {
  const activeColor = 'orange'
  const unActiveColor = 'black'
  const [ color, setColor ] = useState('orange')
  useEffect(() => {
    setColor( active ? activeColor : unActiveColor )
  }, [active])
  return ( 
    <View style = {[ styled.wrapper,{
      borderColor: color
    }]}>
      <BegSvg color = { color } size = { setSpText(20) }/>
      <View style = { styled.rightContent }>
        <View style = { styled.rowItem }>
          <Text style = { styled.title }>姓名:</Text>
          <Text>{name}</Text>
        </View>
        <View style = { styled.rowItem }>
          <Text style = { styled.title }>床位:</Text>
          <Text>{locate}</Text>
        </View>
      </View>
    </View>
  )
}
const styled = StyleSheet.create({
  wrapper: {
    width: '42%',
    flexDirection: 'row',
    alignItems: 'center',
    ...marginSize(5,5,5,5),
    borderWidth: setSpText(0.1),
    borderColor: '#333',
    borderRadius: setSpText(10),
    ...paddingSize(10,10,10,10)
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContent: {
    marginLeft: setSpText(4)
  },
  title: {
    fontWeight: 'bold',
    marginRight: setSpText(4),
  }
})