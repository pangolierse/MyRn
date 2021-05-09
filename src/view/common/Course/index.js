import React, { Component, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'
import Color from '~/assets/style/Color'
import DriverSvg from '~/assets/svg/Driver'
import CarMarkSvg from '~/assets/svg/CarMark'
import TimerSvg from '~/assets/svg/Timer'
import BackSvg from '~/assets/svg/Back'
import ScanSvg from '~/assets/svg/Scan'
import PhoneColorSvg from '~/assets/svg/PhoneColor'
import { setSpText, scaleSize} from '~/util/adapt'
import { paddingSize } from '~/util'
import { useAuth } from '~/context/useAuth'
import { 
  useToScanQR,
  useToCourseMemberDetail } from '~/router/utils'
import { useCourseDetail } from '~/api/courseServer'
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
import { avatarUrl, isVoid } from '../../../util'
const StudentType = '4'
const TeacherType = '2'
export default function Course () {
  const { userType } = useAuth()
  const navigator = useNavigation()
  const courseId = useRoute().params?.courseId
  const { courseInfo, carInfo, isLoading } = useCourseDetail(courseId)
  const [ scoreVisible, setScoreVisible ] = useState(false)
  const showCourseMember = () => {
    useToCourseMemberDetail(navigator, courseId)
  }
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
            userType == TeacherType ? (
              <TouchableOpacity style = {{ marginRight: setSpText(8) }} onPress = {() => useToScanQR(navigator, courseId)}>
                <ScanSvg size = {setSpText(10)} color = 'white'/>
              </TouchableOpacity>
            ) : null
          }
        />
        {/* <BetterBanner
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
        /> */}
      </View>
      <View style = {styled.container}>
        <Divider text='课程教师' margin = { setSpText(8) }/>
        <TeacherBox 
          style = {{marginTop: setSpText(8)}}
          name = { courseInfo?.nick_name }
          phone = { courseInfo?.phone }
          avatar = { courseInfo?.avatar_name}
          gender = { courseInfo?.gender }
        />
        <Divider/>
        <View style = {[ 
          styled.rowLineLayout,
        ]}>
          <Text style = {[ styled.title, {marginRight: setSpText(8)}]}>课程名称:</Text>
          <Text style = { styled.courseName }>{courseInfo?.coursename}</Text>
        </View>
        
        <View style = {[ 
          styled.rowLineLayout,
        ]}>
          <Text style = {[ styled.title, {marginRight: setSpText(8)}]}>地点:</Text>
          <Text style = { styled.courseName }>{courseInfo?.classroomaddress}</Text>
        </View>
        {/* <View style={[
          styled.rowLineLayout,
          styled.tagWrapper,
        ]}>
          <Text style={[styled.title, {marginRight: setSpText(4)}]}>标签:</Text>
          {course?.tag.map(tag => {
            return <FixTag text = {tag} key = {tag} space = {2}/>
          })}
        </View> */}
        <Divider/>
        {/* 出行安排 */}
        <View style = {[ 
          styled.rowLineLayout,{
            ...paddingSize(0,0,6,6),
          }
        ]}>
          <AnimateCar />
          <View style = {carStyle.rightContent}>
            { isLoading ? (
              <Text style = {{
                fontWeight: 'bold',
                fontSize: scaleSize(32),
              }}>加载中...</Text>
            ) : !isVoid(carInfo) ? (
              <>
              <View style = { carStyle.rowItem }>
                <LineText 
                  label = {'司机:'} 
                  prefix = {<DriverSvg />} 
                  suffix = {<Text style = {{color: '#333'}}>{carInfo?.drivername}</Text>}
                  margin = {2}
                />
                <LineText 
                  label = {'车牌号:'} 
                  prefix = {<CarMarkSvg color = '#3366CC' size = {16}/>} 
                  suffix = {<Text style = {{color: '#333'}}>{carInfo?.carname}</Text>}
                  margin = {2}
                />
              </View>
              <View style = {[ carStyle.rowItem,{
                paddingLeft: setSpText(4),
              }]}>
                <LineText 
                  label = {'联系方式:'} 
                  prefix = {<PhoneColorSvg color = '#3366CC' size = {16}/>} 
                  suffix = {<Text style = {{color: '#333'}}>{carInfo?.driverphone}</Text>}
                  margin = {7}
                />
              </View>
              </>
            ) : (
              <Text style = {{
                fontWeight: 'bold',
                fontSize: scaleSize(32),
              }}>无出行安排</Text>
            )}
          </View>
        </View>
        {/* 课程简介 */}
        <View style = {[
          styled.rowLayout,
        ]}>
          <Divider text = '课程简介' margin = {setSpText(10)}/>
          <Text style={styled.courseDetail}>
            {courseInfo?.coursecontent || '暂无'}
          </Text>
        </View>
      </View>
      </ScrollView>
      {/* <ScoreModal 
        visible = { scoreVisible } 
        setVisible = { setScoreVisible }
      /> */}
      <BottomButton>
        { userType == TeacherType ? (
          <Button label = '查看班级成员' onPress = {showCourseMember}/>
        ) : null}
      </BottomButton>
    </>
  )
}
const styled = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex:1,
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