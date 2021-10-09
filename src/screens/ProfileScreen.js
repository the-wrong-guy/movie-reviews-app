import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { auth } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import COLORS from "../constants/Colors";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Button, Chip, Avatar, Badge } from "react-native-elements";
import { Input } from "react-native-elements/dist/input/Input";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [editDisplayName, setEditDisplayName] = useState(false);
  const [user, setUser] = useState(null);
  const [uploadDetails, setUploadDetails] = useState({
    displayName: "",
    photoURL: "",
  });
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const unsub = async () => {
      setUser(auth.currentUser);
      console.log(auth.currentUser);
      //   user?.displayName !== null ||
    };
    unsub();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setUploadDetails({ ...uploadDetails, photoURL: result.uri });
      setUser({ ...user, photoURL: result.uri });
    }
  };

  const updateUserData = async () => {
    const userNow = auth.currentUser;
    if (uploadDetails.displayName === "" || uploadDetails.photoURL === "") {
      Toast.show({
        type: "info",
        text1: "Please enter a new display name and picture",
        visibilityTime: 800,
      });
    } else {
      setLoader(true);
      await userNow
        .updateProfile(uploadDetails)
        .then(async () => {
          setUser(auth.currentUser);
          await AsyncStorage.setItem("user", JSON.stringify(auth.currentUser));
          Toast.show({
            type: "success",
            text1: "Profile updated successfully",
          });
        })
        .catch((err) =>
          Toast.show({
            type: "error",
            text1: "Something went wrong, try again!",
          })
        )
        .finally(() => {
          setLoader(false);
          setEditDisplayName(false);
          setUploadDetails({ displayName: "", photoURL: "" });
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Feather name='chevron-left' size={35} color={"#000"} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Avatar
          size={90}
          rounded
          source={{
            uri:
              user?.photoURL ??
              "https://www.gravatar.com/avatar/94d093eda664addd6e450d7e9881bcad?s=32&d=identicon&r=PG",
          }}
          containerStyle={{ backgroundColor: "grey" }}
        >
          <Avatar.Accessory
            style={{ backgroundColor: COLORS.GRAY }}
            onPress={pickImage}
            size={23}
          />
          {/* <Badge status='success' /> */}
        </Avatar>
        {user?.displayName && !editDisplayName && (
          <View style={{ position: "relative", marginTop: 9 }}>
            <Chip
              title={user?.displayName}
              icon={{
                name: "user",
                type: "font-awesome",
                size: 20,
                color: "white",
              }}
              containerStyle={{ marginVertical: 7 }}
              onPress={() => setEditDisplayName(true)}
            />
            {/* <MaterialIcons
              name='edit'
              color='#fff'
              size={18}
              style={{
                backgroundColor: COLORS.GRAY,
                borderRadius: 13,
                padding: 2,
                position: "absolute",
                right: 0,
              }}
              onPress={() => {
                setEditDisplayName(true);
                console.log(editDisplayName);
              }}
            /> */}
          </View>
        )}
        {(editDisplayName || !user?.displayName) && (
          <Input
            value={uploadDetails.displayName}
            containerStyle={{ marginTop: 15, width: 210 }}
            inputContainerStyle={{ alignItems: "center" }}
            placeholder='Enter a display name'
            maxLength={13}
            onChangeText={(e) =>
              setUploadDetails({ ...uploadDetails, displayName: e })
            }
          />
        )}
        <Chip
          title={user?.email}
          icon={{
            name: "envelope",
            type: "font-awesome",
            size: 20,
            color: "white",
          }}
          containerStyle={{ marginVertical: 7 }}
        />
        <Button
        //   disabled={uploadDetails.displayName === "" && true}
          title='Update Profile'
          loading={loader}
          containerStyle={{ marginTop: 20 }}
          onPress={updateUserData}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASIC_BACKGROUND,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 100,
    height: 100,
    backgroundColor: "#000",
    borderRadius: 50,
    elevation: 10,
    marginTop: 20,
  },
  detailsContainer: { alignItems: "center", flex: 1, marginTop: 50 },
  headerTitle: { fontSize: 20, fontFamily: "Bold" },
});
