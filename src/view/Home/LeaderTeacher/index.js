import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList, Image } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { Button } from '@ant-design/react-native'
import { setSpText, scaleSize} from '~/util/adapt'
import { paddingSize, isVoid } from '~/util'
import SearchSvg from '~/assets/svg/Search'
import Divider from '~/component/Divider'
import StudentBox from '~/component/StudentBox'
import EmptyView from '~/component/EmptyView'
import Header from './Header'
const fakeInfo = [
  {
    key: 'hah1',
    id: 123,
    name: '王大锤',  // 姓名
    phone: '17756211544',  // 联系方式
    dormitory: '五社区五号楼403',
  },{
    key: 'hah2',
    id: 1234,
    name: '王大锤',
    phone: '17756211544',
    dormitory: '五社区五号楼403五社区五号楼403',
  },
]
export default function LeaderTeacherHome () {
  const navigator = useNavigation()
  const user = {
    id: 12,
    name: 'Pango',
    avatar: '',
  }
  return ( 
    <View style = { styled.container }>
      <Header />
      <Divider color = 'transparent' margin = {0}/>
      <View style = { styled.searchBar }>
        <SearchSvg color = '#ccc' size = {setSpText(12)}/>
        <TextInput style = {{ flex: 1, }} placeholder = '查询学生'/>
        <Button
          style = { styled.confirmButton }
        ><Text style = {{ color: 'white' }}>搜索</Text></Button>
      </View>
      <View style = { styled.body }>
        { !isVoid(fakeInfo) ? (
          <FlatList 
            data = {fakeInfo}
            renderItem = { ({item}) => {
              return (
                <>
                <StudentBox
                  key = { item }
                  id = { item.id }
                  name = { item.name }
                  phone = { item.phone }
                  dormitory = { item.dormitory }
                />
                </>
              )
            }}
          />
        ) : (
          <EmptyView type = {2}/>
        )}
      </View>
    </View>
  )
}

const styled = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#62b5e2',
  },
  wrapper: {
    height: setSpText(200),
    ...paddingSize(6,0,6,6),
    backgroundColor: 'white',
    marginTop: setSpText(6),
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: setSpText(6),
    ...paddingSize(0,0,10,0),
  },
  confirmButton: {
    borderWidth: 0,
    borderRadius: setSpText(6),
    backgroundColor: '#5572dd',
  },
  body: {
    flex: 1,
    marginTop: setSpText(10),
    ...paddingSize(0,0,10,10),
  }
})