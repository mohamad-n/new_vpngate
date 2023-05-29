/* eslint-disable react-native/no-inline-styles */
import * as React from "react";
import { NavigationRef } from "./navigation.ref";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text, Linking, useColorScheme } from "react-native";
// import {Home, Tos, Privacy, Location} from './pages';
import { Home, Location } from "./pages";

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
// import { theme } from "../theme";
// import { Setting } from "./pages/setting";
// import { NotificationBoard } from "./pages/news";
import { SignUp } from "./pages/credential";

const HomeMainStackInternalNavigation = createStackNavigator();

function HomeInternalStackScreen() {
  return (
    <HomeMainStackInternalNavigation.Navigator>
      <HomeMainStackInternalNavigation.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={SignUp}
      />
      <HomeMainStackInternalNavigation.Screen
        options={{ headerShown: false }}
        name="Location"
        component={Location}
      />
    </HomeMainStackInternalNavigation.Navigator>
  );
}

// const SettingStackNavigation = createStackNavigator();

// function SettingStackScreen() {
//   return (
//     <SettingStackNavigation.Navigator>
//       <SettingStackNavigation.Group>
//         <SettingStackNavigation.Screen
//           options={{ headerShown: false }}
//           name="SettingPage"
//           component={Setting}
//         />
//         <SettingStackNavigation.Screen
//           options={{ headerShown: false }}
//           name="NotificationBoard"
//           component={NotificationBoard}
//         />
//       </SettingStackNavigation.Group>
//       <SettingStackNavigation.Group screenOptions={{ presentation: "modal" }}>
//         <SettingStackNavigation.Screen
//           options={{ headerShown: false }}
//           name="SignIn"
//           component={SignIn}
//         />
//         <SettingStackNavigation.Screen
//           options={{ headerShown: false }}
//           name="SignUp"
//           component={SignUp}
//         />
//       </SettingStackNavigation.Group>
//     </SettingStackNavigation.Navigator>
//   );
// }
const HomeMainStack = createDrawerNavigator();

function HomeStackScreen() {
  return (
    <HomeMainStack.Navigator
      initialRouteName="Main"
      screenOptions={{
        drawerType: "front",
        drawerPosition: "right",
        swipeEnabled: true,

        drawerStyle: {
          width: 240,
        },
      }}
      // drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <HomeMainStack.Screen
        options={{ headerShown: false }}
        name="Main"
        component={HomeInternalStackScreen}
      />
      {/* <HomeMainStack.Screen name="PP" component={Privacy} options={{ headerShown: false }} />
      <HomeMainStack.Screen name="TOS" component={Tos} options={{ headerShown: false }} />
      <HomeMainStack.Screen
        name="Setting"
        component={SettingStackScreen}
        options={{ headerShown: false }}
      /> */}
    </HomeMainStack.Navigator>
  );
}

// function CustomDrawerContent(props) {
//   const isDarkMode = useColorScheme() === "dark";

//   const isCurrentRoute = (name) => {
//     return NavigationRef?.current?.getCurrentRoute()?.name === name;
//   };
//   return (
//     <DrawerContentScrollView
//       {...props}
//       style={{
//         backgroundColor: isDarkMode ? theme.dark.mainBackground : theme.light.mainBackground,
//         padding: 0,
//       }}
//     >
//       <View style={{ flex: 1, backgroundColor: "transparent" }}>
//         <Text
//           style={{
//             fontSize: 30,
//             textAlign: "center",

//             fontWeight: "600",
//             marginBottom: 20,
//             color: isDarkMode ? theme.dark.title : theme.light.title,
//           }}
//         >
//           Menu
//         </Text>
//       </View>

//       <DrawerItem
//         label="Home"
//         onPress={() => props.navigation.navigate("Main")}
//         labelStyle={{
//           fontWeight: "800",
//           fontSize: 18,
//           color: isDarkMode ? theme.dark.title : theme.light.title,
//         }}
//         style={{
//           backgroundColor: isCurrentRoute("Home")
//             ? isDarkMode
//               ? theme.dark.alphaBackground
//               : theme.light.alphaBackground
//             : "transparent",
//         }}
//       />
//       <DrawerItem
//         label="Privacy Policy"
//         onPress={() => props.navigation.navigate("PP")}
//         labelStyle={{
//           fontWeight: "800",
//           fontSize: 18,
//           color: isDarkMode ? theme.dark.title : theme.light.title,
//         }}
//         style={{
//           backgroundColor: isCurrentRoute("PP")
//             ? isDarkMode
//               ? theme.dark.alphaBackground
//               : theme.light.alphaBackground
//             : "transparent",
//         }}
//       />
//       <DrawerItem
//         label="Terms Of Services"
//         onPress={() => props.navigation.navigate("TOS")}
//         labelStyle={{
//           fontWeight: "800",
//           fontSize: 18,
//           color: isDarkMode ? theme.dark.title : theme.light.title,
//         }}
//         style={{
//           backgroundColor: isCurrentRoute("TOS")
//             ? isDarkMode
//               ? theme.dark.alphaBackground
//               : theme.light.alphaBackground
//             : "transparent",
//         }}
//       />
//       <DrawerItem
//         label="Setting"
//         onPress={() => props.navigation.navigate("Setting")}
//         labelStyle={{
//           fontWeight: "800",
//           fontSize: 18,
//           color: isDarkMode ? theme.dark.title : theme.light.title,
//         }}
//         style={{
//           backgroundColor: isCurrentRoute("SettingPage")
//             ? isDarkMode
//               ? theme.dark.alphaBackground
//               : theme.light.alphaBackground
//             : "transparent",
//         }}
//       />
//       <DrawerItem
//         label="Website"
//         onPress={() =>
//           Linking.canOpenURL("https://vpngate.online").then((supported) => {
//             if (supported) {
//               Linking.openURL("https://vpngate.online");
//             }
//           })
//         }
//         labelStyle={{
//           fontWeight: "800",
//           fontSize: 18,
//           color: isDarkMode ? theme.dark.title : theme.light.title,
//         }}
//         style={{
//           backgroundColor: "transparent",
//         }}
//       />
//     </DrawerContentScrollView>
//   );
// }

export const NavigationStack = () => {
  // const [initialState, setInitialState] = React.useState({});
  return (
    <NavigationContainer
      // linking={linking}
      // fallback={<Text>Loading...</Text>}
      ref={NavigationRef}
    >
      <HomeStackScreen />
    </NavigationContainer>
  );
};
