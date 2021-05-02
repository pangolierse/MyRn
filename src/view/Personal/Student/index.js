import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from "@react-navigation/core";
import { useToStudentDormitory } from '~/router/utils'
import BottomButton from '../Comp/BottomButton'
import BottomButtonItem from '../Comp/BottomButton/Button'
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
const styled = StyleSheet.create({
  
})