/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import * as Linking from "expo-linking";

// import uuid from "react-native-uuid";
import { publicService, request } from "../service/public.service";
import { Alert, Platform } from "react-native";
import { getDate, getDateString, isExpired, validateCodeFormat } from "../libs/tools";
import { navigate, navigationRef } from "../views/navigation.ref";
import { tempProfile } from "../asset/img/profiles/template";
//-----android------
// import { ConnectContext } from "./ConnectShareAndroid";
import Constants from "expo-constants";
import { LoaderContext } from "./Loader.Provider";
import { getDeviceInfo } from "../libs";
import Toast from "react-native-toast-message";
import moment from "moment";
import { ClientInactive } from "../views/pages/client.inactive";

//-------ios--------
const { IOS_APP_VERSION, ANDROID_APP_VERSION } = Constants.expoConfig.extra;
const SubscriptionContext = React.createContext();

const SubscriptionProvider = ({ children }) => {
  const { setIsLoading } = React.useContext(LoaderContext);
  // const { disconnect, connectStatus, stablishConnection } = React.useContext(ConnectContext);
  const [subscriptionInfo, setSubscriptionInfo] = React.useState();
  const [hasSubscription, setHasSubscription] = React.useState();
  const [clientInactiveModal, setClientInactiveModal] = React.useState(false);

  const url = Linking.useURL();

  const [userEmail, setUserEmail] = React.useState();
  React.useEffect(() => {
    checkSubscription();

    return () => {};
  }, []);

  React.useEffect(() => {
    if (url) {
      checkUrl(url);
    }
    // Linking.addEventListener("url", checkUrl);
    return () => {
      // Linking.removeEventListener("change", checkUrl);
    };
  }, [url]);

  const checkUrl = async (url) => {
    const splittedUrl = url?.split("/");

    const scheme = splittedUrl[0];
    const preCode = splittedUrl[2];
    const code = splittedUrl[3];
    if (scheme === "vgate:")
      if (preCode === "activate") {
        Alert.alert(
          "Invalid Voucher",
          `It appears that you are using an older version of the voucher code. Please note that this voucher will only work on versions of the app that are older than ${
            Platform.OS === "ios" ? IOS_APP_VERSION : ANDROID_APP_VERSION
          }.`,
          [
            {
              text: "Ok",
              onPress: () => {},
              style: "cancel",
            },
          ]
        );
        return;
      }

    if (preCode === "activate_v2" && code && validateCodeFormat(code)) {
      if (userEmail) {
        return checkActivationCodeForCLient(code);
      }
      checkActivationCodeForAnonymous(code);
    }
  };

  const register = (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        setIsLoading("signing up");

        const deviceInfo = await getDeviceInfo();
        await publicService.sendRequest({
          method: "POST",
          url: "/client/register",
          data: { email, password, ...deviceInfo },
        });

        // await signInDispatch(accessToken, userEmail);

        // await updatePushNotificationTokenForUser();

        setIsLoading(false);

        await login(email, password);
        return resolve();
      } catch (error) {
        console.log("signup error : ", error);
        setIsLoading(false);
        Toast.show({
          type: "customError",
          text1: error?.message || error,
        });
        return reject();

        // showAlert({ message: error?.message || error, type: "error" });
      }
    });
  };

  const login = (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        setIsLoading("signing in");
        const deviceInfo = await getDeviceInfo();

        const { clientUuid, accessToken, refreshToken, subscription } =
          await publicService.sendRequest({
            method: "POST",
            url: "/client/login",
            data: { email, password, ...deviceInfo },
          });
        await AsyncStorage.setItem("@email", email);

        await AsyncStorage.setItem("@clientUuid", clientUuid);
        await AsyncStorage.setItem("@accessToken", accessToken);
        await AsyncStorage.setItem("@refreshToken", refreshToken);
        setUserEmail(email);
        setSubscriptionInfo(subscription);
        setIsLoading(false);
        Toast.show({
          type: "customSuccess",
          text1: "Successfully signed in",
        });
        return resolve();
      } catch (error) {
        console.log("signup error : ", error);
        setIsLoading(false);
        Toast.show({
          type: "customError",
          text1: error?.message || error,
        });
        return reject();
        // showAlert({ message: error?.message || error, type: "error" });
      }
    });
  };

  const logout = () => {
    return new Promise(async (resolve, reject) => {
      try {
        setIsLoading("signing in");

        try {
          await publicService.sendRequest({
            method: "GET",
            url: "/client/logout",
            hasAuth: true,
          });
        } catch (error) {}

        await AsyncStorage.removeItem("@email");
        await AsyncStorage.removeItem("@accessToken");
        await AsyncStorage.removeItem("@refreshToken");

        setHasSubscription();
        setSubscriptionInfo();
        setUserEmail();

        setIsLoading(false);
        Toast.show({
          type: "customSuccess",
          text1: "Successfully signed out",
        });
        return resolve();
      } catch (error) {
        Toast.show({
          type: "customError",
          text1: error?.message || error,
        });
        setIsLoading(false);
        return reject();
        // showAlert({ message: error?.message || error, type: "error" });
      }
    });
  };

  const checkSubscription = async () => {
    try {
      //   setIsLoading("signing in");
      const email = await AsyncStorage.getItem("@email");
      if (!email) {
        return;
      }

      setUserEmail(email);

      const deviceSpecificId = await AsyncStorage.getItem("@deviceSpecificId");
      const subscription = await publicService.sendRequest({
        method: "GET",
        url: "/client/subscription",
        params: { deviceSpecificId },
        hasAuth: true,
      });
      console.log(">>>>>>>>>>>", subscription);
      updateSubscriptionState(subscription);
      //   setIsLoading(false);
    } catch (error) {
      console.log("checkSubscription error : ", error);
      //   setIsLoading(false);
      // showAlert({ message: error?.message || error, type: "error" });
    }
  };

  const updateSubscriptionState = (subscription) => {
    setSubscriptionInfo((prev) => ({ ...prev, ...subscription }));

    const { inactiveDevice, inactiveClient } = subscription;
    if (inactiveClient) {
      // navigate to deactivate client
      // remove vpn configuration
      // return
      setClientInactiveModal(true);
      return;
    }
    if (inactiveDevice) {
      // navigate to deactivate device
      // remove vpn configuration
      // return
    }
    if (!subscription || isExpired(subscription?.expiredAt)) {
      setHasSubscription(false);
      return;
    }
    setHasSubscription(true);
  };

  const checkActivationCodeForCLient = async (code) => {
    try {
      setIsLoading("checking code");
      const deviceSpecificId = await AsyncStorage.getItem("@deviceSpecificId");

      const subscription = await publicService.sendRequest({
        method: "GET",
        url: "/subscription/voucher/consume",
        params: { code, deviceSpecificId },
        hasAuth: true,
      });
      setIsLoading(false);

      console.log(">>>>>>>>>>>", subscription);
      //   setSubscriptionInfo((prev) => ({ ...prev, ...subscription }));
      updateSubscriptionState(subscription);

      const { activeDeviceInfo, inactiveClient, inactiveDevice } = subscription;
      if (activeDeviceInfo || inactiveClient || inactiveDevice) {
        throw new Error("invalid state");
      }

      Alert.alert(
        "✅ Congratulation ✅",
        `Your account subscription verified until ${getDateString(subscription?.expiredAt)}`,
        [
          {
            text: "Setting",
            onPress: () => navigationRef.navigate("Setting"),
          },
          {
            text: "Ok",
            onPress: () => {},
            style: "cancel",
          },
        ]
      );
    } catch (error) {
      // console.log('signup error : ', error);
      setIsLoading(false);
      Alert.alert("Something went wrong!", error?.message || error, [
        {
          text: "Ok",
          onPress: () => {},
          style: "cancel",
        },
      ]);
      // showAlert({ message: error?.message || error, type: "error" });
    }
  };

  const contextValue = {
    register,
    userEmail,
    logout,
    login,
    checkSubscription,
    subscriptionInfo,
    hasSubscription,
  };
  return (
    <SubscriptionContext.Provider value={contextValue}>
      <ClientInactive
        modalState={clientInactiveModal}
        close={() => setClientInactiveModal(false)}
        logout={logout}
      />
      {children}
    </SubscriptionContext.Provider>
  );
};

export { SubscriptionContext, SubscriptionProvider };
