import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  useColorScheme,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { palette } from "../../theme";
import { Button, Text } from "./";
import CheckBox from "@react-native-community/checkbox";

import { DismissKeyboard } from "../../providers/dismiss.keyboard";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { delay } from "../../../utils/utils";

const elementWidth =
  Dimensions.get("screen").width > 500 ? 350 : Dimensions.get("screen").width - 100;

export const UpdateVersionModal = ({
  updateVersionModalRef,
  versionInfo,
  cancel,
  updateVersionAction,
}) => {
  //   const handlePresentModalPress = React.useCallback(() => {
  //     otherPlansModalRef.current?.present();
  //   }, []);
  const [ignoreUpdate, setIgnoreUpdate] = useState(false);

  const [snapPoint, setSnapPoint] = useState(350);
  const isDarkMode = useColorScheme() === "dark";

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

  const closeModal = async () => {
    if (ignoreUpdate) {
      await AsyncStorage.setItem("@ignoreUpdate", "yes");
    }
    cancel();
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={updateVersionModalRef}
        index={0}
        snapPoints={[snapPoint]}
        backdropComponent={renderBackdrop}
        containerStyle={{
          width: "100%",
          height: "100%",
          zIndex: 100,
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
        backgroundStyle={{ backgroundColor: palette[isDarkMode ? "dark" : "light"].mainBackground }}
        handleIndicatorStyle={{ backgroundColor: palette[isDarkMode ? "dark" : "light"].title }}
        enablePanDownToClose={true}
        // enableOverDrag={false}
      >
        <DismissKeyboard>
          <View
            style={{
              height: 300,
              // flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              paddingHorizontal: 30,
            }}
          >
            <Text style={{ fontSize: 18, color: palette[isDarkMode ? "dark" : "light"].title }}>
              New update version {versionInfo?.[Platform.OS]?.version} available
            </Text>
            {/* 
            <Text
              style={{
                fontSize: 18,
                color: palette[isDarkMode ? "dark" : "light"].title,
                alignSelf: "flex-start",
              }}
            >
              changes in version {versionInfo?.[Platform.OS]?.version} :
            </Text> */}
            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                alignSelf: "flex-start",
              }}
            >
              {versionInfo?.[Platform.OS]?.changes &&
                versionInfo[Platform.OS]?.changes?.map((_, index) => (
                  <Text
                    key={index}
                    style={{
                      fontSize: 15,
                      color: palette[isDarkMode ? "dark" : "light"].title,
                      lineHeight: 30,
                    }}
                  >
                    ✅ {_}
                  </Text>
                ))}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                alignSelf: "flex-start",
              }}
            >
              <CheckBox
                animationDuration={0.1}
                style={{ width: 20, height: 20, marginRight: 8 }}
                boxType={"square"}
                disabled={false}
                value={ignoreUpdate}
                onValueChange={(newValue) => setIgnoreUpdate(newValue)}
              />
              <TouchableWithoutFeedback onPress={() => setIgnoreUpdate(!ignoreUpdate)}>
                <View>
                  <Text
                    style={{ lineHeight: 21, color: palette[isDarkMode ? "dark" : "light"].title }}
                  >
                    Don't show update notifications again
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View
              style={{
                width: Dimensions.get("screen").width - 50,
                flexDirection: "row-reverse",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Button
                title="Update"
                widthType={100}
                textStyle={{ fontWeight: 500 }}
                onPress={() => updateVersionAction(versionInfo)}
              />
              <Button
                title="Dismiss"
                widthType={100}
                textStyle={{ fontWeight: 500 }}
                onPress={() => closeModal()}
                buttonStyle={{ backgroundColor: palette.dangerColor }}
              />
            </View>
          </View>
        </DismissKeyboard>
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
