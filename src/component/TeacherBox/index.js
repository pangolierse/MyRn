import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useToUserDetail } from '~/router/utils'
import { isVoid, marginSize } from '~/util'
import defaultImg from '~/assets/img/default.jpg'

export default function TeacherBox ({
  id = 1,
  style = {},
  avatar,
  name,
  gender,
  phone
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
        <Image style = { styles.image } source = {isVoid(avatar) ? defaultImg : { uri: avatar}}/>
        <View style = { styles.textWrapper }>
          <View style = {[ styles.detailRowItem,{
            justifyContent: 'space-between'
          }]}>
            <View style = {{flexDirection: 'row'}}>
              <Text style = {{
                  fontSize: scaleSize(36),
                  fontWeight: 'bold',
                  marginRight: setSpText(4),
                }}
              >名称: </Text>
              <Text style = { styles.name }>{name}</Text>
            </View>
            <View style = {{flexDirection: 'row', marginRight: setSpText(10)}}>
              <Text style = {{
                  fontSize: scaleSize(36),
                  fontWeight: 'bold',
                  marginRight: setSpText(4),
                  marginLeft: setSpText(8),
                }}
              >性别: </Text>
              <Text style = { styles.name }>{gender}</Text>
            </View>
          </View>
          <View style = { styles.detailRowItem }>
          <Text style = {{
                fontSize: scaleSize(36),
                fontWeight: 'bold',
                marginRight: setSpText(4),
              }}
            >联系方式: </Text>
            <Text style = { styles.name }>{phone}</Text>
          </View>
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
    fontSize: scaleSize(32),
  },
  describe: {
    
  },
  detailRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    ...marginSize(4,4,0,0)
  }
})