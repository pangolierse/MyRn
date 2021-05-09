import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from "@react-navigation/core";
import { 
  useToStudentDormitory, 
  useToEditUserInfo,
  useToStudentGroup,
  useToStudentScore, } from '~/router/utils'
import { paddingSize, avatarUrl } from '~/util'
import { useActionImage } from '~/hook'
import { uploadUserAvatar } from '~/api/personServer'
import { useAuth } from '~/context/useAuth'
import AnimateAvatar from '~/component/AnimateAvatar'
const strPlaceholder1 = '未知'
export function StudentSetting (navigator) {
  return [
    [
      '查看宿舍',
      '编辑个人资料',
      '查看小组',
      '研学项目总评',
      '取消'
    ],[
      () => useToStudentDormitory(navigator) ,
      () => useToEditUserInfo(navigator) ,
      () => useToStudentGroup(navigator) ,
      () => useToStudentScore(navigator) ,
    ]
  ]
}
export const StudentHeader = () => {
  const { refreshInfo, user, reload } = useAuth()
  const { uploadAvatar } = uploadUserAvatar()
  const { showAction } = useActionImage((image)=>{
    uploadAvatar(image).then(res => {
      refreshInfo()
      reload()
    })
  })
  const handlePress = () => {
    showAction()
  }
  return(
    <View style = { styled.header }>
    <AnimateAvatar imgSrc = { avatarUrl(user?.avatarName) } onPress = {handlePress}/>
      <View style = { styled.detail}>
        <Text style = { styled.text }>{user?.gender || strPlaceholder1}</Text>
        <Text style = { styled.text }>{(user?.age || strPlaceholder1)+'岁'}</Text>
      </View>
    </View>
  )
}
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