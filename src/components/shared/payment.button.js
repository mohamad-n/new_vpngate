import * as React from "react";

import Toast from "react-native-toast-message";
import {
  withIAPContext,
  clearTransactionIOS,
  useIAP,
  requestSubscription,
  endConnection,
} from "react-native-iap";
import { LoaderContext } from "../../provider";
import { publicService } from "../../../service/public.service";
import { createProductDescription, getFreeIntroductory } from "../../../utils";
import { useDeviceInfo } from "../../hooks";
import { Button } from "./button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { palette } from "../../../theme";
import moment from "moment";

const verifyPurchaseUrl = "/subscription/verify/receipt/ios";
const checkPurchaseUrl = "/subscription/check/receipt/ios";

const PaymentButtonDefault = (props) => {
  const { setOutPutData, onCompletePurchase, buyButtonTitle, source, successMessage } = props;

  const {
    connected,
    products,
    promotedProductsIOS,
    subscriptions,
    purchaseHistories,
    availablePurchases,
    currentPurchase,
    currentPurchaseError,
    initConnectionError,
    finishTransaction,
    getProducts,
    getSubscriptions,
    getAvailablePurchases,
    getPurchaseHistories,
  } = useIAP();

  const { getDeviceInfo } = useDeviceInfo();
  const { setIsLoading } = React.useContext(LoaderContext);
  const [productDescription, setProductDescription] = React.useState();

  const [defaultPlan, setDefaultPlan] = React.useState();
  const [restorablePurchase, setRestorablePurchase] = React.useState();
  const [buttonState, setButtonState] = React.useState();

  const checkTime = React.useRef(false);

  React.useEffect(() => {
    // ... listen to currentPurchaseError, to check if any error happened
  }, [currentPurchaseError]);

  React.useEffect(() => {
    // console.log("currentPurchase >>>>>>>>>>>", currentPurchase);
  }, [currentPurchase]);

  React.useEffect(() => {
    getSubscriptionPackages();

    return () => endConnection();
  }, []);

  React.useEffect(() => {
    // console.log(" checkTime.current >>>>>>>>>>>", checkTime.current);
    // console.log("availablePurchases >>>>>>>>>>>", availablePurchases?.length);

    if (checkTime.current) {
      if (availablePurchases?.length) {
        // console.log("availablePurchases >>>>>>>>>>>", availablePurchases?.length);

        // setIsLoading(true, "Waiting");

        getLastReceipt(availablePurchases);
        // checkAvailablePurchase();
        return;
      }

      setButtonState("buy");
    }

    // ... listen to currentPurchase, to check if the purchase went through
  }, [availablePurchases]);

  React.useEffect(() => {
    // console.log("subscriptions >>>>>>>>>>>", subscriptions);

    if (subscriptions?.length) {
      let {
        introductoryPriceNumberOfPeriodsIOS,
        introductoryPriceSubscriptionPeriodIOS,
        localizedPrice,
        subscriptionPeriodUnitIOS,
        subscriptionPeriodNumberIOS,
      } = subscriptions.find((_) => _?.productId === defaultPlan);

      setProductDescription(
        createProductDescription(
          subscriptionPeriodNumberIOS,
          subscriptionPeriodUnitIOS,
          localizedPrice
        )
      );
      if (setOutPutData) {
        setOutPutData(
          getFreeIntroductory(
            introductoryPriceNumberOfPeriodsIOS,
            introductoryPriceSubscriptionPeriodIOS
          ),
          createProductDescription(
            subscriptionPeriodNumberIOS,
            subscriptionPeriodUnitIOS,
            localizedPrice
          )
        );
      }
    }
  }, [subscriptions]);

  const makePurchase = async () => {
    try {
      setIsLoading(true);
      // console.log(
      //   "4 - request purchase (from -> Apple Server  ) >>>>>>>>>>>",
      //   moment().format("hh:mm:ss")
      // );
      const info = await requestSubscription({ sku: defaultPlan });

      // console.log(
      //   "5 - validate purchase (from -> ThetaVPN Server  ) >>>>>>>>>>>",
      //   moment().format("hh:mm:ss")
      // );
      if (!info) {
        throw new Error("invalid subscription");
      }
      // const info = purchaseInfo;
      // console.log(">>>>>>>>>>>", info);

      const deviceInfo = await getDeviceInfo();
      const url = info?.originalTransactionIdentifierIOS ? checkPurchaseUrl : verifyPurchaseUrl;
      const {
        email: responseEmail,
        refreshToken,
        accessToken,
        subscriberUuid,
        clientUuid,
      } = await publicService.sendRequest({
        method: "POST",
        url,
        data: { deviceInfo, info },
      });

      // console.log("6 - end >>>>>>>>>>>", moment().format("hh:mm:ss"));
      await AsyncStorage.setItem("@subscriberUuid", subscriberUuid);
      await AsyncStorage.setItem("@clientUuid", clientUuid);
      await AsyncStorage.setItem("@accessToken", accessToken);
      await AsyncStorage.setItem("@refreshToken", refreshToken);
      await AsyncStorage.setItem("@isAutoConnectEnabled", JSON.stringify(true));
      await AsyncStorage.setItem("@initialRoute", "HomeRoot");

      if (responseEmail) {
        await AsyncStorage.setItem("@email", responseEmail);
      }
      setIsLoading(false);
      Toast.show({
        type: "customSuccess",
        text1: successMessage,
      });
      onCompletePurchase();
      // navigation.push("Subscription");
    } catch (error) {
      // console.log("5 - end (error in purchase)   >>>>>>>>>>>", moment().format("hh:mm:ss"));
      setIsLoading(false);
      Toast.show({
        type: "customError",
        text1: "Oops! Something went wrong. Please try again.",
      });
      // console.log(error);
    }
  };

  const restorePurchase = async (restorePurchase) => {
    try {
      setIsLoading(true, "Waiting");

      const deviceInfo = await getDeviceInfo();

      const {
        email: responseEmail,
        refreshToken,
        accessToken,
        subscriberUuid,
        clientUuid,
      } = await publicService.sendRequest({
        method: "POST",
        url: "/subscription/check/receipt/ios",
        data: { deviceInfo, info: restorePurchase },
      });

      await AsyncStorage.setItem("@subscriberUuid", subscriberUuid);
      await AsyncStorage.setItem("@clientUuid", clientUuid);
      await AsyncStorage.setItem("@accessToken", accessToken);
      await AsyncStorage.setItem("@refreshToken", refreshToken);
      await AsyncStorage.setItem("@isAutoConnectEnabled", JSON.stringify(true));
      if (responseEmail) {
        await AsyncStorage.setItem("@email", responseEmail);
      }

      // console.log(">>>>>>>>>>>", refreshToken, accessToken, subscriberUuid, clientUuid);
      setIsLoading(false);
      Toast.show({
        type: "customSuccess",
        text1: "Signed in - Ready to connect",
      });
      onCompletePurchase();
    } catch (error) {
      setIsLoading(false);
      // Toast.show({
      //   type: "customError",
      //   text1: error?.message || error,
      // });
      // console.log(error);
    }
  };

  const getSubscriptionPackages = async () => {
    try {
      const { defaultPlan, plans } = await getDefaultPlan();
      setDefaultPlan(defaultPlan);
      await getSubscriptions({ skus: plans });

      try {
        await clearTransactionIOS();

        if (source === "extend") {
          setButtonState("buy");
          return;
        }
        checkTime.current = true;

        await getAvailablePurchases();
      } catch (error) {
        setButtonState("noAppleId");
      }

      // console.log(
      //   "1 - start - getting subscription plans (from ThetaVPN Server) >>>>>>>>>>>",
      //   moment().format("hh:mm:ss")
      // );

      // setIsLoading(true, "Waiting");

      // console.log(
      //   "2 - getting subscription plans (from Apple Server) >>>>>>>>>>>",
      //   moment().format("hh:mm:ss")
      // );

      //   console.log(" defaultPlan >>>>>>>>>>>", defaultPlan);
      // console.log(
      //   "3 - getting subscription history (from Apple Server) >>>>>>>>>>>",
      //   moment().format("hh:mm:ss")
      // );

      //

      // setIsLoading(false);
    } catch (e) {
      // setIsLoading(false);
      // console.log(">>>>>>>>>>>", e);
    }
  };

  const getLastReceipt = async (purchases) => {
    // .navigate("Subscription");
    try {
      if (purchases?.length === 0) {
        setButtonState("buy");
        return;
      }
      // setIsLoading(true, "Waiting");

      const lastPurchase = purchases
        ?.sort((a, b) => Number(b.transactionDate) - Number(a.transactionDate))
        ?.shift?.();

      // console.log("info >>>>>>>>>>>", info);
      // console.log(
      //   "4 - checking last purchase (from -> ThetaVPN Server  ) >>>>>>>>>>>",
      //   moment().format("hh:mm:ss")
      // );

      await publicService.sendRequest({
        method: "POST",
        url: "/subscription/validate/receipt/ios",
        data: { transactionReceipt: lastPurchase?.transactionReceipt },
      });

      setRestorablePurchase(lastPurchase);
      setButtonState("restore");
      // setIsLoading(false);
    } catch (error) {
      // setIsLoading(false);
      setButtonState("resubscribe");
      // Toast.show({
      //   type: "customError",
      //   text1: error?.message || error,
      // });
      // console.log(error);
    }

    // console.log("5 - end >>>>>>>>>>>", moment().format("hh:mm:ss"));
  };

  const getDefaultPlan = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await publicService.sendRequest({
          method: "GET",
          url: "/subscription/plan/default",
        });
        // console.log(">>>>>>>>>>>", result);
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  };

  const buttonAction = () => {
    if (buttonState === "buy") {
      return makePurchase();
    }

    if (buttonState === "noAppleId") {
      return getSubscriptionPackages();
    }
    if (buttonState === "resubscribe") {
      return makePurchase();
    }

    if (buttonState === "restore") {
      return restorePurchase(restorablePurchase);
    }
  };

  const getButtonLabel = () => {
    if (["noAppleId", "buy"].includes(buttonState)) {
      if (source === "payment") {
        return buyButtonTitle;
      }
      return `${buyButtonTitle} - ${productDescription}`;
    }

    if (buttonState === "restore") {
      return "Restore Purchase";
    }

    if (buttonState === "resubscribe") {
      return "Resubscribe";
    }
    return "Checking...";
  };

  const getButtonColor = () => {
    if (buttonState === "restore") {
      return palette.blue;
    }

    return null;
  };

  return (
    <Button
      disabled={!buttonState}
      title={getButtonLabel()}
      widthType={300}
      onPress={() => buttonAction()}
      buttonStyle={{
        marginTop: 20,
        ...(getButtonColor() && { backgroundColor: getButtonColor() }),
      }}
    />
  );
};

export const PaymentButton = withIAPContext(PaymentButtonDefault);
