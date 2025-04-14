/* eslint-disable prettier/prettier */
import {API_URL} from '@env';
// import {getMessaging} from '@react-native-firebase/messaging';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useNews} from '../context/NewsContext';
import {isLoggedInEventEmitter} from '../navigate/Navigator';
import {styles} from '../styles/screen/NewsScreen';
// import {getMessaging} from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';

export type RootStackParamList = {
  Home: undefined;
  News: undefined;
  NewsHistory: undefined;
};
export type NavigationProp = StackNavigationProp<RootStackParamList>;

export interface News {
  createdAt: string;
  equipStatus: number;
  id: number;
  isGoggleOn: boolean;
  isHelmetOn: boolean;
  isShoesOn: boolean;
  name: string;
  phoneNumber: string;
  updatedAt: string;
}

const NewsScreen = () => {
  const {newsData, setNewsData, nullData, setNullData} = useNews();
  const navigation = useNavigation<NavigationProp>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [processedMessageIds, setProcessedMessageIds] = useState(new Set());
  const [day, setDay] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // 알림 소식 데이터 불러오기
  const getNews = async () => {
    setIsLoading(true);
    const phoneNumber = await EncryptedStorage.getItem('phoneNumber');

    try {
      const res = await axios.get(
        `https://mfluxis.duckdns.org/api/getNews/${phoneNumber?.replace(
          /-/g,
          '',
        )}`,
      );
      if (res.status === 200) {
        const notifications = res.data.notifications;
        if (Array.isArray(notifications)) {
          setNewsData(notifications.reverse());
          const [datePart, timePart] = notifications[0]?.createdAt.split(' ');
          setDay(datePart);
          setTime(timePart);
        } else {
          console.error('Notifications is not an array:', notifications);
        }
      }
      if (res.status === 208) {
        setNullData(res.data.userInfo.name);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  // 뒤로가기 눌렀을때 로그인 스크린으로 못가게 하기위한 뒤로가기 막기
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        BackHandler.exitApp();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  const handleLogOut = () => {
    EncryptedStorage.setItem('isLoggedIn', 'false');
    EncryptedStorage.removeItem('logoutTime');
    navigation.navigate('Home');
  };

  // 로그아웃 됐을때 로그인 스크린으로 이동하는 로직
  useEffect(() => {
    const subscription = isLoggedInEventEmitter.addListener(
      'isLoggedInChanged',
      newValue => {
        if (newValue === 'false') {
          navigation.navigate('Home');
        }
      },
    );

    return () => subscription.remove();
  }, [navigation]);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
  //     console.log('FCM 메시지 받음:', remoteMessage);
  //     getNews();
  //   });

  //   return unsubscribe;
  // }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#DF5859" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  // 새로고침 핸들러
  const onRefresh = async () => {
    if (isDisabled) {
      return;
    }
    setIsDisabled(true);

    const phoneNumber = await EncryptedStorage.getItem('phoneNumber');
    setRefreshing(true);

    try {
      const res = await axios.get(
        `https://mfluxis.duckdns.org/api/getNews/${phoneNumber?.replace(
          /-/g,
          '',
        )}`,
      );
      if (res.status === 200) {
        setNewsData(res.data.notifications.reverse());
      }
      if (res.status === 208) {
        setNullData(res.data.userInfo.name);
      }
    } catch (error) {
      console.log('새로고침 중 오류 발생:', error);
    } finally {
      setRefreshing(false);
    }
    // 계속되는 새로고침을 막기 위해
    setTimeout(() => {
      setIsDisabled(false);
    }, 3000);
  };

  return (
    <ScrollView
      style={styles.newsContain}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#DF5859']}
        />
      }>
      <View style={styles.newsHeader}>
        <Text style={styles.newsTitle}>
          {nullData ? nullData : newsData[0]?.name}님 오늘도 좋은 하루 보내세요!
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NewsHistory');
          }}>
          <Image
            source={require('../../src/assets/common/menuicon.png')}
            style={styles.menuImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.mainContain}>
        <View style={styles.newsDetail}>
          <Image
            source={require('../../src/assets/common/bellIcon.png')}
            style={styles.AlarmImage}
            resizeMode="contain"
          />
          <Text style={styles.newsAlarmText}>최근 알림 소식</Text>
        </View>

        {newsData.length > 0 ? (
          <View style={styles.newsContant}>
            <View style={styles.newsDateBox}>
              <Text style={styles.newsDate}>{day}</Text>
              <Text style={styles.newsDate}>{time}</Text>
            </View>
            <View style={styles.newsContantBox}>
              <Text style={styles.newsContantText}>
                {newsData[0]?.name}님{'\n'}
                안전을 위해 착용을 부탁드리겠습니다.{'\n'}
                {newsData[0]?.isHelmetOn ? (
                  <>
                    <Text style={styles.newsContantWarn}>안전모 미착용</Text>
                    {'\n'}
                  </>
                ) : null}
                {newsData[0]?.isGoggleOn ? (
                  <>
                    <Text style={styles.newsContantWarn}>고글 미착용</Text>
                    {'\n'}
                  </>
                ) : null}
                {newsData[0]?.isShoesOn ? (
                  <>
                    <Text style={styles.newsContantWarn}>안전화 미착용</Text>
                    {'\n'}
                  </>
                ) : null}
                오늘도 안전한 하루 보내세요!
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.newsContant2}>
            <View style={styles.newsDateBox}>
              <Text style={styles.newsContantText2}>
                <Text style={styles.newsContantWarn}>
                  최근 알림 소식이 없습니다.{'\n'}
                </Text>
                오늘도 안전한 하루 보내세요!
              </Text>
            </View>
          </View>
        )}

        <View style={styles.newsFooter}>
          <Image
            source={require('../../src/assets/logo/footerlogo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity
          style={styles.logout}
          onPress={() => {
            handleLogOut();
          }}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewsScreen;
