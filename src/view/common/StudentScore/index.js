import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { Toast } from '@ant-design/react-native'
import BackSvg from '~/assets/svg/Back'
import { useNavigation } from '@react-navigation/core'
import { setSpText, scaleSize} from '~/util/adapt'
import { useAuth } from '~/context/useAuth'
import { avatarUrl, isVoid, paddingSize } from '~/util'
import Color from '~/assets/style/Color'
import HeaderTitle from '~/component/HeaderTitle'
export default function CourseMember () {
  const navigator = useNavigation()
  // 发表动态
  const { token,user } = useAuth()
  return ( 
    <View style = {{ flex: 1 }}>
      <HeaderTitle 
        tinkColor = {'white'}
        backgroundColor = {Color.header_title_blue}
        title = '设置研学成绩' 
        prefix = {(
          <TouchableOpacity style = { styled.cancel } onPress = { () => navigator.goBack() }>
            <BackSvg size = {setSpText(12)} color = 'white'/>
          </TouchableOpacity>
        )}
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