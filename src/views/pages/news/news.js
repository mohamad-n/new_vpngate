/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  useWindowDimensions,
  Platform,
} from 'react-native';

import {getDate} from '../../../libs/tools';
import {LoaderContext} from '../../../providers';
import {request} from '../../../service/api';
import {theme} from '../../../theme';
import {SharedHeader} from '../../shared';

export const NotificationBoard = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {width} = useWindowDimensions();
  const [messageList, setMessageList] = React.useState([]);
  const {setIsLoading} = React.useContext(LoaderContext);

  React.useEffect(() => {
    const getMessages = async () => {
      try {
        // setIsLoading('getting messages', 'descriptor');

        // await new Promise(resolve => {
        //   setTimeout(() => {
        //     resolve();
        //   }, 2000);
        // });
        // setIsLoading(
        //   'getting messages  ✅\nchecking your reachibility',
        //   'descriptor',
        // );

        // await new Promise(resolve => {
        //   setTimeout(() => {
        //     resolve();
        //   }, 2000);
        // });
        // setIsLoading(
        //   'getting messages  ✅\nchecking your reachibility ✅\nfinding best server',
        //   'descriptor',
        // );

        // await new Promise(resolve => {
        //   setTimeout(() => {
        //     resolve();
        //   }, 2000);
        // });
        setIsLoading('getting messages');

        const list = await request('GET', '/message/app', null, null, 'auth');
        setIsLoading(false);

        console.log(list);
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
  const renderItem = ({item}) => {
    return (
      <View
        // onPress={() => selectVps(item)}
        style={styles({theme, isDarkMode, width}).flatList.MainView}>
        <View style={styles({theme, isDarkMode, width}).flatList.description}>
          <Text style={styles({theme, isDarkMode, width}).flatList.title}>
            {item?.title}
          </Text>
          <Text style={styles({theme, isDarkMode, width}).flatList.message}>
            {item?.body}
          </Text>
          <Text style={styles({theme, isDarkMode, width}).flatList.date}>
            {getDate(item?.createdAt)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles({theme, isDarkMode}).mainView}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SharedHeader hasBack navigation={navigation} title="News Board" />
      <View style={styles({theme, isDarkMode}).outerView}>
        {messageList?.length ? (
          <View style={styles({theme, isDarkMode}).innerView}>
            <FlatList
              data={messageList}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              extraData={null}
            />
          </View>
        ) : (
          <View style={styles({theme, isDarkMode}).emptyView}>
            <Text style={styles({theme, isDarkMode}).emptyText}>
              No Message
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = ({theme, isDarkMode, width = null}) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
      marginTop: 0,
      backgroundColor: isDarkMode
        ? theme.dark.mainBackground
        : theme.light.mainBackground,
    },
    outerView: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: isDarkMode
        ? theme.dark.mainBackground
        : theme.light.mainBackground,
      flexDirection: 'column',
    },
    innerView: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      // marginHorizontal: 20,
      marginTop: 10,
      paddingTop: 10,
      // backgroundColor: 'blue',
    },
    emptyView: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 18,
      fontWeight: '600',
      color: isDarkMode ? theme.dark.title : theme.light.title,
    },
    flatList: {
      MainView: {
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 15,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: isDarkMode
          ? theme.dark.mainBackground
          : theme.light.mainBackground,
        shadowColor: isDarkMode
          ? theme.dark.shadowColor
          : theme.light.shadowColor,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 9,
        shadowRadius: 4,
        alignSelf: 'stretch',
        width: width - 30,
        ...(Platform.OS === 'android' && {
          borderWidth: 1,
          borderColor: theme.disabledColor,
        }),
      },

      description: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        // marginVertical: 10,
        flex: 1,
      },
      title: {
        fontSize: 18,
        fontWeight: '600',
        color: isDarkMode ? theme.dark.title : theme.light.title,
        marginBottom: 10,
      },
      message: {
        fontSize: 16,
        color: isDarkMode ? theme.dark.message : theme.light.message,
      },
      date: {
        fontSize: 12,
        color: isDarkMode ? theme.dark.subTitle : theme.light.subTitle,
        marginTop: 15,
        alignSelf: 'flex-end',
      },
    },
  });
