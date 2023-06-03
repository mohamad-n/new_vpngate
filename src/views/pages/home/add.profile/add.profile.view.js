/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  ImageBackground,
  useWindowDimensions,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
// import {TextInput} from 'react-native-gesture-handler';
// import {QrScanner} from './qr.scanner';
import { palette } from "../../../../theme";
import { DismissKeyboard, LoaderContext, SubscriptionContext } from "../../../../providers";
import {
  Button,
  FormField,
  emailPrePhraseValidationSchema,
  urlValidationSchema,
} from "../../../shared";
import { Field, Formik } from "formik";
import { validateCodeFormat, validateIncomingProfile } from "../../../../libs";
import axios from "axios";
import { QrScanner } from "./qr.scanner";

export const AddProfileView = ({ close }) => {
  const { checkUrl } = React.useContext(SubscriptionContext);
  const { setIsLoading } = React.useContext(LoaderContext);

  const [currentTab, setCurrentTab] = useState(0);
  const isDarkMode = useColorScheme() === "dark";
  const { width } = useWindowDimensions();

  const checkProfileLink = async (link) => {
    try {
      close();
      // console.log(link);
      const code = link?.split("/")?.pop();
      if (code) {
        const isCodeFormat = validateCodeFormat(code);
        if (isCodeFormat) {
          console.log(code);

          checkUrl(link);

          return;
        }
      }

      setIsLoading("checking profile");
      const { data } = await axios.get(link);
      setIsLoading(false);
      const isProfileValid = validateIncomingProfile(data);

      if (!isProfileValid) {
        throw new Error("The entered profile is not valid");
      }
      // changeDefaultVps({
      //   profileData: data,
      //   id: -1,
      //   countryName: "User Profile",
      // });
    } catch (error) {
      // console.log('error : ', error?.message);
      Alert.alert("Invalid Link", `${error?.message}`, [
        {
          text: "Ok",
          onPress: () => {},
          style: "cancel",
        },
      ]);
    }
  };

  return (
    <View style={styles({ isDarkMode, width }).container}>
      <View style={styles({ isDarkMode, width }).header.container}>
        <TouchableOpacity
          onPress={() => setCurrentTab(0)}
          style={[
            styles({ isDarkMode, width }).header.button,
            currentTab === 0
              ? {
                  backgroundColor: palette.commonButtonBackground,
                  borderWidth: 0,
                }
              : {
                  backgroundColor: "transparent",
                  borderColor: palette.commonButtonBackground,
                  borderWidth: 1,
                },
          ]}
        >
          <Text
            style={[
              styles({ isDarkMode, width }).header.buttonText,
              currentTab === 0
                ? { color: "white" }
                : {
                    color: isDarkMode ? palette.dark.title : palette.commonButtonBackground,
                  },
            ]}
          >
            Link
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCurrentTab(1)}
          style={[
            styles({ isDarkMode, width }).header.button,
            currentTab === 1
              ? {
                  backgroundColor: palette.commonButtonBackground,
                  borderWidth: 0,
                }
              : {
                  backgroundColor: "transparent",
                  borderColor: palette.commonButtonBackground,
                  borderWidth: 1,
                },
          ]}
        >
          <Text
            style={[
              styles({ isDarkMode, width }).header.buttonText,
              currentTab === 1
                ? { color: "white" }
                : {
                    color: isDarkMode ? palette.dark.title : palette.commonButtonBackground,
                  },
            ]}
          >
            QrCode
          </Text>
        </TouchableOpacity>
      </View>

      {currentTab === 0 ? (
        <View style={styles({ isDarkMode, width }).link.container}>
          <Text style={styles({ isDarkMode, width }).link.hint}>
            hint : you can add your own vpn profile "OVPN" file from here
          </Text>
          <Text style={styles({ isDarkMode, width }).link.label}>
            input url of your custom profile
          </Text>

          <Formik
            initialValues={{
              url: "",
            }}
            onSubmit={(values) => {
              // Keyboard.dismiss();
              const { url } = values;
              // console.log(">>>>>>>>>>>", url);
              checkProfileLink(url);
            }}
            validationSchema={urlValidationSchema}
          >
            {({ handleSubmit, isValid, values }) => (
              <>
                <Field lowerCased component={FormField} name="url" placeholder="url" />

                <Button
                  disabled={!isValid || !values?.url?.length}
                  title="Import"
                  widthType={300}
                  textStyle={{ fontWeight: 500 }}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
        </View>
      ) : (
        <View style={styles({ isDarkMode, width }).qr.container}>
          <QrScanner checkProfileLink={checkProfileLink} />
          <Text style={styles({ isDarkMode, width }).qr.label}>scan QR Code of profile link</Text>
        </View>
      )}
      {/* </View> */}
    </View>
  );
};

const styles = ({ isDarkMode, width }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      height: "100%",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: 20,
      //   backgroundColor: 'red',
    },
    header: {
      container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start",
        paddingTop: 10,
      },

      button: {
        width: "50%",
        height: 40,
        borderRadius: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isDarkMode
          ? palette.dark.buttonBackground
          : palette.light.buttonBackground,
      },
      buttonText: {},
    },

    main: {},

    link: {
      container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 20,
      },
      label: {
        fontSize: 18,
        fontWeight: "400",
        color: isDarkMode ? palette.dark.title : palette.light.title,

        marginBottom: 30,
      },
      hint: {
        marginTop: 30,
        fontSize: 14,
        color: isDarkMode ? palette.dark.subTitle : palette.light.subTitle,
        marginBottom: 30,
      },
      input: {
        height: 40,
        fontSize: 18,
        paddingHorizontal: 10,
        color: isDarkMode ? palette.dark.title : palette.light.title,
        borderColor: isDarkMode ? palette.dark.border : palette.light.border,
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: "center",
        marginBottom: 30,
        ...(width > 400 ? { width: 400 } : { width: 300 }),
      },
      button: {
        width: 200,
        height: 40,
        borderRadius: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isDarkMode
          ? palette.dark.buttonBackground
          : palette.light.buttonBackground,
      },
      buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        padding: 7,
        textAlighn: "center",
      },
    },
    qr: {
      container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop: 20,
      },
      label: {
        fontSize: 18,
        fontWeight: "400",
        color: isDarkMode ? palette.dark.title : palette.light.title,
      },
    },
  });
