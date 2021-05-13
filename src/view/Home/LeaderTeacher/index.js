import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList, Image } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { ActivityIndicator, Button } from '@ant-design/react-native'
import { useFindStudent } from '~/api/personServer'
import { setSpText, scaleSize} from '~/util/adapt'
import { paddingSize, isVoid, marginSize } from '~/util'
import SearchSvg from '~/assets/svg/Search'
import Divider from '~/component/Divider'
import StudentBox from '~/component/StudentBox'
import EmptyView from '~/component/EmptyView'
import { useDebounce } from '~/hook';
import Header from './Header'
export default function LeaderTeacherHome () {
  const navigator = useNavigation()
  const { findStudent, data: studentList, isLoading } = useFindStudent()
  const [ search, setSearch ] = useState('')

  const debounceValue = useDebounce(search, 500)
  useEffect(() => {
    findStudent(debounceValue)
  }, [debounceValue])
  const handleSearch = (v) => {
    setSearch(v)
  }
  return ( 
    <View style = { styled.container }>
      <Header />
      <Divider color = 'transparent' margin = {0}/>
      <View style = { styled.searchBar }>
        <SearchSvg color = '#ccc' size = {setSpText(12)}/>
        <TextInput 
          style = {{ flex: 1, }} 
          placeholder = '查询学生'
          value = { search }
          onChangeText = { handleSearch }
        />
        <Button
          style = { styled.confirmButton }
        ><Text style = {{ color: 'white' }} >搜索</Text></Button>
      </View>
      <View style = { styled.body }>
        { isLoading 
        ? <ActivityIndicator size = 'large'/>
        : !isVoid(studentList) 
        ? (
          <FlatList 
            showsVerticalScrollIndicator = {false}
            keyExtractor = { item => item.user_id}
            data = {studentList || []}
            renderItem = { ({item}) => {
              return (
                <>
                <StudentBox
                  key = { item }
                  id = { item.user_id }
                  gender = { item.gender }
                  name = { item.nick_name }
                  phone = { item.phone }
                  dormitory = { item.dormitoryname }
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
    ...marginSize(0,0,20,20),
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