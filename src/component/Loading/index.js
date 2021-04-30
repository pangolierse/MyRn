import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, Image, View } from 'react-native'
import * as Animatable from 'react-native-animatable';

export default 
function Loading () {
  const styles = StyleSheet.create({
    loadingWrapper: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    loadingItem: {
      flex: 1,
      height: '100%',
      backgroundColor: '#2cc6d8',
      marginLeft: 3,
      marginRight: 3,
    }
  })
  let delay = 0.2,
      count = 7
  const loadingItem = Array(count).fill(delay)
  
  let delayArray = Array(count).fill(delay);
  for (let l = (count - 1) / 2, r = (count - 1) / 2; r < count; l--, r++) {
    delayArray[l] = delayArray[r] = Number((delay * ((count - 1) / 2 - l)).toFixed(3));
  }
  let animation = {
    0: {
      height: 100,
    },
    0.5: {
      height: 0,
    },
    1: {
      height: 100,
    },
  }
  return (
    <View style = { styles.loadingWrapper }>
      {loadingItem.map((value, index) => {
        return (
          <Animatable.View
            key = { index + 'haha' }
            style = { styles.loadingItem }
            animation = { animation }
            duration = { 1500 }
            delay = { delayArray[index] * 1000 }
            iterationCount='infinite' 
          >
          </Animatable.View>
        )
      })}
    </View>
  )
}
const styled = StyleSheet.create({
  avatar: {
    width: setSpText(40),
    height: setSpText(40),
    backgroundColor: 'white',
    borderRadius: setSpText(40),
  },
  avatar_bc1: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderRadius: setSpText(40),
  },
  avatar_bc2: {
    backgroundColor: '#dddddd',
  },
  img: {
    width: setSpText(40),
    height: setSpText(40),
    position: 'absolute',
    borderRadius: setSpText(40),
  }
})