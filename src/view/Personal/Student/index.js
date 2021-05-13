import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from "@react-navigation/core";
import { 
  useToStudentDormitory, 
  useToEditUserInfo,
  useToStudentGroup,
  useToStudentScore,
  useToClassListScore, } from '~/router/utils'
import { paddingSize, avatarUrl } from '~/util'
import { useActionImage } from '~/hook'
import { uploadUserAvatar } from '~/api/personServer'
import { useAuth } from '~/context/useAuth'
import HouseSvg from '~/assets/svg/House'
import InfomationSvg from '~/assets/svg/Infomation'
import GroupSvg from '~/assets/svg/Group'
import SearchScoreSvg from '~/assets/svg/SearchScore'
import AnimateAvatar from '~/component/AnimateAvatar'
import ListSvg from '~/assets/svg/List'
const strPlaceholder1 = '未知'
export function StudentSetting (navigator) {
  return [
    {
      label: '-----   查看宿舍',
      svg: <HouseSvg size = {setSpText(16)}/>,
      onPress: () => useToStudentDormitory(navigator)
    },{
      label: '-----   查看小组',
      svg: <GroupSvg size = {setSpText(16)}/>,
      onPress: () => useToStudentGroup(navigator)
    },{
      label: '-----   编辑个人资料',
      svg: <InfomationSvg size = {setSpText(16)}/>,
      onPress: () => useToEditUserInfo(navigator)
    },{
      label: '-----   研学项目总评',
      svg: <SearchScoreSvg size = {setSpText(16)}/>,
      onPress: () => useToStudentScore(navigator)
    },{
      label: '-----   查看开课班级',
      svg: <ListSvg size = {setSpText(16)}/>,
      onPress: () => useToClassListScore(navigator)
    },
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
    <AnimateAvatar 
      gender = { user?.gender }
      imgSrc = { avatarUrl(user?.avatarName) } 
      onPress = {handlePress}
    />
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