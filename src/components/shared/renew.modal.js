import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Image, StyleSheet, Button, TextInput } from "react-native";
import { Text } from "./text";
import { PaymentButton } from "./payment.button";

export const RenewModalContent = (props) => {
  // ref
  const { title } = props;
  // renders
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, textAlign: "center" }}>{title}</Text>
      <PaymentButton {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
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
