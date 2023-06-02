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
import { palette } from "../../theme";
import { Button, Text } from "./";
import { Field, Formik } from "formik";
import { FormField, emailPrePhraseValidationSchema, signInValidationSchema } from "./form";
import { useKeyboardOffsetHeight } from "../../hooks";
import { DismissKeyboard } from "../../providers/dismiss.keyboard";

// import { delay } from "../../../utils/utils";

const elementWidth =
  Dimensions.get("screen").width > 500 ? 350 : Dimensions.get("screen").width - 100;

export const UserNameModal = ({ userNameModalRef, proceed, cancel }) => {
  //   const handlePresentModalPress = React.useCallback(() => {
  //     otherPlansModalRef.current?.present();
  //   }, []);
  const keyBoardOffsetHeight = useKeyboardOffsetHeight();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [snapPoint, setSnapPoint] = useState(350);
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
        pressBehavior="none"
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
        ref={userNameModalRef}
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
        enablePanDownToClose={false}
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
            }}
          >
            <Text style={{ fontSize: 18, color: palette[isDarkMode ? "dark" : "light"].title }}>
              please enter a name to activate the voucher
            </Text>
            <Formik
              initialValues={{
                emailPrePhrase: "",
              }}
              onSubmit={(values) => {
                Keyboard.dismiss();
                const { emailPrePhrase } = values;

                proceed(emailPrePhrase);
              }}
              validationSchema={emailPrePhraseValidationSchema}
            >
              {({ handleSubmit, isValid }) => (
                <>
                  <Field
                    lowerCased
                    component={FormField}
                    name="emailPrePhrase"
                    placeholder="name"
                  />
                  <View
                    style={{
                      width: Dimensions.get("screen").width - 50,
                      flexDirection: "row-reverse",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <Button
                      disabled={!isValid}
                      title="Submit"
                      widthType={100}
                      textStyle={{ fontWeight: 500 }}
                      onPress={handleSubmit}
                    />
                    <Button
                      title="Cancel"
                      widthType={100}
                      textStyle={{ fontWeight: 500 }}
                      onPress={cancel}
                      buttonStyle={{ backgroundColor: palette.dangerColor }}
                    />
                  </View>
                </>
              )}
            </Formik>
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
