import React, { Component, useState } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { useChangeAssociate } from '~/api/personServer'
import { useAuth } from '~/context/useAuth'
import User from '~/assets/svg/User'
import Modal from '~/component/Modal'
import Input from '~/component/Input'
export default function ScoreModal ({
  visible,
  setVisible,
  onConfirm = () => {},
}) {
  const [ associate, setAssociate ] = useState('')
  const handleChange = () => {
    setVisible(false)
    onConfirm(associate)
  }
  const filterScore = (v) => {
    let value = Number.isNaN(parseInt(v)) ? 0 : parseInt(v)
    if( value < 0 ){
      value = 0
    } else if (value > 100 ){
      value = 100
    }
    return value
  }
  return ( 
    <Modal 
      visible = {visible}
      setVisible = {setVisible}
      onPress = { handleChange }
    >
      <Input 
        style = {{
          marginTop: setSpText(10),
          marginBottom: setSpText(10),
          paddingLeft: setSpText(20),
          paddingRight: setSpText(20),
        }}
        color = 'black'
        value = { String(associate) }
        onChangeText = { (v) => {
          setAssociate(filterScore(v))
        }}
        placeholder = {'请输入成绩...'}
        Preffix = {<User style = {{width:20}}/>}
      />
    </Modal>
  )
}
const styled = StyleSheet.create({
  teacherBox: {
    height: setSpText(54),
    width: '100%',
    padding: setSpText(7),
    paddingRight: setSpText(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: setSpText(10),
  },
  teacherBoxText: {
    fontWeight: 'bold',
    fontSize: scaleSize(50),
  },
  img: {
    width: setSpText(40),
    height: '100%',
    borderRadius: setSpText(10),
  },
  scoreContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    fontSize: scaleSize(70),
    fontWeight: 'bold',
    color: 'red',
  },
  comment: {
    marginTop: setSpText(10),
    marginBottom: setSpText(10),
    fontSize: scaleSize(40),
  }
})