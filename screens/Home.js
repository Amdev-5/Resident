import { Animated, Dimensions, Easing, ScrollView, Alert } from "react-native";
// header for screens
import { Header, Icon } from "../components";
import { argonTheme, tabs } from "../constants";

import AboutScreen from "../screens/About";
import AgreementScreen from "../screens/Agreement";
import Articles from "../screens/Articles";
import Beauty from "../screens/Beauty";
import Cart from "../screens/Cart";
import Category from "../screens/Category";
import Chat from "../screens/Chat";
// drawer
import CustomDrawerContent from "../navigation/Menu";
import Elements from "../screens/Elements";
import Fashion from "../screens/Fashion";
import Gallery from "../screens/Gallery";
import { Block } from "galio-framework";

import NotificationsScreen from "../screens/Notifications";
// Notifications
import PersonalNotifications from "./PersonalNotifications";
import PrivacyScreen from "../screens/Privacy";
import { Notification } from "../components";
// import Onboarding from "../screens/Onboarding";
import Pro from "../screens/Pro";
import Product from "../screens/Product";
import Profile from "../screens/Profile";
import { React, useState } from "react";
import Register from "../screens/Register";
import Search from "../screens/Search";
// settings
import SettingsScreen from "../screens/Settings";
import SystemNotifications from "../screens/SystemNotifications";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Inside from "./Inside";
import Waiting from "./Waiting";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Home = () => {
  const [visitorType, setVisitorType] = useState("resident");

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Arrived") {
            iconName = "users";
          } else if (route.name === "Pending") {
            iconName = "bell";
          }
          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              family="entypo"
              size={22}
              color={color}
              style={{ marginTop: 10 }}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "red",
        inactiveTintColor: "gray",
        labelStyle: {
          fontFamily: "open-sans-regular",
        },
      }}
    >
      <Tab.Screen name="Pending" component={Inside} />
      <Tab.Screen name="Arrived" component={Waiting} />
    </Tab.Navigator>
  );
};

// const styles = StyleSheet.create({
//   home: {
//     width: width,
//   },
//   // articles: {
//   //   width: width - theme.SIZES.BASE * 2,
//   //   paddingVertical: theme.SIZES.BASE,
//   //   paddingHorizontal: 2,
//   // },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "white",
//   },
//   form: {
//     width: 670,
//     height: 400,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 15,
//     // backgroundColor: "rgba(255,255,255,0.1)",
//     // shadowColor: "#000",
//     // shadowOffset: {
//     //   width: 20,
//     //   height: 20,
//     // },
//     // shadowOpacity: 0.5,
//     // shadowRadius: 50,
//     // elevation: 10,
//   },
//   heading: {
//     color: "#000",
//     fontWeight: "500",
//     marginTop: 20,
//     width: 500,
//     textAlign: "center",
//   },
//   input: {
//     width: width - 32,
//     height: 40,
//     paddingLeft: 10,
//     fontSize: 15,
//     marginBottom: 10,
//     borderBottomWidth: 2,
//     borderBottomColor: "#000",
//     color: "#000",
//   },
//   message: {
//     color: "#000",
//     fontWeight: "300",
//     width: width - 32,
//     marginTop: 20,
//   },
//   textArea: {
//     backgroundColor: "transparent",
//     borderBottomWidth: 2,
//     borderBottomColor: "#000",
//     color: "#000",
//     fontWeight: "200",
//     fontSize: 15,
//     padding: 10,
//     minWidth: width - 32,
//     maxWidth: width - 32,
//     minHeight: 80,
//     maxHeight: 80,
//   },
//   button: {
//     backgroundColor: "red",
//     borderRadius: 15,
//     marginTop: 20,
//     width: width - 97,
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

export default Home;
