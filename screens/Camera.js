import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { Icon } from "../components";
import { theme } from "galio-framework";
const { height, width } = Dimensions.get("screen");

export default function CameraApp({ navigation }) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    const takenPicture = "data:image/jpg;base64," + photo.base64;
    let savePhoto = () => {
      //   MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
      //     setPhoto(undefined);
      //   });
      navigation.navigate("AddNewPerson", takenPicture);
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: takenPicture }} />
        {/* <Button title="Share" onPress={sharePic} /> */}
        <View style={styles.selectionOfImage}>
          {hasMediaLibraryPermission ? (
            <TouchableOpacity
              onPress={() => setPhoto(undefined)}
              style={styles.customButtonTwo} // Apply styles to the custom button
            >
              <Icon
                name="cross"
                family="entypo"
                size={30}
                style={{ color: "red" }}
              />
            </TouchableOpacity>
          ) : undefined}
          <TouchableOpacity
            onPress={savePhoto}
            style={styles.customButtonTwo} // Apply styles to the custom button
          >
            <Icon
              name="check"
              family="entypo"
              size={30}
              style={{ color: "green" }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={takePic}
          style={styles.customButton} // Apply styles to the custom button
        >
          <Icon
            name="camera"
            family="entypo"
            size={22}
            style={{ color: "white" }}
          />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    alignSelf: "center",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  customButton: {
    backgroundColor: "red",
    width: 70, // Adjust width and height as per your requirement
    height: 70,
    borderRadius: 50, // Set borderRadius to half of width/height to make it circular
    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
    margin: 15,
  },
  customButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  customButtonTwo: {
    backgroundColor: "white",
    marginVertical: theme.SIZES.BASE,
    borderRadius: 70,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
    alignItems: "center",
    width: 70,
    height: 70,
    display: "flex",
    justifyContent: "center",
  },
  selectionOfImage: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
});
