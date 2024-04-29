import React, { useCallback, useEffect, useState } from "react";
import { View,Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import { Image } from "react-native";
import { Provider as PaperProvider } from 'react-native-paper';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";


// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

import Screens from "./navigation/Screens";
import { Images, articles, argonTheme } from "./constants";

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.ArgonLogo,
  Images.iOSLogo,
  Images.androidLogo,
];

// cache product images
articles.map((article) => assetImages.push(article.image));

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fcmToken, setFcmToken] = useState();
  const getToken = async() => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
    const fcmToken = await messaging().getToken();
    // console.log(token);
    if(fcmToken) {
      setFcmToken(fcmToken);
      await AsyncStorage.setItem("@resident_fcm_token", fcmToken);
      //update token in database for user_id
    }
  }
  console.log("FCM Token" ,fcmToken);

  useEffect(()=>{
    //setToken and send to server 
    getToken()
  })
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      displayNotifications(remoteMessage)
    });

    return unsubscribe;
  }, []);
  const displayNotifications = async (data) => {
    await notifee.requestPermission()

    //Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel'
    });

    //Display a notification
    await notifee.displayNotification({
        title: '<p style="color: #4caf50;"><b>'+ data.notification.title +'</span></p></b></p> ;',
        body: '<p style="color: #000000"><i>'+data.notification.body +'</i></p> ;!',
        android: {
            channelId,
            style: {type: AndroidStyle.BIGPICTURE, picture: 'https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'},
            // smallIcon: '', //optional, defaults to 'ic_launcher'.
            //pressAction is needed if you want the notification to open the app when pressed
            pressAction: {
                id: 'default',
            },
        },
    });
}

  useEffect(() => {
    async function prepare() {
      try {
        //Load Resources
        await _loadResourcesAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "open-sans-regular": require("./assets/font/OpenSans-Regular.ttf"),
          "open-sans-light": require("./assets/font/OpenSans-Light.ttf"),
          "open-sans-bold": require("./assets/font/OpenSans-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const _loadResourcesAsync = async () => {
    return Promise.all([...cacheImages(assetImages)]);
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <PaperProvider>
    <NavigationContainer onReady={onLayoutRootView}>
      <GalioProvider theme={argonTheme}>
        <Block flex>
          <Screens />
        </Block>
      </GalioProvider>
    </NavigationContainer>
    </PaperProvider>
  );
}
