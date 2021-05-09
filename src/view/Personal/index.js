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
  TeacherCourseSetting, } from './Teacher'
import { ChoosePlan, } from './Teacher'
import { useAction } from '../../hook';
import { isVoid } from '../../util';

const strPlaceholder2 = '--'
const ParentType = '5'
export default function UserDetail () {
  const { logout, userType, user: userInfo, token } = useAuth()
  const [ visible, setVisible ] = useState(false)
  // let showAction = null
  const navigator = useNavigation()
  let user = {
    tags: ['帅气','高','帅','大','awef','aweasdf','awefassss','afff'],
  }
  const settingMap = {
    '3': TeacherDormitorySetting,
    '2': TeacherCourseSetting,
    '4': StudentSetting,
    '5': ParentSetting,
  }
  const handleExit = () => {
    logout()
  }
  const showOptions = () => {
    let [ buttons, btnEvent ] = settingMap[userType](navigator, setVisible)
    let showAction = useAction(buttons, btnEvent).showAction
    showAction && showAction()
  }
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
          prefix = {(
            <TouchableOpacity  onPress = {showOptions}>
              <SettingSvg size = { setSpText(12) } color = '#dbdbdb'/>
            </TouchableOpacity>
          )}
          suffix = {(
            <TouchableOpacity onPress = {handleExit}>
              <ExitSvg size = { setSpText(12) } color = '#dbdbdb'/>
            </TouchableOpacity>
          )}
        />
        <StudentHeader />
        <View style = { styled.UserDetailInfo }>
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
            { marginTop: setSpText(4)}
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
            { marginTop: setSpText(4)}
          ]}>
            <LineText 
              prefix = {(
                <EmailSvg size = {setSpText(16)}/>
              )}
              label = {userInfo?.email || strPlaceholder2}
            />
          </View>
          <View style = { styled.userInfoItem}>
            <View style = { styled.tagWrapper }>
              <Text style = {{ fontSize: scaleSize(33), fontWeight: 'bold'}}>个性标签：</Text>
              {user?.tags.map( tag => {
                return <FixTag space = {2} text = {tag} key = {tag + 'tags'}/>
              })}
              <CreateTag tags = {user?.tags || []}/>
            </View>
          </View>
          { userType && userType == ParentType && (
            <View style = { [styled.userInfoItem, {...paddingSize(10,10,10,10)}]}>
              <TouchableOpacity style = {{width: '100%'}} onPress = {() => setVisible(true)}>
                <Text style = {{ fontSize: scaleSize(32), fontWeight: 'bold'}}>修改绑定学生</Text>
              </TouchableOpacity>
            </View>
          )}
          { userType && userType <= '3' && (
            <View style = { styled.userInfoItem}>
              <ChoosePlan />
            </View>
          )}
        </View>
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: setSpText(6),
    paddingLeft: setSpText(6),
    paddingRight: setSpText(6),
  },
  userInfoItem: {
    width: '100%',
    borderBottomWidth: setSpText(0.1),
    borderBottomColor: '#afafaf',
    paddingBottom: setSpText(4),
  }
})