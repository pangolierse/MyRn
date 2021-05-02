import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { paddingSize, marginSize } from '~/util'
import { setSpText, scaleSize} from '~/util/adapt'
import BackSvg from '~/assets/svg/Back'
import HeaderTitle from '~/component/HeaderTitle'
import TeacherBox from '~/component/TeacherBox'
import Divider from '~/component/Divider'
import BegBox from '~/component/BegBox'
import BetterBanner from '~/component/BetterBanner'
import Color from '~/assets/style/Color'
export default function StudentDormitory () {
  const navigator = useNavigation()
  const teacher = {
    id: 12,
    name: 'Pango',
    describe: '我是宿舍老师'
  }
  const dormitory = {
    name: '五社区五号楼403',
    total: 8,
    people: [
      {
        name: '小红',
        begMark: '1号床',
      },{
        name: '小李',
        begMark: '2号床',
      },{
        name: 'Pango',
        begMark: '3号床',
      },{
        name: '李明',
        begMark: '4号床',
      },{
        name: '胡桃',
        begMark: '5号床',
      },
    ]
  }
  const commit = () => {

  }
  return ( 
    <View style = {{ flex: 1 }}>
      <HeaderTitle 
        tinkColor = {'white'}
        backgroundColor = {Color.header_title_blue}
        title = '宿舍' 
        prefix = {(
          <TouchableOpacity style = { styled.cancel } onPress = { () => navigator.goBack() }>
            <BackSvg size = {setSpText(10)} color = 'white'/>
          </TouchableOpacity>
        )}
      />
      <View style = {[ styled.wrapper ]}>
        <BetterBanner
          bannerHeight = { setSpText(100) }
          bannerComponents={[
            <View style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#1997fc',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{fontSize: 35, color: '#fff', marginBottom: 10}}>Page 01</Text>
            </View>,
            <View style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#da578f',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{fontSize: 35, color: '#fff', marginBottom: 10}}>Page 02</Text>
            </View>,
            <View style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#7c3fe4',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{fontSize: 35, color: '#fff', marginBottom: 10}}>Page 03</Text>
            </View>,
          ]}
          isSeamlessScroll={true}
        />
        <Divider text = '宿舍详情' width = '95%' margin = {10} color = {Color.header_title_blue}/>
        <View style = { styled.dormitoryDetail }>
          <View style = { styled.dormitoryDetailWrapper }>
            <View style = { styled.detailRowItem }>
              <Text style = {{
                fontSize: scaleSize(36),
                fontWeight: 'bold',
                marginRight: setSpText(4),
              }}>宿舍名称: </Text>
              <Text>{ dormitory.name }</Text>
            </View>
            <View style = { styled.detailRowItem }>
              <Text style = {{
                fontSize: scaleSize(36),
                fontWeight: 'bold',
                marginRight: setSpText(4),
              }}>宿舍人数: </Text>
              <Text>{ dormitory.total }人</Text>
            </View>
          </View>
        </View>
        <Divider text = '负责人' width = '95%' color = {Color.header_title_blue}/>
        <TeacherBox 
          style = {{
            ...paddingSize(0,0,10,10)
          }}
          id = { teacher.id }
          name = { teacher.name }
          describe = { teacher.describe }
        />
        <Divider text = '宿舍成员' width = '95%' color = {Color.header_title_blue}/>
        <View style = {[
          styled.begWrapper,{
            ...paddingSize(0,0,10,10)
          }
        ]}>
          {dormitory?.people.map( people => {
            return (
              <BegBox 
                key = { people.name + 'beg'}
                name = { people.name }
                locate = { people.begMark }
                active = { people.name === 'Pango' }
              />
            )
          })}
        </View>
      </View>
    </View>
  )
}
const styled = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  begWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dormitoryDetail: {

  },
  dormitoryDetailWrapper: {
    ...paddingSize(6,6,10,10),
  },
  detailRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    ...marginSize(4,4,0,0)
  }
})