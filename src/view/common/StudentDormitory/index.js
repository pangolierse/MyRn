import React, { Component, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { paddingSize, marginSize } from '~/util'
import { setSpText, scaleSize} from '~/util/adapt'
import { useAuth } from '~/context/useAuth'
import { dormitoryInfo } from '~/api/dormitoryServer'
import BackSvg from '~/assets/svg/Back'
import HeaderTitle from '~/component/HeaderTitle'
import TeacherBox from '~/component/TeacherBox'
import Divider from '~/component/Divider'
import BegBox from '~/component/BegBox'
import BetterBanner from '~/component/BetterBanner'
import Color from '~/assets/style/Color'

export default function StudentDormitory () {
  const navigator = useNavigation()
  const { user } = useAuth()
  const { data: {dormitoryMsg, dormitoryLifetutors, dormitoryStudents} } = dormitoryInfo(user.id)
  useEffect(() => {
    console.log(dormitoryMsg);
    console.log(dormitoryLifetutors);
    console.log(dormitoryStudents);
  }, [dormitoryMsg])
  const commit = () => {

  }
  return ( 
    <ScrollView style = {{ flex: 1 }}>
      <HeaderTitle 
        tinkColor = {'white'}
        backgroundColor = {Color.header_title_blue}
        title = '宿舍' 
        prefix = {(
          <TouchableOpacity style = { styled.back } onPress = { () => navigator.goBack() }>
            <BackSvg size = {setSpText(10)} color = 'white'/>
          </TouchableOpacity>
        )}
      />
      <View style = {[ styled.wrapper ]}>
        <Divider text = '宿舍详情' width = '95%' margin = {10} color = {Color.header_title_blue}/>
        <View style = { styled.dormitoryDetail }>
          <View style = { styled.dormitoryDetailWrapper }>
            <View style = { styled.detailRowItem }>
              <Text style = { styled.detailTitle }>宿舍名称: </Text>
              <Text>{ dormitoryMsg?.dormitoryname || '--' }</Text>
            </View>
            <View style = { styled.detailRowItem }>
              <Text style = { styled.detailTitle }>宿舍人数: </Text>
              <Text>{ dormitoryMsg?.dormitorynumber || '--' }人</Text>
            </View>
            <View style = { styled.detailRowItem }>
              <Text style = { styled.detailTitle }>宿舍类型: </Text>
              <Text>{ dormitoryMsg?.dormitorytype || '--' }</Text>
            </View>
          </View>
        </View>
        <Divider text = '负责人' width = '95%' color = {Color.header_title_blue}/>
        { dormitoryLifetutors?.map( (teacher, index) => {
          return (
            <TeacherBox 
              key = { 'teacher' + teacher?.user_id + index}
              style = {{
                ...paddingSize(0,0,10,10)
              }}
              id = { teacher?.user_id }
              name = { teacher?.nick_name }
              phone = { teacher?.phone }
              avatar = { teacher?.avatar_path}
              gender = { teacher?.gender }
            />
          )
        })}
        <Divider text = '宿舍成员' width = '95%' color = {Color.header_title_blue}/>
        <View style = {[
          styled.begWrapper,{
            ...paddingSize(0,0,10,10)
          }
        ]}>
          { dormitoryStudents?.map( (people, index) => {
            return (
              <BegBox 
                key = { 'student' + people?.nick_name + index }
                name = { people?.nick_name }
                locate = { people?.begMark || 'haha'}
                active = { people?.nick_name === user.nickName }
              />
            )
          })}
        </View>
      </View>
    </ScrollView>
  )
}
const styled = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: setSpText(10),
  },
  back: {
    marginLeft: setSpText(8)
  },
  begWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dormitoryDetail: {

  },
  dormitoryDetailWrapper: {
    ...paddingSize(6,6,10,10),
  },
  detailRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    ...marginSize(4,4,0,0)
  },
  detailTitle: {
    fontSize: scaleSize(36),
    fontWeight: 'bold',
    marginRight: setSpText(4),
  }
})