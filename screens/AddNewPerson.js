import React, { useState, useRef, useEffect } from "react";
import { TextInput } from "react-native-paper";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";

import { Icon } from "../components";

import { Block, Button, theme } from "galio-framework";
import { Images, argonTheme } from "../constants/";
import ModalDropdown from "react-native-modal-dropdown";
import { useRoute } from "@react-navigation/native";

const { height, width } = Dimensions.get("screen");

const AddNewPerson = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false); // State for controlling modal visibility
  const [visitorType, setVisitorType] = useState("resident");

  const route = useRoute();
  const receivedData = route.params;

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              padding: 10,
              alignItems: "center",
            }}
          >
            <ModalDropdown
              style={{
                borderWidth: 1,
                borderColor: "black",
                backgroundColor: "#fff",
                padding: 10,
                width: width - 32,
                marginBottom: -15,
              }}
              options={["Lane 1", "Lane 2", "Lane 3", "Lane 4", "Lane 5"]}
              defaultValue="Select Lane"
              textStyle={{ fontSize: 16, color: "black", textAlign: "center" }}
              dropdownStyle={{
                width: width - 92,
                borderWidth: 1,
                borderColor: "black",
              }}
              onSelect={(index, value) => setVisitorType(value)}
            />
          </View>
          {receivedData ? (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              {/* Wrap the image in TouchableOpacity and set onPress to setModalVisible(true) */}
              <Image style={styles.ImageStyle} source={{ uri: receivedData }} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                source={require("./images.jpeg")}
                style={styles.ImageStyle}
              />
            </TouchableOpacity>
          )}
          {/* Modal for displaying the image in full size */}
          <Modal
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Icon name="close" family="ionicons" size={30} color="white" />
              </TouchableOpacity>
              {receivedData ? (
                <Image
                  style={styles.fullSizeImage}
                  source={{ uri: receivedData }}
                />
              ) : (
                <Image
                  style={styles.fullSizeImage}
                  source={require("./images.jpeg")}
                />
              )}
            </View>
          </Modal>
          {/* End of modal */}
          <TouchableOpacity style={styles.touchImageIcon}>
            <Button
              shadowless
              style={styles.buttonImage}
              color={argonTheme.COLORS.WHITE}
              onPress={() => navigation.navigate("Camera")}
            >
              <Icon
                name="camera"
                family="entypo"
                size={22}
                style={styles.buttonTextImage}
              />
            </Button>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={styles.card}>
            <TextInput
              mode="outlined"
              label="Name"
              placeholder="Enter name"
              style={{ width: width - theme.SIZES.BASE * 3.4 }}
            />
            <TextInput
              mode="outlined"
              label="Vehicle Number"
              placeholder="Enter Vehicle Number"
              style={{ width: width - theme.SIZES.BASE * 3.4 }}
            />
            <TextInput
              mode="outlined"
              label="Phone No."
              placeholder="Enter Phone No."
              style={{ width: width - theme.SIZES.BASE * 3.4 }}
            />
            <ModalDropdown
              style={{
                borderWidth: 1,
                borderColor: "black",
                padding: 13,
                width: width - theme.SIZES.BASE * 3.4,
                margin: 10,
              }}
              options={["Lane 1", "Lane 2", "Lane 3", "Lane 4", "Lane 5"]}
              defaultValue="Visiting Place"
              textStyle={{ fontSize: 16, color: "black", textAlign: "center" }}
              dropdownStyle={{
                width: width - 92,
                borderWidth: 1,
                borderColor: "black",
              }}
              onSelect={(index, value) => setVisitorType(value)}
            />
            <ModalDropdown
              style={{
                borderWidth: 1,
                borderColor: "black",
                padding: 13,
                width: width - theme.SIZES.BASE * 3.4,
                margin: 10,
              }}
              options={["Lane 1", "Lane 2", "Lane 3", "Lane 4", "Lane 5"]}
              defaultValue="Visiting Type"
              textStyle={{ fontSize: 16, color: "black", textAlign: "center" }}
              dropdownStyle={{
                width: width - 92,
                borderWidth: 1,
                borderColor: "black",
              }}
              onSelect={(index, value) => setVisitorType(value)}
            />
            <Button shadowless style={styles.button}>
              <Text style={styles.buttonText}>Send Request</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    height: "50%",
    alignItems: "center",
    top: 1,
  },
  card: {
    backgroundColor: "white",
    marginVertical: theme.SIZES.BASE,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
    alignItems: "center",
    width: width - theme.SIZES.BASE * 1.7,
    position: "relative",
    top: -70,
    zIndex: 1,
    marginBottom: 50,
  },
  button: {
    width: width - theme.SIZES.BASE * 3.4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 15,
    backgroundColor: "red",
  },
  buttonText: {
    fontFamily: "open-sans-bold",
    fontSize: 14,
    color: "white",
  },
  buttonImage: {
    width: 50,
    height: 50,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 25,
    textAlign: "right",
  },
  touchImageIcon: {
    marginStart: "auto",
  },
  buttonTextImage: {
    fontFamily: "open-sans-bold",
    color: "red",
    fontWeight: "800",
  },
  ImageStyle: {
    top: 25,
    height: 200,
    width: width - 32,
    resizeMode: "cover",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  fullSizeImage: {
    width: width - 40,
    height: height - 40,
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
});

export default AddNewPerson;
