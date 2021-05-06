import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from "@react-navigation/core";
import { useToStudentDormitory, useToEditUserInfo } from '~/router/utils'
import { paddingSize } from '~/util'
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
        useToEditUserInfo(navigator)
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
  imgSrc,
  gender,
  age
}) => {
  const styled = StyleSheet.create({
    detail: {
      marginTop: setSpText(14),
      flexDirection: 'row',
      justifyContent: 'space-between',
      ...paddingSize(0,0,6,6)
    },  
    text: {
      fontWeight: 'bold',
      fontSize: scaleSize(34),
    },
    header: {
      height: setSpText(90),
      marginTop: setSpText(10),
    },
  })
  return(
    <View style = { styled.header }>
    <AnimateAvatar imgSrc = { imgSrc }/>
      <View style = { styled.detail}>
        <Text style = { styled.text }>{gender || strPlaceholder1}</Text>
        <Text style = { styled.text }>{(age || strPlaceholder1)+'岁'}</Text>
      </View>
    </View>
  )
}
const styled = StyleSheet.create({
  
})