
import 'react-native-gesture-handler';
import {Root} from 'native-base';
import React, {useEffect} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {I18nextProvider} from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from './src/redux';
import I18n from './src/lang/I18n';

//Notifications
import {fcmService} from './src/config/FCMService';
import {localNotificationService} from './src/config/LocalNotificationService';

import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  const isStoredDeviceToken = async () => {
    let isEqualNull = (await AsyncStorage.getItem('deviceToken')) == null;
    return isEqualNull ;
  }

  //Add Anonymous token to database
  const postDeviceToken = async (token) => {
    await AsyncStorage.setItem('deviceToken' , token)
    // await  axios.post(urls.apiurl + Apis.addAnonymgousToken , data)
  }

  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification)
    localNotificationService.configure(onOpenNotification)
    SplashScreen.hide();

    async function onRegister(token) {  
      let isNull = await isStoredDeviceToken();
      if (isNull) {
        postDeviceToken(token);
      }
    }

    function onNotification(notify) {
      console.log("[App] onNotification: ", notify)
      const options = {
        soundName: 'default',
        playSound: true //,
        // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
        // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
      }
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      )
    }

    function onOpenNotification(notify) {
      console.log("[App] onOpenNotification: ", notify);
    }

    return () => {
      console.log("[App] unRegister");
      fcmService.unRegister();
      localNotificationService.unregister();
    }
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={I18n}>
          <Root>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </Root>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
};


export default App;