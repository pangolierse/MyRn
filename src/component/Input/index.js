import React, { Component } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { setSpText, scaleSize} from '@/util/adapt'
export default function ({
  Preffix,
  value,
  onChangeText,
  color,
  style,
  placeholder,
  secureTextEntry,
}) {
  return ( 
    <View style = {[styled.inputWrapper,style]}>
      {Preffix}
      <TextInput
        style={[
          styled.input,
          {
            borderColor: color,
          }
        ]}
        placeholder = {placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry = {secureTextEntry}
      />
    </View>
  )
}
const styled = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
  },
  input: { 
    flex: 1,
    height: setSpText(20),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: setSpText(20),
    marginLeft: setSpText(5),
    paddingLeft: setSpText(10),
    paddingRight: setSpText(10),
  }
})