/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { StyleSheet, Alert, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export const QrScanner = ({ checkProfileLink }) => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [scanned, setScanned] = React.useState(false);

  React.useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert("Do you verify this link", `${data}`, [
      {
        text: "Verify",
        onPress: () => checkProfileLink(data),
      },
      {
        text: "No",
        onPress: () => setScanned(false),
        style: "cancel",
      },
    ]);
  };

  return hasPermission ? (
    <View style={{ width: 200, height: 200, borderRadius: 20, overflow: "hidden" }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ width: 200, height: 200, borderRadius: 20 }}
      />
    </View>
  ) : (
    <Text>
      You do not have camera access permission. You can enable it in the settings under the VPNGate
      app.
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
    borderColor: "red",
  },
});
