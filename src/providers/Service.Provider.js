/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

// import uuid from "react-native-uuid";
import { request } from "../service/public.service";
import { Alert, Linking, Platform } from "react-native";
import { isExpired } from "../libs/tools";
import { NavigationRef } from "../views/navigation.ref";
import { tempProfile } from "../asset/img/profiles/template";
//-----android------
// import { ConnectContext } from "./ConnectShareAndroid";
import Constants from "expo-constants";
import { LoaderContext } from "./Loader.Provider";

//-------ios--------
const { IOS_APP_VERSION, ANDROID_APP_VERSION } = Constants.expoConfig.extra;
const ServiceContext = React.createContext();

const ServiceProvider = ({ children }) => {
  const { setIsLoading } = React.useContext(LoaderContext);
  // const { disconnect, connectStatus, stablishConnection } = React.useContext(ConnectContext);

  const [subscriptionInfo, setSubscriptionInfo] = React.useState();

  const [userEmail, setUserEmail] = React.useState();

  React.useEffect(() => {
    // initialApp();
    return () => {};
  }, []);

  const initialApp = async () => {
    try {
      const { isConnected } = await NetInfo.fetch();

      // console.log(isConnected);
      if (!isConnected) {
        return retryInit();
      }
      const idToken = await AsyncStorage.getItem("@idToken");
      // console.log('idToken : ', idToken);
      if (!idToken) {
        // console.log('saving idToken');
        await saveTokenToDatabase();
      }

      // if (!vpsList?.length) {
      //   // console.log('get vps list');
      //   await getVps();
      // }

      if ((await AsyncStorage.getItem("@isUserLoggedIn")) === "YES") {
        setUserEmail(await AsyncStorage.getItem("@userEmail"));
        // console.log('checkSubscriptionInfo');

        await checkSubscriptionInfo();
      }
    } catch (error) {
      retryInit();
    }
  };

  const retryInit = () => {
    Alert.alert(
      "Network Error",
      "No network connection found. please make sure you have an active network connection",
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "retry",
          onPress: () => initialApp(),
        },
      ]
    );
  };

  const saveTokenToDatabase = () => {
    return new Promise(async (resolve, reject) => {
      try {
        setIsLoading("initializing app");

        let info = {
          // token: uuid.v4(),
          os: Platform.OS,
          osVersion: Platform.Version,
          appVersion: IOS_APP_VERSION,
        };

        const idToken = await request("POST", "/user/identifier/token", {}, info, "enc");
        if (!idToken) {
          throw new Error("can not fetch data");
        }
        await AsyncStorage.setItem("@idToken", idToken);
        setIsLoading(false);

        return resolve();
      } catch (error) {
        setIsLoading(false);

        // console.log(error);
        return reject(error);
      }
    });
  };

  const checkUpdateVersion = async (type) => {
    try {
      if (type === "approval") {
        setIsLoading("checking for updtate");
      }
      const { iosVersion, iosUpdateLink, androidVersion, androidUpdateLink } = await request(
        "GET",
        "/setting/app",
        null,
        null,
        "enc"
      );
      setIsLoading(false);
      const remoteVersion =
        Platform.OS === "ios"
          ? Number(iosVersion.split(".").join(""))
          : Number(androidVersion.split(".").join(""));
      const currentVersion =
        Platform.OS === "ios"
          ? Number(IOS_APP_VERSION.split(".").join(""))
          : Number(ANDROID_APP_VERSION.split(".").join(""));

      const updateLink = Platform.OS === "ios" ? iosUpdateLink : androidUpdateLink;
      if (remoteVersion > currentVersion) {
        Alert.alert(
          "New Version Available",
          `Version ${
            Platform.OS === "ios" ? iosVersion : androidVersion
          } is available now. Do you want to update?`,
          [
            {
              text: "No",
              onPress: () => {},
              style: "cancel",
            },
            {
              text: "Update",
              onPress: () =>
                Linking.canOpenURL(updateLink).then((supported) => {
                  if (supported) {
                    Linking.openURL(updateLink);
                  }
                }),
            },
          ]
        );
        return;
      }
      if (type === "approval") {
        Alert.alert("VPNGate is updated", "No New Version Available", [
          {
            text: "Close",
            onPress: () => {},
            style: "cancel",
          },
        ]);
      }
    } catch (error) {
      // log;
      // console.log('error ====> ', error);
    }
  };

  const checkSubscriptionInfo = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const subscription = await getUserSubscriptionInfo();
        if (subscription) {
          await AsyncStorage.setItem("@userSubInfo", JSON.stringify(subscription));
          setSubscriptionInfo(subscription);
          stablishConnection(tempProfile);
          resolve();
        }
      } catch (error) {
        resolve();
      }
    });
  };

  const getUserSubscriptionInfo = () => {
    return new Promise(async (resolve) => {
      try {
        const idToken = await AsyncStorage.getItem("@idToken");

        const result = await request("POST", "/user/info", null, { token: idToken }, "auth");
        return resolve(result);
      } catch (error) {
        return resolve();
      }
    });
  };

  const prepareToCheckActivationCode = async (activationId) => {
    const hasSubscription = await isUserHasSubscription();
    if (hasSubscription) {
      Alert.alert(
        "Warning",
        "You may lose your current subscription. are you sure to active new subscription?",
        [
          {
            text: "No",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: async () => await checkActivationCode(activationId),
          },
        ]
      );
      return;
    }
    await checkActivationCode(activationId);
  };

  const checkActivationCode = async (activationId) => {
    try {
      setIsLoading("checking for activation code");
      const idToken = await AsyncStorage.getItem("@idToken");
      const currentEmail = await AsyncStorage.getItem("@userEmail");

      const { email, deviceActivationInfo, userActivationInfo, userSubInfo, accessToken } =
        await request(
          "POST",
          "/user/vocher",
          null,
          {
            identifierToken: idToken,
            code: activationId,
            ...(currentEmail && { email: currentEmail }),
          },
          "enc"
        );
      setIsLoading(false);
      const subscription = {
        deviceActivationInfo,
        userActivationInfo,
        userSubInfo,
      };
      setSubscriptionInfo(subscription);
      await AsyncStorage.setItem("@userSubInfo", JSON.stringify(subscription));
      await signInDispatch(accessToken, email);

      Alert.alert("Congratulation", "you successfully activated premium account ✅", [
        {
          text: "Dismiss",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Details",
          onPress: () => NavigationRef.current.navigate("Setting"),
        },
      ]);
    } catch (error) {
      // console.log('error ===>', error);
      setIsLoading(false);
      Alert.alert("Activation Error", `${error}`, [
        {
          text: "Dismiss",
          onPress: () => {},
          style: "cancel",
        },
      ]);
    }
  };

  const signOutDispatch = () => {
    return new Promise(async (resolve) => {
      await AsyncStorage.removeItem("@isUserLoggedIn");
      await AsyncStorage.removeItem("@userEmail");
      await AsyncStorage.removeItem("@accessToken");
      await AsyncStorage.removeItem("@userSubInfo");
      await AsyncStorage.removeItem("@profileCert");

      setSubscriptionInfo();
      setUserEmail();
      return resolve();
    });
  };
  const signInDispatch = async (accessToken, userEmail, from) => {
    await AsyncStorage.setItem("@accessToken", accessToken);
    await AsyncStorage.setItem("@userEmail", userEmail);
    await AsyncStorage.setItem("@isUserLoggedIn", "YES");
    setUserEmail(userEmail);
    if (from === "signin") {
      checkSubscriptionInfo();
    }
  };
  const isSmartConnectAvailable = () => {
    return (
      subscriptionInfo?.userActivationInfo &&
      subscriptionInfo?.deviceActivationInfo &&
      subscriptionInfo?.userSubInfo &&
      subscriptionInfo?.userSubInfo?.isActive &&
      !isExpired(subscriptionInfo?.userSubInfo?.expiredAt)
    );
  };

  const isUserHasSubscription = () => {
    return new Promise(async (resolve) => {
      try {
        const subscriptionInfoString = await AsyncStorage.getItem("@userSubInfo");

        if (!subscriptionInfoString) {
          resolve(false);
        }

        const subscriptionInfo = JSON.parse(subscriptionInfoString);

        if (!subscriptionInfo) {
          resolve(false);
        }
        resolve(
          subscriptionInfo?.userActivationInfo &&
            subscriptionInfo?.deviceActivationInfo &&
            subscriptionInfo?.userSubInfo &&
            subscriptionInfo?.userSubInfo?.isActive &&
            !isExpired(subscriptionInfo?.userSubInfo?.expiredAt)
        );
      } catch (error) {
        console.log(error);
        resolve(false);
      }
    });
  };

  const contextValue = {
    subscriptionInfo,
    userEmail,
    checkUpdateVersion,
    checkSubscriptionInfo,
    signOutDispatch,
    signInDispatch,
    isSmartConnectAvailable,
    prepareToCheckActivationCode,
  };
  return <ServiceContext.Provider value={contextValue}>{children}</ServiceContext.Provider>;
};

export { ServiceContext, ServiceProvider };
