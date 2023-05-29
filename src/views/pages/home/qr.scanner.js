/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {StyleSheet, Alert, Text} from 'react-native';
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';

export const QrScanner = ({checkProfileLink}) => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const [barcode, setBarcode] = React.useState();

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  React.useEffect(() => {
    if (barcodes && barcodes?.length && !barcode) {
      const newBarcode = barcodes[0]?.displayValue;
      setBarcode(newBarcode);
      Alert.alert('Do you verify this link', `${newBarcode}`, [
        {
          text: 'Verify',
          onPress: () => checkProfileLink(newBarcode),
        },
        {
          text: 'No',
          onPress: () => setBarcode(),
          style: 'cancel',
        },
      ]);
    }
  }, [barcodes, barcode]);

  return device != null && hasPermission ? (
    <Camera
      style={styles.camera}
      device={device}
      isActive={true}
      frameProcessor={frameProcessor}
      frameProcessorFps={5}
      zoom={5}
    />
  ) : (
    <Text>
      you have not camera access permission. you can activate it on Setting
      under VPNGate app details.
    </Text>
  );
};

const styles = StyleSheet.create({
  camera: {
    width: 200,
    height: 200,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'red',
  },
});
