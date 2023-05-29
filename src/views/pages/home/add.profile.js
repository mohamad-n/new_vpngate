/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  ImageBackground,
  useWindowDimensions,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {QrScanner} from './qr.scanner';
import {theme} from '../../../theme';
import {DismissKeyboard} from '../../../providers';

export const AddProfile = ({close, checkProfileLink}) => {
  const [currentTab, setCurrentTab] = useState(0);
  const isDarkMode = useColorScheme() === 'dark';
  const {width} = useWindowDimensions();
  const [link, setLink] = React.useState();

  return (
    <DismissKeyboard>
      <View style={styles({isDarkMode, width}).container}>
        <View style={styles({isDarkMode, width}).header.container}>
          <TouchableOpacity
            onPress={() => setCurrentTab(0)}
            style={[
              styles({isDarkMode, width}).header.button,
              currentTab === 0
                ? {
                    backgroundColor: theme.commonButtonBackground,
                    borderWidth: 0,
                  }
                : {
                    backgroundColor: 'transparent',
                    borderColor: theme.commonButtonBackground,
                    borderWidth: 1,
                  },
            ]}>
            <Text
              style={[
                styles({isDarkMode, width}).header.buttonText,
                currentTab === 0
                  ? {color: 'white'}
                  : {
                      color: isDarkMode
                        ? theme.dark.title
                        : theme.commonButtonBackground,
                    },
              ]}>
              Link
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCurrentTab(1)}
            style={[
              styles({isDarkMode, width}).header.button,
              currentTab === 1
                ? {
                    backgroundColor: theme.commonButtonBackground,
                    borderWidth: 0,
                  }
                : {
                    backgroundColor: 'transparent',
                    borderColor: theme.commonButtonBackground,
                    borderWidth: 1,
                  },
            ]}>
            <Text
              style={[
                styles({isDarkMode, width}).header.buttonText,
                currentTab === 1
                  ? {color: 'white'}
                  : {
                      color: isDarkMode
                        ? theme.dark.title
                        : theme.commonButtonBackground,
                    },
              ]}>
              QrCode
            </Text>
          </TouchableOpacity>
        </View>

        {currentTab === 0 ? (
          <View style={styles({isDarkMode, width}).link.container}>
            <Text style={styles({isDarkMode, width}).link.hint}>
              hint : you can add your own vpn profile ovnp file from here
            </Text>
            <Text style={styles({isDarkMode, width}).link.label}>
              input url of your custom profile
            </Text>
            <TextInput
              style={styles({isDarkMode, width}).link.input}
              placeholder="profile link"
              value={link}
              onChangeText={v => setLink(v)}
            />
            <TouchableOpacity
              disabled={!link?.length}
              onPress={() => checkProfileLink(link)}
              style={[
                styles({isDarkMode, width}).link.button,
                {...(!link?.length && {backgroundColor: theme.disabledColor})},
              ]}>
              <Text style={[styles({isDarkMode, width}).link.buttonText]}>
                import
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles({isDarkMode, width}).qr.container}>
            <QrScanner checkProfileLink={checkProfileLink} />
            <Text style={styles({isDarkMode, width}).qr.label}>
              scan QR Code of profile link
            </Text>
          </View>
        )}
        {/* </View> */}
      </View>
    </DismissKeyboard>
  );
};

const styles = ({isDarkMode, width}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      //   height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      //   backgroundColor: 'red',
    },
    header: {
      container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingTop: 10,
      },

      button: {
        width: '50%',
        height: 40,
        borderRadius: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDarkMode
          ? theme.dark.buttonBackground
          : theme.light.buttonBackground,
      },
      buttonText: {},
    },

    main: {},

    link: {
      container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20,
      },
      label: {
        fontSize: 18,
        fontWeight: '400',
        color: isDarkMode ? theme.dark.title : theme.light.title,

        marginBottom: 30,
      },
      hint: {
        marginTop: 30,
        fontSize: 14,
        color: isDarkMode ? theme.dark.subTitle : theme.light.subTitle,
        marginBottom: 30,
      },
      input: {
        height: 40,
        fontSize: 18,
        paddingHorizontal: 10,
        color: isDarkMode ? theme.dark.title : theme.light.title,
        borderColor: isDarkMode ? theme.dark.border : theme.light.border,
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 30,
        ...(width > 400 ? {width: 400} : {width: 300}),
      },
      button: {
        width: 200,
        height: 40,
        borderRadius: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDarkMode
          ? theme.dark.buttonBackground
          : theme.light.buttonBackground,
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 7,
        textAlighn: 'center',
      },
    },
    qr: {
      container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 20,
      },
      label: {
        fontSize: 18,
        fontWeight: '400',
        color: isDarkMode ? theme.dark.title : theme.light.title,
      },
    },
  });
