import React, { Component, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, ScrollView, View, Alert } from 'react-native'
import { setSpText, scaleSize} from '~/util/adapt'
import { useRoute } from '@react-navigation/core'
import AnimateAvatar from '~/component/AnimateAvatar'
import FixTag from '~/component/FixTag'

const strPlaceholder1 = '未知'
const strPlaceholder2 = '--'
export default function UserDetail () {

  const userId = useRoute().params.userId
  let user = {
    id: 2,
    nickName: 'Pango',  // 姓名
    gender: 0,  // 性别
    age: 15, // 年龄
    tags: ['帅气','高','帅','大','awef','aweasdf','awefassss','afff'],
    introduce: '用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍'
  }
  const gender = ['男', '女']
  return ( 
    <>
      <View style = { styled.container }>
        <AnimateAvatar/>
        <Text style = { styled.nickName }>{user.nickName}</Text>
        <View style = { styled.detail}>
          <Text style = { styled.gender }>{gender[user.gender] || strPlaceholder1}</Text>
          <Text style = { styled.age }>{user.age || strPlaceholder1}</Text>
        </View>
        <Text 
          style = { styled.introduce }
          numberOfLines = {3}
          ellipsizeMode = 'tail'
        >
          <Text style = {{ fontSize: scaleSize(33), fontWeight: 'bold'}}>个性签名：</Text>
          {user.introduce || strPlaceholder2}
        </Text>
        <Text style = { styled.tagWrapper } textBreakStrategy = 'simple'>
          <Text style = {{ fontSize: scaleSize(33), fontWeight: 'bold'}}>个性标签：</Text>
          {user?.tags.join(',') || strPlaceholder2}
        </Text>
      </View>
    </>
  )
}
const styled = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#108ee9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: setSpText(100),
  }, 
  tagWrapper: {
    width: '60%',
    flexDirection: 'row',
    marginTop: setSpText(6),
  },  
  introduce: {
    width: '60%',
    marginTop: setSpText(6),
    color: '#4b1e0e',
  },
  nickName: {
    fontWeight: 'bold',
    marginTop: setSpText(10),
    fontSize: scaleSize(50),
  },
  detail: {
    flexDirection: 'row',
  },  
  gender: {
    marginRight: setSpText(8),
    fontSize: scaleSize(30),
  },
  age: {
    fontSize: scaleSize(30),
  }
})