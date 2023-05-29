/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {AppState} from 'react-native';
import RNSimpleOpenvpn, {
  addVpnStateListener,
  removeVpnStateListener,
} from 'react-native-simple-openvpn';

import {decode} from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {tempProfile} from '../../asset/img/profiles/template';

const ConnectContext = React.createContext();

const ConnectProvider = ({children}) => {
  const [connectStatus, setConnectStatus] = React.useState('DISCONNECTED');

  React.useEffect(() => {
    async function observeVpn() {
      addVpnStateListener(e => {
        // ...
        // console.log(e);

        if (e) {
          const newState = e;
          if (newState?.state === 1) {
            if (connectStatus !== 'CONNECTING') {
              setConnectStatus('CONNECTING');
            }
            if (
              e?.level === 'LEVEL_CONNECTING_NO_SERVER_REPLY_YET' &&
              e?.message === 'CONNECTRETRY'
            ) {
              stopOvpn();
            }
          }
          if (newState?.state === 2 && connectStatus !== 'CONNECTED') {
            setConnectStatus('CONNECTED');
          }
          if (newState?.state === 0 && connectStatus !== 'DISCONNECTED') {
            setConnectStatus('DISCONNECTED');
          }
          // if (
          //   newState?.state === 1 &&
          //   connectStatus !== 'VPN_GENERATE_CONFIG'
          // ) {
          //   setConnectStatus('WAITING');
          // }
        }
      });
    }

    observeVpn();

    return async () => {
      removeVpnStateListener();
    };
  });

  React.useEffect(() => {
    const getCurrenctState = async () => {
      const state = await RNSimpleOpenvpn.getCurrentState();
      setConnectStatus(state ? 'CONNECTED' : 'DISCONNECTED');
      // console.log('state : ', state);
    };

    getCurrenctState();
    // console.log(JSON.stringify(RNSimpleOpenvpn.VpnState, undefined, 2));
    return () => {};
  }, []);

  //   React.useEffect(() => {
  //     const subscription = ModuleWithEmitter.addListener(
  //       connectionStateEventName,
  //       newState => {
  //         // console.log(newState);

  //         if (newState.toUpperCase() === 'CONNECTED') {
  //           setConnectedOnce();
  //         }
  //         setConnectStatus(newState.toUpperCase());
  //       },
  //     );

  //     return () => {
  //       subscription.remove();
  //     };
  //   }, []);

  //   const setConnectedOnce = async () => {
  //     if ((await AsyncStorage.getItem('@isConnectedOnce')) === 'YES') {
  //       return;
  //     }
  //     await AsyncStorage.setItem('@isConnectedOnce', 'YES');
  //   };

  const startOvpn = async profile => {
    try {
      if (!profile) {
        throw new Error('invalid profile');
      }
      await RNSimpleOpenvpn.connect({
        ovpnString: decode(profile),
        compatMode: RNSimpleOpenvpn.CompatMode.OVPN_TWO_FOUR_PEER,
      });
    } catch (error) {
      console.log(error);
      // ...
    }
  };

  const stopOvpn = async () => {
    try {
      await RNSimpleOpenvpn.disconnect();
    } catch (error) {
      // ...
    }
  };

  const disable = async () => {
    try {
      // console.log(sem);
      await RNSimpleOpenvpn.disable({ovpnString: ''});
    } catch (error) {
      // ...
    }
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
      disable();
    }

    // if (nextAppState === 'active') {
    //   ConnectShare?.getCurrentState();
    // }

    // console.log('nextAppState : ', nextAppState);
  };

  const contextValue = {
    connectStatus,
    connect: profile => startOvpn(profile),
    disconnect: () => stopOvpn(),
    disable: () => disable(),
  };

  return (
    <ConnectContext.Provider value={contextValue}>
      {children}
    </ConnectContext.Provider>
  );
};

function printVpnState() {
  console.log(JSON.stringify(RNSimpleOpenvpn.VpnState, undefined, 2));
}
export {ConnectProvider, ConnectContext};
