// import React, { useState, useRef, useEffect } from "react";
// import { TextInput } from "react-native-paper";
// import {
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   View,
//   Image,
//   SafeAreaView,
//   Text,
//   TouchableOpacity,
//   Modal,
// } from "react-native";
// import { StatusBar } from "expo-status-bar";
// import { shareAsync } from "expo-sharing";
// import * as MediaLibrary from "expo-media-library";
// import { Camera } from "expo-camera";

// import { Icon } from "../components";

// import { Block, Button, theme } from "galio-framework";
// import { Images, argonTheme } from "../constants/";
// import ModalDropdown from "react-native-modal-dropdown";
// import { useRoute } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_Url, API_Url1, API_Url2 } from "../utils/API";

// const { height, width } = Dimensions.get("screen");

// const AddNewPerson = ({ navigation }) => {
//   const [modalVisible, setModalVisible] = useState(false); // State for controlling modal visibility
//   const [visitorType, setVisitorType] = useState("");
//   const [name, setName] = useState("");
//   const [vehicleNo, setVehicleNo] = useState("");
//   const [phoneNo, setPhoneNo] = useState("");
//   const [selectedVisitingPlace, setSelectedVisitingPlace] = useState(
//     "Select Visiting Place"
//   );
//   const [selectedVisitingType, setSelectedVisitingType] = useState(
//     "Select Visiting Type"
//   );
//   const [laneId, setLaneId] = useState();
//   const [token, setToken] = useState(null);
//   const [unitList, setUnitList] = useState([]);
//   const [selectedUnit, setSelectedUnit] = useState("");
//   const [laneList, setLaneList] = useState([]);
//   const [selectedLaneId, setSelectedLaneId] = useState(null);
//   const [visitorPurposes, setVisitorPurposes] = useState([]);

//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const token = await AsyncStorage.getItem("@token_resident");
//         if (token !== null) {
//           // console.log("Token retrieved successfully:", token);
//           setToken(token); // Set the token in state
//         } else {
//           console.log("Token not found in local storage.");
//         }
//       } catch (error) {
//         console.error("Error retrieving token from local storage:", error);
//       }
//     };

//     fetchToken();
//   }, []);


//   const handleUnitSelect = (index, value) => {
//     setSelectedVisitingPlace(unitList[index]);
//   };


//   const handleLandSelect = (index) => {
//     const selectedLane = laneList[index];
//     setSelectedLaneId(selectedLane.lane_id);
//   };

//   const route = useRoute();
//   const receivedData = route.params;

//   //   const url = "https://fcm.googleapis.com/fcm/send";
//   //   const apiKey =
//   //     "AAAA4gFXEP8:APA91bFFDyUg_OP2A-g512Fg9sICU6lZ6t5ENEysC7ZVrDxzsoCrOSwNbxXzPK9BqpAnHGohYDnMfOQsfgn8Wdq9GbPw_zUQJ4vfw4CoaHMHgO8ZXy5bEp3EYDoOsuln4Tn3Ytviqkwe";

//   //   const requestBody = {
//   //     to: "ewPvE2ckTYekLPwSExRD-Q:APA91bEQq1PZHosz9SMd8kTu4AUpMskOEaSZ-ds7kQklJBwCMLl3LASKkNQFTWYRjYpAIQCgOs5_IrYn67poc2ftjOw_007GRZ8INWgfMJhmbtkrBuUqgPMYSjpHy6Wx3WLt1Dn7PvMB",
//   //     data: {
//   //       data_new: "Test Data",
//   //     },
//   //     notification: {
//   //       body: "This is an FCM notification message!",
//   //       title: "FCM Message",
//   //     },
//   //   };

//   //   try {
//   //     const response = await fetch(url, {
//   //       method: "POST",
//   //       headers: {
//   //         Authorization: `Bearer ${apiKey}`,
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(requestBody),
//   //     });

//   //     const responseData = await response.json();
//   //     console.log("FCM Response:", responseData);
//   //   } catch (error) {
//   //     console.error("Error sending FCM notification:", error);
//   //   }
//   // };

//   // const handlePlaceSelect = (index, value) => {
//   //   setSelectedVisitingPlace(value);
//   // };

//   const addVisitor = async () => {
//     try {
//       const response = await fetch(API_Url2 + "/add_visitor_for_unit", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-access-token":token
//         },
//         body: JSON.stringify({
//           name: name,
//           vehicle_no: vehicleNo,
//           phone_no: phoneNo,
//           visiting_purpose: selectedVisitingType,
//         }),
//       });

