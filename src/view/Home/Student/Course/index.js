import React, { Component, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, ScrollView, View, Button } from 'react-native'
import { setSpText, scaleSize} from '~/util/adapt'
import ReadMore from '~/component/ReadMore'
import Divider from '~/component/Divider'
import FixTag from '~/component/FixTag'
import TeacherBox from '~/component/TeacherBox'
import BetterBanner from '~/component/BetterBanner'
import ScoreModal from './ScoreModal'
export default function  () {
  const handleTextReady = () => {}
  const course = {
    name: 'wangda',
    describe: '我是一个老师欸我是一个老师欸我是一个老师欸我是一个老师欸我是一个老师欸我是一个老师欸我是一个老师欸我是一个老师欸我是一个老师欸我是一个老师欸我是一个老师欸我是一个老师欸',
    courseName: '赛龙舟',
    courseDetail: '我是课程简介哦，这是课程简介，你想知道这堂课上什么内容嘛，看我就对了，那么让我们来看看这堂课到底上的什么内容呢，没错这堂课就是赛龙舟，怎么样很有趣吧',
    courseAddress: '福建省厦门市湖里区',
    tag: ['高','大','帅'],
  }
  const [ scoreVisible, setScoreVisible ] = useState(false)
  return ( 
    <>
    <ScrollView style={styled.scroll}>
      <View>
        <BetterBanner
          bannerComponents={[
            <View style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#1997fc',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{fontSize: 35, color: '#fff', marginBottom: 10}}>Page 01</Text>
              <Text style={{fontSize: 15, color: '#fff'}}>Welcome! have a good time</Text>
            </View>,
            <View style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#da578f',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{fontSize: 35, color: '#fff', marginBottom: 10}}>Page 02</Text>
              <Text style={{fontSize: 15, color: '#fff'}}>Welcome! have a good time</Text>
            </View>,
            <View style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#7c3fe4',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{fontSize: 35, color: '#fff', marginBottom: 10}}>Page 03</Text>
              <Text style={{fontSize: 15, color: '#fff'}}>Welcome! have a good time</Text>
            </View>,
          ]}
          onPress={(index) => alert('you pressed index is : ' + index)}
          indicatorContainerBackgroundColor={'rgba(0,0,0,0.3)'}
          isSeamlessScroll={true}
        />
      </View>
      <View style = {styled.container}>
        <TeacherBox 
          style = {{marginTop: setSpText(8)}}
          name = {course.name }
          describe = {course.describe }
        />
        <Divider />
        <View style = {[ 
          styled.rowLineLayout,
        ]}>
          <Text style = {[ styled.title, {marginRight: setSpText(8)}]}>课程名称:</Text>
          <Text style = { styled.courseName }>{course.courseName}</Text>
        </View>
        
        <View style = {[ 
          styled.rowLineLayout,
        ]}>
          <Text style = {[ styled.title, {marginRight: setSpText(8)}]}>地点:</Text>
          <Text style = { styled.courseName }>{course.courseAddress}</Text>
        </View>
        <View style={[
          styled.rowLineLayout,
          styled.tagWrapper,
        ]}>
          <Text style={[styled.title, {marginRight: setSpText(4)}]}>标签:</Text>
          {course?.tag.map(tag => {
            return <FixTag text = {tag} key = {tag} space = {2}/>
          })}
        </View>
        <Divider />
        <View style = {[
          styled.rowLayout,
        ]}>
          <Text style = { [styled.title, {marginBottom: setSpText(4)}] }>课程简介</Text>
          <ReadMore 
            numberOfLines={3}
            onReady={handleTextReady}
          >
            <Text style={styled.courseDetail}>
              {course.courseDetail}
            </Text>
          </ReadMore>
        </View>
        <Divider />
      </View>
    </ScrollView>
    <ScoreModal visible = { scoreVisible } setVisible = { setScoreVisible }/>
    <View style = { styled.bottomButton}>
      <TouchableOpacity
        style = { styled.scoreBtn}
        onPress = {() => setScoreVisible(true)}
      >
        <Text>查看成绩</Text>
      </TouchableOpacity>
    </View>
    </>
  )
}
const styled = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    paddingLeft: setSpText(6),
    paddingRight: setSpText(6),
  }, 
  bottomButton: {
    width: '100%',
    height: setSpText(30),
    borderTopWidth: setSpText(0.1),
    borderTopColor: '#333',
  },
  title: {
    fontSize: scaleSize(44),
    fontWeight: 'bold',
    marginTop: setSpText(2),
    marginBottom: setSpText(2),
  },
  courseName: {
    flex: 1,
    fontSize: scaleSize(35)
  },  
  rowLineLayout: {
    flexDirection: 'row',
    alignItems: 'center',
  },  
  rowLayout: {
    width:'100%',
    flex: 1,
  },
  courseDetail:{
    fontSize: scaleSize(40),
  },
  tagWrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }, 
  scoreBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})