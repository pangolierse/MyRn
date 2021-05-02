import React, { Component, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, ScrollView, View, TextInput } from 'react-native'
import { setSpText, scaleSize} from '~/util/adapt'
import { paddingSize, marginSize } from '~/util'
import SearchSvg from '~/assets/svg/Search'
import HeaderTitle from '~/component/HeaderTitle'
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
      <HeaderTitle 
        centerRender = {
          <SearchBar />
        }
      />
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
const styled = StyleSheet.create({
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
  }
})