/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {Linking} from 'react-native';
import {ServiceContext} from './Service.Provider';
import {validateCodeFormat} from '../libs/tools';

const LinkContext = React.createContext();

const LinkProvider = ({children}) => {
  const {prepareTocheckActivationCode} = React.useContext(ServiceContext);

  React.useEffect(() => {
    Linking.addEventListener('url', checkUrl);
    return () => {
      Linking.removeEventListener('change', checkUrl);
    };
  }, []);

  const checkUrl = url => {
    const code = url?.url?.split('/')?.pop();
    if (validateCodeFormat(code)) {
      prepareTocheckActivationCode(code);
    }
  };

  const contextValue = {};
  return (
    <LinkContext.Provider value={contextValue}>{children}</LinkContext.Provider>
  );
};

export {LinkContext, LinkProvider};
