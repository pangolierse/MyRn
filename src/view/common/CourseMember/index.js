import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { Toast } from '@ant-design/react-native'
import BackSvg from '~/assets/svg/Back'
import { useNavigation } from '@react-navigation/core'
import { setSpText, scaleSize} from '~/util/adapt'
import { usePublishDynamic } from '~/api/dynamicServer'
import { useAuth } from '~/context/useAuth'
import { avatarUrl, isVoid, paddingSize } from '~/util'
import Color from '~/assets/style/Color'
import HeaderTitle from '~/component/HeaderTitle'
import UserBox from '~/component/UserBox'
import StudentBox from '~/component/TeacherBox'
export default function CourseMember () {
  const navigator = useNavigation()
  // 发表动态
  const { token,user } = useAuth()
  return ( 
    <View style = {{ flex: 1 }}>
      <HeaderTitle 
        tinkColor = {'white'}
        backgroundColor = {Color.header_title_blue}
        title = '课程成员' 
        prefix = {(
          <TouchableOpacity style = { styled.cancel } onPress = { () => navigator.goBack() }>
            <BackSvg size = {setSpText(12)} color = 'white'/>
          </TouchableOpacity>
        )}
      />
      <View style = {[ styled.wrapper ]}>
        <FlatList 
          showsVerticalScrollIndicator = {false}
          data = {[
            {
              user_id: 55,
              nick_name: '白起',
              phone: '12313123',
              avatar_name:'',
              gender: '男'
            },{
              user_id: 54,
              nick_name: '白起',
              phone: '12313123',
              avatar_name:'',
              gender: '男'
            },
          ]}
          renderItem = { ({item: student}) => {
            return (
              <StudentBox 
                key = { 'teacher' + student?.user_id}
                style = {{
                  borderWidth: setSpText(0.1),
                  borderRadius: setSpText(12),
                }}
                id = { student?.user_id }
                name = { student?.nick_name }
                phone = { student?.phone }
                avatar = { student?.avatar_name}
                gender = { student?.gender }
              />
            )
          }}
        />
        <UserBox 
          id = { user.id }
          name = { user.nickName }
          avatar = { avatarUrl(user.avatarName)}
          cancelClick = { true }
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