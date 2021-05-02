import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CourseRender from './RenderItem'
import { useToCourseDetail } from '~/router/utils'
export default function  () {
  const navigator = useNavigation()
  return ( 
    <View style = {styled.container}>
      <FlatList 
        data = {[
          {key: 'hah1'},
          {key: 'hah2'},
          {key: 'hah3'},
          {key: 'hah4'},
          {key: 'hah5'},
          {key: 'hah6'},
          {key: 'hah7'},
          {key: 'hah8'},
          {key: 'hah9'},
          {key: 'hah0'},
          {key: 'hah-'},
          {key: 'hah='},
          {key: 'hah121323'},
          {key: 'hah123'},
        ]}
        renderItem = { item => {
          return (
            <CourseRender 
              onPress = { () => useToCourseDetail(navigator, 12) }
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