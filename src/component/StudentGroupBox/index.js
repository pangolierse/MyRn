import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import IImage from '~/component/IImage'
import { paddingSize } from '../../util'
export default function StudentGroupBox ({
  style = {},
  imgSrc,
  nickName,
  email,
  phone,
  age,
  onPress,
  gender
}) {
  return ( 
    <TouchableOpacity 
      style = {[ styled.studentMember, style]} 
      onPress = {onPress} 
      activeOpacity = { onPress ? 0.2 : 1}
    >
      <IImage 
        src = { imgSrc }
        gender = { gender }
        style = {{
          width: setSpText(46),
          height: setSpText(46),
          borderRadius: setSpText(8),
        }}
      />
      <View style = { styled.leftWrapper }>
        <View style = { styled.rowItem }>
          <Text style = { styled.title }>姓名：<Text style = {styled.value}>{nickName || '--'}</Text></Text>
          <Text style = { styled.title }>电话：<Text style = {styled.value}>{phone || '--'}</Text></Text>
        </View>
        <View style = { styled.rowItem }>
          <Text style = { styled.title }>年龄：<Text style = {styled.value}>{age || '--'}</Text></Text>
          <Text style = { styled.title }>邮箱：<Text style = {styled.value}>{email || '--'}</Text></Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
const styled = StyleSheet.create({
  studentMember: {
    height: setSpText(46),
    borderRadius: setSpText(8),
    overflow: 'hidden',
    flexDirection: 'row',
    borderStyle: 'dashed',
    borderColor: '#333',
    borderWidth: setSpText(0.1),
  },
  leftWrapper: {
    flex:1,
    ...paddingSize(10,10,10,20),
    justifyContent: 'space-between',
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: scaleSize(32),
    fontWeight: 'bold',
  },
  value: {
    fontSize: scaleSize(26),
    fontWeight: 'normal',
  },
})