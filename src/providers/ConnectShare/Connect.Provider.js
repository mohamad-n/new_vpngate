/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {NativeEventEmitter, AppState, Platform} from 'react-native';
import RNEventEmitter from './EventEmitter';

import ConnectShare from './ConnectShare';
import {decode} from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConnectContext = React.createContext();
var connectionStateEventName = 'onChange';

const ConnectProvider = ({children}) => {
  const [connectStatus, setConnectStatus] = React.useState('DISCONNECTED');
  const ModuleWithEmitter = new NativeEventEmitter(RNEventEmitter);

  React.useEffect(() => {
    const subscription = ModuleWithEmitter.addListener(
      connectionStateEventName,
      newState => {
        // console.log(newState);

        if (newState.toUpperCase() === 'CONNECTED') {
          setConnectedOnce();
        }
        setConnectStatus(newState.toUpperCase());
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const setConnectedOnce = async () => {
    if ((await AsyncStorage.getItem('@isConnectedOnce')) === 'YES') {
      return;
    }
    await AsyncStorage.setItem('@isConnectedOnce', 'YES');
  };

  React.useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = async nextAppState => {
    if (
      nextAppState === 'background' &&
      (await AsyncStorage.getItem('@isConnectedOnce')) === 'YES'
    ) {
      ConnectShare.disable();
    }

    if (nextAppState === 'active') {
      ConnectShare?.getCurrentState();
    }

    // console.log('nextAppState : ', nextAppState);
  };

  const contextValue = {
    connectStatus,
    connect: profile =>
      ConnectShare.connect({
        message: profile ? decode(profile) : 'not available',
      }),
    stablishConnection: profile =>
      ConnectShare.stablishConnection({message: profile}),
    disconnect: () => ConnectShare.disconnect(),
  };

  return (
    <ConnectContext.Provider value={contextValue}>
      {children}
    </ConnectContext.Provider>
  );
};

export {ConnectContext, ConnectProvider};
