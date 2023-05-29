import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

export const DismissKeyboard = ({children, avoidType, disableFlex}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? avoidType : 'height'}
      style={disableFlex ? {} : {flex: 1}}>
      {children}
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
);
