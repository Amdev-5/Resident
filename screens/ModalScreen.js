import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

import { Block, Button, theme } from "galio-framework";
import { Images, argonTheme } from "../constants/";
import ModalDropdown from "react-native-modal-dropdown";
import { useRoute } from "@react-navigation/native";

const { height, width } = Dimensions.get("screen");

const ModalScreen = ({ props }) => {
  const [text, setText] = useState("");

  const route = useRoute();
  const receivedData = route.params?.personData || null;

  return (
    <View style={{ flexGrow: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={{ padding: 10, alignItems: "center" }}></View>
          <Image
            source={{ uri: receivedData.image }}
            style={{
              top: 25,
              height: 200,
              width: width - 32,
            }}
          />
          <View style={{ alignItems: "center", flexGrow: 1 }}>
            <View style={styles.card}>
              <Text style={styles.textbox}>
                <Text style={styles.key}>Vehicle Number:</Text>
                <Text style={styles.value}> {receivedData.vehicle_number}</Text>
              </Text>
              <Text style={styles.textbox}>
                <Text style={styles.key}>Name:</Text>
                <Text style={styles.value}> {receivedData.name}</Text>
              </Text>
              <Text style={styles.textbox}>
                <Text style={styles.key}>Phone Number:</Text>
                <Text style={styles.value}> {receivedData.phone_number}</Text>
              </Text>
              <Text style={styles.textbox}>
                <Text style={styles.key}>Visiting Place:</Text>
                <Text style={styles.value}> {receivedData.visiting_place}</Text>
              </Text>
              <Text style={styles.textbox}>
                <Text style={styles.key}>Visiting Type:</Text>
                <Text style={styles.value}> {receivedData.visitor_type}</Text>
              </Text>
              <Text style={styles.textbox}>
                <Text style={styles.key}>Entry Time:</Text>
                <Text style={{ fontSize: 17, color: "green" }}>
                  {" "}
                  {receivedData.entry_time}
                </Text>
              </Text>
              <Text style={styles.textbox}>
                <Text style={styles.key}>Exit Time:</Text>
                <Text style={{ fontSize: 17, color: "red" }}>
                  {" "}
                  {receivedData.exit_time}
                </Text>
              </Text>
              {receivedData.authorization_status ? (
                <Text style={styles.textbox}>
                  <Text style={styles.key}>Status:</Text>
                  <Text
                    style={{
                      fontSize: 17,
                      color:
                        receivedData.authorization_status === "Authorized"
                          ? "green"
                          : "red",
                    }}
                  >
                    {" "}
                    {receivedData.authorization_status}
                  </Text>
                </Text>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    height: "53%",
    alignItems: "center",
    paddingTop: 10,
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
    width: width - theme.SIZES.BASE * 1.7,
    marginBottom: 50,
    top: 60,
  },
  card1: {
    backgroundColor: "white",
    marginVertical: theme.SIZES.BASE,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
    width: width - theme.SIZES.BASE * 1.7,
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
  key: {
    fontSize: 20,
    fontWeight: "bold",
  },
  value: {
    fontSize: 17,
  },
  textbox: {
    marginVertical: 5,
  },
});

export default ModalScreen;
