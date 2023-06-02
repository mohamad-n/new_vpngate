/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  useWindowDimensions,
  Platform,
} from "react-native";
import Constants from "expo-constants";

import { ServiceContext, SubscriptionContext } from "../../../providers";
import { palette } from "../../../theme";
import { SharedHeader } from "../../shared";

import { getDurationFromExpire, isExpired } from "../../../libs/tools";
import { Badge } from "./badge";
const { IOS_APP_VERSION, ANDROID_APP_VERSION } = Constants.expoConfig.extra;

export const Setting = ({ navigation }) => {
  const { logout, userEmail, subscriptionInfo } = React.useContext(SubscriptionContext);

  const isDarkMode = useColorScheme() === "dark";
  const { width } = useWindowDimensions();
  const logoutRequest = async () => {
    try {
      await logout();
    } catch (error) {}
  };
  const prepareSignout = () => {
    Alert.alert("Log out verify", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => logoutRequest(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles({ isDarkMode, width }).safeArea}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View style={styles({ isDarkMode, width }).mainView}>
        <SharedHeader navigation={navigation} title="Setting" />

        <View style={styles({ isDarkMode, width }).innerView}>
          <View style={styles({ isDarkMode, width }).upperView}>
            <Text style={styles({ isDarkMode, width }).headerTitle}>
              Version : {Platform.OS === "ios" ? IOS_APP_VERSION : ANDROID_APP_VERSION}
            </Text>
            <TouchableOpacity
              onPress={() => console.log("approval")}
              style={[
                styles({ isDarkMode, width }).actionButton,
                { backgroundColor: palette.blueColor, marginHorizontal: 0 },
              ]}
            >
              <Text style={[styles({ isDarkMode, width }).actionButtonText]}>check for update</Text>
            </TouchableOpacity>
          </View>
          {userEmail ? (
            <View style={[styles({ isDarkMode, width }).loggedinView]}>
              <Text style={[styles({ isDarkMode, width }).headerTitle, { marginBottom: 30 }]}>
                News Letter
              </Text>
              <View style={[styles({ isDarkMode, width }).subscriptionView.box]}>
                <View
                  style={[
                    styles({ isDarkMode, width }).subscriptionView.leftBadge,
                    { backgroundColor: palette.blueColor },
                  ]}
                >
                  <Text style={[styles({ isDarkMode, width }).subscriptionView.badgeText]}>
                    Registered by
                  </Text>
                </View>
                <Badge subscriptionInfo={subscriptionInfo} />
                <Text style={[styles({ isDarkMode, width }).subscriptionView.email]}>
                  {userEmail}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("NotificationBoard")}
                style={[
                  styles({ isDarkMode, width }).actionButton,
                  { backgroundColor: palette.agreeColor },
                ]}
              >
                <Text style={styles({ isDarkMode, width }).actionButtonText}>View Message Box</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => prepareSignout()}
                style={[
                  styles({ isDarkMode, width }).actionButton,
                  { backgroundColor: palette.dangerColor },
                ]}
              >
                <Text style={styles({ isDarkMode, width }).actionButtonText}>Log out</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles({ isDarkMode, width }).loginView}>
                <Text style={[styles({ isDarkMode, width }).headerTitle, { marginBottom: 30 }]}>
                  News Letter
                </Text>
                <Text style={styles({ isDarkMode, width }).description}>
                  in order to receive emails for new locations an server availabilities you can sign
                  in to your account
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SignIn")}
                  style={styles({ isDarkMode, width }).actionButton}
                >
                  <Text style={styles({ isDarkMode, width }).actionButtonText}>Sign In</Text>
                </TouchableOpacity>
              </View>
              <View style={styles({ isDarkMode, width }).loginView}>
                <Text style={[styles({ isDarkMode, width }).description, { alignSelf: "center" }]}>
                  you don't have account?
                </Text>
                <Text style={[styles({ isDarkMode, width }).description, { alignSelf: "center" }]}>
                  you can register new account
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SignUp")}
                  style={styles({ isDarkMode, width }).actionButton}
                >
                  <Text style={styles({ isDarkMode, width }).actionButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = ({ isDarkMode, width }) =>
  StyleSheet.create({
    subscriptionView: {
      box: {
        minHeight: 100,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isDarkMode ? palette.dark.mainBackground : palette.light.mainBackground,
        shadowColor: isDarkMode ? palette.dark.shadowColor : palette.light.shadowColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 9,
        shadowRadius: 4,
        ...(width > 400 && { alignSelf: "center", width: 400 }),
        ...(Platform.OS === "android" && {
          borderWidth: 1,
          borderColor: palette.disabledColor,
        }),
      },
      leftBadge: {
        height: 30,
        left: 20,
        position: "absolute",
        top: -15,
        borderRadius: 8,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: isDarkMode ? palette.dark.title : palette.light.title,
        padding: 10,
        paddingBottom: 5,
        paddingTop: 5,
      },
      bottomBadge: {
        height: 30,
        position: "absolute",
        bottom: -15,
        borderRadius: 8,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: isDarkMode ? palette.dark.title : palette.light.title,
        padding: 10,
        paddingBottom: 5,
        paddingTop: 5,
      },
      badgeText: {
        fontSize: 14,
        fontWeight: "400",
        color: palette.dark.title,
        textAlign: "center",
      },
      email: {
        fontSize: 20,
        fontWeight: "600",
        color: isDarkMode ? palette.dark.title : palette.light.title,
      },
    },
    safeArea: {
      flex: 1,
      marginTop: 0,
      backgroundColor: isDarkMode ? palette.dark.mainBackground : palette.light.mainBackground,
    },
    mainView: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "stretch",
      backgroundColor: isDarkMode ? palette.dark.mainBackground : palette.light.mainBackground,
      flexDirection: "column",
    },
    innerView: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "stretch",
      marginTop: 10,
      paddingTop: 10,
    },
    upperView: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
      paddingBottom: 20,
      margin: 20,
      borderBottomColor: isDarkMode ? palette.dark.border : palette.light.border,
      borderBottomWidth: 1,
    },
    headerTitle: {
      fontSize: 18,
      color: isDarkMode ? palette.dark.title : palette.light.title,
    },
    loginView: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "stretch",
      marginTop: 10,
      paddingBottom: 50,
      margin: 20,
      borderBottomColor: isDarkMode ? palette.dark.border : palette.light.border,
    },
    description: {
      fontSize: 14,
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
      ...(width > 400 && { alignSelf: "center", width: 200 }),
    },
    actionButtonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
      padding: 7,
    },
    loggedinView: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "stretch",
      marginTop: 10,
      paddingBottom: 50,
      margin: 20,
    },
  });
