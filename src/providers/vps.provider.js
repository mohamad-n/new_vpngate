import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { groupServer } from "../libs";
const VpsContext = React.createContext();

const VpsProvider = ({ children }) => {
  const [vpsList, setVpsList] = React.useState();
  const [selectedVps, setSelectedVps] = React.useState();
  const [groupedVps, setGroupedVps] = React.useState();
  const [lastLocations, setLastLocations] = React.useState();

  React.useEffect(() => {
    getDefaultVps();

    return () => {};
  }, []);

  const changeDefaultVps = async (vps, type) => {
    await AsyncStorage.setItem("@selectedVps", JSON.stringify(vps));
    setSelectedVps(vps);
    if (type !== "private") {
      createLastLocations(vps);
    }
  };

  const clearDefaultVps = async () => {
    await AsyncStorage.removeItem("@selectedVps");
    setSelectedVps();
  };
  const getDefaultVps = (list, type) => {
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
      if (type !== "private") {
        createGroupedVps(list);
        updateLastLocations();
      }
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

  const createGroupedVps = (list) => {
    const grouped = groupServer(list);
    setGroupedVps(grouped);
    // console.log(">>>>>>>>>>>", grouped);
  };

  const createLastLocations = async (vps) => {
    // await AsyncStorage.removeItem("@lastLocations");

    const lasLocations = await AsyncStorage.getItem("@lastLocations");

    if (lasLocations && JSON.parse(lasLocations)) {
      const lastLocationsArray = JSON.parse(lasLocations);
      const updatedLastLocations = [
        vps,
        ...lastLocationsArray.filter((_) => _?.uuid !== vps?.uuid),
      ];
      await AsyncStorage.setItem(
        "@lastLocations",
        JSON.stringify(updatedLastLocations.slice(0, 10))
      );

      setLastLocations(updatedLastLocations.slice(0, 10));
      return;
    }
    await AsyncStorage.setItem("@lastLocations", JSON.stringify([vps]));
    setLastLocations([vps]);
  };

  const updateLastLocations = async () => {
    // await AsyncStorage.removeItem("@lastLocations");

    const lasLocations = await AsyncStorage.getItem("@lastLocations");

    if (lasLocations && JSON.parse(lasLocations)) {
      const lastLocationsArray = JSON.parse(lasLocations);

      await AsyncStorage.setItem("@lastLocations", JSON.stringify(lastLocationsArray.slice(0, 10)));

      setLastLocations(lastLocationsArray.slice(0, 10));
      return;
    }
    setLastLocations([]);
  };
  const contextValue = {
    selectedVps,
    getDefaultVps,
    changeDefaultVps,
    vpsList,
    groupedVps,
    lastLocations,
    clearDefaultVps,
  };
  return <VpsContext.Provider value={contextValue}>{children}</VpsContext.Provider>;
};

export { VpsContext, VpsProvider };
