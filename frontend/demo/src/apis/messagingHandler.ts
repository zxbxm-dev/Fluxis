/* eslint-disable prettier/prettier */
import {getMessaging, onMessage} from 'firebase/messaging';

let isHandlerRegistered = false;

export const registerMessagingHandler = (
  callback: (remoteMessage: any) => void,
) => {
  if (!isHandlerRegistered) {
    isHandlerRegistered = true;

    const messaging = getMessaging();
    onMessage(messaging, async remoteMessage => {
      console.log('Foreground message received:', remoteMessage);
      callback(remoteMessage);
    });
  }
};
