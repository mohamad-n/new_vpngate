import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export const DismissKeyboard = ({ children, props }) => (
  <TouchableWithoutFeedback {...props} onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
