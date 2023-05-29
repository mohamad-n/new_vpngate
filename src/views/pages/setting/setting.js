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

import { ServiceContext } from "../../../providers";
import { theme } from "../../../theme";
import { SharedHeader } from "../../shared";

import { getDurationFromExpire, isExpired } from "../../../libs/tools";
const { IOS_APP_VERSION, ANDROID_APP_VERSION } = Constants.expoConfig.extra;

export const Setting = ({ navigation }) => {
  const { checkUpdateVersion, signoutDispatch, subscriptionInfo, userEmail } =
    React.useContext(ServiceContext);

  const isDarkMode = useColorScheme() === "dark";
  const { width } = useWindowDimensions();

  const prepareSignout = () => {
    Alert.alert("Log out verify", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => signoutDispatch(),
      },
    ]);
  };

  const bottomBadge = () => {
    if (typeof subscriptionInfo !== "object") {
      return null;
    }
    if (!subscriptionInfo?.deviceActivationInfo) {
      return (
        <View
          style={[
            styles({ theme, isDarkMode, width }).subscriptionView.bottomBadge,
            { backgroundColor: theme.dangerColor },
          ]}
        >
          <Text style={[styles({ theme, isDarkMode, width }).subscriptionView.badgeText]}>
            Invalid Device
          </Text>
        </View>
      );
    }

    if (!subscriptionInfo?.userActivationInfo) {
      return (
        <View
          style={[
            styles({ theme, isDarkMode, width }).subscriptionView.bottomBadge,
            { backgroundColor: theme.dangerColor },
          ]}
        >
          <Text style={[styles({ theme, isDarkMode, width }).subscriptionView.badgeText]}>
            Inactive
          </Text>
        </View>
      );
    }

    if (subscriptionInfo?.userSubInfo?.isActive) {
      if (isExpired(subscriptionInfo?.userSubInfo?.expiredAt)) {
        return (
          <View
            style={[
              styles({ theme, isDarkMode, width }).subscriptionView.bottomBadge,
              { backgroundColor: theme.dangerColor },
            ]}
          >
            <Text style={[styles({ theme, isDarkMode, width }).subscriptionView.badgeText]}>
              Subscription Expired
            </Text>
          </View>
        );
      }
      const remainDays = getDurationFromExpire(subscriptionInfo?.userSubInfo?.expiredAt);

      return (
        <View
          style={[
            styles({ theme, isDarkMode, width }).subscriptionView.bottomBadge,
            {
              backgroundColor:
                !remainDays || remainDays > 10 ? theme.agreeColor : theme.orangeColor,
            },
          ]}
        >
          <Text style={[styles({ theme, isDarkMode, width }).subscriptionView.badgeText]}>
            ⭐️ Premium ⭐️ {remainDays ? `(${remainDays} days left)` : null}
          </Text>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles({ theme, isDarkMode, width }).safeArea}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View style={styles({ theme, isDarkMode, width }).mainView}>
        <SharedHeader navigation={navigation} title="Setting" />

        <View style={styles({ theme, isDarkMode, width }).innerView}>
          <View style={styles({ theme, isDarkMode, width }).upperView}>
            <Text style={styles({ theme, isDarkMode, width }).headerTitle}>
              Version : {Platform.OS === "ios" ? IOS_APP_VERSION : ANDROID_APP_VERSION}
            </Text>
            <TouchableOpacity
              onPress={() => checkUpdateVersion("approval")}
              style={[
                styles({ theme, isDarkMode, width }).actionButton,
                { backgroundColor: theme.blueColor, marginHorizontal: 0 },
              ]}
            >
              <Text style={[styles({ theme, isDarkMode, width }).actionButtonText]}>
                check for update
              </Text>
            </TouchableOpacity>
          </View>
          {userEmail ? (
            <View style={[styles({ theme, isDarkMode, width }).loggedinView]}>
              <Text
                style={[styles({ theme, isDarkMode, width }).headerTitle, { marginBottom: 30 }]}
              >
                News Letter
              </Text>
              <View style={[styles({ theme, isDarkMode, width }).subscriptionView.box]}>
                <View
                  style={[
                    styles({ theme, isDarkMode, width }).subscriptionView.leftBadge,
                    { backgroundColor: theme.blueColor },
                  ]}
                >
                  <Text style={[styles({ theme, isDarkMode, width }).subscriptionView.badgeText]}>
                    Registered by
                  </Text>
                </View>
                {bottomBadge()}
                <Text style={[styles({ theme, isDarkMode, width }).subscriptionView.email]}>
                  {userEmail}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("NotificationBoard")}
                style={[
                  styles({ theme, isDarkMode, width }).actionButton,
                  { backgroundColor: theme.agreeColor },
                ]}
              >
                <Text style={styles({ theme, isDarkMode, width }).actionButtonText}>
                  View Message Box
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => prepareSignout()}
                style={[
                  styles({ theme, isDarkMode, width }).actionButton,
                  { backgroundColor: theme.dangerColor },
                ]}
              >
                <Text style={styles({ theme, isDarkMode, width }).actionButtonText}>Log out</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles({ theme, isDarkMode, width }).loginView}>
                <Text
                  style={[styles({ theme, isDarkMode, width }).headerTitle, { marginBottom: 30 }]}
                >
                  News Letter
                </Text>
                <Text style={styles({ theme, isDarkMode, width }).description}>
                  in order to recieve emails for new locations an server availabilities you can sign
                  in to your account
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Signin")}
                  style={styles({ theme, isDarkMode, width }).actionButton}
                >
                  <Text style={styles({ theme, isDarkMode, width }).actionButtonText}>Sign In</Text>
                </TouchableOpacity>
              </View>
              <View style={styles({ theme, isDarkMode, width }).loginView}>
                <Text
                  style={[
                    styles({ theme, isDarkMode, width }).description,
                    { alignSelf: "center" },
                  ]}
                >
                  you dont have account?
                </Text>
                <Text
                  style={[
                    styles({ theme, isDarkMode, width }).description,
                    { alignSelf: "center" },
                  ]}
                >
                  you can register new account
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Signup")}
                  style={styles({ theme, isDarkMode, width }).actionButton}
                >
                  <Text style={styles({ theme, isDarkMode, width }).actionButtonText}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = ({ theme, isDarkMode, width }) =>
  StyleSheet.create({
    subscriptionView: {
      box: {
        minHeight: 100,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isDarkMode ? theme.dark.mainBackground : theme.light.mainBackground,
        shadowColor: isDarkMode ? theme.dark.shadowColor : theme.light.shadowColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 9,
        shadowRadius: 4,
        ...(width > 400 && { alignSelf: "center", width: 400 }),
        ...(Platform.OS === "android" && {
          borderWidth: 1,
          borderColor: theme.disabledColor,
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
        color: isDarkMode ? theme.dark.title : theme.light.title,
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
        color: isDarkMode ? theme.dark.title : theme.light.title,
        padding: 10,
        paddingBottom: 5,
        paddingTop: 5,
      },
      badgeText: {
        fontSize: 14,
        fontWeight: "400",
        color: theme.dark.title,
        textAlign: "center",
      },
      email: {
        fontSize: 20,
        fontWeight: "600",
        color: isDarkMode ? theme.dark.title : theme.light.title,
      },
    },
    safeArea: {
      flex: 1,
      marginTop: 0,
      backgroundColor: isDarkMode ? theme.dark.mainBackground : theme.light.mainBackground,
    },
    mainView: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "stretch",
      backgroundColor: isDarkMode ? theme.dark.mainBackground : theme.light.mainBackground,
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
      borderBottomColor: isDarkMode ? theme.dark.border : theme.light.border,
      borderBottomWidth: 1,
    },
    headerTitle: {
      fontSize: 18,
      color: isDarkMode ? theme.dark.title : theme.light.title,
    },
    loginView: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "stretch",
      marginTop: 10,
      paddingBottom: 50,
      margin: 20,
      borderBottomColor: isDarkMode ? theme.dark.border : theme.light.border,
    },
    description: {
      fontSize: 14,
      color: isDarkMode ? theme.dark.title : theme.light.title,
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
      backgroundColor: isDarkMode ? theme.dark.buttonBackground : theme.light.buttonBackground,
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
