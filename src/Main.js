import * as React from "react";
import {
  ServiceProvider,
  LoaderProvider,
  VpsProvider,
  SubscriptionProvider,
  DeepLinkProvider,
} from "./providers";
import Toast from "react-native-toast-message";

//------ ios ------
//  import {ConnectProvider} from './providers/ConnectShare';

//------android -----
// import {ConnectProvider} from './providers/ConnectShareAndroid';
import { NavigationStack } from "./views/navigator";
import { toastConfig } from "./config/toast.config";

export const Main = () => {
  return (
    // <AppStateProvider>
    //   <LoaderProvider>
    //      <ConnectProvider>
    //     <ServiceProvider>

    <LoaderProvider>
      <VpsProvider>
        <SubscriptionProvider>
          <NavigationStack />
          <Toast
            position="top"
            config={toastConfig}
            // bottomOffset={20}
          />
        </SubscriptionProvider>
      </VpsProvider>
    </LoaderProvider>

    //       </ServiceProvider>
    //       </ConnectProvider>
    //    </LoaderProvider>
    // </AppStateProvider>
  );
};
