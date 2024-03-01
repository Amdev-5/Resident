import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";
import Images from "../constants/Images";
import { DrawerItem as DrawerCustomItem } from "../components/index";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const insets = useSafeArea();
  const [showProfileSubmenu, setShowProfileSubmenu] = useState(false);
  const [selectedSubmenuItem, setSelectedSubmenuItem] = useState(null);

  const toggleProfileSubmenu = () => {
    setShowProfileSubmenu(!showProfileSubmenu);
  };

  const screens = [
    {
      title: "Home",
      navigateTo: "HomeDrawer",
      icon: "home",
    },
    {
      title: "Profile",
      submenu: [
        { title: "Vehicle Management", navigateTo: "ProfileDrawer" },
        { title: "FR setup", navigateTo: "FRSetup" },
        { title: "Personal Information", navigateTo: "PersonalInformation" },
      ],
      icon: "person",
    },
  ];

  const handleSubmenuItemPress = (submenuItem) => {
    setSelectedSubmenuItem(submenuItem);
    navigation.navigate(submenuItem.navigateTo);
  };

  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.06} style={styles.header}>
        <Image
          style={{
            width: 300,
            height: 80,
            resizeMode: "contain",
            tintColor: "red",
          }}
          source={Images.Logo}
        />
      </Block>

      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (item.title === "Profile") {
                  toggleProfileSubmenu();
                } else if (item.title === "LogOut") {
                  navigation.navigate(item.navigateTo);
                } else {
                  navigation.navigate(item.navigateTo);
                }
              }}
            >
              <Block
                style={[
                  styles.menuItem,
                  state.index === index && styles.activeMenuItem,
                ]}
              >
                <MaterialIcons
                  name={item.icon}
                  size={24}
                  color={state.index === index ? "white" : "red"}
                />
                <Text
                  style={{
                    marginLeft: 15,
                    color: state.index === index ? "white" : "black",
                  }}
                >
                  {item.title}
                </Text>
              </Block>
            </TouchableOpacity>
          ))}
          {showProfileSubmenu && (
            <Block style={styles.submenuContainer}>
              {screens
                .find((item) => item.title === "Profile")
                ?.submenu.map((submenuItem, subIndex) => (
                  <TouchableOpacity
                    key={subIndex}
                    onPress={() => handleSubmenuItemPress(submenuItem)}
                  >
                    <Block
                      style={[
                        styles.submenuItem,
                        selectedSubmenuItem === submenuItem &&
                          styles.selectedSubmenuItem,
                      ]}
                    >
                      <Text style={{ marginLeft: 30 }}>
                        {submenuItem.title}
                      </Text>
                    </Block>
                  </TouchableOpacity>
                ))}
            </Block>
          )}
          {/* LogOut button placed where the menu items end */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Onboarding")}
            style={styles.logoutButton}
          >
            <MaterialIcons name="logout" size={24} color="red" />
            <Text style={{ marginLeft: 15, color: "black" }}>LogOut</Text>
          </TouchableOpacity>
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: theme.SIZES.BASE * 1.7,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: "red", // Set border color to red
  },
  activeMenuItem: {
    backgroundColor: "red", // Set background color to red
    borderRadius: 15,
  },
  submenuContainer: {
    backgroundColor: "#fff",
    // borderBottomColor: "red",
    // borderBottomWidth: 2,
    paddingBottom: 10,
  },
  submenuItem: {
    paddingLeft: 30,
    paddingVertical: 8,
    fontSize: 16,
    color: "black",
  },
  selectedSubmenuItem: {
    backgroundColor: "lightgray", // Set background color to gray for selected submenu item
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default CustomDrawerContent;
