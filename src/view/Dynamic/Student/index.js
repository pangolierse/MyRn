import React, { Component, useState } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import Color from '~/assets/style/Color'
import { useToCreateDynamic } from '~/router/utils'
import HeaderTitle from '~/component/HeaderTitle'
import Divider from '~/component/Divider'
import IImage from '~/component/IImage'
import ImageViewer from '~/component/ImageViewer'
import UserBox from '~/component/UserBox'
const fakeInfo = [{
  id: 123,
  nickName: 'Pango',
  time: '2012-02-12',
  content: '我是动态',
  avatar: '',
  imgs: ['','','','','','',''],
},{
  id: 1234,
  nickName: 'Pango',
  time: '2012-02-12',
  content: '我是动态',
  avatar: '',
  imgs: ['','',''],
},{
  id: 12345,
  nickName: 'Pango',
  time: '2012-02-12',
  content: '我是动态',
  avatar: '',
  imgs: ['','',''],
}]
export default function StudentDynamic () {
  const [ page, setPage ] = useState(1)
  const [ limit, setLimit ] = useState(10)
  const [ activeImgs, setActiveImgs ] = useState([])
  const [ imgsModal, setImgsModal ] = useState(false)
  const navigator = useNavigation()
  const createDynamic = () => {
    useToCreateDynamic(navigator)
  }
  const showImage = (imgs) => {
    setActiveImgs(imgs)
    setImgsModal(true)
  }
  return ( 
    <View style = { styled.container }>
      <ImageViewer 
        imgs = { activeImgs }
        visible = { imgsModal }
        setVisible = { setImgsModal }
      />
      <HeaderTitle 
        tinkColor = {'white'}
        backgroundColor = {Color.header_title_blue}
        title = '动态' 
        suffix = {(
          <TouchableOpacity style = { styled.createButton } onPress = { createDynamic }>
            <Text style = {[styled.create, { color: 'white'}]}>+</Text>
          </TouchableOpacity>
        )}
      />
      <FlatList
        ItemSeparatorComponent={() => <Divider color = 'transparent' margin = {setSpText(1.5)}/>}
        keyExtractor={(item) => item.id}
        data={fakeInfo}
        renderItem={({ item, index, separators }) => (
          <View style = { styled.dynamicWrapper}>
            <UserBox 
              id = { item.id }
              name = { item.nickName }
              time = { item.time }
            />
            <View style = { styled.contentWrapper }>
              <Text 
                ellipsizeMode = 'tail'
                numberOfLines = {Number.MAX_SAFE_INTEGER}
              > { item.content } </Text>
            </View>
            
            <View style = {styled.imgWrapper}>
              {item?.imgs.map( (img, index, array) => {
                return (
                  <IImage src = {img} key = {img + index} onClick = {() => showImage(array)}/>
                )
              })}
            </View>
          </View>
        )}
      />
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
  create:{
    fontSize: scaleSize(70),
    fontWeight: 'bold',
  },
  dynamicWrapper: {
    backgroundColor: 'white',
    paddingTop: setSpText(6),
    paddingBottom: setSpText(6),
    paddingLeft: setSpText(6),
    paddingRight: setSpText(6),
  },
  userWrapper: {
    flexDirection: 'row',
  },
  userImage: {
    width: setSpText(24),
    height: setSpText(24),
    borderRadius: setSpText(12),
  },
  userInfo: {
    marginLeft: setSpText(10),
    justifyContent: 'space-between'
  },
  userTime: {
    color: '#333',
    opacity: 0.5,
  },
  contentWrapper: {
    marginTop: setSpText(8),
    fontSize: scaleSize(25),
  },
  imgWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: setSpText(6),
  }
})