import {
  View,
  Alert,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Modal,
  StyleSheet,
  Dimensions,
  Button,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Icon } from "../components/";
import { useNavigation } from "@react-navigation/native";
import ModalDropdown from "react-native-modal-dropdown";
import MenuWrapper from "./MenuWrapper";

const Waiting = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("screen");
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const searchRef = useRef();
  const [oldData, setOldData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const [visitorType, setVisitorType] = useState("resident");
  const [dotClicks, setDotClicks] = useState({});
  const [modalVisible, setModalVisible] = useState();
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

  useEffect(() => {
    // Initialize dotClicks state for each item
    let clicks = {};
    data.forEach((item) => {
      clicks[item.id] = false; // Initialize click status for each item
    });
    setDotClicks(clicks);
  }, [data]);

  const handleDotClick = (id) => {
    setDotClicks((prevClicks) => ({
      ...prevClicks,
      [id]: !prevClicks[id], // Toggle click status for the specific item
    }));
  };

  console.log(handleDotClick);

  const DropDownData = ["Hello", "World", "This", "Is", "A", "Test"];
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
      {/* <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <ModalDropdown
          style={{
            borderWidth: 1,
            borderColor: "black",
            padding: 10,
            width: width - 32,
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
      </View> */}
      <FlatList
        data={[
          {
            name: "Dilip Ranjan",
            visiting_place: "Block 4, Phase 1, Appart-420",
            id: 1,
            image:
              "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            authorization_status: "Authorization Required",
            visitor_type: "Guest",
            vehicle_number: "KA 12D 4660",
            phone_number: "+91 9680485959",
          },
          {
            name: "Sai Kiran K",
            visiting_place: "Block 4, Phase 1, Appart-420",
            id: 2,
            image:
              "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            authorization_status: "Authorized",
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
            authorization_status: "Authorization Required",
            visitor_type: "Guest",
            vehicle_number: "KA 12D 4660",
            phone_number: "+91 9680485959",
          },
          {
            name: "Sai Kiran K",
            visiting_place: "Block 4, Phase 1, Appart-420",
            id: 4,
            image:
              "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            authorization_status: "Authorized",
            visitor_type: "Cab",
            vehicle_number: "KA 12D 4660",
            phone_number: "+91 9680485959",
          },
          {
            name: "Dilip Ranjan",
            visiting_place: "Block 4, Phase 1, Appart-420",
            id: 5,
            image:
              "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            authorization_status: "Authorization Required",
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
            authorization_status: "Authorized",
            visitor_type: "Cab",
            vehicle_number: "KA 12D 4660",
            phone_number: "+91 9680485959",
          },
          {
            name: "Dilip Ranjan",
            visiting_place: "Block 4, Phase 1, Appart-420",
            id: 7,
            image:
              "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            authorization_status: "Authorized",
            visitor_type: "Cab",
            vehicle_number: "KA 12D 4660",
            phone_number: "+91 9680485959",
          },
          {
            name: "Dilip Ranjan",
            visiting_place: "Block 4, Phase 1, Appart-420",
            id: 8,
            image:
              "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            authorization_status: "Authorized",
            visitor_type: "Tyre",
            vehicle_number: "KA 12D 4660",
            phone_number: "+91 9680485959",
          },
        ]}
        showsVerticalScrollIndicator={false}
        Data={DropDownData}
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
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ width: "80%", flex: 2 }}>
                <Text style={{ marginLeft: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Name:</Text>
                  <Text> {item.name}</Text>
                </Text>
                <Text style={{ marginLeft: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Phone:</Text>
                  <Text> {item.phone_number}</Text>
                </Text>
                <Text style={{ marginLeft: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Visiting Place:</Text>
                  <Text> {item.visiting_place}</Text>
                </Text>
                <Text style={{ marginLeft: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Visitor Type:</Text>
                  <Text> {item.visitor_type}</Text>
                </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        marginLeft: 10,
                        color: item.authorization_status === "Authorized" ? "green" : "red",
                      }}
                    >
                      {item.authorization_status}
                    </Text>
                  </View>
                </View>
                  <MenuWrapper />
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
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
      </TouchableOpacity>
    </View>
  );
};

export default Waiting;

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
    backgroundColor: "#2196F3",
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
});
