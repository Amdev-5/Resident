import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "../components/";
import ModalDropdown from "react-native-modal-dropdown";
import MenuWrapper from "./MenuWrapper";
import { API_Url2 } from "../utils/API";

const Waiting = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("screen");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const searchRef = useRef();
  const [visitorData, setVisitorData] = useState([]);
  const [token, setToken] = useState(null);
  const [selectedLane, setSelectedLane] = useState("");
  const [lanes, setLanes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchToken = async () => {
    try {
      const token = await AsyncStorage.getItem("@token_resident");
      if (token !== null) {
        setToken(token);
      } else {
        console.log("Token not found in local storage.");
      }
    } catch (error) {
      console.error("Error retrieving token from local storage:", error);
    }
  };

  // const fetchData = async () => {
  //   try {
  //     await fetchToken();
  //     if (token) {
  //       const response = await axios.get(API_Url2 + "/getDevices", {
  //         headers: {
  //           "x-access-token": token,
  //         },
  //       });
  //       const entryDevices = response.data.entry_devices;
  //       const laneNames = entryDevices.map((device) => device.lane_name);
  //       setLanes(laneNames);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const editItem = (item) => {
    // Navigate to AddNewPerson screen with the item data
    navigation.navigate("EditNewPerson", { editData: item });
    console.log(item);
  };

  const fetchVisitorData = async () => {
    try {
      const response = await axios.get(
        API_Url2 + "/getArrivedVisitorbyunit?unit_id=1",
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      const filteredData = response.data.data.map((item) => ({
        name: item.name,
        id: item.id,
        visitor_type: item.purpose,
        visiting_place: item.visiting_place,
        image: item.image,
        vehicle_number: item.vehicle_no,
        phone_number: item.contact_no,
        lane_name: item.lane_name,
        lane_id: item.lane_id,
        visiting_place_id: item.unit_id,
        status: item.approval_request_status,
      }));

      // "approval_request_status": 1,
      //       "approver_type": 1,
      //       "contact_no": "1010101010",
      //       "id": 93,
      //       "image": null,
      //       "lane_id": null,
      //       "name": "Amit",
      //       "purpose": "Delivery",
      //       "vehicle_no": "KA 101010",
      //       "visiting_place": "The Associated Cement Companyl"
      setVisitorData(filteredData);
      setData(filteredData); // Initialize data with visitorData
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    // fetchData();
    fetchVisitorData();
  }, []);

  const searchFilterFunction = (text) => {
    setSearch(text);
    const filteredData = visitorData.filter(
      (item) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.vehicle_number.toLowerCase().includes(text.toLowerCase())
    );
    setData(filteredData);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // await fetchData();
    await fetchVisitorData();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Search bar */}
      <View style={{ flexDirection: "row", alignItems: "center", height: 70 }}>
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
            placeholder="Search Visitors here..."
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

      {/* Lane selection dropdown */}
      {/* <View
        style={{ justifyContent: "center", alignItems: "center", padding: 10 }}
      >
        <ModalDropdown
          style={{
            borderWidth: 1,
            borderColor: "black",
            padding: 10,
            width: width - 32,
          }}
          options={lanes}
          defaultValue="Select Lane"
          textStyle={{ fontSize: 16, color: "black", textAlign: "center" }}
          dropdownStyle={{
            width: width - 92,
            borderWidth: 1,
            borderColor: "black",
          }}
          onSelect={(index, value) => setSelectedLane(value)}
        />
      </View> */}

      {/* FlatList */}
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
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
              {/* Image */}
              <Image
                source={{ uri: API_Url2 + "/img/" + item.image }}
                style={{
                  width: 60,
                  height: "90%",
                  marginLeft: 10,
                  borderRadius: 10,
                }}
              />
              {/* Details */}
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
                  {/* <Text style={{ marginLeft: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>Visiting Place:</Text>
                    <Text> {item.visiting_place}</Text>
                  </Text> */}
                  <Text style={{ marginLeft: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>Visitor Type:</Text>
                    <Text> {item.visitor_type}</Text>
                  </Text>
                  <Text style={{ marginLeft: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>Status:</Text>
                    {item.status === 0 && (
                      <Text style={{ color: "red" }}> Rejected</Text>
                    )}
                    {item.status === 1 && (
                      <Text style={{ color: "green" }}> Approved</Text>
                    )}
                    {item.status === 2 && (
                      <Text style={{ color: "#E1AD01" }}> Waiting</Text>
                    )}
                  </Text>
                </View>
                {/* Menu */}
                {/* <MenuWrapper
                  // onEdit={() => editItem(item)}
                  visitorId={item.id}
                  handleRefresh={handleRefresh} // Pass handleRefresh as a prop
                /> */}
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* Add new person button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddNewPerson")}
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