//       // Handle response
//       const data = await response.json();
//       console.log("Response:", data);

//       if (data.status === 0) {
//         // Show an alert if status is 0
//         alert("Failed to add visitor");
//       } else if (data.status === 1) {
//         // Reset form fields after successful submission
//         navigation.goBack();
//         setName("");
//         setVehicleNo("");
//         setPhoneNo("");
//         setSelectedVisitingPlace("Select Visiting Place");
//         setSelectedVisitingType("Select Visiting Type");
//         setSelectedLaneId(null); // Reset selected lane ID

//         // Show success alert
//         alert("Visitor added successfully!");
//       }

//       // You can also store the response data if needed
//       const visitorId = data["visitor id"];
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Failed to add visitor. Please try again later.");
//     }
//   };

//   useEffect(() => {
//     const fetchVisitorPurposes = async () => {
//       try {
//         const response = await fetch(API_Url2 + "/getVisitorpurpose");
//         const data = await response.json();
//         if (data.status === 1) {
//           setVisitorPurposes(data.data);
//         } else {
//           console.error("Failed to fetch visitor purposes");
//         }
//       } catch (error) {
//         console.error("Error fetching visitor purposes:", error);
//       }
//     };

//     fetchVisitorPurposes();
//   }, []);

//   const handleVisitingTypeSelect = (index, value) => {
//     setSelectedVisitingType(value);
//   };

//   return (
//     <>
//       <ScrollView>
//         <View style={styles.container}>
//           <View
//             style={{
//               padding: 10,
//               alignItems: "center",
//             }}
//           >
//           </View>
//           {receivedData ? (
//             <TouchableOpacity onPress={() => setModalVisible(true)}>
//               {/* Wrap the image in TouchableOpacity and set onPress to setModalVisible(true) */}
//               <Image
//                 style={styles.ImageStyle}
//                 source={{ uri: receivedData.takenPicture }}
//               />
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity onPress={() => setModalVisible(true)}>
//               <Image
//                 source={require("./images.jpeg")}
//                 style={styles.ImageStyle}
//               />
//             </TouchableOpacity>
//           )}
//           {/* Modal for displaying the image in full size */}
//           <Modal
//             visible={modalVisible}
//             transparent={true}
//             onRequestClose={() => setModalVisible(false)}
//           >
//             <View style={styles.modalContainer}>
//               <TouchableOpacity
//                 style={styles.closeButton}
//                 onPress={() => setModalVisible(false)}
//               >
//                 <Icon name="close" family="ionicons" size={30} color="white" />
//               </TouchableOpacity>
//               {receivedData ? (
//                 <Image
//                   style={styles.fullSizeImage}
//                   source={{ uri: receivedData }}
//                 />
//               ) : (
//                 <Image
//                   style={styles.fullSizeImage}
//                   source={require("./images.jpeg")}
//                 />
//               )}
//             </View>
//           </Modal>
//           {/* End of modal */}
//           <TouchableOpacity style={styles.touchImageIcon}>
//             <Button
//               shadowless
//               style={styles.buttonImage}
//               color={argonTheme.COLORS.WHITE}
//               onPress={() => navigation.navigate("Camera")}
//             >
//               <Icon
//                 name="camera"
//                 family="entypo"
//                 size={22}
//                 style={styles.buttonTextImage}
//               />
//             </Button>
//           </TouchableOpacity>
//         </View>
//         <View style={{ alignItems: "center" }}>
//           <View style={styles.card}>
//             <TextInput
//               mode="outlined"
//               label="Name"
//               placeholder="Enter name"
//               style={{ width: width - theme.SIZES.BASE * 3.4 }}
//               onChangeText={(text) => setName(text)}
//               value={name}
//             />
//             <TextInput
//               mode="outlined"
//               label="Vehicle Number"
//               placeholder="Enter Vehicle Number"
//               style={{ width: width - theme.SIZES.BASE * 3.4 }}
//               onChangeText={(text) => setVehicleNo(text)}
//               value={vehicleNo}
//             />
//             <TextInput
//               mode="outlined"
//               label="Phone No."
//               placeholder="Enter Phone No."
//               style={{ width: width - theme.SIZES.BASE * 3.4 }}
//               onChangeText={(text) => setPhoneNo(text)}
//               value={phoneNo}
//             />
//             <ModalDropdown
//               style={{
//                 borderWidth: 1,
//                 borderColor: "black",
//                 padding: 13,
//                 width: width - theme.SIZES.BASE * 3.4,
//                 margin: 8,
//               }}
//               options={visitorPurposes} // Use visitor purposes from state
//               defaultValue={selectedVisitingType}
//               textStyle={{ fontSize: 16, color: "black", textAlign: "center" }}
//               dropdownStyle={{
//                 width: width - 92,
//                 borderWidth: 1,
//                 borderColor: "black",
//               }}
//               onSelect={handleVisitingTypeSelect}
//             />
//             <Button shadowless style={styles.button} onPress={addVisitor}>
//               <Text style={styles.buttonText}>Send Request</Text>
//             </Button>
//           </View>
//         </View>
//       </ScrollView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "red",
//     height: "50%",
//     alignItems: "center",
//     top: 1,
//   },
//   card: {
//     backgroundColor: "white",
//     marginVertical: theme.SIZES.BASE,
//     borderRadius: 10,
//     shadowColor: "black",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 4,
//     elevation: 5,
//     padding: 20,
//     alignItems: "center",
//     width: width - theme.SIZES.BASE * 1.7,
//     position: "relative",
//     top: -70,
//     zIndex: 1,
//     marginBottom: 50,
//   },
//   button: {
//     width: width - theme.SIZES.BASE * 3.4,
//     height: theme.SIZES.BASE * 3,
//     shadowRadius: 0,
//     shadowOpacity: 0,
//     borderRadius: 15,
//     backgroundColor: "red",
//   },
//   buttonText: {
//     fontFamily: "open-sans-bold",
//     fontSize: 14,
//     color: "white",
//   },
//   buttonImage: {
//     width: 50,
//     height: 50,
//     shadowColor: "black",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 4,
//     elevation: 5,
//     shadowRadius: 0,
//     shadowOpacity: 0,
//     borderRadius: 25,
//     textAlign: "right",
//   },
//   touchImageIcon: {
//     marginStart: "auto",
//   },
//   buttonTextImage: {
//     fontFamily: "open-sans-bold",
//     color: "red",
//     fontWeight: "800",
//   },
//   ImageStyle: {
//     top: 25,
//     height: 200,
//     width: width - 32,
//     resizeMode: "cover",
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.7)",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   fullSizeImage: {
//     width: width - 40,
//     height: height - 40,
//     resizeMode: "contain",
//   },
//   closeButton: {
//     position: "absolute",
//     top: 20,
//     right: 20,
//     zIndex: 1,
//   },
// });

