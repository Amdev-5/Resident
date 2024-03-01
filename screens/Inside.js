import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  Dimensions,
  Modal,
  StyleSheet,
  Button,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Icon } from "../components/";
import { useNavigation } from "@react-navigation/native";
import ModalScreen from "./ModalScreen";
const { width } = Dimensions.get("screen");
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Inside = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const searchRef = useRef();
  const [oldData, setOldData] = useState([]);
  const navigation = useNavigation();

  // useEffect(() => {
  //   fetch('https://fakestoreapi.com/products')
  //     .then(res => res.json())
  //     .then(response => {
  //     //   console.log(response);
  //       setData(response);
  //       setOldData(response);
  //     });
  // }, []);
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text !== "") {
      let tempData = data.filter((item) => {
        return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(oldData);
    }
  };

  const handleVisitorClick = () => {
    navigation.navigate("AddNewPerson");
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          height: 70,
          marginTop: 20,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "91%",
            height: 50,
            borderRadius: 10,
            borderWidth: 0.2,

            flexDirection: "row",
            alignItems: "center",
            marginLeft: 15,
          }}
        >
          <Image
            source={require("./search.png")}
            style={{ width: 24, height: 24, marginLeft: 15, opacity: 0.5 }}
          />
          <TextInput
            ref={searchRef}
            placeholder="search Visitors here..."
            style={{ width: "76%", height: 50 }}
            value={search}
            onChangeText={(txt) => {
              searchFilterFunction(txt);
              setSearch(txt);
            }}
          />
          {search == "" ? null : (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                searchRef.current.clear();
                searchFilterFunction("");
                setSearch("");
              }}
            >
              <Image
                source={require("./close.png")}
                style={{ width: 16, height: 16, opacity: 0.5 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <FlatList
        data={[
          {
            name: "Dilip Ranjan",
            visiting_place: "Block 4, Phase 1, Appart-420",
            id: 1,
            image:
              "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            entry_time: "13/01/2024, 4:07 PM",
            exit_time: "13/01/2024, 6:15 PM",
            visitor_type: "Guest",
            vehicle_number: "KA 12D 4660",
            phone_number: "+91 9680485959",
          },
          {
            name: "Dilip Ranjan",
            visiting_place: "Block 4, Phase 1, Appart-420",
            id: 2,
            image:
              "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            entry_time: "13/01/2024, 4:07 PM",
            exit_time: "13/01/2024, 6:15 PM",
            visitor_type: "Cab",
            vehicle_number: "KA 12D 4660",
            phone_number: "+91 9680485959",
          },
          {
            name: "Dilip Ranjan",
            visiting_place: "Block 4, Phase 1, Appart-420",
            id: 3,
            image:
              "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            entry_time: "13/01/2024, 4:07 PM",
            exit_time: "13/01/2024, 6:15 PM",
            visitor_type: "Delivery",
            vehicle_number: "KA 12D 4660",
            phone_number: "+91 9680485959",
          },
          {
            name: "Dilip Ranjan",
            visiting_place: "Block 4, Phase 1, Appart-420",
            id: 4,
            image:
              "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            entry_time: "13/01/2024, 4:07 PM",
            exit_time: "13/01/2024, 6:15 PM",
            visitor_type: "Housekeeper",
            vehicle_number: "KA 12D 4660",
            phone_number: "+91 9680485959",
          },
          {
            name: "Dilip Ranjan",
            visiting_place: "Block 4, Phase 1, Appart-420",
            id: 5,
            image:
              "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            entry_time: "13/01/2024, 4:07 PM",
            exit_time: "13/01/2024, 6:15 PM",
            visitor_type: "Guest",
            vehicle_number: "KA 12D 4660",
            phone_number: "+91 9680485959",
          },
          {
            name: "Dilip Ranjan",
            visiting_place: "Block 4, Phase 1, Appart-420",
            id: 6,
            image:
              "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            entry_time: "13/01/2024, 4:07 PM",
            exit_time: "13/01/2024, 6:15 PM",
            visitor_type: "Guest",
            vehicle_number: "KA 12D 4660",
            phone_number: "+91 9680485959",
          },
          {
            name: "Dilip Ranjan",
            visiting_place: "Block 4, Phase 1, Appart-420",
            id: 7,
            image:
              "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            entry_time: "13/01/2024, 4:07 PM",
            exit_time: "13/01/2024, 6:15 PM",
            visitor_type: "Guest",
            vehicle_number: "KA 12D 4660",
            phone_number: "+91 9680485959",
          },
          {
            name: "Dilip Ranjan",
            visiting_place: "Block 4, Phase 1, Appart-420",
            id: 8,
            image:
              "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            entry_time: "13/01/2024, 4:07 PM",
            exit_time: "13/01/2024, 6:15 PM",
            visitor_type: "Guest",
            vehicle_number: "KA 12D 4660",
            phone_number: "+91 9680485959",
          },
          {
            name: "Dilip Ranjan",
            visiting_place: "Block 4, Phase 1, Appart-420",
            id: 9,
            image:
              "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            entry_time: "13/01/2024, 4:07 PM",
            exit_time: "13/01/2024, 6:15 PM",
            visitor_type: "Guest",
            vehicle_number: "KA 12D 4660",
            phone_number: "+91 9680485959",
          },
          {
            name: "Dilip Ranjan",
            visiting_place: "Block 4, Phase 1, Appart-420",
            id: 10,
            image:
              "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            entry_time: "13/01/2024, 4:07 PM",
            exit_time: "13/01/2024, 6:15 PM",
            visitor_type: "Guest",
            vehicle_number: "KA 12D 4660",
            phone_number: "+91 9680485959",
          },
          {
            name: "Dilip Ranjan",
            visiting_place: "Block 4, Phase 1, Appart-420",
            id: 11,
            image:
              "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            entry_time: "13/01/2024, 4:07 PM",
            exit_time: "13/01/2024, 6:15 PM",
            visitor_type: "Guest",
            vehicle_number: "KA 12D 4660",
            phone_number: "+91 9680485959",
          },
          {
            name: "Raghav Tiwari",
            visiting_place: "Block 4, Phase 1, Appart-420",
            id: 12,
            image:
              "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            entry_time: "13/01/2024, 4:07 PM",
            exit_time: "13/01/2024, 6:15 PM",
            visitor_type: "Guest",
            vehicle_number: "KA 12D 4660",
            phone_number: "+91 9680485959",
          },
        ]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate("ModalScreen", { personData: item })
              }
              style={{
                width: "90%",
                borderRadius: 10,
                borderWidth: 0.5,
                alignSelf: "center",
                marginTop: 10,
                marginBottom: index == data.length - 1 ? 20 : 0,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 60,
                  height: "90%",
                  marginLeft: 10,
                  borderRadius: 10,
                }}
              />
              <View style={{ width: "80%" }}>
                <Text style={{ marginLeft: 10, marginTop: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Vechile Number:</Text>
                  <Text> {item.vehicle_number}</Text>
                </Text>
                <Text style={{ marginLeft: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Name:</Text>
                  <Text> {item.name}</Text>
                </Text>
                <Text style={{ marginLeft: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Visiting Type:</Text>
                  <Text> {item.visitor_type}</Text>
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ marginLeft: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>Entry Time:</Text>
                    <Text style={{ color: "green" }}> {item.entry_time}</Text>
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  marginStart: "auto",
                }}
              >
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    paddingHorizontal: 7,
                    padding: "18.9%",
                    borderRadius: 0,
                    borderTopRightRadius: 10,
                  }}
                >
                  <Icon
                    name="check"
                    family="entypo"
                    size={30}
                    style={{ color: "green" }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    paddingHorizontal: 7,
                    padding: "18.9%",
                    borderRadius: 0,
                    borderBottomRightRadius: 10,
                  }}
                >
                  <Icon
                    name="cross"
                    family="entypo"
                    size={30}
                    style={{ color: "red" }}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {/* <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddNewPerson")} // Navigate to AddNewPerson screen
      >
        <Icon
          family="entypo"
          size={35}
          name="plus"
          style={{
            color: "white",
          }}
        />
      </TouchableOpacity> */}
    </View>
  );
};

export default Inside;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    display: "flex",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#ff0000",
    borderRadius: 50,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 40,
    color: "white",
    paddingBottom: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 70, // Adjust the width as needed
  },
  icons: {
    borderWidth: 1,
    paddingHorizontal: 5,
    padding: "18.9%",
    // borderRadius: 0,
    // borderBottomRightRadius: 10,
  },
});
