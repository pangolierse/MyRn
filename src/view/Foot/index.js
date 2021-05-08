import React, { Component, useCallback, useEffect, useState } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { MapView, Marker, Polyline, Polygon } from 'react-native-amap3d';
import { useAuth } from '~/context/useAuth'
import { useFootInfo } from '~/api/footServer'
import Color from '~/assets/style/Color'
import QrSvg from '~/assets/svg/Qr'
import { useToQR } from '~/router/utils'
import HeaderTitle from '~/component/HeaderTitle'
import PreView from './Comps/PreView'
const fakeInfo = [{
  id: 123, // 学生Id
  nickName: 'Pango', // 学生姓名
  courseName: '赛龙舟赛龙舟赛龙舟赛龙舟赛龙舟赛龙舟', // 课程名称
  time: '2012-02-12 16:03:55', // 签到时间
  latitude: 39.91095, // x坐标
  longitude: 115.37296, // y坐标
},{
  id: 1234,
  nickName: 'Pango',
  courseName: '赛龙舟赛龙舟赛龙舟赛龙舟赛龙舟赛龙舟',
  time: '2012-02-12 16:03:55',
  latitude: 39.91095,
  longitude: 116.37296,
},{
  id: 12345,
  nickName: 'Pango',
  courseName: '赛龙舟赛龙舟赛龙舟赛龙舟赛龙舟赛龙舟',
  time: '2012-02-12 16:03:55',
  latitude: 38.91095,
  longitude: 116.37296,
}]
// {"classroomcode": "201", "classroomname": "沙画教室1", "coursename": "沙画", "dayid": 1, "latitude": 40, "longitude": 116, "pk_courseid": 7, "pk_rfid": 1, "sectionid": 1, "signindate": "2021-05-04 23:33:19", "weekid": 1}
export default function StudentDynamic () {
  const navigator = useNavigation()
  const { user } = useAuth()
  const { footRecord } = useFootInfo(user?.id)
  useEffect(() => {
    console.log('足迹界面');
    console.log(footRecord);
  },[footRecord])
  const showQR = () => {
    useToQR(navigator)
  }
  const polyLines = useCallback(() => {
    return footRecord?.map(item => {
      return {
        latitude: item.latitude,
        longitude: item.longitude
      }
    }) || []
  }, [footRecord])
  return ( 
    <View style = { styled.container }>
      <HeaderTitle 
        tinkColor = {'white'}
        backgroundColor = {Color.header_title_blue}
        title = '足迹' 
        suffix = {(
          <TouchableOpacity style = { styled.createButton } onPress = { showQR }>
            <QrSvg size = { setSpText(12) } color = '#dbdbdb'/>
          </TouchableOpacity>
        )}
      />
      <MapView
        style = { styled.mapView }
      >
        {footRecord?.map( item => {
          return (
            <MapView.Marker
              key = { item.pk_rfid }
              draggable
              title="这是一个可拖拽的标记"
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude
              }}
            >
              <PreView viewProp = {item}/>
            </MapView.Marker>
          )
        })}
        <MapView.Polyline
          color = '#3b94f1'
          width = { setSpText(1) }
          coordinates = {polyLines()}
        />
      </MapView>
    </View>
  )
}
const styled = StyleSheet.create({
  container: {
    flex: 1,
  },
  createButton: {
    paddingLeft: setSpText(6),
    paddingRight: setSpText(6),
  },
  mapView: {
    flex:1,
  }
})
