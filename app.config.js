import * as dotenv from "dotenv";
dotenv.config();
module.exports = {
  expo: {
    name: "VPNGATE",
    slug: "VPNGATE",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "online.vpngate.app.ios",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "8d3a6db6-2e2d-4186-a3b5-d8823a8433fb",
      },
      ENV: process.env.ENV,
      BASE_URL: process.env.BASE_URL,
      RESERVE_BASE_URL: process.env.RESERVE_BASE_URL,
      IOS_APP_VERSION: process.env.IOS_APP_VERSION,
      ANDROID_APP_VERSION: process.env.ANDROID_APP_VERSION,
      IOS_BUILD_NUMBER: process.env.BUILD_NUMBER,
      //  SENTRY_DSN: process.env.SENTRY_DSN,
      ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    },

    plugins: ["expo-localization"],
  },
};
