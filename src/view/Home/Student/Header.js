import React, { Component, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native'
import { setSpText, scaleSize} from '~/util/adapt'
export default function  () {
  const [ active, setActive ] = useState('星期一')
  const days = [
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
    '星期七',
  ] 
  return ( 
    <View style = {styled.homePage}>
      <ScrollView style = {styled.timeTag} horizontal={true}>
        { days.map( (day, index) => 
          <ScrollBtn 
            active = { active }
            setActive = { setActive } 
            name = {day}
            key = {index + day}
            label = {day}
          />
          )
        }
      </ScrollView>
    </View>
  )
}
function ScrollBtn ({active, name, label, setActive, activeColor = 'orange', unActiveColor = 'black'}) {
  const onPress = () => {
    setActive(name)
  }
  return (
    <TouchableOpacity onPress = {onPress}>
      <View style = {styled.chooseDay}>
        <Text style = {[
          {
            color: active === name ? activeColor : unActiveColor
          }
        ]}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
}
const styled = StyleSheet.create({
  chooseDay: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: setSpText(15),
    paddingRight: setSpText(15),
  },
  timeTag: {
    width: '100%',
    height: setSpText(30),
    flexDirection: 'row',
    borderBottomColor: '#333',
    borderBottomWidth: setSpText(0.1),
  }
})