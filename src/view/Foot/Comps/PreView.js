import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Search from '~/assets/svg/Search'
import BetterBanner from '~/component/BetterBanner'
import { paddingSize } from '~/util'
import { useToCourseDetail } from '~/router/utils'
import { useNavigation } from '@react-navigation/core'
export default function PreView ({
  viewProp,
}) {
  const navigator = useNavigation()
  const onPress = () => {
    useToCourseDetail(navigator, viewProp.id)
  }
  return ( 
    <View style = { styled.positionWrapper }>
      <View style = { styled.betterBanner }>
        <BetterBanner
          bannerComponents={[
            <View style={{
              width: setSpText(30),
              height: setSpText(30),
              backgroundColor: '#1997fc',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{fontSize: 15, color: '#fff', marginBottom: 10}}>Page 01</Text>
            </View>,
            <View style={{
              width: setSpText(30),
              height: setSpText(30),
              backgroundColor: '#da578f',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{fontSize: 15, color: '#fff', marginBottom: 10}}>Page 02</Text>
            </View>,
            <View style={{
              width: setSpText(30),
              height: setSpText(30),
              backgroundColor: '#7c3fe4',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{fontSize: 15, color: '#fff', marginBottom: 10}}>Page 03</Text>
            </View>,
          ]}
          isSeamlessScroll={true}
        />
      </View>
      <View style = { styled.rightContent }>
        <View style = { styled.courseInfo }>
          <View style = { styled.infoItem }>
            <Text style = { styled.title }>课程名称:</Text>
            <Text style = { styled.label } ellipsizeMode = 'tail' numberOfLines = {1}>{viewProp.courseName}</Text>
          </View>
          <View style = { styled.infoItem }>
            <Text style = { styled.title }>时间:</Text>
            <Text style = { styled.label } ellipsizeMode = 'tail' numberOfLines = {1}>{viewProp.time}</Text>
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
    height: setSpText(30 + 12),
    width: setSpText(viewWidth + 12),
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: setSpText(6),
    borderRadius: setSpText(8),
  },
  betterBanner: {
    width: setSpText(30),
    height: setSpText(30),
  },
  rightContent: {
    flex: 1,
    position: 'absolute',
    height: setSpText(30),
    width: setSpText(viewWidth - 30),
    right: setSpText(0),
    top: setSpText(6),
    zIndex: 99,
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
  }
})