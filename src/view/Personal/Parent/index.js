import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '~/context/useAuth'
import { paddingSize,avatarUrl } from '~/util'
import { useNavigation } from "@react-navigation/core";
import { useActionImage } from '~/hook'
import { uploadUserAvatar } from '~/api/personServer'
import AnimateAvatar from '~/component/AnimateAvatar'
import BottomButton from '../Comp/BottomButton'
import BottomButtonItem from '../Comp/BottomButton/Button'
export function ParentHeader () {
  const { refreshInfo,user } = useAuth()
  const { uploadAvatar } = uploadUserAvatar()
  const { showAction } = useActionImage((image)=>{
    uploadAvatar(image).then(res => {
      refreshInfo()
    })
  })
  const handlePress = () => {
    showAction()
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

export function ParentBottom () {
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
    },
  ]
  return ( 
    
    <View style = {{
      width:'100%',
      height: setSpText(30),
      backgroundColor: 'white',
      ...paddingSize(10,10,30,30),
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}>
      { buttonList.map( button => {
        return <BottomButtonItem key = { button.label + 'button'} label = { button.label } onPress = { button.onPress }/>
      })}
    </View>
  )
}