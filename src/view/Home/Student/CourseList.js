import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native'
import CourseRender from './RenderItem'
export default function  () {
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
            />
          )
        }}
      />
    </View>
  )
}
const styled = StyleSheet.create({
  container: {

  }
})