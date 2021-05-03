import React, { Component } from 'react'
import { StyleSheet, Text, Button, TouchableOpacity, View } from 'react-native'
import { useAuth } from '~/context/useAuth'
import Student from './Student'
import LeaderTeacher from './LeaderTeacher'
export default function  () {
  const { userType } = useAuth()
  const compMap = {
    '0': <Student />, // 家长
    '1': <Student />, // 学生
    '2': <Student />, // 课程教师
    '3': <Student />, // 宿舍教师
    '4': <Student />, // 管理员
    '5': <LeaderTeacher />, // 领队教师
  }
  return ( 
    <View style = {{flex:1}}>
      { compMap[userType] }
    </View>
  )
}