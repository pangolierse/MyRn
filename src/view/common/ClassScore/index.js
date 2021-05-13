import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { Toast, SwipeAction } from '@ant-design/react-native';
import BackSvg from '~/assets/svg/Back'
import { useToUserDetail } from '~/router/utils'
import { useNavigation, useRoute } from '@react-navigation/core'
import { setSpText, scaleSize} from '~/util/adapt'
import { useClassMemberInfo, useClassMemberScore } from '~/api/courseServer'
import { useAuth } from '~/context/useAuth'
import { avatarUrl, isVoid, paddingSize } from '~/util'
import Color from '~/assets/style/Color'
import HeaderTitle from '~/component/HeaderTitle'
import EmptyView from '~/component/EmptyView'
import IImage from '~/component/IImage'
import ScoreModal from './AssociateModal'
import { marginSize } from '~/util'
export default function ClassScore () {
  const navigator = useNavigation()
  const courseId = useRoute()?.params?.courseId
  // 发表动态
  const { token,user } = useAuth()
  const { members, refreshInfo } = useClassMemberInfo(courseId)
  const { insertScore, changeScore } = useClassMemberScore(courseId)
  const [ visible, setVisible ] = useState(false)
  const [ activeId, setActiveId ] = useState(null)
  const [ gradeId, setGradeId ] = useState(null)
  const [ haveGrade, setHaveGrade ] = useState(false)
  const handleConfirm = (v) => {
    console.log('value: ' + v);
    console.log('activeId: ' + activeId);
    console.log('haveGrade: ' + haveGrade);
    console.log('gradeId: ' + gradeId);
    if(!haveGrade){
      insertScore(activeId, v)
      .then( res => {
        refreshInfo()
      })
      .catch( err => {
        Toast.info(err?.message, 1)
      })
    } else {
      changeScore(activeId, gradeId, v)
      .then( res => {
        refreshInfo()
      })
      .catch( err => {
        Toast.info(err?.message, 1)
      })
    }
  }
  return ( 
    <View style = {{ flex: 1 }}>
      <ScoreModal 
        visible = { visible } 
        setVisible = { setVisible }
        onConfirm = {handleConfirm}
      />
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
        { 
          isVoid(members) ? (
            <EmptyView color = 'black'/>
          ) : (
            <FlatList 
              showsVerticalScrollIndicator = {false}
              keyExtractor = { item => item.user_id}
              data = {members || []}
              renderItem = { ({item: student}) => {
                return (
                  <StudentBox 
                    id = {student?.user_id}
                    imgSrc = {isVoid(student.avatar_name) ? '' : avatarUrl(student.avatar_name)}
                    groupname = {student?.groupname || '--'}
                    nickName = {student?.nick_name || '--'}
                    gender = {student?.gender || '--'}
                    grade = {student?.grade}
                    setGradeId = { setGradeId }
                    setActiveId = { setActiveId }
                    setVisible = { setVisible }
                    setHaveGrade = { setHaveGrade }
                  />
                )
              }}
            />
          )
        }
      </View>
    </View>
  )
}
function StudentBox ({
  id,
  imgSrc,
  groupname,
  nickName,
  gender,
  grade,
  setGradeId,
  setActiveId,
  setVisible,
  setHaveGrade
}) {
  const navigator = useNavigation()
  const rightOperate = [
    {
      text: '学生详情',
      onPress: () => {
        id && useToUserDetail(navigator, id)
      },
      style: { backgroundColor: '#4f66f8', color: 'white' },
    },
    {
      text: '设置成绩',
      onPress: () => {
        setHaveGrade(grade ? true : false)
        setGradeId(grade ? grade.pkGradeid : '')
        setActiveId(id)
        setVisible(true)
      },
      style: { backgroundColor: '#fc8d0f', color: 'white' },
    },
  ];
  return (
    <SwipeAction
      autoClose
      style={{
        ...marginSize(6,0,0,0),
        backgroundColor: 'transparent',
      }}
      right={rightOperate}
    >
      <View style = {styled.renderWrapper}>
        <IImage style = { styled.image } src = {imgSrc} gender = { gender }/>
        <View style = { styled.rightWrapper}>
          <View style = { styled.rowItem }>
            <Text style = { styled.title }>姓名：<Text style = { styled.value }>{nickName}</Text></Text>
            <Text style = { styled.title }>性别：<Text style = { styled.value }>{gender}</Text></Text>
          </View>
          <View style = { styled.rowItem }>
            <Text style = { styled.title }>小组名称：<Text style = { styled.value }>{groupname}</Text></Text>
          </View>
        </View>
        <View style = {{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style = { styled.grade }>{grade ? grade?.gradenum : '未录入'}</Text>
        </View>
      </View>
    </SwipeAction>
  )
}
const styled = StyleSheet.create({
  wrapper: {
    flex:1,
    ...paddingSize(6,0,20,20),
    backgroundColor: 'white',
  },
  cancel: {
    paddingLeft: setSpText(6),
  },
  renderWrapper:{
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: setSpText(10),
    borderWidth: setSpText(0.1),
    borderColor: '#333',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  image: {
    height: setSpText(40),
    width: setSpText(40),
  },
  rightWrapper: {
    ...paddingSize(12,12,10,10),
    justifyContent: 'space-between',
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: scaleSize(32),
    fontWeight: 'bold',
  },
  value: {
    fontSize: scaleSize(26),
    fontWeight: 'normal',
  },
  grade: {
    fontSize: scaleSize(26),
    color: '#db4040'
  }
})