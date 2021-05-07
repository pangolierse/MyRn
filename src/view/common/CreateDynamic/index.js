import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { Toast } from '@ant-design/react-native'
import { useNavigation } from '@react-navigation/core'
import { setSpText, scaleSize} from '~/util/adapt'
import { usePublishDynamic } from '~/api/dynamicServer'
import { useAuth } from '~/context/useAuth'
import { avatarUrl, isVoid } from '~/util'
import Color from '~/assets/style/Color'
import HeaderTitle from '~/component/HeaderTitle'
import UserBox from '~/component/UserBox'
import ImagePicker from '~/component/ImagePicker'
export default function CreateDynamic () {
  const navigator = useNavigation()
  const [ images, setImages ] = useState([{fileName: "rn_image_picker_lib_temp_301fd801-2d8f-4dbf-ac13-05fd3522f51e.jpg", uri: "file:///data/user/0/com.rntemp/cache/rn_image_picker_lib_temp_301fd801-2d8f-4dbf-ac13-05fd3522f51e.jpg"}, {fileName: "rn_image_picker_lib_temp_4e44a2f8-5c37-4a50-a28b-d4d4ececb58e.jpg", uri: "file:///data/user/0/com.rntemp/cache/rn_image_picker_lib_temp_4e44a2f8-5c37-4a50-a28b-d4d4ececb58e.jpg"}])
  // 发表动态
  const { token,user } = useAuth()
  const { publishDynamic } = usePublishDynamic()
  const [ params, setParams ] = useState({
    racontent: "",
    ratitle: "",
    researchactionPhotos: [
      {
        photoPath: "",
      },
    ],
  })
  const commit = () => {
    if(isVoid(params.ratitle)){
      Toast.info('标题不能为空', 1)
    } else {
      publishDynamic(params, images, token).then(() => {
        Toast.info('发表成功', 1)
        navigator.goBack()
      })
    }
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
          name = { user.nickName }
          avatar = { avatarUrl(user.avatarName)}
          cancelClick = { true }
        />
        <TextInput 
          style = { styled.textInput }
          value = { params.ratitle }
          onChangeText = { (v) => setParams({
            ...params,
            ratitle: v
          })}
          placeholder = '请输入标题' 
        />
        <TextInput 
          placeholder = '分享新鲜事...' 
          value = { params.racontent }
          onChangeText = { (v) => setParams({
            ...params,
            racontent: v,
          })}
          multiline = { true } 
        />
        <ImagePicker 
          style = {{marginTop: setSpText(40)}}
          images = { images }
          setImages = { setImages }
        />
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