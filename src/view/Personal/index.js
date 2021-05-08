import React, { Component, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, ScrollView, View, Alert } from 'react-native'
import { setSpText, scaleSize} from '~/util/adapt'
import { paddingSize, avatarUrl } from '~/util'
import { useAuth } from '~/context/useAuth'
import PhoneSvg from '~/assets/svg/Phone'
import EmailSvg from '~/assets/svg/Email'
import ExitSvg from '~/assets/svg/Exit'
import UserSvg from '~/assets/svg/User'
import HeaderTitle from '~/component/HeaderTitle'
import CreateTag from '~/component/CreateTag'
import LineText from '~/component/LineText'
import FixTag from '~/component/FixTag'
import { StudentBottom, StudentHeader } from './Student/index'
import { ParentBottom,ParentHeader } from './Parent'
import { ChoosePlan, } from './Teacher'
const strPlaceholder1 = '未知'
const strPlaceholder2 = '--'
const StudentType = '4'
const ParentType = '5'
const TeacherType = '3'
export default function UserDetail () {
  const { logout, userType, user: userInfo, token } = useAuth()
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
  const handleExit = () => {
    logout()
  }
  useEffect(()=>{
    console.log('个人中心' + token);
    console.log('个人中心' + userInfo?.id);
    console.log(userInfo);
  },[userInfo])
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
        { userType === ParentType ? (
            <ParentHeader />
          ) : (
            <StudentHeader />
          )
        }
        <View style = { styled.UserDetailInfo }>
          <View style = { styled.userInfoItem}>
            <LineText 
              prefix = {(
                <UserSvg size = {setSpText(16)}/>
              )}
              label = {userInfo?.nickName || strPlaceholder2}
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
              label = {userInfo?.phone || strPlaceholder2}
            />
          </View>
          <View style = {[ 
            styled.userInfoItem,
            { marginTop: setSpText(4)}
          ]}>
            <LineText 
              prefix = {(
                <EmailSvg size = {setSpText(16)}/>
              )}
              label = {userInfo?.email || strPlaceholder2}
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
          { userType && userType <= TeacherType && (
            <View style = { styled.userInfoItem}>
              <ChoosePlan />
            </View>
          )}
        </View>
        {
          userType === StudentType 
          ? <StudentBottom />
          : <ParentBottom />
        }
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