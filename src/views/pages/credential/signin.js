/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  useColorScheme,
  TextInput,
} from "react-native";

import { dropDownIcon } from "../../../asset/img/icon";
import {
  AlertContext,
  DismissKeyboard,
  LoaderContext,
  ServiceContext,
  SubscriptionContext,
} from "../../../providers";
// import { request } from "../../../service/api";
import { publicService } from "../../../service";
import { palette } from "../../../theme";
import { Field, Formik } from "formik";
import {
  Button,
  FormField,
  completeProfileVerifyValidationSchema,
  signInValidationSchema,
} from "../../shared";
const minPassChar = 6;
export const SignIn = ({ navigation }) => {
  // const { showAlert } = React.useContext(AlertContext);
  const { setIsLoading } = React.useContext(LoaderContext);

  const { login } = React.useContext(SubscriptionContext);

  const isDarkMode = useColorScheme() === "dark";
  const [user, setUser] = React.useState();

  const loginRequest = async (email, password) => {
    try {
      await login(email, password);
      navigation.goBack();
    } catch (error) {}
  };

  // const updatePushNotificationTokenForUser = () => {
  //   return new Promise(async (resolve) => {
  //     try {
  //       await request(
  //         "PUT",
  //         "/user/identifier/token",
  //         {},
  //         { token: await AsyncStorage.getItem("@idToken") },
  //         "auth"
  //       );
  //       return resolve();
  //     } catch (error) {
  //       return resolve();
  //     }
  //   });
  // };
  return (
    <DismissKeyboard avoidType="padding">
      <View style={styles({ isDarkMode }).mainView}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles({ isDarkMode }).backButtonActionButton}
        >
          <Image
            resizeMode="contain"
            style={styles({ isDarkMode }).backButtonActionButtonImage}
            source={dropDownIcon}
          />
        </TouchableOpacity>
        <View style={styles({ isDarkMode }).innerView}>
          <Text style={styles({ isDarkMode }).headerTitle}>Login to an existing account</Text>

          <Formik
            initialValues={{
              email: "alfy@gmail.com",
              password: "12345678",
            }}
            onSubmit={(values) => {
              const { email, password } = values;

              loginRequest(email, password);
            }}
            validationSchema={signInValidationSchema}
          >
            {({ handleSubmit, isValid }) => (
              <>
                <Field lowerCased component={FormField} name="email" placeholder="Email" />

                <Field
                  secureTextEntry
                  component={FormField}
                  name="password"
                  placeholder="Password"
                />

                <Button
                  disabled={!isValid}
                  title="Login"
                  widthType={300}
                  textStyle={{ fontWeight: 500 }}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
        </View>
      </View>
    </DismissKeyboard>
  );
};

const styles = ({ isDarkMode }) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "stretch",
      backgroundColor: isDarkMode ? palette.dark.mainBackground : palette.light.mainBackground,
      flexDirection: "column",
    },
    innerView: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "stretch",
      marginTop: 10,
      paddingTop: 10,
    },
    headerTitle: {
      fontSize: 25,
      color: isDarkMode ? palette.dark.title : palette.light.title,
      marginBottom: 30,
      alignSelf: "center",
    },
    inputView: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: isDarkMode ? palette.dark.border : palette.light.border,
      height: 50,
      marginLeft: 30,
      marginRight: 30,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      marginTop: 10,
    },
    textView: {
      height: 40,
      flex: 1,
      fontSize: 18,
      paddingHorizontal: 10,
      color: isDarkMode ? palette.dark.title : palette.light.title,
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 5,
      height: 50,
      marginVertical: 20,
      marginHorizontal: 30,
      borderRadius: 10,
      backgroundColor: isDarkMode ? palette.dark.buttonBackground : palette.light.buttonBackground,
    },
    actionButtonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
      padding: 7,
    },
    backButtonActionButton: {
      marginTop: 50,
      width: 45,
      height: 0,
      borderRadius: 22,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    backButtonActionButtonImage: {
      width: 20,
      height: 20,
      tintColor: isDarkMode ? palette.dark.title : palette.light.title,
      transform: [{ rotate: "90deg" }],
    },
  });
