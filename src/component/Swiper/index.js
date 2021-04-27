import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BetterBanner from 'react-native-better-banner'
export default function  () {
  return ( 
    <>
    <View style={styles.container}>
      <BetterBanner
        bannerComponents={[
          <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#1997fc',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{fontSize: 35, color: '#fff', marginBottom: 10}}>Page 01</Text>
            <Text style={{fontSize: 15, color: '#fff'}}>Welcome! have a good time</Text>
          </View>,
          <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#da578f',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{fontSize: 35, color: '#fff', marginBottom: 10}}>Page 02</Text>
            <Text style={{fontSize: 15, color: '#fff'}}>Welcome! have a good time</Text>
          </View>,
          <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#7c3fe4',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{fontSize: 35, color: '#fff', marginBottom: 10}}>Page 03</Text>
            <Text style={{fontSize: 15, color: '#fff'}}>Welcome! have a good time</Text>
          </View>,
        ]}
        bannerTitles={["Page 01 Page 01 Page 01 Page 01 Page 01 Page 01 Page 01 ", "Page 02", "Page 03"]}
        onPress={(index) => alert('you pressed index is : ' + index)}
        indicatorContainerBackgroundColor={'rgba(0,0,0,0.3)'}
        isSeamlessScroll={true}
      />
    </View>
    <View style = { styled.bottomButton}>
      <Text>haha</Text>
    </View>
    </>
  )
}
const styled = StyleSheet.create({
  container: {
    height: setSpText(50),
    flex: 1
  },
  bottomButton: {
    width: '100%',
    height: setSpText(20),
    backgroundColor: 'black',
  }
})