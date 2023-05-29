import * as React from "react";
import * as Device from "expo-device";
import * as Localization from "expo-localization";
import * as Crypto from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";
const VpsContext = React.createContext();

const VpsProvider = ({ children }) => {
  const [vpsList, setVpsList] = React.useState();
  const [selectedVps, setSelectedVps] = React.useState();

  React.useEffect(() => {
    getDefaultVps();

    return () => {};
  }, []);

  const changeDefaultVps = async (vps) => {
    await AsyncStorage.setItem("@selectedVps", JSON.stringify(vps));
    setSelectedVps(vps);
    // getDefaultVps();
  };

  const getDefaultVps = (list) => {
    return new Promise(async (resolve) => {
      const stringifyVps = await AsyncStorage.getItem("@selectedVps");
      const savedVps = JSON.parse(stringifyVps);
      if (!list || !list?.length) {
        if (savedVps) {
          setSelectedVps(savedVps);
          return resolve(savedVps);
        }
        return resolve();
      }
      setVpsList(list);
      if (savedVps) {
        const savedVpsIsOnList = list.find((_) => savedVps.uuid === _.uuid);
        if (!savedVpsIsOnList) {
          setSelectedVps();

          return resolve();
        }
        setSelectedVps(savedVps);

        return resolve(savedVpsIsOnList);
      }
      setSelectedVps();

      return resolve();
    });
  };

  const contextValue = {
    selectedVps,
    getDefaultVps,
    changeDefaultVps,
    vpsList,
  };
  return <VpsContext.Provider value={contextValue}>{children}</VpsContext.Provider>;
};

export { VpsContext, VpsProvider };
