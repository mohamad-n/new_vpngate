/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  useColorScheme,
  useWindowDimensions,
  Platform,
} from "react-native";

import { getDate } from "../../../libs/tools";
import { LoaderContext } from "../../../providers";
import { palette } from "../../../theme";
import { SharedHeader } from "../../shared";
import { publicService } from "../../../service";

export const NotificationBoard = ({ route, navigation }) => {
  const isDarkMode = useColorScheme() === "dark";
  const { width } = useWindowDimensions();
  const [messageList, setMessageList] = React.useState([]);
  const { setIsLoading } = React.useContext(LoaderContext);

  React.useEffect(() => {
    const getMessages = async () => {
      try {
        setIsLoading("getting messages");

        const list = await publicService.sendRequest({
          method: "GET",
          url: "/message/list",
          hasAuth: true,
        });
        setIsLoading(false);

        setMessageList(list);
      } catch (error) {
        // log;
        console.log(error);
        setIsLoading(false);

        // console.log('error ====> ', error);
      }
    };
    getMessages();
    return () => {};
  }, []);
  const renderItem = ({ item }) => {
    return (
      <View
        // onPress={() => selectVps(item)}
        style={styles({ isDarkMode, width }).flatList.MainView}
      >
        <View style={styles({ isDarkMode, width }).flatList.description}>
          {/* <Text style={styles({ isDarkMode, width }).flatList.title}>{item?.description}</Text> */}
          <Text style={styles({ isDarkMode, width }).flatList.message}>{item?.description}</Text>
          <Text style={styles({ isDarkMode, width }).flatList.date}>
            {getDate(item?.createdAt)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles({ isDarkMode }).mainView}>
      <SharedHeader hasBack navigation={navigation} title="News Board" />
      <View style={styles({ isDarkMode }).outerView}>
        {messageList?.length ? (
          <View style={styles({ isDarkMode }).innerView}>
            <FlatList
              data={messageList}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={null}
            />
          </View>
        ) : (
          <View style={styles({ isDarkMode }).emptyView}>
            <Text style={styles({ isDarkMode }).emptyText}>No Message</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = ({ isDarkMode, width = null }) =>
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
    emptyView: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    emptyText: {
      fontSize: 18,
      fontWeight: "600",
      color: isDarkMode ? palette.dark.title : palette.light.title,
    },
    flatList: {
      MainView: {
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 15,
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
        width: width - 30,
        ...(Platform.OS === "android" && {
          borderWidth: 1,
          borderColor: palette.disabledColor,
        }),
      },

      description: {
        flexDirection: "column",
        alignSelf: "stretch",
        justifyContent: "space-around",
        alignItems: "flex-start",
        // marginVertical: 10,
        flex: 1,
      },
      title: {
        fontSize: 18,
        fontWeight: "600",
        color: isDarkMode ? palette.dark.title : palette.light.title,
        marginBottom: 10,
      },
      message: {
        fontSize: 16,
        color: isDarkMode ? palette.dark.message : palette.light.message,
      },
      date: {
        fontSize: 12,
        color: isDarkMode ? palette.dark.subTitle : palette.light.subTitle,
        marginTop: 15,
        alignSelf: "flex-end",
      },
    },
  });
