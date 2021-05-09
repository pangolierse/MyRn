import React, { Component, useEffect } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, TextInput, TouchableOpacity, View, Text, FlatList } from 'react-native'
import { paddingSize, marginSize } from '~/util'
import { useTeacherDormitoryInfo } from '~/api/dormitoryServer'
import { useToStudentDormitory } from '~/router/utils'
import SearchSvg from '~/assets/svg/Search'
import ManSvg from '~/assets/svg/Man'
import WomanSvg from '~/assets/svg/Woman'
import EmptyView from '~/component/EmptyView'
import { useNavigation } from '@react-navigation/core'
export default function DormitoryTeacher () {
  const { dormitorys, isLoading } = useTeacherDormitoryInfo()
  const navigator = useNavigation()
  const handleClick = (id) => {
    useToStudentDormitory(navigator, id)
  }
  useEffect(() => {
    console.log(dormitorys);
  },[dormitorys])
  return ( 
    <View style = {{ flex: 1,}}>
      <View style = {{
        alignItems: 'center',
        borderBottomWidth: setSpText(0.1),
        borderBottomColor: 'rgba(0,0,0,0.1)'
      }}>
        <SearchBar />
      </View>
      <View style = {{flex: 1,}}>
        { isLoading ? (
          <EmptyView color='black'/>
        ) : (
          <View style = { styled.listWrapper }>
            <FlatList 
              showsVerticalScrollIndicator = {false}
              data = {dormitorys || []}
              keyExtractor = { item => item.pkDormitoryid}
              renderItem = { ({item}) => {
                return (
                  <TouchableOpacity onPress = {() => handleClick(item.pkDormitoryid)} style = { styled.dormitoryWrapper }>
                    <View style = { styled.leftWrapper}>
                      {item.dormitorytype == '男' ? <ManSvg /> : <WomanSvg />}
                    </View>
                    <View style = { styled.rightWrapper }>
                      <View style = { styled.rowItem}>
                        <Text style = {styled.title}>宿舍名：<Text style = { styled.value}>{item.dormitoryname || '--'}</Text></Text>
                        <Text style = {styled.title}>人数：<Text style = { styled.value}>{item.dormitorynumber || '--'}</Text></Text>
                      </View>
                      <View style = { styled.rowItem}>
                        <Text style = {styled.title}>宿舍代号：<Text style = { styled.value}>{item.dormitorycode || '--'}</Text></Text>
                        <Text style = {styled.title}>总人数：<Text style = { styled.value}>{item.dormitoryamount || '--'}</Text></Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
        )}
      </View>
    </View>
  )
}
function SearchBar ({
  value,
  onChange,
}) {
  return (
    <View style = {styled.searchWrapper}>
      <SearchSvg color = '#CCC' size = {setSpText(8)}/>
      <TextInput 
        placeholder = '搜索'
      />
    </View>
  )
}
const styled = StyleSheet.create({
  dormitoryWrapper: {
    flexDirection: 'row',
    marginTop: setSpText(4),
    height: setSpText(44),
    backgroundColor: 'rgba(81,197,252,0.1)',
    borderRadius: setSpText(8),
    ...paddingSize(16,16,0,20)
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: setSpText(25),
    width: setSpText(150),
    ...paddingSize(0,0,10,10),
    ...marginSize(4,4,10,10),
    borderRadius: setSpText(8),
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  listWrapper: {
    ...paddingSize(0,0,20,20)
  },
  leftWrapper: {
    height: '100%',
    width: setSpText(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightWrapper: {
    flex:1,
    justifyContent: 'space-between',
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