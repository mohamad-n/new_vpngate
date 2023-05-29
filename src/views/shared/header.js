/* eslint-disable react-native/no-inline-styles */
import * as React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import { menuIcon, dropDownIcon, plusIcon } from "../../asset/img/icon";
import { palette } from "../../theme";

export const SharedHeader = ({ navigation, title, hasBack, addButton, addProfile }) => {
  const isDarkMode = useColorScheme() === "dark";

  const leftIconAction = () => {
    if (hasBack) {
      navigation.goBack();
    }

    if (addButton) {
      addProfile();
    }
  };
  return (
    <View
      style={{
        height: 80,
        justifyContent: "space-between",
        alignItems: "stretch",
        // backgroundColor: 'white',
        flexDirection: "column",
        paddingTop: 10,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 20,
        // marginTop: 200,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => leftIconAction()}
          style={{
            width: 45,
            height: 0,
            borderRadius: 22,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {hasBack ? (
            <Image
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: isDarkMode ? palette.dark.title : palette.light.title,
                transform: [{ rotate: "90deg" }],
              }}
              source={dropDownIcon}
            />
          ) : null}
          {!addButton ? null : (
            <Image
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: isDarkMode ? palette.dark.title : palette.light.title,
              }}
              source={plusIcon}
            />
          )}
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            flex: 1,
            fontSize: 20,
            fontWeight: "600",
            color: isDarkMode ? palette.dark.title : palette.light.title,
          }}
        >
          {title}
        </Text>

        <TouchableOpacity
          disabled={hasBack}
          onPress={() => navigation.openDrawer()}
          style={{
            width: 45,
            height: 45,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: isDarkMode
            //   ? palette.dark.mainBackground
            //   : palette.light.mainBackground,
            // shadowColor: isDarkMode
            //   ? palette.dark.shadowColor
            //   : palette.light.shadowColor,
            // shadowOffset: {width: 0, height: 0},
            // shadowOpacity: 9,
            // shadowRadius: 4,
          }}
        >
          {hasBack ? null : (
            <Image
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: isDarkMode ? palette.dark.title : palette.light.title,
              }}
              source={menuIcon}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
