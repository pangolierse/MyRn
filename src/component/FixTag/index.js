import React, { useMemo } from "react";
import { StyleSheet, Text,  View } from 'react-native'
import { setSpText, scaleSize} from '~/util/adapt'
const fontColorMap = [
  '#cf1da5',
  '#d25da0',
  '#e78d0d',
  '#f0b24f',
  '#e0964e',
  '#a5b379',
  '#389e0d',
  '#08b3d7',
  '#7bccff',
  '#1d39c4',
  '#981dbe',
]
const backgroundColorMap = [
  '#fff0f6',
  '#fff1f0',
  '#fff2e8',
  '#fff7e6',
  '#fffbe6',
  '#fcffe6',
  '#f6ffed', 
  '#e6fffb', 
  '#e6f7ff', 
  '#f0f5ff', 
  '#f9f0ff', 
]
const borderColorMap = [
  '#ffadd2',
  '#ffa39e',
  '#ffbb96',
  '#ffd591',
  '#ffe58f',
  '#eaff8f',
  '#b7eb8f',
  '#87e8de',
  '#91d5ff',
  '#adc6ff',
  '#d3adf7',
]
export default function FixTag ({ text, space = 4 }) {
  const borderColor = useMemo(() => borderColorMap[randomIndex(text.length)] , [text])
  const backgroundColor = useMemo(() => backgroundColorMap[randomIndex(text.length)] , [text])
  const fontColor = useMemo(() => fontColorMap[randomIndex(text.length)] , [text])
  return (
    <View style = {[
      styled.tag
    ]}>
      <Text style = {[
        styled.tagItem,
        {
          color: fontColor,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          marginLeft: setSpText(space),
          marginRight: setSpText(space),
          marginTop: setSpText(space),
          marginBottom: setSpText(space),
        }
      ]}>{text}</Text>
    </View>
  )
}
const styled = StyleSheet.create({
  tag: {
    alignSelf:'flex-start',
    textAlign: 'center',
  },
  tagItem: {
    paddingTop: setSpText(2),
    paddingLeft: setSpText(4),
    paddingRight: setSpText(4),
    paddingBottom: setSpText(2),
    borderWidth: setSpText(0.1),
  }
})
function randomIndex (key) {
  return Math.abs( key % borderColorMap.length ) 
}