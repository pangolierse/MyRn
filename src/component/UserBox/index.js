import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { setSpText, scaleSize} from '~/util/adapt'
import { useToUserDetail } from '~/router/utils'
import defaultImg from '~/assets/img/default.jpg'
export default function UserBox ({
  id,
  style = {},
  name,
  avatar = defaultImg,
  time,
  cancelClick = false,   
}) {
  const navigator = useNavigation()
  const goToUser = (id) => {
    useToUserDetail(navigator, id)
  }
  return ( 
    <View style = { [styled.userWrapper, style] }>
      <TouchableOpacity onPress = {() => !cancelClick && goToUser(id)}>
        <Image style = { styled.userImage } source = { avatar || defaultImg }/>
      </TouchableOpacity>
      <View style = { [styled.userInfo,{ justifyContent: time ? 'space-between' : 'center' }] }>
        <TouchableOpacity onPress = {() => !cancelClick && goToUser(id)}>
          <Text style = { [styled.userNickName] }>{name}</Text>
        </TouchableOpacity>
        { time && (
          <Text style = { styled.userTime }>{time}</Text>
        )}
      </View>
    </View>
  )
}
const styled = StyleSheet.create({
  userWrapper: {
    flexDirection: 'row',
  },
  userImage: {
    width: setSpText(24),
    height: setSpText(24),
    borderRadius: setSpText(12),
  },
  userInfo: {
    marginLeft: setSpText(10),
    justifyContent: 'space-between'
  },
  userNickName: {
    fontSize: scaleSize(35),
  },
  userTime: {
    color: '#333',
    opacity: 0.5,
  },
})