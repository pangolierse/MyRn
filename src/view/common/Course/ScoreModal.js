import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import Modal from '~/component/Modal'
import defaultImg from '~/assets/img/default.jpg'
export default function ScoreModal ({
  ...prop
}) {
  const score = {
    teacherName: '黄老师',
    avatar: '',
    score: 100
  }
  const commentMap = [
    '很棒哦，继续努力',
    '不错哦，但是不能骄傲',
    '加把劲，会更好哦',
    '不要气馁，下次努力',
  ]
  const compute = (score) => {
    switch( Math.floor(score / 10) ){
      case 10:
        return commentMap[0]
      case 9: 
        return commentMap[1]
      case 7:
      case 8:
        return commentMap[2]
      default:
        return commentMap[3]
    }
  }
  return ( 
    <Modal {...prop}>
      <View style = { styled.teacherBox}>
        <Image source = { score.avatar || defaultImg } style = { styled.img } />
        <Text style = { styled.teacherBoxText }>{score.teacherName}</Text>
        <Text style = { styled.teacherBoxText }>给你打分</Text>
      </View>
      <View style = { styled.scoreContainer }>
        <Text style = { styled.score }>{score.score}</Text>
        <Text style = { styled.comment }>{compute(score.score)}</Text>
      </View>
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