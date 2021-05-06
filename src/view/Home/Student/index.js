import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native'
import { Button, Drawer } from '@ant-design/react-native';
import { setSpText, scaleSize} from '~/util/adapt'
import { paddingSize } from '~/util'
import Header from './Header'
import List from './CourseList'
export default function  () {
  const [ drawerOpen, setDrawerOpen ] = useState(false)
  const [ week, setWeek ] = useState(0)
  const [ day, setDay ] = useState(0)
  const weekMap = [
    {
      label: '第一周',
      value: 0,
    },{
      label: '第二周',
      value: 1,
    },{
      label: '第三周',
      value: 2,
    },{
      label: '第四周',
      value: 3,
    },{
      label: '第五周',
      value: 4,
    },{
      label: '第六周',
      value: 5,
    },{
      label: '第七周',
      value: 6,
    },{
      label: '第八周',
      value: 7,
    },
  ]
  const changeWeek = (v) => {
    setWeek(v)
  }
  return ( 
    <View style = {styled.homePage}>
      <Drawer
        sidebar = {(
          <ScrollView style = { styled.weekDrawer }>
            {weekMap.map(item => {
              return (
                <TouchableOpacity key = {'week' + item.label} style = { styled.weekContainer } onPress = { () => changeWeek(item.value) }>
                  <Text style = {[ styled.weekText, { color: week == item.value ? 'orange' : 'black'} ]}>{item.label}</Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        )}
        position = "left"
        open = {drawerOpen}
        drawerBackgroundColor = "white"
        onOpenChange = {setDrawerOpen}
      >
        <Header 
          day = { day } 
          setDay = { setDay }
          setDrawerOpen = { setDrawerOpen }
        />
        <List />
      </Drawer>
    </View>
  )
}
const styled = StyleSheet.create({
  homePage: {
    flex:1,
  },
  weekDrawer: {
    flex: 1,
    ...paddingSize(0,0,10,10)
  },
  weekContainer: {
    height: setSpText(40),
    ...paddingSize(4,4,10,10),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: setSpText(0.1),
    borderBottomColor: 'rgba(0,0,0,0.3)',
  },
  weekText: {
    fontWeight: 'bold',
    fontSize: scaleSize(40)
  }
})