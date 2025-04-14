/* eslint-disable prettier/prettier */
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

/* eslint-disable prettier/prettier */
export const styles = StyleSheet.create({
  newsContain: {
    flexGrow: 1,
    paddingLeft: (width / 1080) * 70,
    paddingRight: (width / 1080) * 70,
    paddingTop: (height / 2161) * 50,
    backgroundColor: '#fff',
    gap: (height / 2161) * 60,
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
  newsDetailBox: {
    flex: 1,
    justifyContent: 'center',
  },
  newsDetail: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: (width / 1080) * 16,
    paddingBottom: (height / 2161) * 54,
  },

  newsFooter: {
    alignItems: 'center',
    marginTop: (height / 1920) * 191,
  },
  logoImage: {
    width: (width / 1080) * 734,
    height: (height / 1920) * 228,
  },
});
