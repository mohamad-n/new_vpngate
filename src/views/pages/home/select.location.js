import * as React from "react";
import {
  StyleSheet,
  View,
  useColorScheme,
  useWindowDimensions,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";

import { palette } from "../../../theme";

import { getDurationFromExpire, isExpired, getImage } from "../../../libs/tools";
import { Text } from "../../shared";
import { SubscriptionContext, VpsContext } from "../../../providers";
import { dropDownIcon, flagPlaceHolder } from "../../../asset/img/icon";

export const SelectLocationButton = ({ navigation }) => {
  const isDarkMode = useColorScheme() === "dark";
  const { width } = useWindowDimensions();

  const { subscriptionInfo, hasSubscription } = React.useContext(SubscriptionContext);
  const { selectedVps } = React.useContext(VpsContext);

  return (
    <TouchableOpacity
      onPress={() =>
        hasSubscription ? navigation.navigate("PrivateLocation") : navigation.navigate("Location")
      }
      style={{
        marginHorizontal: 20,
        height: 70,
        borderRadius: 20,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        alignSelf: "stretch",
        backgroundColor: isDarkMode ? palette.dark.mainBackground : palette.light.mainBackground,
        shadowColor: isDarkMode ? palette.dark.shadowColor : palette.light.shadowColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 9,
        shadowRadius: 4,
        ...(Platform.OS === "android" && {
          borderWidth: 1,
          borderColor: palette.disabledColor,
        }),
      }}
    >
      {!selectedVps ||
      (hasSubscription && !selectedVps?.name) ||
      (!hasSubscription && !selectedVps?.countryName) ? (
        <Text
          style={{
            fontSize: 20,
            color: isDarkMode ? palette.dark.title : palette.light.title,
          }}
        >
          Tap here to select a location
        </Text>
      ) : hasSubscription ? (
        <>
          <View
            style={{
              flexDirection: "column",
              alignSelf: "stretch",
              justifyContent: "space-around",
              alignItems: "flex-start",
              marginVertical: 10,
              flex: 0.6,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                color: isDarkMode ? palette.dark.title : palette.light.title,
              }}
            >
              {selectedVps?.name}
            </Text>
          </View>
          <Image
            resizeMode="cover"
            style={{
              width: 15,
              height: 15,
              tintColor: isDarkMode ? palette.dark.title : palette.light.title,
            }}
            source={dropDownIcon}
          />
        </>
      ) : (
        <>
          <Image
            style={{
              borderRadius: 5,
              width: 40,
              height: 28,
              borderColor: isDarkMode ? palette.dark.border : palette.light.border,
              borderWidth: 1,
            }}
            source={
              selectedVps?.flagImage ? { uri: getImage(selectedVps?.flagImage) } : flagPlaceHolder
            }
          />
          <View
            style={{
              flexDirection: "column",
              alignSelf: "stretch",
              justifyContent: "space-around",
              alignItems: "flex-start",
              marginVertical: 10,
              flex: 0.6,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                color: isDarkMode ? palette.dark.title : palette.light.title,
              }}
            >
              {selectedVps?.countryName}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: isDarkMode ? palette.dark.subTitle : palette.light.subTitle,
              }}
            >
              {selectedVps?.ip}
            </Text>
          </View>
          <Image
            resizeMode="cover"
            style={{
              width: 15,
              height: 15,
              tintColor: isDarkMode ? palette.dark.title : palette.light.title,
            }}
            source={dropDownIcon}
          />
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = ({ isDarkMode, width }) =>
  StyleSheet.create({
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
      fontWeight: 400,
      color: palette.dark.title,
      textAlign: "center",
    },
    email: {
      fontSize: 20,
      fontWeight: "600",
      color: isDarkMode ? palette.dark.title : palette.light.title,
    },
  });
