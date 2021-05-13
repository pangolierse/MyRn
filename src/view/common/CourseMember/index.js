import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { Toast } from '@ant-design/react-native'
import BackSvg from '~/assets/svg/Back'
import { useNavigation, useRoute } from '@react-navigation/core'
import { setSpText, scaleSize} from '~/util/adapt'
import { useClassMemberInfo } from '~/api/courseServer'
import { useAuth } from '~/context/useAuth'
import { avatarUrl, isVoid, paddingSize } from '~/util'
import Color from '~/assets/style/Color'
import HeaderTitle from '~/component/HeaderTitle'
import StudentBox from '~/component/TeacherBox'
import EmptyView from '~/component/EmptyView'
export default function CourseMember () {
  const navigator = useNavigation()
  const ocid = useRoute()?.params?.ocid
  const { members } = useClassMemberInfo(ocid)
  useEffect(() => {
    console.log(members);
  }, [members])
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
        { isVoid(members) ? (
          <EmptyView />
        ) : (
          <FlatList 
            showsVerticalScrollIndicator = {false}
            keyExtractor = { item => item.user_id}
            data = {members || []}
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
                  phoneLabel = '小组名称'
                  phone = { student?.groupname }
                  avatar = { student?.avatar_name}
                  gender = { student?.gender }
                />
              )
            }}
          />
        )}
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