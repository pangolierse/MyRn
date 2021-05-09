import React, { Component, useEffect } from 'react'
import { StyleSheet, Text, Button, TouchableOpacity, View } from 'react-native'
import { useAuth } from '~/context/useAuth'
import Student from './Student'
import LeaderTeacher from './LeaderTeacher'
import DormitoryTeacher from './DormitoryTeacher'
export default function  () {
  const { userType } = useAuth()
  const compMap = {
    '0': <Student />, // 管理员
    '1': <LeaderTeacher />, // 领队教师
    '2': <Student />, // 课程教师
    '3': <DormitoryTeacher />, // 宿舍教师
    '4': <Student />, // 学生
    '5': <Student />, // 家长
  }
  return ( 
    <View style = {{flex:1}}>
      { compMap[userType] }
    </View>
  )
}