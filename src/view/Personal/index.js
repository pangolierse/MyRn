import React, { Component, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, ScrollView, View, Alert } from 'react-native'
import { setSpText, scaleSize} from '~/util/adapt'
import { useNavigation } from "@react-navigation/core";
import { paddingSize, avatarUrl } from '~/util'
import { useAuth } from '~/context/useAuth'
import PhoneSvg from '~/assets/svg/Phone'
import SettingSvg from '~/assets/svg/Setting'
import EmailSvg from '~/assets/svg/Email'
import ExitSvg from '~/assets/svg/Exit'
import UserSvg from '~/assets/svg/User'
import HeaderTitle from '~/component/HeaderTitle'
import CreateTag from '~/component/CreateTag'
import LineText from '~/component/LineText'
import FixTag from '~/component/FixTag'
import AssociateModal from './Parent/AssociateModal'
import { StudentSetting, StudentHeader } from './Student'
import { ParentSetting, ParentHeader } from './Parent'
import { 
  TeacherDormitorySetting,
  TeacherCourseSetting,
  TeacherSchoolSetting } from './Teacher'
import { ChoosePlan, } from './Teacher'
import { useAction } from '~/hook';
import { isVoid } from '~/util';

const strPlaceholder2 = '--'
const ParentType = '5'
export default function UserDetail () {
  const { logout, userType, user: userInfo, token } = useAuth()
  const [ visible, setVisible ] = useState(false)
  const navigator = useNavigation()
  const settingMap = {
    '3': TeacherDormitorySetting,
    '2': TeacherCourseSetting,
    '1': TeacherSchoolSetting,
    '4': StudentSetting,
    '5': ParentSetting,
  }
  let btnItems = userType && settingMap[userType](navigator, setVisible)
  console.log(btnItems);
  
  const handleExit = () => {
    logout()
  }
  useEffect(() => {
  }, [userType])
  useEffect(() => {
    console.log('个人中心' + token);
    console.log('个人中心' + userInfo?.id);
    console.log(userInfo);
  },[userInfo])
  return ( 
    <>
      <View style = { styled.container }>
        <AssociateModal visible = { visible } setVisible = { setVisible }/>
        <HeaderTitle 
          tinkColor = {'#108ee9'}
          backgroundColor = {'#108ee9'}
          suffix = {(
            <TouchableOpacity onPress = {handleExit}>
              <ExitSvg size = { setSpText(12) } color = '#dbdbdb'/>
            </TouchableOpacity>
          )}
        />
        <StudentHeader />
        <ScrollView style = { styled.UserDetailInfo }>
          <View style = { styled.userInfoItem}>
            <LineText 
              prefix = {(
                <UserSvg size = {setSpText(16)}/>
              )}
              label = {userInfo?.nickName || strPlaceholder2}
            />
          </View>
          <View style = {[ 
            styled.userInfoItem,
          ]}>
            <LineText 
              prefix = {(
                <PhoneSvg size = {setSpText(16)}/>
              )}
              label = {userInfo?.phone || strPlaceholder2}
            />
          </View>
          <View style = {[ 
            styled.userInfoItem,
          ]}>
            <LineText 
              prefix = {(
                <EmailSvg size = {setSpText(16)}/>
              )}
              label = {userInfo?.email || strPlaceholder2}
            />
          </View>
          {/* <View style = { styled.userInfoItem}>
            <View style = { styled.tagWrapper }>
              <Text style = {{ fontSize: scaleSize(33), fontWeight: 'bold'}}>个性标签：</Text>
              {user?.tags.map( tag => {
                return <FixTag space = {2} text = {tag} key = {tag + 'tags'}/>
              })}
              <CreateTag tags = {user?.tags || []}/>
            </View>
          </View> */}
          { userType && userType == ParentType && (
            <View style = { [styled.userInfoItem, {...paddingSize(10,10,10,10)}]}>
              <TouchableOpacity style = {{width: '100%'}} onPress = {() => setVisible(true)}>
                <Text style = {{ fontSize: scaleSize(32), fontWeight: 'bold'}}>修改绑定学生</Text>
              </TouchableOpacity>
            </View>
          )}
          { userType && userType <= '3' && userType > '1' && (
            <View style = { styled.userInfoItem}>
              <ChoosePlan />
            </View>
          )}
          { btnItems && btnItems?.map( (btn, index) => {
            return (
              <View key = {btn.label + index} style = {[ 
                styled.userInfoItem,
              ]}>
                <TouchableOpacity onPress = { btn.onPress }>
                  <LineText 
                    prefix = {btn.svg}
                    label = {btn.label || strPlaceholder2}
                  />
                </TouchableOpacity>
              </View>
            )
          })}
        </ScrollView>
      </View>
    </>
  )
}
const styled = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#108ee9',
  }, 
  exitBtn: {
    marginRight: setSpText(6),
  },
  tagWrapper: {
    flexDirection: 'row',
    marginTop: setSpText(6),
    flexWrap: 'wrap',
    alignItems: 'center',
  },  
  UserDetailInfo: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingLeft: setSpText(6),
    paddingRight: setSpText(6),
  },
  userInfoItem: {
    width: '100%',
    borderBottomWidth: setSpText(0.1),
    borderBottomColor: '#afafaf',
    paddingBottom: setSpText(4),
    marginTop: setSpText(4),
  }
})