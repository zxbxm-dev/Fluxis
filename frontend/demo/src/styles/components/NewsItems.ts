/* eslint-disable prettier/prettier */
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  newsContantItems: {
    gap: (height / 2161) * 66,
  },
  newsContant: {
    width: (width / 1080) * 938,
    height: (height / 2161) * 945,
    backgroundColor: '#F6F6F6',
    borderRadius: (width / 1080) * 50,
    display: 'flex',
  },
  newsContant2: {
    width: (width / 1080) * 938,
    height: (height / 2161) * 945,
    backgroundColor: '#F6F6F6',
    borderRadius: (width / 1080) * 50,
    display: 'flex',
    justifyContent: 'center',
  },
  newsContantText: {
    color: '#4e5055',
    fontSize: (width / 1080) * 48,
    fontFamily: 'NotoSansKR-Medium',
    textAlign: 'center',
  },
  newsContantText2: {
    color: '#4e5055',
    fontSize: (width / 1080) * 48,
    fontFamily: 'NotoSansKR-Medium',
    textAlign: 'center',
  },
  newsContantWarn: {
    color: '#4e5055',
    fontSize: (width / 1080) * 64,
    fontFamily: 'NotoSansKR-Bold',
  },
  newsDateBox: {
    padding: (width / 1080) * 42,
  },
  newsDate: {
    fontSize: (width / 1080) * 25,
    color: '#5a5a5a',
    fontFamily: 'Inter_28pt-Regular',
  },
  newsContantBox: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
  },
});
