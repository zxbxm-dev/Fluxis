/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log(
    '백그라운드 상태 알림:',
    remoteMessage.notification?.title,
    remoteMessage.notification?.body,
  );
});

AppRegistry.registerComponent(appName, () => App);
