import * as React from "react";
import { Text, View, ActivityIndicator, Dimensions } from "react-native";

export const Loader = ({ title }) => {
  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        // width: Dimensions.get('window').width,
        elevation: 3,
        zIndex: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <ActivityIndicator size="small" color="#0000ff" style={{}} />
      <Text style={{ marginTop: 20, fontSize: 16 }}>{title}</Text>
    </View>
  );
};
