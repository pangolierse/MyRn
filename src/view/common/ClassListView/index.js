import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { setSpText, scaleSize} from '~/util/adapt'
import { paddingSize } from '~/util'
import { useClassListInfo } from '~/api/courseServer'
import { 
  useToClassScore,
} from '~/router/utils'
import BackSvg from '~/assets/svg/Back'
import HeaderTitle from '~/component/HeaderTitle'
import UserBox from '~/component/UserBox'
import EmptyView from '~/component/EmptyView'
import Color from '~/assets/style/Color'
import { isVoid } from '../../../util'
export default function ClassListView () {
  const navigator = useNavigation()
  const { classList } = useClassListInfo(null, '2')
  const statusMap = [
    '未录入',
    '已录入'
  ]
  const typeMap = [
    '室内课',
    '室外课'
  ]
  const enterDetail = (id) => {
    useToClassScore(navigator, id)
  }
  return ( 
    <View style = {{ flex: 1 }}>
      <HeaderTitle 
        tinkColor = {'white'}
        backgroundColor = {Color.header_title_blue}
        title = '开课班级列表' 
        prefix = {(
          <TouchableOpacity style = { styled.cancel } onPress = { () => navigator.goBack() }>
            <BackSvg size = {setSpText(12)} color = 'white' />
          </TouchableOpacity>
        )}
      />
      <View style = {[ styled.wrapper ]}>
      { isVoid(classList) ? (
        <EmptyView />
      ) : (
        <FlatList 
          keyExtractor = { item => item.pk_ocid}
          data = { classList || []}
          renderItem = { ({item}) => {
            return (
              <TouchableOpacity style = { styled.renderWrapper } onPress = {() => {
                enterDetail(item.pk_ocid)
              }}>
                <View style = { styled.leftWrapper }>
                  <View style = { styled.columnItem }>
                    <Text style = { styled.title}>课程名：<Text style = { styled.value }>{item.coursename}</Text></Text>
                    <Text style = { styled.title}>班级名：<Text style = { styled.value }>{item.ocname}</Text></Text>
                  </View>
                  <View style = { styled.columnItem }>
                    <Text style = { styled.title}>类型：<Text style = { styled.value }>{!isVoid(item.octype) ? typeMap[item.octype] : '未知'}</Text></Text>
                    <Text style = { styled.title}>人数：<Text style = { styled.value }>{item.ocnumber}</Text></Text>
                  </View>
                </View>
                <View style = { styled.rightWrapper }>
                  <Text style = { styled.scoreStatus}>成绩录入状态</Text>
                  <Text style = {[ styled.text, {
                    color: item.ocgradestatus === 0 ? 'red' : 'green'
                  }]}>{!isVoid(item.ocgradestatus) ? statusMap[item.ocgradestatus] : '未知'}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      )}
      </View>
    </View>
  )
}
const styled = StyleSheet.create({
  wrapper: {
    flex:1,
    ...paddingSize(6,0,10,10),
    backgroundColor: 'white',
  },
  cancel: {
    paddingLeft: setSpText(6),
  },
  renderWrapper: {
    marginTop: setSpText(4),
    height: setSpText(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...paddingSize(0,0,10,10),
    borderWidth: setSpText(0.1),
    borderColor: '#333',
    borderRadius: setSpText(8),
  },
  leftWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: setSpText(8),
  },
  rightWrapper: {
    alignItems: 'center',
  },
  scoreStatus:{
    fontSize: scaleSize(34),
    fontWeight: 'bold',
  },
  columnItem: {
    justifyContent: 'space-between',
  },
  title: {
    fontSize: scaleSize(32),
    fontWeight: 'bold',
  },
  value: {
    fontSize: scaleSize(26),
    fontWeight: 'normal',
  },
})