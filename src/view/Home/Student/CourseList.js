import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CourseRender from './RenderItem'
import { useToCourseDetail } from '~/router/utils'
export default function  ({
  dataSource,
}) {
  const navigator = useNavigation()
  return ( 
    <View style = {styled.container}>
      <FlatList 
        keyExtractor = { (item,index) => {
          return item.pk_arrangeid + index + 'key'
        }}
        data = {dataSource || []}
        renderItem = { ({item}) => {
          return (
            <CourseRender 
              teacherName = {item.nick_name}
              courseName = { item.coursename }
              sectionTime = { item.sectionid }
              roomName = { `${item.classroomname}-${item.classroomcode}` }
              onPress = { () => useToCourseDetail(navigator, item.pk_arrangeid, item.pk_ocid) }
            />
          )
        }}
      />
    </View>
  )
}
const styled = StyleSheet.create({
  container: {
    flex: 1,
  }
})