import React, { Component, useState, useEffect } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import Search from '~/assets/svg/Search'
import { useFootCourseScore } from '~/api/courseServer'
import BetterBanner from '~/component/BetterBanner'
import { paddingSize, isVoid } from '~/util'
import { useToCourseDetail } from '~/router/utils'
import { useNavigation } from '@react-navigation/core'
import ErrorSvg from '~/assets/svg/Error'
export default function PreView ({
  viewProp,
}) {
  const navigator = useNavigation()
  const { initGrade } = useFootCourseScore()
  const [ status, setStatus ] = useState(0)
  const [ grade, setGrade ] = useState('')
  const typeMap = [
    '室内课',
    '室外课'
  ]
  useEffect(() => {
    
  },[status])
  const onPress = () => {
    useToCourseDetail(navigator, viewProp?.pk_arrangeid)
  }
  useEffect(()=>{
    initGrade(viewProp.pk_courseid, viewProp.pk_studentid).then( res => {
      if( !isVoid(res.data) ){
        setStatus(1)
        setGrade(res.data?.gradenum)
      } else {
        setStatus(2)
      }
    }).catch( err => {
      console.log(err);
      setStatus(3)
    })
  },[])
  return ( 
    <View style = { styled.positionWrapper }>
      <View style = {{
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: setSpText(6),
      }}>
        <Text style = { styled.scoreStatus}>成绩</Text>
        {status === 0 
        ? <ActivityIndicator color="#39c8f6"/>
        : status === 1
        ? <Text>{grade}</Text>
        : status === 2
        ? <Text>暂无</Text>
        : <ErrorSvg size = {setSpText(10)}/>
        }
      </View>
      <View style = { styled.rightContent }>
        <View style = { styled.courseInfo }>
          <View style = { styled.infoItem }>
            <Text style = { styled.title }>课程名称:</Text>
            <Text style = { styled.label } ellipsizeMode = 'tail' numberOfLines = {1}>{viewProp?.coursename}</Text>
          </View>
          <View style = { styled.infoItem }>
            <Text style = { styled.title }>时间:</Text>
            <Text style = { styled.label } ellipsizeMode = 'tail' numberOfLines = {1}>{viewProp?.create_time}</Text>
          </View>
        </View>
        <TouchableOpacity onPress = { onPress }>
          <Search size = {setSpText(12)} color = '#00a6ff'/>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const viewWidth = 150
const styled = StyleSheet.create({
  positionWrapper: {
    height: setSpText(40),
    width: setSpText(viewWidth),
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: setSpText(8),
    ...paddingSize(10,10,10,10),
    justifyContent: 'space-between',
  },
  betterBanner: {
  },
  rightContent: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: setSpText(6),
  },
  courseInfo: {
    ...paddingSize(6,6,0,0),
    height: '100%',
    justifyContent: 'space-between',
  },
  title: {
    color: 'black',
    fontSize: scaleSize(25),
    marginRight: setSpText(4),
  },
  label: {
    color: '#666',
    fontSize: scaleSize(25),
  },
  infoItem: {
    width: setSpText(viewWidth - 80),
    flexDirection: 'row',
  },
  scoreStatus: {
    fontSize: scaleSize(30),
    fontWeight: 'bold'
  }
})