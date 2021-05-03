import React, { Component, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native'
import Color from '~/assets/style/Color'
import DriverSvg from '~/assets/svg/Driver'
import CarMarkSvg from '~/assets/svg/CarMark'
import TimerSvg from '~/assets/svg/Timer'
import BackSvg from '~/assets/svg/Back'
import ScanSvg from '~/assets/svg/Scan'
import { setSpText, scaleSize} from '~/util/adapt'
import { paddingSize } from '~/util'
import { useAuth } from '~/context/useAuth'
import ReadMore from '~/component/ReadMore'
import Divider from '~/component/Divider'
import FixTag from '~/component/FixTag'
import TeacherBox from '~/component/TeacherBox'
import BetterBanner from '~/component/BetterBanner'
import AnimateCar from '~/component/AnimateCar'
import LineText from '~/component/LineText'
import HeaderTitle from '~/component/HeaderTitle'
import BottomButton from './BottomButton/index'
import Button from './BottomButton/Button'
import ScoreModal from './ScoreModal'
export default function Course () {
  const handleTextReady = () => {}
  const { userType } = useAuth()
  
  const course = {
    name: 'wangda',
    describe: '我是一个老师欸我是一个老师欸我是一个老师欸我是一个老师欸我是一个老师欸我是一个老师欸我是一个老师欸我是一个老师欸我是一个老师欸我是一个老师欸我是一个老师欸我是一个老师欸',
    courseName: '赛龙舟',
    courseDetail: '我是课程简介哦，这是课程简介，你想知道这堂课上什么内容嘛，看我就对了，那么让我们来看看这堂课到底上的什么内容呢，没错这堂课就是赛龙舟，怎么样很有趣吧',
    courseAddress: '福建省厦门市湖里区',
    tag: ['高','大','帅'],
    carPlan: {
      driverName: '王大锤',
      carMark: '闽EAE86',
      time: '2018-06-12 20:18:59',
    }
  }
  const [ scoreVisible, setScoreVisible ] = useState(false)
  return ( 
    <>
    <ScrollView style={styled.scroll}>
      <View>
        <HeaderTitle 
          tinkColor = {'white'}
          backgroundColor = {Color.header_title_blue}
          title = '课程详情' 
          prefix = {(
            <TouchableOpacity style = {{ marginLeft: setSpText(8) }} onPress = { () => navigator.goBack() }>
              <BackSvg size = {setSpText(10)} color = 'white'/>
            </TouchableOpacity>
          )}
          suffix = {
            userType == 2 ? (
              <TouchableOpacity style = {{ marginRight: setSpText(8) }} onPress = {() => {}}>
                <ScanSvg size = {setSpText(10)} color = 'white'/>
              </TouchableOpacity>
            ) : null
          }
        />
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
      <Divider margin = { setSpText(1) } color = 'transparent'/>
      <View style = {styled.container}>
        <TeacherBox 
          style = {{marginTop: setSpText(8)}}
          name = {course.name }
          describe = {course.describe }
        />
        <Divider/>
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
        <Divider/>
        {/* 出行安排 */}
        <View style = {[ 
          styled.rowLineLayout,{
            ...paddingSize(0,0,6,6),
          }
        ]}>
          <AnimateCar />
          <View style = {carStyle.rightContent}>
            { course.carPlan ? (
              <>
              <View style = { carStyle.rowItem }>
                <LineText 
                  label = {'司机:'} 
                  prefix = {<DriverSvg />} 
                  suffix = {<Text style = {{color: '#333'}}>{course.carPlan.driverName}</Text>}
                  margin = {2}
                />
                <LineText 
                  label = {'车牌号:'} 
                  prefix = {<CarMarkSvg color = '#3366CC' size = {16}/>} 
                  suffix = {<Text style = {{color: '#333'}}>{course.carPlan.carMark}</Text>}
                  margin = {2}
                />
              </View>
              <View style = {[ carStyle.rowItem,{
                paddingLeft: setSpText(4),
              }]}>
                <LineText 
                  label = {'时间:'} 
                  prefix = {<TimerSvg color = '#3366CC' size = {16}/>} 
                  suffix = {<Text style = {{color: '#333'}}>{course.carPlan.time}</Text>}
                  margin = {7}
                />
              </View>
              </>
            ) : (
              <Text>暂无出行安排</Text>
            )}
          </View>
        </View>
        <Divider/>
        {/* 课程简介 */}
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
      </View>
    </ScrollView>
    <ScoreModal visible = { scoreVisible } setVisible = { setScoreVisible }/>
    <BottomButton>
      <Button label = '查看成绩' onPress = {() => {
        setScoreVisible(true)
      }}/>
    </BottomButton>
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
    backgroundColor: 'white',
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
const carStyle = StyleSheet.create({
  rightContent: {
    flex: 1,
    ...paddingSize(0,0,10,15)
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})