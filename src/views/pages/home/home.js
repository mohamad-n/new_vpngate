/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  ImageBackground,
  useWindowDimensions,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
// import { BottomModal, ModalContent, SlideAnimation, ModalTitle } from "react-native-modals";
// import { encode } from "base-64";

import { backgroundDots } from "../../../asset/img";
import { dropDownIcon, flagPlaceHolder, triggerIcon } from "../../../asset/img/icon";
import { request } from "../../../service/public.service";

import { SharedHeader } from "../../shared";
import { LoaderContext } from "../../../providers/Loader.Provider";
import { ServiceContext, VpsContext } from "../../../providers";

//----------android---------
// import { ConnectContext } from "../../../providers/ConnectShareAndroid";
//----------ios---------
// import {ConnectContext} from '../../../providers/ConnectShare';

// import Timer from "../../shared/timer";
import {
  getImage,
  validateCodeFormat,
  validateIncomingProfile,
  validateLinkFormat,
} from "../../../libs/tools";
// import { decrypt } from "../../../libs";
// import { AddProfile } from "./add.profile";
// import axios from "axios";
// import { SmartConnect } from "./smart.connect";
import { palette } from "../../../theme";

export const Home = ({ navigation }) => {
  //
  const { setIsLoading } = React.useContext(LoaderContext);

  const { checkSubscriptionInfo, isSmartConnectAvailable, prepareToCheckActivationCode } =
    React.useContext(ServiceContext);

  // const { connect, disconnect, connectStatus } = React.useContext(ConnectContext);
  const { selectedVps } = React.useContext(VpsContext);

  const isDarkMode = useColorScheme() === "dark";
  const { width } = useWindowDimensions();

  const [timerIsStopped, setTimerIsStopped] = React.useState(true);
  const [addProfileModal, setAddProfileModal] = React.useState(false);

  // React.useEffect(() => {
  //   if (connectStatus === "CONNECTED") {
  //     setTimerIsStopped(false);
  //   }
  //   if (connectStatus === "DISCONNECTED") {
  //     setTimerIsStopped(true);
  //   }
  //   return () => {};
  // }, [connectStatus]);

  const triggerConnection = async () => {
    // try {
    //   if (connectStatus !== "DISCONNECTED") {
    //     disconnect();
    //     return;
    //   }
    //   const { isConnected } = await NetInfo.fetch();
    //   if (!isConnected) {
    //     throw new Error("no network");
    //   }
    //   if (isSmartConnectAvailable()) {
    //     setIsLoading("getting updated connection");
    //     const savedCert = await AsyncStorage.getItem("@profileCert");
    //     const { status, data } = await getSmartConnection(!savedCert);
    //     if (status) {
    //       if (data) {
    //         const downloadedCert = await decrypt(data);
    //         await AsyncStorage.setItem("@profileCert", downloadedCert);
    //         // console.log('dowloaded cert connect');
    //         connect(downloadedCert);
    //         setIsLoading(false);
    //         return;
    //       }
    //       // console.log('saved cert  connect');
    //       connect(savedCert);
    //       setIsLoading(false);
    //       return;
    //     }
    //     setIsLoading(false);
    //     checkSubscriptionInfo();
    //     return;
    //     // throw new Error('no network');
    //   }
    //   // console.log('normal connect');
    //   setIsLoading("getting server connection info");
    //   const certificateProfile = await getVpsProfile();
    //   // console.log(certificateProfile);
    //   // console.log(decode(certificateProfile));
    //   setIsLoading(false);
    //   if (!certificateProfile) {
    //     throw new Error("no network");
    //   }
    //   connect(certificateProfile);
    // } catch (error) {
    //   setIsLoading(false);
    //   if (Platform.OS === "ios") {
    //     Alert.alert(
    //       "Network Error",
    //       "No network connection found. plaese make sure you have an active network connection",
    //       [
    //         {
    //           text: "retry",
    //           onPress: () => triggerConnection(),
    //         },
    //       ]
    //     );
    //   }
    //   console.log("error : ", error);
    // }
  };

  // const getSmartConnection = (download) => {
  //   // console.log(download);
  //   return new Promise(async (resolve) => {
  //     try {
  //       const idToken = await AsyncStorage.getItem("@idToken");

  //       const result = await request(
  //         "POST",
  //         "/user/smart",
  //         null,
  //         { token: idToken, download },
  //         "auth"
  //       );
  //       return resolve(result);
  //     } catch (error) {
  //       console.log("error : ", error);
  //       return resolve({ status: false });
  //     }
  //   });
  // };

  // const getVpsProfile = () => {
  //   if (!selectedVps) {
  //     Alert.alert("No location selected", "please select a location and try again", [
  //       {
  //         text: "Close",
  //         onPress: () => {},
  //         style: "cancel",
  //       },
  //     ]);
  //     return;
  //   }
  //   if (selectedVps?.id === -1) {
  //     return selectedVps?.profileData;
  //   }
  //   return new Promise(async (resolve) => {
  //     try {
  //       const { profile } = await request(
  //         "GET",
  //         "/vps/app/profile",
  //         { id: selectedVps?.id },
  //         null,
  //         "enc"
  //       );
  //       return resolve(profile);
  //     } catch (error) {
  //       console.log(error);
  //       return resolve();
  //     }
  //   });
  // };

  const getConnectButtonColor = () => {
    // if (connectStatus === "DISCONNECTED") {
    //   return palette.connectButton.disconnected;
    // }

    // if (connectStatus === "CONNECTED") {
    //   return palette.connectButton.connected;
    // }

    return palette.connectButton.disabled;
  };

  const isConnectButtonDisabled = () => {
    // if (connectStatus === "DISCONNECTED") {
    //   return false;
    // }

    // if (connectStatus === "CONNECTED") {
    //   return false;
    // }
    return true;
  };

  // const checkProfileLink = async (link) => {
  //   try {
  //     // console.log(link);
  //     const code = link?.split("/")?.pop();
  //     // console.log(link);
  //     if (code) {
  //       const isCodeFormat = validateCodeFormat(code);
  //       if (isCodeFormat) {
  //         prepareTocheckActivationCode(code);
  //         setAddProfileModal(false);

  //         return;
  //       }
  //     }

  //     const isLinkFormat = validateLinkFormat(link);
  //     if (isLinkFormat) {
  //       setIsLoading("checking profile");
  //       const { data } = await axios.get(link);
  //       setIsLoading(false);
  //       const isProfileValid = validateIncomingProfile(data);

  //       if (!isProfileValid) {
  //         throw new Error("The entered profile is not valid");
  //       }
  //       changeDefaultVps({
  //         profileData: data,
  //         id: -1,
  //         countryName: "User Profile",
  //       });
  //       setAddProfileModal(false);

  //       return;
  //     }
  //     throw new Error("The link is not in a corrected link format");
  //   } catch (error) {
  //     // console.log('error : ', error?.message);
  //     Alert.alert("Invalid Link", `${error?.message}`, [
  //       {
  //         text: "Ok",
  //         onPress: () => {},
  //         style: "cancel",
  //       },
  //     ]);
  //   }
  // };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: 0,
        backgroundColor: isDarkMode ? palette.dark.mainBackground : palette.light.mainBackground,
      }}
    >
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "stretch",
          //   backgroundColor: 'white',
          backgroundColor: isDarkMode ? palette.dark.mainBackground : palette.light.mainBackground,
          flexDirection: "column",
          ...(Platform.OS === "android" && { paddingBottom: 50 }),

          // marginTop: 200,
        }}
      >
        <SharedHeader
          navigation={navigation}
          title="VPNGate"
          addButton
          addProfile={() => setAddProfileModal(true)}
        />
        {/* <BottomModal
          visible={addProfileModal}
          onSwipeOut={() => setAddProfileModal(false)}
          onTouchOutside={() => setAddProfileModal(false)}
          modalTitle={
            <ModalTitle
              style={{
                backgroundColor: isDarkMode
                  ? palette.dark.mainBackground
                  : palette.light.mainBackground,
              }}
              textStyle={{
                color: isDarkMode ? palette.dark.title : palette.light.title,
              }}
              title="Import Profile"
            />
          }
          modalAnimation={
            new SlideAnimation({
              slideFrom: "bottom",
            })
          }
          // swipeDirection={['up', 'down']} // can be string or an array
          swipeThreshold={200}
          width={1}
          height={width < 500 ? 0.9 : 0.6}
        >
          <ModalContent
            style={{
              flex: 1,
              backgroundColor: isDarkMode ? palette.dark.mainBackground : palette.light.mainBackground,
            }}
          >
            <AddProfile checkProfileLink={checkProfileLink} />
          </ModalContent>
        </BottomModal> */}
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            marginHorizontal: 20,
            marginTop: 10,
            paddingTop: 30,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",

              justifyContent: "space-between",
              alignItems: "center",
              maxHeight: 100,
              height: 100,
              maxWidth: 400,
              ...(width < 400 ? { alignSelf: "stretch" } : { alignSelf: "center", width: 400 }),
            }}
          >
            <Text
              style={{
                fontSize: 17,
                marginBottom: 20,
                color: isDarkMode ? palette.dark.title : palette.light.title,
              }}
            >
              {isSmartConnectAvailable() ? "" : "Select Location"}
            </Text>
            {isSmartConnectAvailable() ? (
              <Text>tt</Text>
            ) : (
              // <SmartConnect />
              <TouchableOpacity
                onPress={() => navigation.navigate("Location")}
                style={{
                  marginHorizontal: 20,
                  height: 70,
                  borderRadius: 20,

                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  alignSelf: "stretch",
                  backgroundColor: isDarkMode
                    ? palette.dark.mainBackground
                    : palette.light.mainBackground,
                  shadowColor: isDarkMode ? palette.dark.shadowColor : palette.light.shadowColor,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 9,
                  shadowRadius: 4,
                  ...(Platform.OS === "android" && {
                    borderWidth: 1,
                    borderColor: palette.disabledColor,
                  }),
                }}
              >
                {!selectedVps ? (
                  <Text
                    style={{
                      fontSize: 20,
                      color: isDarkMode ? palette.dark.title : palette.light.title,
                    }}
                  >
                    Tap here to select a location
                  </Text>
                ) : (
                  <>
                    <Image
                      // resizeMode="cover"
                      style={{
                        borderRadius: 5,
                        width: 40,
                        height: 28,
                        borderColor: isDarkMode ? palette.dark.border : palette.light.border,
                        borderWidth: 1,
                      }}
                      source={
                        selectedVps?.flagImage
                          ? { uri: getImage(selectedVps?.flagImage) }
                          : flagPlaceHolder
                      }
                    />
                    <View
                      style={{
                        flexDirection: "column",
                        alignSelf: "stretch",
                        justifyContent: "space-around",
                        alignItems: "flex-start",
                        marginVertical: 10,
                        flex: 0.6,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                          color: isDarkMode ? palette.dark.title : palette.light.title,
                        }}
                      >
                        {selectedVps?.countryName}
                      </Text>
                    </View>
                    <Image
                      resizeMode="cover"
                      style={{
                        width: 15,
                        height: 15,
                        tintColor: isDarkMode ? palette.dark.title : palette.light.title,
                      }}
                      source={dropDownIcon}
                    />
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignSelf: "stretch",
              justifyContent: "space-between",
              alignItems: "center",
              maxHeight: 200,
              height: 200,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                marginBottom: 20,
                color: isDarkMode ? palette.dark.title : palette.light.title,
              }}
            >
              {/* {connectStatus} */}
            </Text>

            <ImageBackground
              source={backgroundDots}
              resizeMode="cover"
              style={{ alignSelf: "stretch" }}
            >
              <TouchableOpacity
                onPress={() => triggerConnection()}
                // onPress={() => setTimerIsStopped(!timerIsStopped)}
                disabled={isConnectButtonDisabled()}
                style={{
                  flexDirection: "column",
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 20,
                  height: 150,
                  width: 150,
                  borderRadius: 75,
                  backgroundColor: getConnectButtonColor(),
                  shadowColor: "#63636390",
                  shadowOffset: { width: 2, height: 2 },
                  shadowOpacity: 0.4,
                  shadowRadius: 8,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    width: 40,
                    height: 40,
                  }}
                  source={triggerIcon}
                />
              </TouchableOpacity>
            </ImageBackground>
            {/* <Timer stopped={timerIsStopped} /> */}
            <Text
              style={{
                fontSize: 18,
                marginTop: 20,
                color: isDarkMode ? palette.dark.title : palette.light.title,
              }}
            >
              Connected Time
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
