import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CourseRender from './RenderItem'
import { useToCourseDetail } from '~/router/utils'
export default function  () {
  const navigator = useNavigation()
  return ( 
    <View style = {styled.container}>
      <FlatList 
        data = {[
          {
            key: 'hah1',
            courseName: '课程名称',
            timeRange : '8:00 ~ 9:00',
            introduction : '我是介绍课程的内容',
            imgSrc: '',
          },{
            key: 'hah2',
            courseName: '课程名称',
            timeRange : '8:00 ~ 9:00',
            introduction : '我是介绍课程的内容',
            imgSrc: '',
          },{
            key: 'hah3',
            courseName: '课程名称',
            timeRange : '8:00 ~ 9:00',
            introduction : '我是介绍课程的内容',
            imgSrc: '',
          },{
            key: 'hah4',
            courseName: '课程名称',
            timeRange : '8:00 ~ 9:00',
            introduction : '我是介绍课程的内容',
            imgSrc: '',
          },{
            key: 'hah5',
            courseName: '课程名称',
            timeRange : '8:00 ~ 9:00',
            introduction : '我是介绍课程的内容',
            imgSrc: '',
          },{
            key: 'hah6',
            courseName: '课程名称',
            timeRange : '8:00 ~ 9:00',
            introduction : '我是介绍课程的内容',
            imgSrc: '',
          },{
            key: 'hah7',
            courseName: '课程名称',
            timeRange : '8:00 ~ 9:00',
            introduction : '我是介绍课程的内容',
            imgSrc: '',
          },{
            key: 'hah8',
            courseName: '课程名称',
            timeRange : '8:00 ~ 9:00',
            introduction : '我是介绍课程的内容',
            imgSrc: '',
          },{
            key: 'hah9',
            courseName: '课程名称',
            timeRange : '8:00 ~ 9:00',
            introduction : '我是介绍课程的内容',
            imgSrc: '',
          },{
            key: 'hah0',
            courseName: '课程名称',
            timeRange : '8:00 ~ 9:00',
            introduction : '我是介绍课程的内容',
            imgSrc: '',
          },{
            key: 'hah-',
            courseName: '课程名称',
            timeRange : '8:00 ~ 9:00',
            introduction : '我是介绍课程的内容',
            imgSrc: '',
          },{
            key: 'hah=',
            courseName: '课程名称',
            timeRange : '8:00 ~ 9:00',
            introduction : '我是介绍课程的内容',
            imgSrc: '',
          },{
            key: 'hah121323',
            courseName: '课程名称',
            timeRange : '8:00 ~ 9:00',
            introduction : '我是介绍课程的内容',
            imgSrc: '',
          },{
            key: 'hah123',
            courseName: '课程名称',
            timeRange : '8:00 ~ 9:00',
            introduction : '我是介绍课程的内容',
            imgSrc: '',
          }
        ]}
        renderItem = { ({item}) => {
          return (
            <CourseRender 
              src = {item.imgSrc}
              title = { item.courseName }
              timeRange = { item.timeRange }
              introduction = { item.introduction }
              onPress = { () => useToCourseDetail(navigator, 12) }
            />
          )
        }}
      />
    </View>
  )
}
const styled = StyleSheet.create({
  container: {
    flex: 1,
  }
})