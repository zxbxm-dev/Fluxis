/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {enableScreens} from 'react-native-screens';
import Navigator from './src/navigate/Navigator';

import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import {NewsProvider} from './src/context/NewsContext';

const App = (): JSX.Element => {
  // 앱 실행시 푸시알림 권한 요청
  useEffect(() => {
    const requestUserPermission = async () => {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        const token = await messaging().getToken();
        console.log('FCM token:', token);
        await EncryptedStorage.setItem('refreshToken', token);
      }
    };

    requestUserPermission();

    // // 포그라운드 메시지 처리
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   console.log(
    //     'Message handled in the foreground!',
    //     remoteMessage.notification,
    //   );
    // });

    // return () => unsubscribe();
  }, []);

  enableScreens();
  return (
    <NewsProvider>
      <SafeAreaView style={{flex: 1}}>
        <Navigator />
      </SafeAreaView>
    </NewsProvider>
  );
};

// const styles = StyleSheet.create({});

export default App;
