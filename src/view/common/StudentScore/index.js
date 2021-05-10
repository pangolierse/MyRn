import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native'
import { Toast } from '@ant-design/react-native'
import { useNavigation } from '@react-navigation/core'
import { setSpText, scaleSize} from '~/util/adapt'
import { useAuth } from '~/context/useAuth'
import { avatarUrl, isVoid, paddingSize } from '~/util'
import { 
  useEditUserScore,
  useUserScore,
} from '~/api/scoreServer'
import BackSvg from '~/assets/svg/Back'
import Color from '~/assets/style/Color'
import HeaderTitle from '~/component/HeaderTitle'
import Divider from '~/component/Divider'
import { marginSize } from '../../../util'
export default function CourseMember () {
  const { isLoading, data, } = useUserScore()
  const navigator = useNavigation()
  // 发表动态
  const { token, user } = useAuth()
  const [ nativeDormitory, setNativeDormitory ] = useState({})
  const [ nativeTeacherScore, setNativeTeacherScore ] = useState([])
  const [ nativeCoursescores, setNativeCoursescores ] = useState([])
  const [ nativeLifetutorscores, setNativeLifetutorscores ] = useState([])
  const { editScore } = useEditUserScore()
  useEffect(()=>{
    console.log(data);
    let { scoreMsg, teacherscores, coursescores, lifetutorscores } = data
    setNativeDormitory(scoreMsg)
    setNativeTeacherScore(teacherscores)
    setNativeCoursescores(coursescores)
    setNativeLifetutorscores(lifetutorscores)
  }, [data])
  const filterScore = (v) => {
    let value = Number.isNaN(parseInt(v)) ? 0 : parseInt(v)
    if( value < 0 ){
      value = 0
    } else if (value > 100 ){
      value = 100
    }
    return value
  }
  const confirm = () => {
    editScore({
      scoreMsg: nativeDormitory,
      teacherscores: nativeTeacherScore,
      coursescores: nativeCoursescores,
      lifetutorscores: nativeLifetutorscores,
    }).then( res => {
      console.log(res);
      navigator.goBack()
      Toast.info('保存成功',1)
    }).catch( err => {
      console.log(err);
      Toast.info(err?.message || '未知错误', 1)
    })
  }
  const handleSearchScore = (v) => {
    nativeDormitory.rpnum = filterScore(v)
    setNativeDormitory({
      ...nativeDormitory
    })
  }
  const handleDormitory = (v) => {
    nativeDormitory.dormitorynum = filterScore(v)
    setNativeDormitory({
      ...nativeDormitory
    })
  }
  const handleTeacherScore = (v, index) => {
    nativeTeacherScore[index].tsnum = filterScore(v)
    setNativeTeacherScore([
      ...nativeTeacherScore
    ])
  }
  const handleCourseScore = (v, index) => {
    nativeCoursescores[index].csnum = filterScore(v)
    setNativeCoursescores([
      ...nativeCoursescores
    ])
  }
  const handleLifetutorscores = (v, index) => {
    nativeLifetutorscores[index].lsnum = filterScore(v)
    setNativeLifetutorscores([
      ...nativeLifetutorscores
    ])
  }

  return ( 
    <View style = {{ 
      flex: 1 ,
      backgroundColor: '#108ee9',
    }}>
      <HeaderTitle 
        tinkColor = {'white'}
        backgroundColor = {Color.header_title_blue}
        title = '设置研学成绩' 
        prefix = {(
          <TouchableOpacity style = { styled.cancel } onPress = { () => navigator.goBack() }>
            <BackSvg size = {setSpText(12)} color = 'white'/>
          </TouchableOpacity>
        )}
        suffix = {(
          <TouchableOpacity onPress = { confirm }>
            <Text style = {{ 
              color: 'white', 
              fontSize: scaleSize(32),
              fontWeight: 'bold',
              paddingRight: setSpText(6)
            }}>保存</Text>
          </TouchableOpacity>
        )}
      />
      <ScrollView style = {{ 
        flex: 1, 
        backgroundColor: 'rgba(255,255,255,0.9)',
        ...paddingSize(10,0,20,20)
      }}>
        { !isVoid(nativeDormitory) ? (
          <>
          <Text style = { styled.title}>宿舍研学计划评分</Text>
          <Input 
            label = {nativeDormitory.dormitoryname}
            placeholder = '请打分...'
            value = {String(nativeDormitory.dormitorynum || 0)}
            onChangeText = {(v) => handleDormitory(v)}
          />
          <Input 
            label = {nativeDormitory.rpname}
            placeholder = '请打分...'
            value = {String(nativeDormitory.rpnum || 0)}
            onChangeText = {(v) => handleSearchScore(v)}
          />
          </>

        ) : null}
        { !isVoid(nativeTeacherScore) ? (
          <>
          <Text style = { styled.title}>课程教师评分</Text>
          { nativeTeacherScore?.map( (teacher, index) => {
            return (
              <Input 
                key = {'' + teacher.pk_tsid + teacher.user_id}
                label = {teacher.nick_name}
                placeholder = '请打分...'
                value = {String(teacher.tsnum || 0)}
                onChangeText = {(v) => handleTeacherScore(v, index)}
              />
            )
          })}
          </>
        ) : null }
        { !isVoid(nativeCoursescores) ? (
          <>
          <Text style = { styled.title}>课程评分</Text>
          { nativeCoursescores?.map( (course, index) => {
            return (
              <Input 
                key = {'' + course.pk_courseid + course.pk_csid}
                label = {course.coursename}
                placeholder = '请打分...'
                value = {String(course.csnum || 0)}
                onChangeText = {(v) => handleCourseScore(v, index)}
              />
            )
          })}
          </>
        ) : null }
        { !isVoid(nativeLifetutorscores) ? (
          <>
          <Text style = { styled.title}>宿舍教师评分</Text>
          { nativeLifetutorscores?.map( (lifetutor, index) => {
            return (
              <Input 
                key = {'' + lifetutor.user_id + lifetutor.pk_lsid}
                label = {lifetutor.nick_name}
                placeholder = '请打分...'
                value = {String(lifetutor.lsnum || 0)}
                onChangeText = {(v) => handleLifetutorscores(v, index)}
              />
            )
          })}
          </>
        ) : null }
      </ScrollView>
    </View>
  )
}
function Input ({
  label,
  placeholder,
  value,
  onChangeText,
}) {
  const InputStyle = StyleSheet.create({
    inputWrapper:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      ...paddingSize(4,4,0,0),
      ...marginSize(4,4,0,0),
      borderColor: 'rgba(0,0,0,0.3)',
      borderTopWidth: setSpText(0.1),
      borderBottomWidth: setSpText(0.1),
    },
    label: {
      fontSize: scaleSize(34),
      fontWeight: 'bold',
    },
    input: {
      borderWidth: setSpText(0.1),
      borderColor: 'black',
      height: setSpText(20),
      borderRadius: setSpText(8),
      textAlign: 'center',
    }
  })
  return (
    <View style = { InputStyle.inputWrapper }>
      <Text style = { InputStyle.label }>{label}</Text>
      <TextInput 
        style = { InputStyle.input }
        value = { value }
        onChangeText = { onChangeText }
        placeholder = { placeholder }
      />
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
  title: {
    fontSize: scaleSize(40),
    fontWeight: 'bold',
    ...marginSize(4,4,10,10)
  }
})
// {
//   "data": {
//       "scoreMsg": {
//           "dormitoryname": "一号楼0101宿舍",
//           "rpname": "1-3月集美研学之旅",
//           "rpnum": 0,
//           "pk_scoreid": 8,
//           "remark": "",
//           "pk_studentid": 56,
//           "dormitorynum": 0
//       },
//       "teacherscores": [
//           {
//               "nick_name": "王老师",
//               "user_id": 50,
//               "pk_tsid": 3,
//               "tsnum": 0
//           },
//           {
//               "nick_name": "李老师",
//               "user_id": 51,
//               "pk_tsid": 4,
//               "tsnum": 0
//           }
//       ],
//       "coursescores": [
//           {
//               "coursename": "积木",
//               "pk_courseid": 8,
//               "pk_csid": 3,
//               "csnum": 0
//           },
//           {
//               "coursename": "龙舟",
//               "pk_courseid": 9,
//               "pk_csid": 4,
//               "csnum": 0
//           }
//       ],
//       "lifetutorscores": [
//           {
//               "nick_name": "生活导师1",
//               "user_id": 49,
//               "lsnum": 0,
//               "pk_lsid": 3
//           },
//           {
//               "nick_name": "生活导师0",
//               "user_id": 48,
//               "pk_lsid": 4
//           }
//       ]
//   },
//   "message": "请求成功",
//   "status": 0,
//   "total": 0
// }