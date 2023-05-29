import React from "react";

import {
  Dimensions,
  StyleSheet,
  TextInput as DefaultTextInput,
  TouchableOpacity,
} from "react-native";

export const TextInput = (props) => {
  // renders
  //   const { type, title, widthType } = props;

  //   const getWidth = () => {
  //     if (typeof widthType === "number") {
  //       return { width: widthType };
  //     }
  //     if (widthType === "block") {
  //       return { width: Dimensions.get("window").width - 50 };
  //     }

  //     return { width: "100%" };
  //   };

  return <DefaultTextInput {...props} style={styles.input} />;
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginVertical: 8,
    // color: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#00000040",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
