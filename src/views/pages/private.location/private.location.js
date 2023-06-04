/* eslint-disable react-native/no-inline-styles */
import * as React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Platform,
  Alert,
  Linking,
  SafeAreaView,
  useColorScheme,
  ImageBackground,
  useWindowDimensions,
} from "react-native";

import {
  flagPlaceHolder,
  notSelectedMarkerIcon,
  selectedMarkerIcon,
  trafficIcon,
} from "../../../asset/img/icon";
import { getImage } from "../../../libs/tools";
import { ConnectContext, LoaderContext, SubscriptionContext, VpsContext } from "../../../providers";
import { palette, theme } from "../../../theme";
import { SharedHeader } from "../../shared";
import { publicService } from "../../../service";

export const PrivateLocation = ({ navigation }) => {
  const { setIsLoading } = React.useContext(LoaderContext);
  const { vpsList, getDefaultVps, changeDefaultVps, selectedVps } = React.useContext(VpsContext);
  const { getConnectionProfile } = React.useContext(SubscriptionContext);
  const { connect, changeStatus } = React.useContext(ConnectContext);

  const isDarkMode = useColorScheme() === "dark";
  const { width } = useWindowDimensions();

  const selectVps = async (vps) => {
    try {
      connectOnChangeVps(vps);

      navigation.navigate("Home");
    } catch (error) {
      // console.log('error ====> ', error);
    }
  };

  const connectOnChangeVps = async (vps) => {
    // if (connectStatus === "CONNECTED" || connectStatus === "CONNECTING") {
    //   disconnect();
    //   await delay(100);
    // }
    changeDefaultVps(vps, "private");
    try {
      changeStatus("CONNECTING");
      const profile = await getConnectionProfile(vps);
      // console.log(">>>>>>>>>>>", profile);
      if (!profile) {
        throw new Error();
      }

      connect(profile);
    } catch (error) {
      changeStatus("DISCONNECTED");
      Toast.show({
        type: "customError",
        text1: "Connection failed - try again",
      });
      console.log("get profile error : ", error);
    }
  };
  React.useEffect(() => {
    getVpsList();
    return () => {};
  }, []);

  const getVpsList = async () => {
    try {
      setIsLoading("getting server list");
      const list = await publicService.sendRequest({
        method: "GET",
        url: "/vps/available",
        hasAuth: true,
      });
      if (!list?.length) {
        setIsLoading(false);
        throw new Error("can not fetch server list");
      }

      await getDefaultVps(list.map((_) => ({ ..._, type: "private" }), "private"));

      // setSelectedVps(defaultVps);

      setIsLoading(false);
      // checkUpdateVersion();
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
    }
  };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => selectVps(item)}
        style={styles({ theme, isDarkMode, width }).flatList.MainView}
      >
        {/* <Image
          style={styles({ theme, isDarkMode, width }).flatList.flagImage}
          source={item?.flagImage ? { uri: getImage(item?.flagImage) } : flagPlaceHolder}
        /> */}
        <View style={styles({ theme, isDarkMode, width }).flatList.description}>
          <Text style={styles({ theme, isDarkMode, width }).flatList.countryName}>
            {item?.name}
          </Text>
        </View>
        <View style={styles({ theme, isDarkMode, width }).flatList.signView}>
          <Image
            resizeMode="cover"
            style={styles({ theme, isDarkMode, width }).flatList.trafficIcon}
            source={trafficIcon}
          />
          <Image
            resizeMode="cover"
            style={styles({ theme, isDarkMode, width }).flatList.selectIcon}
            source={selectedVps?.id === item.id ? selectedMarkerIcon : notSelectedMarkerIcon}
            // source={notSelectedMarkerIcon}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles({ theme, isDarkMode }).mainView}>
      <SharedHeader hasBack navigation={navigation} title=" Select Location" />
      <View style={styles({ theme, isDarkMode }).outerView}>
        <View style={styles({ theme, isDarkMode }).innerView}>
          <FlatList
            data={vpsList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={null}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = ({ theme, isDarkMode, width = null }) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
      marginTop: 0,
      backgroundColor: isDarkMode ? palette.dark.mainBackground : palette.light.mainBackground,
    },
    outerView: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: isDarkMode ? palette.dark.mainBackground : palette.light.mainBackground,
      flexDirection: "column",
    },
    innerView: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "stretch",
      // marginHorizontal: 20,
      marginTop: 10,
      paddingTop: 10,
      // backgroundColor: 'blue',
    },
    flatList: {
      MainView: {
        marginHorizontal: 15,
        marginVertical: 10,
        height: 70,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: isDarkMode ? palette.dark.mainBackground : palette.light.mainBackground,
        shadowColor: isDarkMode ? palette.dark.shadowColor : palette.light.shadowColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 9,
        shadowRadius: 4,
        alignSelf: "stretch",
        ...(width < 400
          ? { alignSelf: "stretch", width: width - 30 }
          : { alignSelf: "center", width: 400 }),
        ...(Platform.OS === "android" && {
          borderWidth: 1,
          borderColor: palette.disabledColor,
        }),
      },
      flagImage: {
        borderRadius: 5,
        width: 40,
        height: 28,
        borderColor: isDarkMode ? palette.dark.border : palette.light.border,
        borderWidth: 1,
      },
      description: {
        flexDirection: "column",
        alignSelf: "stretch",
        justifyContent: "space-around",
        alignItems: "flex-start",
        marginVertical: 10,
        flex: 0.6,
      },
      countryName: {
        fontSize: 17,
        color: isDarkMode ? palette.dark.title : palette.light.title,
      },

      signView: {
        flexDirection: "row",

        justifyContent: "flex-end",
        alignItems: "center",
      },
      trafficIcon: {
        width: 15,
        height: 15,
        tintColor: isDarkMode ? palette.dark.title : palette.light.title,
      },
      selectIcon: {
        width: 20,
        height: 20,
        marginLeft: 10,
        tintColor: isDarkMode ? palette.dark.title : palette.light.title,
      },
    },
  });
