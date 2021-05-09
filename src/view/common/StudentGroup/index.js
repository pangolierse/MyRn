import React, { Component, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { paddingSize, marginSize } from '~/util'
import { setSpText, scaleSize} from '~/util/adapt'
import { useAuth } from '~/context/useAuth'
import { useGroup } from '~/api/personServer'
import { useToUserDetail } from '~/router/utils'
import BackSvg from '~/assets/svg/Back'
import HeaderTitle from '~/component/HeaderTitle'
import Divider from '~/component/Divider'
import EmptyView from '~/component/EmptyView'
import StudentGroupBox from '~/component/StudentGroupBox'
import Color from '~/assets/style/Color'
import { avatarUrl } from '../../../util'

export default function StudentGroup () {
  const navigator = useNavigation()
  const { data: {groupMsg, groupStudents}, isLoading } = useGroup()
  useEffect(() => {
    console.log(groupMsg);
    console.log(groupStudents);
  }, [groupMsg])
  return isLoading ? 
    (
      <EmptyView color = 'black'/>
    ) : (
    <ScrollView style = {{ flex: 1, backgroundColor: 'white'}}>
      <HeaderTitle 
        tinkColor = {'white'}
        backgroundColor = {Color.header_title_blue}
        title = '小组成员' 
        prefix = {(
          <TouchableOpacity style = { styled.back } onPress = { () => navigator.goBack() }>
            <BackSvg size = {setSpText(10)} color = 'white'/>
          </TouchableOpacity>
        )}
      />
      <View style = { styled.wrapper}>
        <Divider text = '小组信息' margin = {setSpText(6)}/>
        <View style = { styled.dormitory }>
          <View style = {[ styled.rowItem, { ...paddingSize(0,0,10,30) } ]}>
            <Text style = { styled.title} >宿舍名：<Text style = { styled.value} >{groupMsg?.groupname}</Text></Text>
            <Text style = { styled.title} >人数：<Text style = { styled.value} >{groupMsg?.groupnumber}</Text></Text>
          </View>
        </View>
        <Divider text = '成员信息' margin = {setSpText(10)}/>
        {groupStudents?.map( student => {
          return (
            <StudentGroupBox 
              key = { student?.user_id }
              style = {{marginTop: setSpText(6)}}
              imgSrc = { student?.avatar_name ? avatarUrl(student?.avatar_name) : ''}
              nickName = { student?.nick_name }
              age = { student?.age }
              email = { student?.email }
              phone = { student?.phone }
              onPress = {() => useToUserDetail(navigator, student?.user_id)}
            />
          )
        })}
      </View>
    </ScrollView>
    )
}
const styled = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: setSpText(10),
    ...paddingSize(0,0,10,10)
  },
  back: {
    marginLeft: setSpText(8)
  },
  dormitory: {
  },
  rowItem: {
    flexDirection: 'row',
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