// export default AddNewPerson;

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
  Alert,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";

import { Icon } from "../components";

import { Block, Button, theme } from "galio-framework";
import { Images, argonTheme } from "../constants/";
import ModalDropdown from "react-native-modal-dropdown";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown";
import { API_Url, API_Url1, API_Url2 } from "../utils/API";

const { height, width } = Dimensions.get("screen");

const AddNewPerson = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false); // State for controlling modal visibility
  const [visitorType, setVisitorType] = useState("");
  const [name, setName] = useState(formData ? formData.employee_name : "");
  const [vehicleNo, setVehicleNo] = useState(
    formData ? formData.license_plate_no : ""
  );
  const [phoneNo, setPhoneNo] = useState("");
  const [selectedVisitingPlace, setSelectedVisitingPlace] = useState(
    "Select Visiting Place"
  );
  const [selectedVisitingType, setSelectedVisitingType] = useState(
    "Select Visiting Type"
  );
  const [laneId, setLaneId] = useState();
  const [token, setToken] = useState(null);
  const [unitList, setUnitList] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [laneList, setLaneList] = useState([]);
  const [selectedLaneId, setSelectedLaneId] = useState(null);
  const [visitorPurposes, setVisitorPurposes] = useState([]);
  const [values, setValues] = useState(null);
  const [isFocuses, setIsFocuses] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocuse, setIsFocuse] = useState(false);
  const [valuess, setValuess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFocusess, setIsFocusess] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);
  const [formData, setFormData] = useState({
    authorization_status: false,
    authorized_no: "",
    camera_id: "",
    employee_id: "",
    employee_name: "",
    face_status: false,
    image: "",
    is_mapped: false,
    license_plate_no: "",
    timestamp: "",
  });


  const fetchTokenFromStorage = async () => {
    try {
      const token = await AsyncStorage.getItem("@token");
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

  const fetchDeviceData = async () => {
    try {
      await fetchTokenFromStorage();
      if (token) {
        const response = await axios.get(API_Url2 + "/get_gaurd_master", {
          headers: {
            "x-access-token": token,
          },
        });

        const { lane_data, unit_data, visiting_purposes } = response.data;

        // Update lane data for dropdown
        const dropdownOptions = lane_data.map((lane) => ({
          label: lane.lane_name,
          value: lane.lane_id,
        }));
        setDropdownData(dropdownOptions);

        // Update unit list state
        const unitListData = unit_data.map((unit) => ({
          label: unit.label,
          value: unit.value,
        }));
        setUnitList(unitListData);

        // Update visitor purposes state
        const visitorPurposesData = visiting_purposes.map((purpose) => ({
          label: purpose.label,
          value: purpose.value,
        }));
        setVisitorPurposes(visitorPurposesData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setLoading(true); // Set loading state to true before making the API call

    const fetchData = async () => {
      try {
        await fetchTokenFromStorage();
        // await fetchUnitListFromApi();
        // await fetchVehicleLogFromRedis();
        // await fetchDeviceData();
        await fetchVisitorPurposes();
        setLoading(false); // Update loading state to false after all API calls are completed
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Update loading state to false in case of error
      }
    };

    fetchData();
  }, [token]);

  // const fetchUnitListFromApi = async () => {
  //   try {
  //     // Retrieve the token from AsyncStorage
  //     const token = await AsyncStorage.getItem("@token");
  //     const response = await axios.get(API_Url2 + "/getUnitList?society_id=1", {
  //       headers: {
  //         "x-access-token": token,
  //       },
  //     });

  //     const data = response.data.data;
  //     if (response.data.status === 1) {
  //       setUnitList(data);
  //     } else {
  //       console.error("Failed to fetch unit list");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching unit list:", error);
  //   }
  // };


  const route = useRoute();
  const receivedData = route.params;

  const sendNotification = async () => {
    try {
      const requestBody = {
        name: name,
        visiting_place: 1, //selectedVisitingPlace.value,
        visiting_purpose: selectedVisitingType,
      };

      const response = await fetch(`${API_Url2}/send_notification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // You can add additional headers here if needed
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log(responseData.message); // Output: Notification sent
      } else {
        console.error(responseData.message); // Output: Failed to send Notification
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const renderLabels = () => {
    if (values || isFocuses) {
      return (
        <Text style={[styles.label, isFocuses && { color: "blue" }]}>
          Select Lane
        </Text>
      );
    }
    return null;
  };

  const renderLabelType = () => {
    if (value || isFocuse) {
      return (
        <Text style={[styles.label, isFocuse && { color: "blue" }]}>
          Select Visiting Place
        </Text>
      );
    }
    return null;
  };

  const renderLabelPlace = () => {
    if (valuess || isFocusess) {
      return (
        <Text style={[styles.label, isFocusess && { color: "blue" }]}>
          Select Visiting Place
        </Text>
      );
    }
    return null;
  };

  const handlePlaceSelect = (index, value) => {
    setSelectedVisitingPlace(value);
  };

  const addVisitor = async () => {
    // Trim input values
    const trimmedName = name.trim();
    const trimmedVehicleNo = vehicleNo.trim();
    const trimmedPhoneNo = phoneNo.trim();

    // Check if any of the required fields are empty or contain only spaces
    if (
      !trimmedName ||
      !trimmedVehicleNo ||
      !trimmedPhoneNo ||
      selectedVisitingPlace === "Select Visiting Place" ||
      selectedVisitingType === "Select Visiting Type" ||
      !selectedLaneId
    ) {
      // If any required field is empty, display an alert to the user
      Alert.alert("Please fill in all the required fields.");
      return; // Exit the function early without submitting the form
    }

    // Validate phone number to allow only numeric input
    if (!/^\d+$/.test(trimmedPhoneNo)) {
      // If phone number contains non-numeric characters, display an alert
      Alert.alert("Phone number should contain only numbers.");
      return; // Exit the function early without submitting the form
    }

    try {
      // Proceed with form submission
      const response = await fetch(API_Url2 + "/addVisitor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          vehicle_no: trimmedVehicleNo,
          phone_no: trimmedPhoneNo,
          visiting_place: 1, //selectedVisitingPlace.value, // Access the value property
          visiting_purpose: selectedVisitingType,
          lane_id: selectedLaneId, // Use selectedLaneId instead of laneId
          image: receivedData?.responseData,
        }),
      });

      // Handle response
      const data = await response.json();
      console.log("Response:", data);

      if (data.status === 0) {
        // Show an alert if status is 0
        alert("Failed to add visitor");
      } else if (data.status === 1) {
        // Reset form fields after successful submission
        navigation.goBack();
        setName("");
        setVehicleNo("");
        setPhoneNo("");
        setSelectedVisitingPlace("Select Visiting Place");
        setSelectedVisitingType("Select Visiting Type");
        setSelectedLaneId(null); // Reset selected lane ID

        // Show success alert
        alert("Visitor added successfully!");
      }

      // You can also store the response data if needed
      const visitorId = data["visitor id"];
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add visitor. Please try again later.");
    }
  };

  const fetchVisitorPurposes = async () => {
    try {
      const response = await axios.get(API_Url2 + "/getVisitorpurpose");
      const data = response.data;
      if (data.status === 1) {
        setVisitorPurposes(data.data);
      } else {
        console.error("Failed to fetch visitor purposes");
      }
    } catch (error) {
      console.error("Error fetching visitor purposes:", error);
    }
  };

  const handleSendRequest = async () => {
    try {
      await addVisitor(); // Call addVisitor function
      await sendNotification(); // Call sendNotification function
    } catch (error) {
      console.error("Error handling request:", error);
    }
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.containers}>
              {/* <View>
                {renderLabels()}
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocuses && { borderColor: "blue" },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={dropdownData} // Use the dropdownData state variable here
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocuses ? "Select Lane" : "..."}
                  searchPlaceholder="Search..."
                  value={values} // Use the selectedLane state variable here
                  onFocus={() => setIsFocuses(true)}
                  onBlur={() => setIsFocuses(false)}
                  onChange={(item) => {
                    setSelectedLaneId(item.value); // Update selectedLane based on the selected value
                    setIsFocuses(false);
                  }}
                />
              </View> */}
            </View>
            {receivedData ? (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                {/* Wrap the image in TouchableOpacity and set onPress to setModalVisible(true) */}
                <Image
                  style={styles.ImageStyle}
                  source={{ uri: receivedData.takenPicture }}
                />
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
                  <Icon
                    name="close"
                    family="ionicons"
                    size={30}
                    color="white"
                  />
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
                onChangeText={(text) => setName(text)}
                value={name}
              />
              <TextInput
                mode="outlined"
                label="Vehicle Number"
                placeholder="Enter Vehicle Number"
                style={{ width: width - theme.SIZES.BASE * 3.4 }}
                onChangeText={(text) => setVehicleNo(text)}
                value={vehicleNo}
              />
              <TextInput
                mode="outlined"
                label="Phone No."
                placeholder="Enter Phone No."
                style={{ width: width - theme.SIZES.BASE * 3.4 }}
                onChangeText={(text) => {
                  // Validate input to allow only numeric characters
                  const numericText = text.replace(/[^\d]/g, "");
                  setPhoneNo(numericText);
                }}
                value={phoneNo}
                keyboardType="numeric"
              />
              {/* <View style={styles.containers}>
                <View>
                  {renderLabelPlace()}
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocusess && { borderColor: "blue" },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={unitList.map((unit) => ({
                      label: unit.label,
                      value: unit.value,
                    }))} // Pass unitList as data
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocusess ? "Select Visiting Place" : "..."}
                    searchPlaceholder="Search..."
                    value={selectedUnit} // Use selectedUnit instead of values
                    onFocus={() => setIsFocusess(true)}
                    onBlur={() => setIsFocusess(false)}
                    onChange={(item) => {
                      setSelectedUnit(item.value); // Update selectedUnit based on the selected value
                      setSelectedVisitingPlace(item.label);
                      setIsFocusess(false);
                    }}
                  />
                </View>
              </View> */}
              <View>
                <View>
                  {renderLabelType()}
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocuse && { borderColor: "blue" },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={visitorPurposes.map((purpose) => ({
                      label: purpose.label,
                      value: purpose.value,
                    }))} // Use visitor purposes from state
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocuse ? "Select Visiting Type" : "..."}
                    searchPlaceholder="Search..."
                    value={selectedVisitingType} // Use selectedVisitingType from state
                    onFocus={() => setIsFocuse(true)}
                    onBlur={() => setIsFocuse(false)}
                    onChange={(item) => {
                      setSelectedVisitingType(item.value); // Update selectedVisitingType based on the selected value
                      setIsFocuse(false);
                    }}
                  />
                </View>
              </View>
              <Button
                shadowless
                style={styles.button}
                onPress={handleSendRequest}
              >
                <Text style={styles.buttonText}>Send Request</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      )}
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
  containers: {
    // backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    backgroundColor: "white",
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    padding: 13,
    width: width - theme.SIZES.BASE * 3.4,
    marginTop: 7.5,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default AddNewPerson;
