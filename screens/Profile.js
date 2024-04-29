import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  Alert,
  Pressable,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
const { width } = Dimensions.get("screen");
import ModalDropdown from "react-native-modal-dropdown";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_Url2 } from "../utils/API";

const Profile = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const searchRef = useRef();
  const [oldData, setOldData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [modalVisible, setModalVisible] = useState();
  const [visitorType, setVisitorType] = useState("resident");
  const [lanes, setLanes] = useState([]);
  const [selectedLane, setSelectedLane] = useState("");
  const [selectedLaneId, setSelectedLaneId] = useState(null);
  const [entryDevices, setEntryDevices] = useState([]);
  const navigation = useNavigation();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem("@token_resident");
        if (token !== null) {
          console.log("Token retrieved successfully Profile:", token);
          setToken(token); // Set the token in state
        } else {
          console.log("Token not found in local storage.");
        }
      } catch (error) {
        console.error("Error retrieving token from local storage:", error);
      }
    };

    fetchToken();
  }, []);

  console.log("profile Token log:", token);
  useEffect(() => {
    // fetch(
    //   `http://192.168.0.83:10000/getVehicleList?page_no=1&page_limit=10&society_id=1&lane_id=${selectedLaneId}&unclear_plates=true&no_plates=true`,
    fetch(
      API_Url2+`/getVehicleList?page_no=1&page_limit=100&society_id=1&lane_id=9&unclear_plates=true&no_plates=true`,
      {
        headers: {
          "x-access-token": token, // Include the token in the header
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        const extractedData =
          json.data.length > 0 &&
          json.data.map((item) => ({
            name: item.employee_name,
            image: item.img_path[0],
            vehicle_log_id: item.vehicle_log_id,
            entry_time: item.vehicle_event_logs.entry_time,
            exit_time: item.vehicle_event_logs.exit_time,
            vehicle_number: item.vehicleNo,
            visiting_place: item.unit_name,
          }));
        setData(extractedData);
      })
      .catch((error) => {
        console.error("Error fetching data bla: ", error);
      });
  }, [selectedLaneId, token]);

  useEffect(() => {
    fetch(API_Url2+"/getDevices", {
      headers: {
        "x-access-token": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const entryDevicesData = data.entry_devices;
        setEntryDevices(entryDevicesData);
        const laneNames =
          entryDevicesData.length > 0 &&
          entryDevicesData.map((device) => device.lane_name);
        setLanes(laneNames);
      })
      .catch((error) => {
        console.error("Error fetching devices:", error);
      });
  }, [token]);

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
            placeholder="search Logs here..."
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
        {/* <TouchableOpacity
          style={{
            marginRight: 15,
          }}
          onPress={() => {
            setVisible(true);
          }}>
          <Image
            source={require('./filter.png')}
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity> */}
        <View style={{ backgroundColor: "dodgerblue" }}></View>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 20,
        }}
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
          onSelect={(index, value) => {
            setSelectedLaneId(entryDevices[index].lane_id);
            setSelectedLane(value);
          }}
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.vehicle_log_id.toString()}
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
                {/* <Text style={{ marginLeft: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Visiting Type:</Text>
                  <Text> {item.visitor_type}</Text>
                </Text> */}
                <Text style={{ marginLeft: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Entry Time:</Text>
                  <Text style={{ color: "green" }}> {item.entry_time}</Text>
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ marginLeft: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>Exit Time:</Text>
                    <Text style={{ color: "red" }}> {item.exit_time}</Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Profile;

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
