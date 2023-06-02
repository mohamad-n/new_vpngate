import * as React from "react";
import { StyleSheet, View, useColorScheme, useWindowDimensions, Platform } from "react-native";

import { palette } from "../../../theme";

import { getDurationFromExpire, isExpired } from "../../../libs/tools";
import { Text } from "../../shared";

export const Badge = ({ subscriptionInfo }) => {
  const isDarkMode = useColorScheme() === "dark";
  const { width } = useWindowDimensions();

  if (typeof subscriptionInfo !== "object") {
    return null;
  }
  if (subscriptionInfo?.inactiveDevice) {
    return (
      <View
        style={[
          styles({ isDarkMode, width }).bottomBadge,
          { backgroundColor: palette.dangerColor },
        ]}
      >
        <Text style={styles({ isDarkMode, width }).badgeText}>inactive Device</Text>
      </View>
    );
  }

  // if (typeof subscriptionInfo?.isActive === "boolean" && !subscriptionInfo?.isActive) {
  //   return (
  //     <View
  //       style={[
  //         styles({ isDarkMode, width }).bottomBadge,
  //         { backgroundColor: palette.dangerColor },
  //       ]}
  //     >
  //       <Text style={styles({ isDarkMode, width }).badgeText}>inactive Client</Text>
  //     </View>
  //   );
  // }

  if (subscriptionInfo?.expiredAt) {
    if (isExpired(subscriptionInfo?.expiredAt)) {
      return (
        <View
          style={[
            styles({ isDarkMode, width }).bottomBadge,
            { backgroundColor: palette.dangerColor },
          ]}
        >
          <Text style={styles({ isDarkMode, width }).badgeText}>Subscription Expired</Text>
        </View>
      );
    }
    const remainDays = getDurationFromExpire(subscriptionInfo?.expiredAt);

    return (
      <View
        style={[
          styles({ isDarkMode, width }).bottomBadge,
          {
            backgroundColor:
              !remainDays || remainDays > 10 ? palette.agreeColor : palette.orangeColor,
          },
        ]}
      >
        <Text style={styles({ isDarkMode, width }).badgeText}>
          ⭐️ Premium ⭐️ {`(${remainDays} days left)`}
        </Text>
      </View>
    );
  }

  return null;
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
