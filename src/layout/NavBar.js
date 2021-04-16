import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { setSpText, scaleSize} from '@/util/adapt'
import Home from '@/assets/svg/Home'
import Foot from '@/assets/svg/Foot'
import Message from '@/assets/svg/Message'
import Dynamic from '@/assets/svg/Dynamic'
import Personal from '@/assets/svg/Personal'
import NavBtn from '@/component/NavBtn'
const activeColor = 'green'
const unActiveColor = 'red'
export default function () {
  const [ active, setActive ] = useState(0)
  const navs = [
    { 
      title: '首页',
      element: <Home color={active === 0? activeColor:unActiveColor}/>
    },
    {
      title: '足迹',
      element: <Foot color={active === 1? activeColor:unActiveColor}/>
    },
    {
      title: '动态',
      element: <Dynamic color={active === 2? activeColor:unActiveColor}/>
    },
    {
      title: '消息',
      element: <Message color={active === 3? activeColor:unActiveColor}/>
    },
    {
      title: '个人中心',
      element: <Personal color={active === 4? activeColor:unActiveColor}/>
    },
  ]
  const handleOnPress = (targetValue) => {
    setActive(targetValue)
  }
  return ( 
    <View style = {styled.NavWrapper}>
      {navs.map( (nav, index) => {
        return (
          <TouchableWithoutFeedback key = {index} onPress = {() => handleOnPress(index)}>
            <View style = {{flex:1}}>
              <NavBtn title = {nav.title} color = { active == index ? activeColor : unActiveColor}>
                {nav.element}
              </NavBtn>
            </View>
          </TouchableWithoutFeedback>
        )
      })}
    </View>
  )
}

const styled = StyleSheet.create({
  NavWrapper: {
    height: setSpText(40),
    backgroundColor: 'orange',
    flexDirection: 'row',
    zIndex: 1,
  },
})