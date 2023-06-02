import React from "react";

import {
  Dimensions,
  Button as DefaultBotton,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { palette } from "../../theme";
const elementWidth =
  Dimensions.get("screen").width > 500 ? 350 : Dimensions.get("screen").width - 100;
export const Button = (props) => {
  const isDarkMode = useColorScheme() === "dark";

  const { type, title, widthType, fontSize, icon } = props;

  const getWidth = () => {
    if (typeof widthType === "number") {
      return { width: widthType };
    }
    if (widthType === "block") {
      return { width: Dimensions.get("window").width - 50 };
    }

    return { width: elementWidth };
  };

  // if (type === "link") {
  //   return (
  //     <TouchableOpacity
  //       {...props}
  //       style={[
  //         {
  //           alignSelf: "center",
  //           display: "flex",
  //           flexDirection: "row",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           height: 30,
  //           margin: 5,
  //           ...(props.buttonStyle && { ...props.buttonStyle }),
  //         },
  //         { ...getWidth() },
  //       ]}
  //     >
  //       {!icon ? null : icon()}
  //       {!title ? null : (
  //         <Text
  //           style={[
  //             { color: palette.blue, fontSize: fontSize || 16 },
  //             props.textStyle && { ...props.textStyle },
  //           ]}
  //         >
  //           {title}
  //         </Text>
  //       )}
  //     </TouchableOpacity>
  //   );
  // }

  // if (type === "outline") {
  //   return (
  //     <TouchableOpacity
  //       {...props}
  //       style={[
  //         {
  //           backgroundColor: "#fff",
  //           borderColor: palette[isDarkMode ? "dark" : "light"].buttonColor,
  //           borderWidth: 1,
  //           borderRadius: 10,
  //           alignSelf: "center",
  //           display: "flex",
  //           flexDirection: "row",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           height: 50,
  //           margin: 5,
  //           ...getWidth(),
  //           ...(props.buttonStyle && { ...props.buttonStyle }),
  //         },
  //       ]}
  //     >
  //       <Text
  //         style={{
  //           color: palette[isDarkMode ? "dark" : "light"].buttonText,
  //           fontSize: 16,
  //           // fontFamily: "Quicksand_700Bold",
  //           ...(props.textStyle && { ...props.textStyle }),
  //         }}
  //       >
  //         {title}
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // }

  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          backgroundColor: palette[isDarkMode ? "dark" : "light"].buttonColor,
          borderRadius: 10,
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
          // fontFamily: "Quicksand_700Bold",
          ...(props.textStyle && { ...props.textStyle }),
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
