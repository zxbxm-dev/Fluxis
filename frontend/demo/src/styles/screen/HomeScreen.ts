/* eslint-disable prettier/prettier */
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DF5859',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: (height / 1920) * 192,
  },
  centerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: (height / 1920) * 192,
  },
  title: {
    color: '#fff',
    fontSize: 50,
  },
  logoImage: {
    width: (width / 1080) * 734,
    height: (height / 1920) * 228,
  },
  inputBox: {
    gap: (height / 1920) * 70,
  },
  input: {
    width: (width / 1080) * 570,
    height: (height / 1920) * 128,
    backgroundColor: '#fff',
    marginTop: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
    textAlign: 'center',
    paddingLeft: 0,
  },
  startButton: {
    width: (width / 1080) * 570,
    height: (height / 1920) * 128,
    backgroundColor: '#4E5055',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: (height / 1920) * 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: (width / 1080) * 48,
    fontFamily: 'Jost-Bold',
  },
  versionContainer: {
    marginBottom: (height / 1920) * 150, // Text 컴포넌트 아래 마진
  },
  version: {
    fontSize: (height / 1920) * 16,
    color: '#fff',
    fontFamily: 'Jost-Bold',
  },
  errorMessage: {
    color: '#fff',
  },
});
