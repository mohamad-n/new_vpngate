import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  useColorScheme,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { palette } from "../../../../theme";
import { Field, Formik } from "formik";
import { useKeyboardOffsetHeight } from "../../../../hooks";
import { AddProfileView } from "./add.profile.view";

// import { delay } from "../../../utils/utils";

const elementWidth =
  Dimensions.get("screen").width > 500 ? 350 : Dimensions.get("screen").width - 100;

export const AddProfileModal = ({ addProfileModalRef, close }) => {
  //   const handlePresentModalPress = React.useCallback(() => {
  //     otherPlansModalRef.current?.present();
  //   }, []);
  const keyBoardOffsetHeight = useKeyboardOffsetHeight();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [snapPoint, setSnapPoint] = useState(450);
  const isDarkMode = useColorScheme() === "dark";

  React.useEffect(() => {
    if (keyBoardOffsetHeight !== 0) {
      setKeyboardHeight(keyBoardOffsetHeight);
      setSnapPoint((prev) => prev + keyBoardOffsetHeight);
    }
    if (keyBoardOffsetHeight === 0) {
      setSnapPoint((prev) => prev - keyboardHeight);
    }
    return () => {};
  }, [keyBoardOffsetHeight]);

  const renderBackdrop = React.useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        style={{
          backgroundColor: "#000000",
          position: "absolute",
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
        }}
        opacity={0.5}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  );

  //   close = () => {
  //     otherPlansModalRef.current?.dismiss();
  //   };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={addProfileModalRef}
        index={0}
        snapPoints={[snapPoint]}
        backdropComponent={renderBackdrop}
        containerStyle={{
          width: "100%",
          //   height: "100%",
          zIndex: 100,
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
        backgroundStyle={{ backgroundColor: palette[isDarkMode ? "dark" : "light"].mainBackground }}
        handleIndicatorStyle={{ backgroundColor: palette[isDarkMode ? "dark" : "light"].title }}
        enablePanDownToClose={true}
        // enableOverDrag={false}
      >
        <AddProfileView close={close} />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#000",
    fontSize: 30,
    fontWeight: "bold",
  },
});
