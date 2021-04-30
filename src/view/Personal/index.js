import React, { Component, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, ScrollView, View, Alert } from 'react-native'
import { setSpText, scaleSize} from '~/util/adapt'
import { useNavigationState } from '@react-navigation/core'
import PhoneSvg from '~/assets/svg/Phone'
import StudentSvg from '~/assets/svg/Student'
import UserSvg from '~/assets/svg/User'
import AnimateAvatar from '~/component/AnimateAvatar'
import CreateTag from '~/component/CreateTag'
import LineText from '~/component/LineText'
import FixTag from '~/component/FixTag'
const strPlaceholder1 = '未知'
const strPlaceholder2 = '--'
export default function UserDetail () {

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
  return ( 
    <>
      <View style = { styled.container }>
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
    height: setSpText(120),
    marginTop: setSpText(40),
  },
  UserDetailInfo: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
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