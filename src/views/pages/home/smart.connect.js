/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Text, TouchableOpacity, useColorScheme, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import {request} from '../../../service/api';
import {theme} from '../../../theme';
import {decrypt} from '../../../libs';

import {LoaderContext} from '../../../providers/Loader.Provider';
import {runInSequense} from '../../../libs/tools';
//----------android---------
import {ConnectContext} from '../../../providers/ConnectShareAndroid';
//----------ios---------
// import {ConnectContext} from '../../../providers/ConnectShare';

export const SmartConnect = () => {
  //

  const {setIsLoading} = React.useContext(LoaderContext);

  const {connect, connectStatus} = React.useContext(ConnectContext);
  const [isSearching, setIsSearching] = React.useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const ref = React.useRef();

  React.useEffect(() => {
    ref.current = connectStatus;
    return () => {};
  }, [connectStatus]);

  const checkCertsForConnect = vps => {
    return new Promise(async (resolve, reject) => {
      const decodedCert = await decrypt(vps?.profile);
      connect(decodedCert);
      const timer = setInterval(() => {
        if (ref.current === 'DISCONNECTED') {
          clearInterval(timer);
          return resolve();
        }
        if (ref.current === 'CONNECTED') {
          clearInterval(timer);
          return reject({id: vps.id, cert: decodedCert});
        }
      }, 300);
    });
  };

  const triggerSmartConnectionAssurance = async () => {
    try {
      if (connectStatus !== 'DISCONNECTED') {
        return;
      }
      const {isConnected} = await NetInfo.fetch();
      if (!isConnected) {
        throw new Error('no network');
      }

      setIsLoading('searching for best connection');

      const certs = await getSmartConnectionAssurance();
      //   console.log(certs.reverse().map(_ => _.id));

      try {
        setIsSearching(true);
        await runInSequense(certs, checkCertsForConnect);
      } catch (error) {
        // console.log('errorrrrr', error);
        const {cert, id} = error;
        await AsyncStorage.setItem('@profileCert', cert);
        await updateUserVps(id);

        setIsLoading(false);
        setIsSearching(false);

        return;
      }
      throw new Error(
        'sorry. none of servers is not compatible with your network',
      );
    } catch (error) {
      setIsLoading(false);
      setIsSearching(false);

      //   console.log('error : ', error);
      Alert.alert('Smart Connect Failed', error?.message || error, [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Retry',
          onPress: async () => triggerSmartConnectionAssurance(),
        },
      ]);
    }
  };

  const getSmartConnectionAssurance = () => {
    // console.log(download);
    return new Promise(async (resolve, reject) => {
      try {
        const idToken = await AsyncStorage.getItem('@idToken');
        const result = await request(
          'POST',
          '/user/smart/assurance',
          null,
          {token: idToken},
          'auth',
        );
        return resolve(result);
      } catch (error) {
        // console.log('error : ', error);
        return reject(error);
      }
    });
  };

  const updateUserVps = id => {
    // console.log(download);
    return new Promise(async (resolve, reject) => {
      try {
        const result = await request(
          'POST',
          '/user/vps/update',
          null,
          {newVpsId: id},
          'auth',
          3000,
        );
        return resolve(result);
      } catch (error) {
        console.log('update error : ', error);
        return resolve();
      }
    });
  };
  return (
    <TouchableOpacity
      onPress={() => triggerSmartConnectionAssurance()}
      disabled={isSearching || ref.current === 'CONNECTED'}
      style={{
        marginHorizontal: 20,
        height: 70,
        borderRadius: 20,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        backgroundColor:
          isSearching || ref.current === 'CONNECTED'
            ? theme.disabledColor
            : theme.agreeColor,
        shadowColor: isDarkMode
          ? theme.dark.shadowColor
          : theme.light.shadowColor,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 9,
        shadowRadius: 4,
      }}>
      <Text
        style={{
          color: theme.dark.title,
          fontSize: 20,
        }}>
        Start Smart Connect
      </Text>
    </TouchableOpacity>
  );
};
