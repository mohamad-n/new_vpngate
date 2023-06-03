import * as React from "react";
import { LoaderProvider, VpsProvider, SubscriptionProvider, ConnectProvider } from "./providers";
import Toast from "react-native-toast-message";
import { NavigationStack } from "./views/navigator";
import { toastConfig } from "./config/toast.config";

export const Main = () => {
  return (
    <ConnectProvider>
      <LoaderProvider>
        <VpsProvider>
          <SubscriptionProvider>
            <NavigationStack />
            <Toast position="top" config={toastConfig} />
          </SubscriptionProvider>
        </VpsProvider>
      </LoaderProvider>
    </ConnectProvider>
  );
};
