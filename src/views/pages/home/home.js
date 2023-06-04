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
import Toast from "react-native-toast-message";

import { backgroundDots } from "../../../asset/img";
import { triggerIcon } from "../../../asset/img/icon";
import { SharedHeader } from "../../shared";
import { LoaderContext } from "../../../providers/Loader.Provider";
import { ConnectContext, SubscriptionContext, VpsContext } from "../../../providers";
import { palette } from "../../../theme";
import { useFocusEffect } from "@react-navigation/native";
import { HomeBadgeState } from "./home.badge.state";
import { AddProfileModal } from "./add.profile/add.profile.modal";
import { SelectLocationButton } from "./select.location";
import Timer from "../../shared/timer";

export const Home = ({ navigation }) => {
  //
  const addProfileModalRef = React.useRef();

  // const isSmartConnectAvailable = () => {
  //   return false;
  // };
  const { checkSubscription, hasSubscription, getConnectionProfile } =
    React.useContext(SubscriptionContext);

  const { selectedVps } = React.useContext(VpsContext);
  const { connect, disconnect, connectStatus, changeStatus } = React.useContext(ConnectContext);

  const isDarkMode = useColorScheme() === "dark";
  const { width } = useWindowDimensions();

  useFocusEffect(
    React.useCallback(() => {
      checkSubscription();
      return () => {};
    }, [])
  );

  // React.useEffect(() => {
  //   if (selectedVps) {
  //     setTimerIsStopped(false);
  //   }

  //   return () => {};
  // }, [selectedVps]);

  const connectButtonAction = async () => {
    if (connectStatus === "CONNECTED" || connectStatus === "CONNECTING") {
      disconnect();
      return;
    }

    if (!selectedVps) {
      if (hasSubscription) {
        navigation.navigate("PrivateLocation");
        return;
      }
      navigation.navigate("Location");
      return;
    }
    try {
      changeStatus("CONNECTING");
      const profile = await getConnectionProfile(selectedVps);
      if (!profile) {
        throw new Error();
      }

      connect(profile);
    } catch (error) {
      changeStatus("DISCONNECTED");
      Toast.show({
        type: "customError",
        text1: "Connection failed - tyr again",
      });
      console.log("get profile error : ", error);
    }
  };

  const getConnectButtonColor = () => {
    if (connectStatus === "DISCONNECTED" || connectStatus === "UNKNOWN") {
      return palette.connectButton.disconnected;
    }

    if (connectStatus === "CONNECTED") {
      return palette.connectButton.connected;
    }

    return palette.connectButton.disabled;
  };

  const isConnectButtonDisabled = () => {
    if (
      connectStatus === "DISCONNECTED" ||
      connectStatus === "CONNECTED" ||
      connectStatus === "UNKNOWN"
    ) {
      return false;
    }

    return true;
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
              {connectStatus === "UNKNOWN" ? "DISCONNECTED" : connectStatus}
            </Text>

            <ImageBackground
              source={backgroundDots}
              resizeMode="cover"
              style={{ alignSelf: "stretch" }}
            >
              <TouchableOpacity
                onPress={() => connectButtonAction()}
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
            <Timer
              textStyle={{
                marginTop: 20,
                height: 20,
                fontSize: 20,
                color: isDarkMode ? palette.dark.title : palette.light.title,
              }}
            />
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
