/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import NewsItems from '../components/NewsItems';
import {isLoggedInEventEmitter} from '../navigate/Navigator';
import {styles} from '../styles/screen/NewsHistoryScreen';
import {NavigationProp} from './NewsScreen';
import {useNews} from '../context/NewsContext';

const NewsScreen = () => {
  const {newsData, setNewsData} = useNews();
  const {nullData, setNullData} = useNews();
  const [refreshing, setRefreshing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  // 로그아웃 됐을때 로그인 스크린으로 이동하는 로직
  useEffect(() => {
    if (newsData.length < 1) {
      onRefresh();
    }
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
      contentContainerStyle={styles.newsContain}
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
            navigation.navigate('News');
          }}>
          <Image
            source={require('../../src/assets/common/menuicon.png')}
            style={styles.menuImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.newsDetailBox}>
        <View style={styles.newsDetail}>
          <Text style={styles.newsAlarmText}>이전 소식</Text>
        </View>
        <NewsItems />
      </View>
    </ScrollView>
  );
};

export default NewsScreen;
