/* eslint-disable prettier/prettier */
import {API_URL} from '@env';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {isLoggedInEventEmitter} from '../navigate/Navigator';
import {styles} from '../styles/screen/HomeScreen';
import {NavigationProp} from './NewsScreen';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 휴대폰 번호 입력시 휴대폰 번호 형식으로 포멧
  const formatPhoneNumber = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');

    if (numericValue.length <= 3) {
      return numericValue;
    } else if (numericValue.length <= 7) {
      return `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
    } else {
      return `${numericValue.slice(0, 3)}-${numericValue.slice(
        3,
        7,
      )}-${numericValue.slice(7, 11)}`;
    }
  };

  // 하이폰 제거
  const handlePhoneNumberChange = (value: string) => {
    const formattedValue = formatPhoneNumber(value);
    setPhoneNumber(formattedValue);
  };

  const postPhoneNumber = async () => {
    try {
      // navigation.navigate('News');

      const token = await EncryptedStorage.getItem('refreshToken');
      const data = {
        token: token,
        phoneNumber: String(phoneNumber.replace(/-/g, '')),
      };

      const res = await axios.post(
        `https://mfluxis.duckdns.org/api/login`,
        data,
      );

      if (res.data) {
        await EncryptedStorage.setItem('phoneNumber', phoneNumber);
        await EncryptedStorage.setItem('isLoggedIn', 'true');
        const logoutTime = Date.now() + 10 * 60 * 60 * 1000;
        await EncryptedStorage.setItem('logoutTime', logoutTime.toString());

        navigation.navigate('News'); // 로그인 성공 후 화면 이동
      } else {
        setErrorMessage('존재하지 않는 전화번호 입니다.');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('로그인 실패, 다시 시도해주세요.');
    }
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

  return (
    <View style={styles.container}>
      <View />
      <View style={styles.centerBox}>
        <Image
          source={require('../../src/assets/logo/Logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <View style={styles.inputBox}>
          <View>
            <TextInput
              style={styles.input}
              placeholder="본인의 전화번호를 넣어주세요"
              keyboardType="numeric" // 숫자 전용 키패드
              maxLength={13} // 최대 길이 제한 (010-1234-5678 포함)
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
            />
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
          </View>
          <View>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => {
                postPhoneNumber();
              }}>
              <Text style={styles.startButtonText}>시작하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.versionContainer}>
        <Text style={styles.version}>V 1.0.0 최신 업데이트 버전</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
