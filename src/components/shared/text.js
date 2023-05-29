import React from "react";

import { Text as DefaultText, StyleSheet } from "react-native";

export const Text = (props) => {
  return (
    <DefaultText style={[styles.text, props.style && { ...props.style }]}>
      {props.children}
    </DefaultText>
  );
};

const styles = StyleSheet.create({});
