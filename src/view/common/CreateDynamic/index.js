import React, { Component, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { setSpText, scaleSize} from '~/util/adapt'
import Color from '~/assets/style/Color'
import HeaderTitle from '~/component/HeaderTitle'
import UserBox from '~/component/UserBox'
import ImagePicker from '~/component/ImagePicker'
export default function CreateDynamic () {
  const navigator = useNavigation()
  const [ images, setImages ] = useState([])
  const user = {
    id: 12,
    name: 'Pango',
    avatar: '',
  }
  const commit = () => {

  }
  return ( 
    <View style = {{ flex: 1 }}>
      <HeaderTitle 
        tinkColor = {'white'}
        backgroundColor = {Color.header_title_blue}
        title = '发表动态' 
        prefix = {(
          <TouchableOpacity style = { styled.cancel } onPress = { () => navigator.goBack() }>
            <Text style = { styled.fontCancel }>取消</Text>
          </TouchableOpacity>
        )}
        suffix = {(
          <TouchableOpacity style = { styled.createButton } onPress = { commit }>
            <Text style = {[ styled.fontCancel ]}>发表</Text>
          </TouchableOpacity>
        )}
      />
      <View style = {[ styled.wrapper ]}>
        <UserBox 
          id = { user.id }
          name = { user.name }
          avatar = { user.avatar }
          cancelClick = { true }
        />
        <TextInput 
          style = { styled.textInput }
          placeholder = '分享新鲜事...' 
          multiline = { true } 
        />
        <ImagePicker 
          images = { images }
          setImages = { setImages }
        />
      </View>
    </View>
  )
}
const styled = StyleSheet.create({
  wrapper: {
    height: setSpText(200),
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