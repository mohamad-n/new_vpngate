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
import { ServiceContext, SubscriptionContext, VpsContext } from "../../../providers";

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
import { useFocusEffect } from "@react-navigation/native";
import { HomeBadgeState } from "./home.badge.state";
import { AddProfileModal } from "./add.profile/add.profile.modal";
import { SelectLocationButton } from "./select.location";

export const Home = ({ navigation }) => {
  //
  const { setIsLoading } = React.useContext(LoaderContext);
  const addProfileModalRef = React.useRef();

  const isSmartConnectAvailable = () => {
    return false;
  };
  const { checkSubscription, hasSubscription } = React.useContext(SubscriptionContext);

  const { selectedVps } = React.useContext(VpsContext);

  const isDarkMode = useColorScheme() === "dark";
  const { width } = useWindowDimensions();

  useFocusEffect(
    React.useCallback(() => {
      checkSubscription();
      return () => {};
    }, [])
  );

  // React.useEffect(() => {
  //   if (connectStatus === "CONNECTED") {
  //     setTimerIsStopped(false);
  //   }
  //   if (connectStatus === "DISCONNECTED") {
  //     setTimerIsStopped(true);
  //   }
  //   return () => {};
  // }, [connectStatus]);

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

  const connectButtonAction = () => {
    if (!selectedVps) {
      if (hasSubscription) {
        navigation.navigate("PrivateLocation");
        return;
      }
      navigation.navigate("Location");
      return;
    }

    console.log(">>>>>>>>>>>", "connect");
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: 0,
        backgroundColor: isDarkMode ? palette.dark.mainBackground : palette.light.mainBackground,
      }}
    >
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
          addProfile={() => addProfileModalRef.current?.present()}
        />

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
              Select Location
            </Text>

            <SelectLocationButton navigation={navigation} />
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
                onPress={() => connectButtonAction()}
                // disabled={isConnectButtonDisabled()}
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
      <AddProfileModal
        addProfileModalRef={addProfileModalRef}
        close={() => addProfileModalRef.current?.dismiss()}
      />
      <HomeBadgeState />
    </SafeAreaView>
  );
};
