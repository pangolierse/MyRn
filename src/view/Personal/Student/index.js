import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from "@react-navigation/core";
import { useToStudentDormitory } from '~/router/utils'
import AnimateAvatar from '~/component/AnimateAvatar'
import BottomButton from '../Comp/BottomButton'
import BottomButtonItem from '../Comp/BottomButton/Button'
const strPlaceholder1 = '未知'
export function StudentBottom () {
  const navigator = useNavigation()
  const buttonList = [
    {
      label: '查看宿舍',
      onPress: () => {
        useToStudentDormitory(navigator)
      }
    },{
      label: '编辑个人信息',
      onPress: () => {

      }
    },{
      label: '研学项目总评',
      onPress: () => {

      }
    },
  ]
  return ( 
    
    <BottomButton>
      { buttonList.map( button => {
        return <BottomButtonItem key = { button.label + 'button'} label = { button.label } onPress = { button.onPress }/>
      })}
    </BottomButton>
  )
}
export const StudentHeader = ({
  nickName,
  gender,
  age
}) => {
  const genderMap = ['男', '女']
  const styled = StyleSheet.create({
    nickName: {
      fontWeight: 'bold',
      marginTop: setSpText(10),
      fontSize: scaleSize(50),
    },
    detail: {
      flexDirection: 'row',
    },  
    gender: {
      marginRight: setSpText(8),
      fontSize: scaleSize(30),
    },
    age: {
      fontSize: scaleSize(30),
    },
    header: {
      height: setSpText(90),
      marginTop: setSpText(10),
    },
  })
  return(
    <View style = { styled.header }>
    <AnimateAvatar/>
      <Text style = { styled.nickName }>{nickName}</Text>
      <View style = { styled.detail}>
        <Text style = { styled.gender }>{genderMap[gender] || strPlaceholder1}</Text>
        <Text style = { styled.age }>{(age || strPlaceholder1)+'岁'}</Text>
      </View>
    </View>
  )
}
const styled = StyleSheet.create({
  
})