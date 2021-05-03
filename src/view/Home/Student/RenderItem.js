import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import defaultImg from '~/assets/img/default.jpg'
export default function ({ 
  src = defaultImg, 
  title = '课程名称',
  timeRange = '8:00 ~ 9:00',
  introduction = '我是介绍吖我是介绍吖我是介绍吖我是介绍吖我是介绍吖我是介绍吖我是介绍吖我是介绍吖我是介绍吖我是介绍吖我是介绍吖我是介绍吖我是介绍吖我是介绍吖我是介绍吖我是介绍吖',
  onPress,
}) {
  return ( 
    <TouchableOpacity onPress={onPress}>
      <View style = {styled.container}>
        <Image 
          style = { styled.img }
          source = {src || defaultImg}
        />
        <View style = {styled.leftWrapper}>
          <View style = { styled.titleWrapper }>
            <Text style = { styled.title }>课程名称:  {title}</Text>
            <Text style = { styled.time }>时间:  {timeRange}</Text>
          </View>
          <View style = { styled.contentWrapper }>
            <Text 
              ellipsizeMode= {'tail'}
              numberOfLines= {2}
            >{introduction}</Text>
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
    paddingLeft: setSpText(4),
    paddingRight: setSpText(4),
    paddingTop: setSpText(4),
    paddingBottom: setSpText(4),
  },
  img: {
    height: '100%',
    width: setSpText(RenderHeight),
    borderRadius: setSpText(4),
  },
  leftWrapper: {
    flex: 1,
    paddingLeft: setSpText(4),
    paddingRight: setSpText(4),
  },
  titleWrapper: {
    width:'100%',
    height: setSpText(15),
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentWrapper: {
    flex: 1,
  },
  content: {
  }
})