/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  useColorScheme,
  TextInput,
  Modal,
} from "react-native";

import { palette } from "../../../theme";

// import { navigate } from "../../navigation.ref";
import { dropDownIcon } from "../../../asset/img/icon";
import { Button, Text } from "../../shared";

export const ClientInactive = ({ modalState, close, logout }) => {
  // const { showAlert } = React.useContext(AlertContext);

  const isDarkMode = useColorScheme() === "dark";

  const logoutRequest = async () => {
    try {
      await logout();
      //   navigate("Home");
      close();
    } catch (error) {}
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      //   presentationStyle="formSheet"
      visible={modalState}
      //   style={{ flex: 0.5, backgroundColor: "red" }}
      onRequestClose={() => close()}
    >
      <View style={styles({ isDarkMode }).mainView}>
        <View style={styles({ isDarkMode }).innerView}>
          <Text style={{ fontSize: 20, alignSelf: "center", fontWeight: 500 }}>
            Inactive Client
          </Text>
          <Text style={styles({ isDarkMode }).headerTitle}>
            Sorry. your client is inactive by admin. please contact support.
          </Text>
          <Button
            onPress={() => logoutRequest()}
            title="Logout"
            buttonStyle={{ backgroundColor: palette.dangerColor }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = ({ isDarkMode }) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "stretch",
      backgroundColor: isDarkMode ? palette.dark.mainBackground : palette.light.mainBackground,
      flexDirection: "column",
    },
    innerView: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "stretch",
      marginTop: 10,
      paddingTop: 10,
    },
    headerTitle: {
      fontSize: 16,
      color: isDarkMode ? palette.dark.title : palette.light.title,
      marginBottom: 30,
      alignSelf: "center",
      padding: 30,
    },
    inputView: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: isDarkMode ? palette.dark.border : palette.light.border,
      height: 50,
      marginLeft: 30,
      marginRight: 30,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      marginTop: 10,
    },
    textView: {
      height: 40,
      flex: 1,
      fontSize: 18,
      paddingHorizontal: 10,
      color: isDarkMode ? palette.dark.title : palette.light.title,
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 5,
      height: 50,
      marginVertical: 20,
      marginHorizontal: 30,
      borderRadius: 10,
      backgroundColor: isDarkMode ? palette.dark.buttonBackground : palette.light.buttonBackground,
    },
    actionButtonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
      padding: 7,
    },
    backButtonActionButton: {
      marginTop: 50,
      width: 45,
      height: 0,
      borderRadius: 22,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    backButtonActionButtonImage: {
      width: 20,
      height: 20,
      tintColor: isDarkMode ? palette.dark.title : palette.light.title,
      transform: [{ rotate: "90deg" }],
    },
  });
