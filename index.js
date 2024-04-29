import { registerRootComponent } from 'expo';

import App from './App';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidStyle } from '@notifee/react-native'
// messaging().setBackgroundMessageHandler(async message =>
// {
//     console.log(message);
// });
    
messaging().setBackgroundMessageHandler(async message => {
  console.log(message);
  displayNotifications(message);
});

messaging().getInitialNotification(async message => {
    console.log(message);
    displayNotifications(message);

})

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
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
