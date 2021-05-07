import React, { Component, useEffect, useState } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useToCreateDynamic } from '~/router/utils'
import Color from '~/assets/style/Color'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { ImagePicker } from '@ant-design/react-native'
import { avatarUrl } from '~/util'
import { dynamicInfo } from '~/api/dynamicServer'
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
export default function Dynamic () {
  const [ activeImgs, setActiveImgs ] = useState([])
  const [ imgsModal, setImgsModal ] = useState(false)
  // 数据获取控件
  const [ page, setPage ] = useState(1)
  const [ limit, setLimit ] = useState(10)
  const { isLoading, content, empty, updateInfo } = dynamicInfo(page,limit)
  const [ dynamics, setDynamics] = useState([])
  
  const navigator = useNavigation()
  useEffect(() => {
    setDynamics(filterDynamic(content))
  }, [content])
  useEffect(() => {
    updateInfo()
  }, [ page ])
  const filterDynamic = (data) => {
    data?.map( item => {
      if(dynamics.findIndex(dynamic => {
        return dynamic.pkRaid === item.pkRaid
      }) < 0){
        dynamics.push(item)
      }
    })
    return dynamics
  }
  const createDynamic = () => {
    useToCreateDynamic(navigator)
  }
  const showImage = (imgs) => {
    setActiveImgs(imgs)
    setImgsModal(true)
  }
  const onHeaderRefresh = () => {
    setPage(1)
  }
  const loadMoreData = () => {
    !empty && setPage(page + 1)
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
      <ImagePicker />
      <RefreshListView 
        data = { dynamics }
        keyExtractor = {(item, index) => index.toString()}
        refreshState = { 
          empty 
          ? RefreshState.NoMoreData 
          : isLoading
          ? RefreshState.FooterRefreshing 
          : RefreshState.Idle}
        onHeaderRefresh = { onHeaderRefresh }
        onFooterRefresh = { loadMoreData }
        renderItem={({ item: {personMsg, ...prop}}) => (
          <>
          <View style = { styled.dynamicWrapper} key = {prop.pkRaid + 'dynamic'}>
            <UserBox 
              id = { personMsg.id }
              name = { personMsg.nickName }
              time = { prop.createTime }
            />
            <View style = { styled.contentWrapper }>
              <Text 
                ellipsizeMode = 'tail'
                numberOfLines = {Number.MAX_SAFE_INTEGER}
              > { prop.racontent } </Text>
            </View>
            <View style = {styled.imgWrapper}>
              {prop?.researchactionPhotos.map( (img, index, array) => {
                return (
                  <IImage 
                    key = {img.photoPath + index}
                    style = {{margin: setSpText(2)}}
                    src = {img.photoPath} 
                    onClick = {() => showImage(array)}
                  />
                )
              })}
            </View>
          </View>
          <Divider color = 'transparent' margin = {setSpText(1.5)}/>
          </>
        )}
      />
      {/* <FlatList
        // 下拉刷新
        refreshing = { isLoading }
        onRefresh = { onRefresh }
        // 上拉加载
        ListFooterComponent={(
          <View style={styled.loadMore}>
            <Text>正在加载更多</Text>
          </View>
        )}
        onEndReached={() => loadMoreData()}
        ItemSeparatorComponent={() => <Divider color = 'transparent' margin = {setSpText(1.5)}/>}
        keyExtractor={(item) => item.id}
        data={dynamics || []}
        renderItem={({ item: {personMsg, ...prop}, index, separators }) => (
          <View style = { styled.dynamicWrapper} key = {prop.createTime + 'dynamic'}>
            <UserBox 
              id = { personMsg.id }
              name = { personMsg.nickName }
              time = { prop.createTime }
            />
            <View style = { styled.contentWrapper }>
              <Text 
                ellipsizeMode = 'tail'
                numberOfLines = {Number.MAX_SAFE_INTEGER}
              > { prop.racontent } </Text>
            </View>
            <View style = {styled.imgWrapper}>
              {prop?.researchactionPhotos.map( (img, index, array) => {
                return (
                  <IImage 
                    key = {img.photoPath + index}
                    style = {{margin: setSpText(2)}}
                    src = {img.photoPath} 
                    onClick = {() => showImage(array)}
                  />
                )
              })}
            </View>
          </View>
        )}
      /> */}
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
  },
  loadMore: {
    height: setSpText(10),
    alignItems: "center"
  },
})