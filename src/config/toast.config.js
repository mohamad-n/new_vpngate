import { Dimensions, View } from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { Text } from "../components/shared/text";

/*
  1. Create the config
*/
export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  //   success: (props) => (
  //     <BaseToast
  //       {...props}
  //       style={{ borderLeftColor: "pink" }}
  //       contentContainerStyle={{ paddingHorizontal: 15 }}
  //       text1Style={{
  //         fontSize: 15,
  //         fontWeight: "400",
  //       }}
  //     />
  //   ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  //   error: (props) => (
  //     <ErrorToast
  //       {...props}
  //       text1Style={{
  //         fontSize: 17,
  //       }}
  //       text2Style={{
  //         fontSize: 15,
  //       }}
  //     />
  //   ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  customSuccess: ({ text1, props }) => (
    <View
      style={{
        marginTop: -40,
        height: 100,
        padding: 15,
        // paddingTop: 25,
        width: Dimensions.get("screen").width,
        // margin: 10,
        backgroundColor: palette.notification.success,
        borderRadius: 0,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {/* <Text style={{ color: "white", fontSize: 15 }}>
            They will be passed when calling the `show` method (see below)
          </Text> */}
      <Text style={{ color: "black", fontSize: 15 }}>{text1}</Text>

      {/* <Text>{props.uuid}</Text> */}
    </View>
  ),
  customError: ({ text1, props }) => (
    <View
      style={{
        marginTop: -40,
        height: 100,
        padding: 15,
        // paddingTop: 25,
        width: Dimensions.get("screen").width,
        // margin: 10,
        backgroundColor: palette.main.red,
        borderRadius: 0,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {/* <Text style={{ color: "white", fontSize: 15 }}>
        They will be passed when calling the `show` method (see below)
      </Text> */}
      <Text style={{ color: "white", fontSize: 15 }}>{text1}</Text>

      {/* <Text>{props.uuid}</Text> */}
    </View>
  ),
};
