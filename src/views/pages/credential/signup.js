/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Platform,
  Alert,
  Linking,
  SafeAreaView,
  TextInput,
  useColorScheme,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { backgroundDots, usFlag } from "../../../asset/img";
import {
  dropDownIcon,
  notSelectedMarkerIcon,
  selectedMarkerIcon,
  trafficIcon,
  triggerIcon,
} from "../../../asset/img/icon";
import { DismissKeyboard, LoaderContext, ServiceContext } from "../../../providers";
import { palette } from "../../../theme";
import { publicService } from "../../../service";
import { Field, Formik } from "formik";
import { FormField, signUpValidationSchema } from "../../shared";
const minPassChar = 6;

export const SignUp = ({ route, navigation }) => {
  // const { showAlert } = React.useContext(AlertContext);
  // const { signInDispatch } = React.useContext(ServiceContext);
  const { setIsLoading } = React.useContext(LoaderContext);

  const isDarkMode = useColorScheme() === "dark";
  const [user, setUser] = React.useState();

  const register = async () => {
    try {
      if (user.password?.length < minPassChar) {
        throw new Error(`password must be more than ${minPassChar} char`);
      }
      if (user.password !== user.verifyPassword) {
        throw new Error("password and verify password is not same");
      }

      const { email, password } = user;
      setIsLoading("signing up");

      await publicService.sendRequest({
        method: "POST",
        url: "/user/signup",
        data: { email, password },
      });

      const { accessToken, email: userEmail } = await publicService.sendRequest({
        method: "POST",
        url: "/user/signin",

        data: { email, password },
      });
      // await signInDispatch(accessToken, userEmail);

      // await updatePushNotificationTokenForUser();
      navigation.navigate("SettingPage", {
        userEmail,
      });
      setIsLoading(false);
    } catch (error) {
      // console.log('signup error : ', error);
      setIsLoading(false);
      // showAlert({ message: error?.message || error, type: "error" });
    }
  };

  // const updatePushNotificationTokenForUser = () => {
  //   return new Promise(async (resolve) => {
  //     try {
  //       await publicService.sendRequest({
  //      method:   "PUT",
  //        url: "/user/identifier/token",

  //       });
  //       return resolve();
  //     } catch (error) {
  //       return resolve();
  //     }
  //   });
  // };
  return (
    <DismissKeyboard avoidType="padding">
      <View style={styles({ palette, isDarkMode }).mainView}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles({ palette, isDarkMode }).backButtonActionButton}
        >
          <Image
            resizeMode="contain"
            style={styles({ palette, isDarkMode }).backButtonActionButtonImage}
            source={dropDownIcon}
          />
        </TouchableOpacity>
        <View style={styles({ palette, isDarkMode }).innerView}>
          <Text style={styles({ palette, isDarkMode }).headerTitle}>Register new account</Text>

          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values) => loginWithEmailRequest(values)}
            validationSchema={signUpValidationSchema}
          >
            {({ handleSubmit, isValid }) => (
              <>
                <Field lowerCased component={FormField} name="email" placeholder="Email" />

                <Field component={FormField} name="password" placeholder="Password" />
                <Field component={FormField} name="confirmPassword" placeholder="Verify Password" />

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

const styles = ({ palette, isDarkMode }) =>
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
