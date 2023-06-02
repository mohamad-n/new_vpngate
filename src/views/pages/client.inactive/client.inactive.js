import * as React from "react";
import { StyleSheet, View, useColorScheme, Modal } from "react-native";

import { palette } from "../../../theme";
import { Button, Text } from "../../shared";

export const ClientInactive = ({ state: { isVisible, info }, close, logout }) => {
  const isDarkMode = useColorScheme() === "dark";
  const logoutRequest = async () => {
    try {
      await logout();
      close();
    } catch (error) {}
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
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
  });
