import React from "react";
import { Text, TextInput, StyleSheet, View, Dimensions } from "react-native";
const elementWidth =
  Dimensions.get("screen").width > 500 ? 350 : Dimensions.get("screen").width - 100;
export const FormField = (props) => {
  const {
    containerExtraStyle,
    extraStyle,
    extraErrorStyle,
    lowerCased,
    field: { name, onBlur, onChange, value, editable },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <View
      style={[
        {
          height: 75,

          width: elementWidth,

          alignSelf: "center",
        },
        containerExtraStyle,
      ]}
    >
      <TextInput
        style={[styles.textInput, extraStyle, hasError && styles.errorInput]}
        value={value}
        editable={editable}
        onChangeText={(text) => onChange(name)(lowerCased ? text?.toLowerCase() : text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={[styles.errorText, extraErrorStyle]}>{errors[name]}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    marginVertical: 4,
    backgroundColor: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 50,
    paddingHorizontal: 20,
    width: "100%",
  },
  errorText: {
    fontSize: 10,
    color: "red",
    paddingLeft: 20,
  },
  errorInput: {
    borderColor: "red",
  },
});
