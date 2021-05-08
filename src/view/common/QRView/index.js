import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { Toast } from '@ant-design/react-native'
import { useNavigation } from '@react-navigation/core'
import BackSvg from '~/assets/svg/Back'
import { setSpText, scaleSize} from '~/util/adapt'
import { useUserQR } from '~/api/personServer'
import { useAuth } from '~/context/useAuth'
import { avatarUrl, isVoid } from '~/util'
import Color from '~/assets/style/Color'
import HeaderTitle from '~/component/HeaderTitle'
import IImage from '~/component/IImage'
export default function CreateDynamic () {
  const navigator = useNavigation()
  // 发表动态
  const { token,user } = useAuth()
  const { QrSrc } = useUserQR(user.id)
  return ( 
    <View style = {{ flex: 1}}>
      <HeaderTitle
        tinkColor = {'white'}
        backgroundColor = {Color.header_title_blue}
        title = '二维码' 
        prefix = {(
          <TouchableOpacity style = { styled.cancel } onPress = { () => navigator.goBack() }>
            <BackSvg size = { setSpText(12)} color='white'/>
          </TouchableOpacity>
        )}
      />
      <View style = {{ alignItems: 'center'}}>
        <IImage style = {{height: setSpText(200),width: setSpText(200), marginTop: setSpText(70)}} src = {QrSrc}/>
      </View>
    </View>
  )
}
const styled = StyleSheet.create({
  wrapper: {
    flex:1,
    paddingLeft: setSpText(6),
    paddingRight: setSpText(6),
    paddingTop: setSpText(6),
    backgroundColor: 'white',
    marginTop: setSpText(6),
  },
  cancel: {
    paddingLeft: setSpText(6),
  },
  fontCancel: {
    fontSize: scaleSize(35),
    color: 'white',
  },
  create:{
    fontSize: scaleSize(70),
    fontWeight: 'bold',
  },
  createButton: {
    paddingRight: setSpText(6),
  },
  textInput: {
    marginTop: setSpText(4),
  }
})