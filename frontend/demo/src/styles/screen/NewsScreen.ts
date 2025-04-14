/* eslint-disable prettier/prettier */
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  newsContain: {
    flex: 1,
    paddingLeft: (width / 1080) * 70,
    paddingRight: (width / 1080) * 70,
    paddingTop: (height / 2161) * 50,
    backgroundColor: '#fff',
  },
  mainContain: {
    flex: 1,
    justifyContent: 'center',
    marginTop: (height / 2161) * 200,
  },
  newsHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsTitle: {
    fontSize: (width / 1080) * 45,
    color: '#4E5055',
    fontFamily: 'NotoSansKR-Bold',
    paddingLeft: (width / 1080) * 30,
  },
  menuImage: {
    width: (width / 1080) * 80,
    height: (height / 2161) * 80,
    marginRight: (width / 1080) * 30,
  },
  AlarmImage: {
    width: (width / 1080) * 76,
    height: (height / 2161) * 76,
  },
  newsAlarmText: {
    fontSize: (width / 1080) * 35,
    color: '#4E5055',
    fontFamily: 'NotoSansKR-Bold',
  },
  newsDetail: {
    alignItems: 'center',
    paddingLeft: (width / 1080) * 30,
    display: 'flex',
    flexDirection: 'row',
    gap: (width / 1080) * 16,
    paddingBottom: (height / 2161) * 54,
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
  newsFooter: {
    alignItems: 'center',
    marginTop: (height / 1920) * 191,
  },
  logoImage: {
    width: (width / 1080) * 734,
    height: (height / 1920) * 228,
  },
  logout: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: (height / 1920) * 156,
  },
  logoutText: {
    color: '#4e5055',
    fontSize: (width / 1080) * 35,
    fontFamily: 'Inter_28pt-Regular',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});
