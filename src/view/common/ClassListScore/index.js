import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, FlatList } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'
import { setSpText, scaleSize} from '~/util/adapt'
import { paddingSize } from '~/util'
import { useClassListInfo } from '~/api/courseServer'
import { useAuth } from '~/context/useAuth'
import { 
  useToClassScore,
} from '~/router/utils'
import BackSvg from '~/assets/svg/Back'
import ErrorSvg from '~/assets/svg/Error'
import HeaderTitle from '~/component/HeaderTitle'
import EmptyView from '~/component/EmptyView'
import Color from '~/assets/style/Color'
import { isVoid } from '../../../util'
export default function ClassListScore () {
  const navigator = useNavigation()
  const studentId = useRoute()?.params?.studentId
  const { user, userType } = useAuth()
  const userTypeMap = {
    '4': user.id,
    '1': studentId,
  }
  const { classList, initGrade } = useClassListInfo(userTypeMap[userType], userType)
  return ( 
    <View style = {{ flex: 1 }}>
      <HeaderTitle 
        tinkColor = {'white'}
        backgroundColor = {Color.header_title_blue}
        title = '开课班级列表' 
        prefix = {(
          <TouchableOpacity style = { styled.cancel } onPress = { () => navigator.goBack() }>
            <BackSvg size = {setSpText(12)} color = 'white' />
          </TouchableOpacity>
        )}
      />
      <View style = {[ styled.wrapper ]}>
      { isVoid(classList) ? (
        <EmptyView />
      ) : (
        <FlatList 
          keyExtractor = { item => item.pk_ocid}
          data = { classList || []}
          renderItem = { ({item}) => {
            return (
            <RenderItem 
              courseScore = {item}
              initGrade = { initGrade }
            />
            )
          }}
        />
      )}
      </View>
    </View>
  )
}
function RenderItem ({
  courseScore,
  initGrade,
}) {
  /**
   *  0: loading 1: success 2: unknow 3: error
   */
  const [ status, setStatus ] = useState(0)
  const [ grade, setGrade ] = useState('')
  const typeMap = [
    '室内课',
    '室外课'
  ]
  useEffect(()=>{
      initGrade(courseScore.pk_ocid).then( res => {
        if( !isVoid(res.data) ){
          console.log(res);
          setStatus(1)
          setGrade(res.data?.gradenum)
        } else {
          setStatus(2)
        }
      }).catch( err => {
        setStatus(3)
      })
  },[])
  return (
    <View style = { styled.renderWrapper }>
      <View style = { styled.leftWrapper }>
        <View style = { styled.columnItem }>
          <Text style = { styled.title}>课程名：<Text style = { styled.value }>{courseScore.coursename}</Text></Text>
          <Text style = { styled.title}>班级名：<Text style = { styled.value }>{courseScore.ocname}</Text></Text>
        </View>
        <View style = { styled.columnItem }>
          <Text style = { styled.title}>类型：<Text style = { styled.value }>{!isVoid(courseScore.octype) ? typeMap[courseScore.octype] : '未知'}</Text></Text>
          <Text style = { styled.title}>人数：<Text style = { styled.value }>{courseScore.ocnumber}</Text></Text>
        </View>
      </View>
      <View style = { styled.rightWrapper }>
        <Text style = { styled.scoreStatus}>成绩：</Text>
        {status === 0 
        ? <ActivityIndicator color="#39c8f6"/>
        : status === 1
        ? <Text>{grade}</Text>
        : status === 2
        ? <Text>暂无</Text>
        : <ErrorSvg size = {setSpText(10)}/>
        }
      </View>
    </View>
  )
}
const styled = StyleSheet.create({
  wrapper: {
    flex:1,
    ...paddingSize(6,0,10,10),
    backgroundColor: 'white',
  },
  cancel: {
    paddingLeft: setSpText(6),
  },
  renderWrapper: {
    marginTop: setSpText(4),
    height: setSpText(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...paddingSize(0,0,10,10),
    borderWidth: setSpText(0.1),
    borderColor: '#333',
    borderRadius: setSpText(8),
  },
  leftWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: setSpText(4),
  },
  rightWrapper: {
    width: setSpText(40),
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreStatus:{
    fontSize: scaleSize(34),
    fontWeight: 'bold',
  },
  columnItem: {
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
})