import * as React from "react";
import * as Device from "expo-device";
import * as Localization from "expo-localization";
import * as Crypto from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
const { APP_VERSION } = Constants.expoConfig.extra;

export const useDeviceInfo = () => {
  const getDeviceInfo = () => {
    return new Promise(async (resolve) => {
      try {
        let deviceSpecificId = await AsyncStorage.getItem("@deviceSpecificId");
        if (!deviceSpecificId) {
          deviceSpecificId = Crypto.randomUUID();
          await AsyncStorage.setItem("@deviceSpecificId", deviceSpecificId);
        }

        const { timeZone } = Localization.getCalendars()?.pop();
        return resolve({
          deviceSpecificId,
          deviceManufacturer: Device.manufacturer,
          deviceOsVersion: Device.osVersion,
          deviceOs: Device.osName.toUpperCase(),
          deviceModelName: Device.modelName,
          appVersion: APP_VERSION,
          ...(timeZone && { timeZone }),
        });
      } catch (error) {
        console.log(error);

        return reject(null);
      }
    });
  };

  return { getDeviceInfo };
};
