/* eslint-disable prettier/prettier */
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const getResponsiveWidthSize = (baseSize: number) => {
  const scale = width / 1080;
  return baseSize * scale;
};

export const getResponsiveHeightSize = (baseSize: number) => {
  const scale = height / 2161;
  return baseSize * scale;
};
