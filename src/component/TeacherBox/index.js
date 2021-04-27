import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useToUserDetail } from '~/router/utils'
import defaultImg from '~/assets/img/default.jpg'

export default function TeacherBox ({
  id = 1,
  style = {},
  imgSrc = defaultImg,
  name,
  describe,
}) {
  const navigator = useNavigation()
  const onPress = () => {
    useToUserDetail(navigator, id)
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View style = {[ 
        styles.teacherWrapper,
        style, 
      ]}>
        <Image style = { styles.image } source = {imgSrc}/>
        <View style = { styles.textWrapper }>
          <Text style = { styles.name }>{name}</Text>
          <Text style = { styles.describe } numberOfLines = {2} ellipsizeMode = 'tail'>{describe}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
const height = 40
const styles = StyleSheet.create({
  teacherWrapper: {
    height: setSpText(height),
    flexDirection: 'row',
    marginTop: setSpText(4),
    marginBottom: setSpText(4),
  },
  image: {
    height: '100%',
    width: setSpText(height),
    borderRadius: setSpText(10),
    marginRight: setSpText(10),
  },
  textWrapper: {
    flex: 1,
  },
  name: {
    fontSize: scaleSize(40),
    fontWeight: 'bold',
    marginBottom: setSpText(4),
  },
  describe: {
    
  }
})