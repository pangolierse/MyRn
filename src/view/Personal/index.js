import React, { Component, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, ScrollView, View, Alert } from 'react-native'
import { setSpText, scaleSize} from '~/util/adapt'
import { useNavigationState } from '@react-navigation/core'
import { useAuth } from '~/context/useAuth'
import Color from '~/assets/style/Color'
import PhoneSvg from '~/assets/svg/Phone'
import ExitSvg from '~/assets/svg/Exit'
import UserSvg from '~/assets/svg/User'
import HeaderTitle from '~/component/HeaderTitle'
import AnimateAvatar from '~/component/AnimateAvatar'
import CreateTag from '~/component/CreateTag'
import LineText from '~/component/LineText'
import FixTag from '~/component/FixTag'
import { StudentBottom } from './Student/index'
const strPlaceholder1 = '未知'
const strPlaceholder2 = '--'
export default function UserDetail () {
  const { logout } = useAuth()
  let user = {
    id: 2,
    nickName: 'Pango',  // 昵称
    name: '王大锤', // 姓名
    gender: 0,  // 性别
    age: 15, // 年龄
    phone: 17506023989,
    tags: ['帅气','高','帅','大','awef','aweasdf','awefassss','afff'],
    introduce: '用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍用户自我介绍'
  }
  const gender = ['男', '女']
  const handleExit = () => {
    logout()
  }
  return ( 
    <>
      <View style = { styled.container }>
        <HeaderTitle 
          tinkColor = {'#108ee9'}
          backgroundColor = {'#108ee9'}
          suffix = {(
            <TouchableOpacity style = { styled.exitBtn } onPress = {handleExit}>
              <ExitSvg size = { setSpText(12) } color = '#dbdbdb'/>
            </TouchableOpacity>
          )}
        />
        <View style = { styled.header }>
          <AnimateAvatar/>
          <Text style = { styled.nickName }>{user.nickName}</Text>
          <View style = { styled.detail}>
            <Text style = { styled.gender }>{gender[user.gender] || strPlaceholder1}</Text>
            <Text style = { styled.age }>{(user.age || strPlaceholder1)+'岁'}</Text>
          </View>
        </View>
        <View style = { styled.UserDetailInfo }>
          <View style = { styled.userInfoItem}>
            <LineText 
              prefix = {(
                <UserSvg size = {setSpText(16)}/>
              )}
              label = {user.name || strPlaceholder2}
            />
          </View>
          <View style = {[ 
            styled.userInfoItem,
            { marginTop: setSpText(4)}
          ]}>
            <LineText 
              prefix = {(
                <PhoneSvg size = {setSpText(16)}/>
              )}
              label = {user.phone || strPlaceholder2}
            />
          </View>
          <View style = { styled.userInfoItem}>
            <View style = { styled.tagWrapper }>
              <Text style = {{ fontSize: scaleSize(33), fontWeight: 'bold'}}>个性标签：</Text>
              {user?.tags.map( tag => {
                return <FixTag space = {2} text = {tag} key = {tag + 'tags'}/>
              })}
              <CreateTag tags = {user?.tags || []}/>
            </View>
          </View>
        </View>
        <StudentBottom />
      </View>
    </>
  )
}
const styled = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#108ee9',
  }, 
  exitBtn: {
    marginRight: setSpText(6),
  },
  tagWrapper: {
    flexDirection: 'row',
    marginTop: setSpText(6),
    flexWrap: 'wrap',
    alignItems: 'center',
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
  },
  header: {
    height: setSpText(90),
    marginTop: setSpText(10),
  },
  UserDetailInfo: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: setSpText(6),
    paddingLeft: setSpText(6),
    paddingRight: setSpText(6),
  },
  userInfoItem: {
    width: '100%',
    borderBottomWidth: setSpText(0.1),
    borderBottomColor: '#afafaf',
    paddingBottom: setSpText(4),
  }
})