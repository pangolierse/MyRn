import React, { Component, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, ScrollView, View, TextInput } from 'react-native'
import { setSpText, scaleSize} from '~/util/adapt'
import { paddingSize, marginSize } from '~/util'
import SearchSvg from '~/assets/svg/Search'
import DateSvg from '~/assets/svg/Date'
import HeaderTitle from '~/component/HeaderTitle'
export default function Header ({
  week,
  day,
  setDay,
  setDrawerOpen,
}) {
  const days = [
    {
      label: '星期一',
      value: 1
    },{
      label: '星期二',
      value: 2
    },{
      label: '星期三',
      value: 3
    },{
      label: '星期四',
      value: 4
    },{
      label: '星期五',
      value: 5
    },{
      label: '星期六',
      value: 6
    },{
      label: '星期七',
      value: 7
    },
  ] 
  const showDrawer = () => {
    setDrawerOpen(true)
  }
  const handleChange = (v) => {
    setDay(v)
  }
  return ( 
    <View style = {styled.homePage}>
      <HeaderTitle 
        prefix = {(
          <TouchableOpacity onPress = {showDrawer}>
            <DateSvg size = {setSpText(16)}/>
          </TouchableOpacity>
        )}
        centerRender = {(
          <ScrollView 
            style = {styled.timeTag} 
            horizontal={true} 
            showsHorizontalScrollIndicator = {false}
          >
            { days.map( (item, index) => 
              <ScrollBtn 
                key = {item.value}
                active = { day }
                setActive = { handleChange }
                value = { item.value }
                label = { item.label }
              />
              )
            }
          </ScrollView>
        )}
        suffix = {(
          <Text style = {{
            fontSize: scaleSize(34),
            fontWeight: 'bold'
          }}>周{ week }</Text>
        )}
      />
      {/* <HeaderTitle 
        centerRender = {
          <SearchBar />
        }
      /> */}
    </View>
  )
}
function SearchBar ({
  value,
  onChange,
}) {
  return (
    <View style = {searchStyle.searchWrapper}>
      <SearchSvg color = '#CCC' size = {setSpText(8)}/>
      <TextInput 
        placeholder = '搜索'
      />
    </View>
  )
}
function ScrollBtn ({ active, value, label, setActive, activeColor = 'orange', unActiveColor = 'black'}) {
  const onPress = () => {
    setActive(value)
  }
  return (
    <TouchableOpacity onPress = {onPress}>
      <View style = {styled.chooseDay}>
        <Text style = {[
          {
            color: active === value ? activeColor : unActiveColor
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
    flex: 1,
    height: setSpText(30),
    flexDirection: 'row',
  }
})
const searchStyle = StyleSheet.create({
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: setSpText(25),
    width: setSpText(150),
    ...paddingSize(0,0,10,10),
    ...marginSize(4,4,10,10),
    borderRadius: setSpText(8),
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
})