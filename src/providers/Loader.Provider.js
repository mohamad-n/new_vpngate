/* eslint-disable react-native/no-inline-styles */
import * as React from "react";
import {
  useColorScheme,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { palette } from "../theme";

const LoaderContext = React.createContext();

const LoaderProvider = ({ children }) => {
  const { height, width } = useWindowDimensions();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isDescriptor, setIsDescriptor] = React.useState(false);

  const [description, setDescription] = React.useState("Loading");

  const isDarkMode = useColorScheme() === "dark";

  const setLoader = (desc, type) => {
    if (type === "descriptor") {
      setIsDescriptor(true);
    } else {
      setIsDescriptor(false);
    }
    if (typeof desc === "boolean") {
      if (desc) {
        setIsLoading(true);
        return;
      }
      setIsLoading(false);
      return;
    }

    if (desc) {
      setIsLoading(true);
      setDescription(desc);
      return;
    }
    setIsLoading(false);
    setDescription("Loading");
  };
  const contextValue = {
    setIsLoading: setLoader,
  };

  return (
    <LoaderContext.Provider value={contextValue}>
      {!isLoading ? null : (
        <View style={styles({ isDarkMode, width, height }).mainView}>
          <View
            style={[
              styles({ isDarkMode, width, height }).loader,
              { ...(isDescriptor && { width: 300, height: 300 }) },
            ]}
          >
            <ActivityIndicator
              size="small"
              color={isDarkMode ? palette.dark.title : palette.light.title}
              style={isDescriptor ? { flex: 0.2 } : { flex: 1 }}
            />
            <View
              style={
                isDescriptor
                  ? {
                      flex: 0.8,
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: 250,
                    }
                  : {
                      flex: 1,
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }
              }
            >
              {description.split("\n").map((_d, index) => (
                <Text key={index} style={styles({ isDarkMode, width, height }).text}>
                  {_d}
                </Text>
              ))}
            </View>
          </View>
        </View>
      )}

      {children}
    </LoaderContext.Provider>
  );
};

export { LoaderContext, LoaderProvider };

const styles = ({ isDarkMode, width, height }) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
      position: "absolute",
      width: width,
      height: height,
      elevation: 3,
      zIndex: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDarkMode
        ? palette.dark.transparentLoaderBackground
        : palette.light.transparentLoaderBackground,
    },
    loader: {
      flexDirection: "column",
      // width: 100,
      padding: 10,
      height: 100,
      backgroundColor: isDarkMode ? palette.dark.mainBackground : palette.light.mainBackground,
      justifyContent: "flex-start",
      alignItems: "center",
      borderRadius: 10,
    },
    text: {
      textAlign: "left",
      color: isDarkMode ? palette.dark.title : palette.light.title,
      margin: 10,
    },
  });
