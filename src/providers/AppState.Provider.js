import * as React from 'react';
import {AppState} from 'react-native';

const AppStateContext = React.createContext();

const AppStateProvider = ({children}) => {
  //   const [isLoading, setIsLoading] = React.useState(false);

  const [appState, setAppState] = React.useState();

  React.useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = nextAppState => {
    // if (
    //   appState.current.match(/inactive|background/) &&
    //   nextAppState === 'active'
    // ) {
    //   //   console.log('App has come to the foreground!');
    // }

    // console.log(nextAppState);
    // appState.current = nextAppState;
    setAppState(nextAppState);
    // console.log('AppState', appState.current);
  };
  const contextValue = {
    appState: appState,
    // setIsLoading: setIsLoading,
  };
  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};

export {AppStateContext, AppStateProvider};
