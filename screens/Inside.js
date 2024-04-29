import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Icon } from "../components/";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_Url2 } from "../utils/API";

const Inside = () => {
  const [visitorData, setVisitorData] = useState([]);
  const [search, setSearch] = useState("");
  const searchRef = useRef();
  const [filteredData, setFilteredData] = useState([]);
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const [data,setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem("@token_resident");
        if (token !== null) {
          // console.log("Token retrieved successfully:", token);
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
  // console.log(token)
  const fetchData = async () => {
    try {
      const response = await axios.get(
        API_Url2+"/getWaitingVisitorbyunit?unit_id=1"
      );
      const formattedData = response.data.data.map((item) => ({
        name: item.name,
        id: item.id,
        visitor_type: item.purpose,
        visiting_place: item.unit_name,
        image: item.image,
        vehicle_number: item.vehicle_no,
        phone_number: item.contact_no,
        entry_time: item.date,
        isApproved: false,
      }));
      setVisitorData(formattedData);
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
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

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };
  // Function to fetch visitor data
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://192.168.0.116:10000/getWaitingVisitorbyunit?unit_id=1",
  //         {}
  //       );
  //       // console.log(response)
  //       const formattedData = response.data.data.map((item) => ({
  //         name: item.name,
  //         id: item.id,
  //         visitor_type: item.purpose,
  //         visiting_place: item.unit_name,
  //         image: item.image,
  //         vehicle_number: item.vehicle_no,
  //         phone_number: item.contact_no,
  //         entry_time: item.date,
  //         isApproved: false, // Add a state for each item to track approval
  //       }));
  //       setVisitorData(formattedData);
  //       setFilteredData(formattedData);
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // Function to handle approval or rejection
  const handleApproval = async (id, status) => {
    // console.log(id,status)
    try {
      const requestStatus = status ? 1 : 0;

      const response = await axios.post(
        API_Url2+"/update_request",
        {
          visitor_id: id,
          request_status: requestStatus,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      //console.log(response);

      // If request is successful, update the local state
      if (response.data.status === 1) {
        const updatedData = visitorData.map((item) =>
          item.id === id ? { ...item, isApproved: requestStatus === 1 } : item
        );
        setVisitorData(updatedData);
        Alert.alert("Success");
      } else {
        console.error("Error updating request status: ", response.data.message);
      }
    } catch (error) {
      console.error("Error updating request status: ", error);
    }
  };

  // Function to filter data based on search query
  // const searchFilterFunction = (text) => {
  //   setSearch(text);
  //   const filteredData = visitorData.filter((item) =>
  //     item.name.toLowerCase().includes(text.toLowerCase())
  //   );
  //   setFilteredData(filteredData);
  // };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
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
            placeholder="Search visitors here..."
            style={{ width: "76%", height: 50 }}
            value={search}
            onChangeText={searchFilterFunction}
          />
          {search === "" ? null : (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                searchRef.current.clear();
                searchFilterFunction("");
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
        data={data}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ModalScreen", { personData: item })
            }
            style={{
              width: "90%",
              borderRadius: 10,
              borderWidth: 0.5,
              alignSelf: "center",
              marginTop: 10,
            }}
          >
            <View style={{ flexDirection: "row", padding: 10 }}>
              <Image
                source={{ uri: item.image }}
                style={{ width: 60, height: 60, borderRadius: 10 }}
              />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                <Text>Vehicle Number: {item.vehicle_number}</Text>
                <Text>Visiting Type: {item.visitor_type}</Text>
                <Text style={{ color: "green" }}>
                  Entry Time: {item.entry_time}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  marginStart: "auto",
                }}
              >
                <TouchableOpacity
                  onPress={() => handleApproval(item.id, true)} // Approve
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
                  onPress={() => handleApproval(item.id, false)} // Reject
                  style={{
                    borderWidth: 1,
                    paddingHorizontal: 7,
                    padding: "18.9%",
                    borderRadius: 0,
                    borderBottomRadius: 10,
                    
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
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
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