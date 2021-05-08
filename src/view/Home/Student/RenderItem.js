import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import { paddingSize } from '~/util'
import OneSvg from '~/assets/svg/NumberOne'
import TwoSvg from '~/assets/svg/NumberTwo'
import ThreeSvg from '~/assets/svg/NumberThree'
import FourSvg from '~/assets/svg/NumberFour'
import FiveSvg from '~/assets/svg/NumberFive'
import SixSvg from '~/assets/svg/NumberSix'
import SevenSvg from '~/assets/svg/NumberSeven'
import EightSvg from '~/assets/svg/NumberEight'
import NightSvg from '~/assets/svg/NumberNight'
export default function ({ 
  courseName,
  sectionTime,
  teacherName,
  roomName,
  onPress,
}) {
  const rangTime = {
    '1': <OneSvg />,
    '2': <TwoSvg />,
    '3': <ThreeSvg />,
    '4': <FourSvg />,
    '5': <FiveSvg />,
    '6': <SixSvg />,
    '7': <SevenSvg />,
    '8': <EightSvg />,
    '9': <NightSvg />,
  }
  const timeRange = {
    '1': '08:00 ~ 09:00',
    '2': '09:00 ~ 10:00',
    '3': '10:00 ~ 11:00',
    '4': '14:00 ~ 15:00',
    '5': '15:00 ~ 16:00',
    '6': '16:00 ~ 17:00',
    '7': '17:00 ~ 16:00',
    '8': '08:00 ~ 09:00',
    '9': '08:00 ~ 09:00',
  }
  return ( 
    <TouchableOpacity onPress={onPress}>
      <View style = {styled.container}>
        <View style = {styled.section }>
          {rangTime[sectionTime || 1]}
        </View>
        <View style = {styled.leftWrapper}>
          <View style = { styled.columnItemWrapper }>
            <Text style = { styled.title }>
              课程：  
              <Text style = { styled.value }>{courseName || '--'}</Text>
            </Text>
            <Text style = { styled.title }>
              老师：  
              <Text style = { styled.value }>{teacherName || '--'}</Text>
            </Text>
          </View>
          <View style = { styled.columnItemWrapper }>
            <Text style = { styled.title }>
              教室：  
              <Text style = { styled.value }>{roomName || '--'}</Text>
            </Text>
            {/* <Text style = { styled.title }>
              时间：  
              <Text style = { styled.value }>{timeRange[sectionTime || 1]}</Text>
            </Text> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
const RenderHeight = 50
const styled = StyleSheet.create({
  container: {
    width: '100%',
    height: setSpText(RenderHeight),
    flexDirection: 'row',
    ...paddingSize(10,10,10,10),
    backgroundColor: 'white',
    marginTop: setSpText(10),
    borderWidth: setSpText(0.1),
    borderColor: '#333',
    borderRadius: setSpText(8),
    borderStyle: 'dashed'
  },
  section: {
    width: setSpText(RenderHeight),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',    
    borderRightWidth: setSpText(0.1),
    borderRightColor: '#333',
    borderLeftWidth: setSpText(0.1),
    borderLeftColor: '#333',
    borderRadius: setSpText(8),

  },
  leftWrapper: {
    flex: 1,
    paddingLeft: setSpText(4),
    paddingRight: setSpText(4),
    ...paddingSize(10,10,10,10),
    justifyContent: 'space-between',
  },
  columnItemWrapper: {
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title:{
    fontWeight: 'bold',
    fontSize: scaleSize(32),
  },
  value:{
    fontWeight: 'normal',
    fontSize: scaleSize(30),
  }
})