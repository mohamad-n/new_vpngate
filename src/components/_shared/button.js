import React from "react";

import { Dimensions, Button as DefaultBotton, Text, TouchableOpacity } from "react-native";
import { palette } from "../../../theme/palette";

export const Button = (props) => {
  // renders
  const { type, title, widthType, fontSize, icon } = props;

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
            ...(props.buttonStyle && { ...props.buttonStyle }),
          },
          { ...getWidth() },
        ]}
      >
        {!icon ? null : icon()}
        {!title ? null : (
          <Text
            style={[
              { color: palette.blue, fontSize: fontSize || 16, fontFamily: "Quicksand_700Bold" },
              props.textStyle && { ...props.textStyle },
            ]}
          >
            {title}
          </Text>
        )}
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
            borderRadius: 50,
            alignSelf: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            margin: 5,
            ...getWidth(),
            ...(props.buttonStyle && { ...props.buttonStyle }),
          },
        ]}
      >
        <Text
          style={{
            color: palette.blue,
            fontSize: 16,
            fontFamily: "Quicksand_700Bold",
            ...(props.textStyle && { ...props.textStyle }),
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          backgroundColor: palette.main.red,
          borderRadius: 50,
          alignSelf: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          margin: 5,
          marginVertical: 10,

          ...(props.disabled && { opacity: 0.4 }),
          ...(props.buttonStyle && { ...props.buttonStyle }),
        },
        { ...getWidth() },
      ]}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 18,
          fontWeight: 400,
          textAlign: "center",
          fontFamily: "Quicksand_700Bold",
          ...(props.textStyle && { ...props.textStyle }),
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
