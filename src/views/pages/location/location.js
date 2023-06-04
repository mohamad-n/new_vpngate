import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  SafeAreaView,
  useColorScheme,
  useWindowDimensions,
  SectionList,
} from "react-native";
import Toast from "react-native-toast-message";

import {
  flagPlaceHolder,
  notSelectedMarkerIcon,
  selectedMarkerIcon,
  trafficIcon,
} from "../../../asset/img/icon";
import { delay, getImage } from "../../../libs/tools";
import { ConnectContext, LoaderContext, SubscriptionContext, VpsContext } from "../../../providers";
import { palette, theme } from "../../../theme";
import { SharedHeader } from "../../shared";
import { publicService } from "../../../service";

const tabTitles = ["All", "By Country", "Last Locations"];
export const Location = ({ navigation }) => {
  const { hasSubscription, getConnectionProfile } = React.useContext(SubscriptionContext);
  const { connect, disconnect, connectStatus, changeStatus } = React.useContext(ConnectContext);

  const { setIsLoading } = React.useContext(LoaderContext);
  const { vpsList, getDefaultVps, changeDefaultVps, selectedVps, groupedVps, lastLocations } =
    React.useContext(VpsContext);
  const [currentTab, setCurrentTab] = React.useState(0);

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
    changeDefaultVps(vps);
    try {
      if (hasSubscription) {
        // const profile = await getConnectionProfile(selectedVps);

        return;
      }

      changeStatus("CONNECTING");
      const profile = await getConnectionProfile(vps);
      // console.log(">>>>>>>>>>>", profile);

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

  React.useEffect(() => {
    getVpsList();
    return () => {};
  }, []);

  const getVpsList = async () => {
    try {
      setIsLoading("getting server list");
      const list = await publicService.sendRequest({ method: "GET", url: "/vps/public/list" });
      if (!list?.length) {
        setIsLoading(false);
        throw new Error("can not fetch server list");
      }
      // console.log(">>>>>>>>>>>", list);
      await getDefaultVps(list.map((_) => ({ ..._, type: "public" })));

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
        <Image
          style={styles({ theme, isDarkMode, width }).flatList.flagImage}
          source={item?.flagImage ? { uri: getImage(item?.flagImage) } : flagPlaceHolder}
        />
        <View style={styles({ theme, isDarkMode, width }).flatList.description}>
          <Text style={styles({ theme, isDarkMode, width }).flatList.countryName}>
            {item?.countryName}
          </Text>
          <Text style={styles({ theme, isDarkMode, width }).flatList.ip}> {item?.ip}</Text>
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

  const changeTab = (index) => {
    setCurrentTab(index);
  };
  return (
    <SafeAreaView style={styles({ theme, isDarkMode }).mainView}>
      <SharedHeader hasBack navigation={navigation} title=" Select Location" />
      <View style={styles({ theme, isDarkMode }).outerView}>
        <View style={styles({ isDarkMode, width }).tabs.buttonsContainer}>
          {tabTitles?.map((title, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => changeTab(index)}
              style={[
                styles({ isDarkMode, width }).tabs.button,
                currentTab === index
                  ? {
                      backgroundColor: palette.commonButtonBackground,
                      borderWidth: 0,
                    }
                  : {
                      backgroundColor: "transparent",
                      borderColor: palette.commonButtonBackground,
                      borderWidth: 1,
                      borderEndWidth: 0,
                      borderStartWidth: index == 0 ? 0 : 1,
                    },
              ]}
            >
              <Text
                style={[
                  styles({ isDarkMode, width }).tabs.buttonText,
                  currentTab === index
                    ? { color: "white" }
                    : {
                        color: isDarkMode ? palette.dark.title : palette.commonButtonBackground,
                      },
                ]}
              >
                {title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles({ theme, isDarkMode }).innerView}>
          {currentTab === 0 && (
            <FlatList
              data={vpsList}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={null}
            />
          )}
          {currentTab === 1 && groupedVps && (
            <SectionList
              sections={groupedVps}
              keyExtractor={(item, index) => item + index}
              renderItem={renderItem}
              renderSectionHeader={({ section: { title } }) => (
                <View
                  style={{
                    backgroundColor: isDarkMode
                      ? palette.dark.mainBackground
                      : palette.light.mainBackground,
                    padding: 20,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: isDarkMode ? palette.dark.title : palette.light.title,
                      fontSize: 20,
                    }}
                  >
                    {title}
                  </Text>
                </View>
              )}
            />
          )}

          {currentTab === 2 && lastLocations && (
            <FlatList
              data={lastLocations}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={null}
            />
          )}
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
      ip: {
        fontSize: 12,
        color: isDarkMode ? palette.dark.subTitle : palette.light.subTitle,
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
    tabs: {
      buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start",
        paddingTop: 10,
      },
      button: {
        width: "33%",
        height: 40,
        borderRadius: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isDarkMode
          ? palette.dark.buttonBackground
          : palette.light.buttonBackground,
      },
      buttonText: {},
    },
  });
