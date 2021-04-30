import React, { Component, useState } from 'react'
import { StyleSheet, Text,  View, TouchableOpacity } from 'react-native'
import { setSpText, scaleSize} from '~/util/adapt'
import Modal from 'react-native-modal';
export default function MyModal ({
  visible,
  setVisible,
  children,
  footer = true,
}) {
  return (
    <Modal isVisible = {visible} style = { styled.modal } backdropOpacity = {0.5}>
      <View style = { styled.container }>
        { children }
        { footer && (
          <View style = { styled.BtnWrapper }>
            <TouchableOpacity style = { styled.confirm} onPress = { () => setVisible(false)}>
              <Text>确定</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  )
}
const styled = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: setSpText(20),
    paddingBottom: setSpText(20),
  },
  BtnWrapper: {
    paddingLeft: setSpText(20),
    paddingRight: setSpText(20),
  },
  confirm: {
    height: setSpText(24),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: setSpText(8),
    borderWidth: setSpText(0.5)
  }
})