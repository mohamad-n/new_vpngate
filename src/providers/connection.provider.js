/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { NativeModules, NativeEventEmitter, AppState } from "react-native";
import Toast from "react-native-toast-message";

// import { decode } from "base-64";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { ConnectShare, ConnectionStatusEmitter } = NativeModules;
const ConnectContext = React.createContext();
var connectionStateEventName = "onChange";

const ConnectProvider = ({ children }) => {
  const [connectStatus, setConnectStatus] = React.useState("UNKNOWN");
  const [appState, setAppState] = React.useState("active");
  const [startConnectTime, setStartConnectTime] = React.useState();
  const ModuleWithEmitter = new NativeEventEmitter(ConnectionStatusEmitter);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const subscription = ModuleWithEmitter.addListener(
      connectionStateEventName,
      async (newState) => {
        setConnectStatus(newState.toUpperCase());
        ref.current = newState.toUpperCase();
        if (newState.toUpperCase() === "CONNECTED") {
          const currentLogTime = await AsyncStorage.getItem("@startConnectedTime");
          if (!currentLogTime) {
            const newDate = Math.floor(Date.now() / 1000);
            await AsyncStorage.setItem("@startConnectedTime", newDate.toString());
            setStartConnectTime(newDate);
          } else {
            setStartConnectTime(currentLogTime);
          }
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  React.useEffect(() => {
    const interval = setInterval(async () => {
      if (ref.current === "DISCONNECTED") {
        await AsyncStorage.removeItem("@startConnectedTime");
        setStartConnectTime(null);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current === "CONNECTED") {
        Toast.show({
          type: "customSuccess",
          text1: "Successfully Connected",
        });
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [ref.current]);

  React.useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = async (nextAppState) => {
    setAppState(nextAppState);
    if (nextAppState === "active") {
      ConnectShare?.getCurrentState();
    }
  };

  const contextValue = {
    appState,
    connectStatus,
    startConnectTime,
    connect: (profile) =>
      ConnectShare.connect({
        message: profile,
      }),
    stablishConnection: (profile) => ConnectShare.stablishConnection({ message: profile }),
    disconnect: () => ConnectShare.disconnect(),
    removeConnection: () => ConnectShare.removeConnection(),
    disableConnection: () => ConnectShare.disable(),

    isConnected: connectStatus === "CONNECTED",
    changeStatus: (status) => setConnectStatus(status),
  };

  return <ConnectContext.Provider value={contextValue}>{children}</ConnectContext.Provider>;
};

export { ConnectContext, ConnectProvider };
