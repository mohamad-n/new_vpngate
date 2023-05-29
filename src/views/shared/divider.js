import React from "react";

import { Dimensions, StyleSheet, Text, View } from "react-native";

export const Divider = (props) => {
  // renders
  const { title } = props;

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={[styles.defaultStyle]}></View>
      <Text style={{ marginHorizontal: 15 }}>{title}</Text>
      <View style={[styles.defaultStyle]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    flex: 1,
    borderColor: "#00000040",
    borderWidth: 0.3,
    height: 1,
  },
});
