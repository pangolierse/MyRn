import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import EmptySvg_1 from '~/assets/svg/Empty_1'
import EmptySvg_2 from '~/assets/svg/Empty_2'
export default function EmptyView ({
  type = 1,
  label = '暂无数据',
  color = 'white',
}) {
  return ( 
    <View style = { styled.wrapper }>
      { type == 1 ? (
        <EmptySvg_1 />
      ) : (
        <EmptySvg_2 />
      )}
      <Text style = {[ 
        styled.text,{
          color: color,
          fontSize: scaleSize(35)
        } 
      ]}>{label}</Text>
    </View>
  )
}
const styled = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: setSpText(10),
  }
})