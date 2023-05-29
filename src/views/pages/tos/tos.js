/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  Alert,
  Linking,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {SharedHeader} from '../../shared';
import {WebView} from 'react-native-webview';
import {tosContent} from './tos.content';
import {theme} from '../../../theme';

export const Tos = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: 0,
        backgroundColor: isDarkMode
          ? theme.dark.mainBackground
          : theme.light.mainBackground,
      }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          backgroundColor: isDarkMode
            ? theme.dark.mainBackground
            : theme.light.mainBackground,
          flexDirection: 'column',
        }}>
        <SharedHeader navigation={navigation} title="Terms Of Services" />
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: isDarkMode
              ? theme.dark.mainBackground
              : theme.light.mainBackground,
            // marginHorizontal: 20,
            // marginTop: 10,
            // paddingTop: 30,
          }}>
          {/* <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            Terms Of Service
          </Text> */}
          <WebView
            style={{
              backgroundColor: isDarkMode
                ? theme.dark.mainBackground
                : theme.light.mainBackground,
            }}
            originWhitelist={['*']}
            //   source={{html: '<h1>Hello world</h1>'}}
            source={{baseUrl: '', html: tosContent(isDarkMode)}}
          />
        </View>
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#F3F9FF',
  },
});
