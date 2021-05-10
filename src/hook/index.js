import React, { useEffect, useState } from 'react';
import {
  Alert,
} from 'react-native';
import { ActionSheet } from '@ant-design/react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
// 56
export function useActionImage (success) {
  // 操作选择器
  const BUTTONS = [
    '选择图片',
    '拍摄照片',
    '取消',
  ];
  // 图片选择器参数设置
  const options = {
   cameraType: 'front',
   storageOptions: {
     skipBackup: true,
     path: 'images'
   }
 };
  // 选择图片库中得图片
  const choosePic = () => {
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('用户取消了选择！');
      }
      else if (response.error) {
        Alert.alert("ImagePicker发生错误：" + response.error);
      } else {
        success(response)
      }
    });
  }
  // 拍摄照片
  const ShootPic = () => {
    launchCamera(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('用户取消了选择！');
      }
      else if (response.error) {
        Alert.alert("ImagePicker发生错误：" + response.error);
      } else {
        success(response)
      }
    });
  }
  const handleBtn = [
    choosePic,
    ShootPic,
  ]
  // 活动器的逻辑
  const showActionSheet = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        handleBtn[buttonIndex] && handleBtn[buttonIndex]()
      }
    );
  };
  return {
    showAction: showActionSheet,
  }
}
export function useAction (BUTTONS, handleBtn) {
  // 活动器的逻辑
  const showActionSheet = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
      },
      buttonIndex => {
        handleBtn[buttonIndex] && handleBtn[buttonIndex]()
      }
    );
  };
  return {
    showAction: showActionSheet,
  }
}

//搜索debounce
export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};