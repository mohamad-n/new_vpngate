import React from "react";

import { Dimensions, Button as DefaultBotton, Text, TouchableOpacity } from "react-native";
import { palette } from "../../../theme/palette";

export const Button = (props) => {
  // renders
  const { type, title, widthType, fontSize } = props;

  const getWidth = () => {
    if (typeof widthType === "number") {
      return { width: widthType };
    }
    if (widthType === "block") {
      return { width: Dimensions.get("window").width - 50 };
    }

    return { width: "100%" };
  };

  if (type === "link") {
    return (
      <TouchableOpacity
        {...props}
        style={[
          {
            alignSelf: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 30,
            margin: 5,
          },
          { ...getWidth() },
        ]}
      >
        <Text style={{ color: palette.blue, fontSize: fontSize || 16, fontWeight: 400 }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  if (type === "outline") {
    return (
      <TouchableOpacity
        {...props}
        style={[
          {
            backgroundColor: "#fff",
            borderColor: palette.blue,
            borderWidth: 1,
            borderRadius: 5,
            alignSelf: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            margin: 5,
          },
          { ...getWidth() },
        ]}
      >
        <Text style={{ color: palette.blue, fontSize: 16, fontWeight: 400 }}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          backgroundColor: palette.blue,
          borderRadius: 5,
          alignSelf: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          margin: 5,
        },
        { ...getWidth() },
      ]}
    >
      <Text style={{ color: "#fff", fontSize: 16, fontWeight: 400 }}>{title}</Text>
    </TouchableOpacity>
  );
};
