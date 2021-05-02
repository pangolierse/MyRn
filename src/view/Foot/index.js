import React, { Component, useCallback, useState } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { MapView, Marker, Polyline, Polygon } from 'react-native-amap3d';
import Color from '~/assets/style/Color'
import QrSvg from '~/assets/svg/Qr'
import { useToCreateDynamic } from '~/router/utils'
import HeaderTitle from '~/component/HeaderTitle'
import PreView from './Comps/PreView'
const fakeInfo = [{
  id: 123,
  nickName: 'Pango',
  courseName: '赛龙舟赛龙舟赛龙舟赛龙舟赛龙舟赛龙舟',
  time: '2012-02-12 16:03:55',
  content: '我是动态',
  latitude: 39.91095,
  longitude: 115.37296
},{
  id: 1234,
  nickName: 'Pango',
  courseName: '赛龙舟赛龙舟赛龙舟赛龙舟赛龙舟赛龙舟',
  time: '2012-02-12 16:03:55',
  content: '我是动态',
  latitude: 39.91095,
  longitude: 116.37296
},{
  id: 12345,
  nickName: 'Pango',
  courseName: '赛龙舟赛龙舟赛龙舟赛龙舟赛龙舟赛龙舟',
  time: '2012-02-12 16:03:55',
  content: '我是动态',
  latitude: 38.91095,
  longitude: 116.37296
}]
export default function StudentDynamic () {
  const navigator = useNavigation()
  const createDynamic = () => {
    useToCreateDynamic(navigator)
  }
  const polyLines = useCallback(() => {
    return fakeInfo.map(item => {
      return {
        latitude: item.latitude,
        longitude: item.longitude
      }
    })
  }, [coordinate])
  const coordinate = {
    latitude: 39.706901,
    longitude: 116.397972,
  }
  return ( 
    <View style = { styled.container }>
      <HeaderTitle 
        tinkColor = {'white'}
        backgroundColor = {Color.header_title_blue}
        title = '足迹' 
        suffix = {(
          <TouchableOpacity style = { styled.createButton } onPress = { createDynamic }>
            <QrSvg size = { setSpText(12) } color = '#dbdbdb'/>
          </TouchableOpacity>
        )}
      />
      <MapView
        style = { styled.mapView }
        center={{
          latitude: 39.91095,
          longitude: 116.37296
        }}
      >
        {fakeInfo.map( item => {
          return (
            <MapView.Marker
              key = { item.id }
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
