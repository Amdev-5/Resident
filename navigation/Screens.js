import { Animated, Dimensions, Easing, ScrollView, Alert } from "react-native";
// header for screens
import { Header, Icon } from "../components";
import { argonTheme, tabs } from "../constants";

import AboutScreen from "../screens/About";
import AgreementScreen from "../screens/Agreement";
import Articles from "../screens/Articles";
import Beauty from "../screens/Beauty";
import Cart from "../screens/Cart";
import AddNewPerson from "../screens/AddNewPerson";
import PersonalInformation from "../screens/PersnolInformation";
import Camera from "../screens/Camera";
import Category from "../screens/Category";
import Chat from "../screens/Chat";
// drawer
import CustomDrawerContent from "./Menu";
import Elements from "../screens/Elements";
import Fashion from "../screens/Fashion";
import Gallery from "../screens/Gallery";
import { Block } from "galio-framework";
// screens
import Home from "../screens/Home";
import NotificationsScreen from "../screens/Notifications";
// Notifications
import PersonalNotifications from "../screens/PersonalNotifications";
import PrivacyScreen from "../screens/Privacy";
import { Notification } from "../components";
// import Onboarding from "../screens/Onboarding";
import Pro from "../screens/Pro";
import Product from "../screens/Product";
import Profile from "../screens/Profile";
import React from "react";
import Register from "../screens/Register";
import Search from "../screens/Search";
// settings
import SettingsScreen from "../screens/Settings";
import SystemNotifications from "../screens/SystemNotifications";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import ModalScreen from "../screens/ModalScreen";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function NotificationsStack(props) {
  return (
    <Block middle flex>
      <Block flex style={{ width: "90%" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Notification
            time="15:30"
            body="New Vechile entered in lane 5, Gate 3"
            iconName="ship"
            iconFamily="font-awesome"
            style={{ marginTop: 15 }}
            onPress={() =>
              Alert.alert(
                "Yes, you can use the notifications as buttons so you could send your customers to anything you want."
              )
            }
          />
          {/* <Notification
              time="12:10"
              body="Customize our products. Now you can make the best and perfect clothes just for you."
              iconName="ship"
              iconFamily="font-awesome"
              color={argonTheme.COLORS.INFO}
              style={{ marginTop: 15 }}
              onPress={() => Alert.alert('Yes, you can use the notifications as buttons so you could send your customers to anything you want.')}
            />
            <Notification
              time="11:30"
              body="Breaking News! We have new methods to payment. Learn how to pay off debt fast using the stack method."
              iconName="ship"
              iconFamily="font-awesome"
              color={argonTheme.COLORS.WARNING}
              style={{ marginTop: 15 }}
              onPress={() => Alert.alert('Yes, you can use the notifications as buttons so you could send your customers to anything you want.')}
            />
            <Notification
              time="04:23"
              body="Congratulations! Someone just ordered a pair of Yamaha HS8 speakers through your app! Hurry up and ship them!"
              iconName="ship"
              iconFamily="font-awesome"
              color={argonTheme.COLORS.SUCCESS}
              style={{ marginTop: 15 }}
              onPress={() => Alert.alert('Yes, you can use the notifications as buttons so you could send your customers to anything you want.')}
            /> */}

          <Block style={{ marginBottom: 20 }} />
        </ScrollView>
      </Block>
    </Block>
  );
}

function ElementsStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Elements"
        component={Elements}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Elements" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Settings" scene={scene} navigation={navigation} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Agreement"
        component={AgreementScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Agreement"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Privacy"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="About" scene={scene} navigation={navigation} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="NotificationsSettings"
        component={NotificationsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Notifications"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Shopping Cart"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="AddNewPerson"
        component={AddNewPerson}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Add Visitor"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Add Visitor"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Add Visitor"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="ModalScreen"
        component={ModalScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Visitor Details"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Notifications"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Articles" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Shopping Cart"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
        }}
      />
      <Stack.Screen
        name="AddNewPerson"
        component={AddNewPerson}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Add Visitor"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
        }}
      />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Add Visitor"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Add Visitor"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="ModalScreen"
        component={ModalScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Visitor Details"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Notifications"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Beauty"
        component={Beauty}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Beauty"
              back
              tabs={tabs.beauty}
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{
          header: ({ navigation, scene }) => {
            const { params } = scene.descriptor;
            const title = (params && params.headerTitle) || "Category";
            return (
              <Header
                title={title}
                back
                navigation={navigation}
                scene={scene}
              />
            );
          },
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Fashion"
        component={Fashion}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Fashion"
              back
              tabs={tabs.fashion}
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={Gallery}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              white
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Rachel Brown"
              back
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Search" back navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Shopping Cart"
              back
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="AddNewPerson"
        component={AddNewPerson}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Add Visitor"
              back
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Add Visitor"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Add Visitor"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="ModalScreen"
        component={ModalScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Visitor Details"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Notifications"
              back
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8,
      }}
      screenOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal",
        },
      }}
      initialRouteName="HomeDrawer"
    >
      <Drawer.Screen
        name="HomeDrawer"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="ProfileDrawer"
        component={ProfileStack}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Profile"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Drawer.Screen
        name="AccountDrawer"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="ElementsDrawer"
        component={ElementsStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="ArticlesDrawer"
        component={ArticlesStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="SettingsDrawer"
        component={SettingsStack}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={Pro}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}
