import React, { Component, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'
import { setSpText, scaleSize} from '~/util/adapt'
import Color from '~/assets/style/Color'
import HeaderTitle from '~/component/HeaderTitle'
import UserBox from '~/component/UserBox'
import FixTag from '~/component/FixTag'
import LineText from '~/component/LineText'
export default function CreateTag () {
  const user = {
    id: 12,
    name: 'Pango',
    avatar: '',
  }
  const navigator = useNavigation()
  const routeTags = useRoute().params.tags
  const [ tags, setTags ] = useState( routeTags )
  const commit = () => {

  }
  const handleCancel = (tag) => {
    
  }
  return ( 
    <View style = {{ flex: 1 }}>
      <HeaderTitle 
        tinkColor = {'white'}
        backgroundColor = {Color.header_title_blue}
        title = '发表动态' 
        prefix = {(
          <TouchableOpacity style = { styled.cancel } onPress = { () => navigator.goBack() }>
            <Text style = { styled.fontCancel }> {'<'} </Text>
          </TouchableOpacity>
        )}
        suffix = {(
          <TouchableOpacity style = { styled.createButton } onPress = { commit }>
            <Text style = {[ styled.create ]}>发表</Text>
          </TouchableOpacity>
        )}
      />
      <View style = {[ styled.wrapper ]}>
        <View style = { styled.textInputWrapper }>
          <TextInput style = { styled.textInput } placeholder = {'请输入标签'}/>
          <TouchableOpacity style = { styled.confirmBtn }>
            <Text>确定</Text>
          </TouchableOpacity>
        </View>
        <View style = { styled.tagWrapper }>
          { tags.map( tag => {
            return <FixTag text = { tag } onCancel = {() => handleCancel(tag)}/>
          })}
        </View>
      </View>
    </View>
  )
}
const styled = StyleSheet.create({
  wrapper: {
    height: setSpText(300),
    paddingLeft: setSpText(6),
    paddingRight: setSpText(6),
    paddingTop: setSpText(6),
    backgroundColor: 'white',
    marginTop: setSpText(6),
  },
  tagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: setSpText(8),
  },
  cancel: {
    paddingLeft: setSpText(6),
  },
  fontCancel: {
    fontSize: scaleSize(70),
    color: 'white',
  },
  create:{
    fontSize: scaleSize(35),
    color: 'white',
    fontWeight: 'bold',
  },
  createButton: {
    paddingLeft: setSpText(6),
    paddingRight: setSpText(6),
  },
  textInputWrapper: {
    flexDirection: 'row',
    height: setSpText(20),
  },
  textInput: {
    flex: 1,
    borderWidth: setSpText(0.1),
    borderColor: '#afafaf',
  },
  confirmBtn: {
    paddingLeft: setSpText(10),
    paddingRight: setSpText(10),
    marginLeft: setSpText(6),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: setSpText(0.1),
    borderColor: '#afafaf',
  }
})