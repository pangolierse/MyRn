import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { List, SwipeAction } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/core';
import { paddingSize } from '~/util'
import { 
  useToUserDetail,
  useToTeacherClassListScore } from '~/router/utils'
import defaultImage from '~/assets/img/default.jpg'
import EnterSvg from '~/assets/svg/Enter'
export default function StudentBox ({
  id,
  name,
  phone,
  dormitory,
  onPress = () => {}
}) {
  const placeholder = '--'
  const navigator = useNavigation()
  const rightOperate = [
    {
      text: '学生详情',
      onPress: () => {
        useToUserDetail( navigator, id)
      },
      style: { backgroundColor: '#4f66f8', color: 'white' },
    },
    {
      text: '学生课程',
      onPress: () => {
        useToTeacherClassListScore(navigator, id)
      },
      style: { backgroundColor: '#fc8d0f', color: 'white' },
    },
  ];
  return (
    <SwipeAction
      autoClose
      style={ styles.operate }
      right={rightOperate}
    >
      <View style = { styles.userContainer }>
        <Image style = { styles.image } source = { defaultImage }/>
        <View style = { styles.userInfoWrapper }>
          <View style = { styles.infoItem }>
            <Text style = { styles.title }>姓名: </Text>
            <Text style = { styles.label }>{name || placeholder}</Text>
            
            <Text style = {[ styles.title, { marginLeft: setSpText(5) } ]}>宿舍: </Text>
            <Text 
              style = { styles.labelellipse } 
              ellipsizeMode = 'tail' 
              numberOfLines = {1}
            >
              { dormitory || placeholder}
            </Text>
          </View>
          <View style = {[ 
            styles.infoItem,{
              marginTop: setSpText(5),
            }
          ]}>
            <Text style = { styles.title }>联系方式: </Text>
            <Text style = { styles.label }>{phone || placeholder}</Text>
          </View>
        </View>
      </View>
    </SwipeAction>
  )
}

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: setSpText(10),
    borderBottomLeftRadius: setSpText(10),
    borderWidth: setSpText(0.1),
    borderColor: '#ccc',
    backgroundColor: 'rgba(255,255,255,0.3)',
    
  },
  image: {
    height: setSpText(40),
    width: setSpText(40),
    borderRadius: setSpText(10),
  },
  userInfoWrapper: {
    ...paddingSize(10,10,10,10),
    justifyContent: 'center',
  },
  infoItem: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    marginRight: setSpText(4),
  },
  labelellipse: {
    width: setSpText(70)
  },
  operate: {
    marginTop: setSpText(5),
    backgroundColor: 'transparent',
  }
})