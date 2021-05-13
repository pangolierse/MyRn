import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { paddingSize, isVoid } from '~/util'
import { 
  useToStudentGroup, } from '~/router/utils'
import AnimateCar from '~/component/AnimateCar'
import LineText from '~/component/LineText'
import PhoneColorSvg from '~/assets/svg/PhoneColor'
import DriverSvg from '~/assets/svg/Driver'
import CarMarkSvg from '~/assets/svg/CarMark'
import { useNavigation } from '@react-navigation/core'
export default function TeacherCar ({
  teacherCarInfo,
  isloading,
  carStyle,
}) {
  const navigator = useNavigation()
  return ( 
    <View>
      {isloading ? (
        <Text style = {{
          fontWeight: 'bold',
          fontSize: scaleSize(32),
        }}>加载中...</Text>
      ) : (
        !isVoid(teacherCarInfo) ? (
          teacherCarInfo?.map( carInfo => {
            return (
              <View key = { carInfo?.pkCarid + '-' + carInfo?.pkCaid}>
              <View style = {[ 
                styled.rowLineLayout,{
                  ...paddingSize(0,0,6,6),
                }
              ]}>
                <AnimateCar />
                <View style = {carStyle.rightContent}>
                  { isloading ? (
                    <Text style = {{
                      fontWeight: 'bold',
                      fontSize: scaleSize(32),
                    }}>加载中...</Text>
                  ) : !isVoid(carInfo) ? (
                    <>
                    <View style = { carStyle.rowItem }>
                      <LineText 
                        label = {'司机:'} 
                        prefix = {<DriverSvg />} 
                        suffix = {<Text style = {{color: '#333'}}>{carInfo?.drivername}</Text>}
                        margin = {2}
                      />
                      <LineText 
                        label = {'联系方式:'} 
                        prefix = {<PhoneColorSvg color = '#3366CC' size = {16}/>} 
                        suffix = {<Text style = {{color: '#333'}}>{carInfo?.driverphone}</Text>}
                        margin = {7}
                      />
                    </View>
                    </>
                  ) : (
                    <Text style = {{
                      fontWeight: 'bold',
                      fontSize: scaleSize(32),
                    }}>无出行安排</Text>
                  )}
                </View>
              </View>
              {carInfo?.groups?.map( group => {
                return (
                  <TouchableOpacity style = {[
                    styled.rowLineLayout
                  ]}
                    key = { group?.pkGroupid}
                    onPress = { () => useToStudentGroup(navigator, group?.pkGroupid)}
                  >
                    <View style = { styled.rowItem}>
                      <Text style = { styled.title }>小组名：<Text style = { styled.value }>{group?.groupname}</Text></Text>
                      <Text style = { styled.title }>人数：<Text style = { styled.value }>{group?.groupnumber}</Text></Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
              </View>
            )
          })
        ) : (
          <View style = {[ 
            styled.rowLineLayout,{
              ...paddingSize(0,0,6,6),
            }
          ]}>
            <AnimateCar />
            <Text style = {{
              fontWeight: 'bold',
              fontSize: scaleSize(32),
              marginLeft: setSpText(10),
            }}>无出行安排</Text>
          </View>
        )
      )}
    </View>
  )
}
const styled = StyleSheet.create({
  rowLineLayout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowItem: {
    flex:1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    ...paddingSize(4,4,10,10),
    borderWidth: setSpText(0.1),
    borderRadius: setSpText(4),
    marginTop: setSpText(2),
    borderStyle: 'dashed'
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
