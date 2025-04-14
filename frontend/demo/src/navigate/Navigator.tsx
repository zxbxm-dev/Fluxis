/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {NativeEventEmitter, NativeModules, SafeAreaView} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import HomeScreen from '../screen/HomeScreen';
import NewsHistoryScreen from '../screen/NewsHistoryScreen';
import NewsScreen from '../screen/NewsScreen';

export const isLoggedInEventEmitter = new NativeEventEmitter(
  NativeModules.ReactNativeEventEmitter || null,
);

const RootStack = createNativeStackNavigator();

const Navigator = () => {
  const [isLogin, setIsLogin] = useState(false); // 초기값을 null로 설정
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const checkLoginStatus = async () => {
    try {
      const logoutTime = await EncryptedStorage.getItem('logoutTime');
      const isLoggedIn = await EncryptedStorage.getItem('isLoggedIn');

      if (isLoggedIn === 'true') {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }

      // 로그인 상태 변경 시 이벤트 발행
      isLoggedInEventEmitter.emit('isLoggedInChanged', isLoggedIn);

      if (!isLoggedIn || !logoutTime) {
        console.log('로그인되지 않음');
        return;
      }

      // 현재 시간과 비교하여 로그아웃 처리
      if (Date.now() > parseInt(logoutTime, 10)) {
        await EncryptedStorage.setItem('isLoggedIn', 'false');
        console.log('로그인 만료: isLoggedIn = false');
      } else {
        console.log('로그인 유지');
      }
    } catch (error) {
      console.error('로그인 상태 확인 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 앱 시작 시 로그인 상태 확인
    checkLoginStatus();

    // 5초마다 로그인 상태 확인
    const intervalId = setInterval(() => {
      checkLoginStatus();
    }, 5000);

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 정리
  }, []);

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}></SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <RootStack.Navigator initialRouteName={isLogin ? 'News' : 'Home'}>
          <RootStack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="News"
            component={NewsScreen}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="NewsHistory"
            component={NewsHistoryScreen}
            options={{headerShown: false}}
          />
        </RootStack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Navigator;
