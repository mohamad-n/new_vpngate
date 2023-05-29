import CryptoJS from "react-native-crypto-js";
import Constants from "expo-constants";
const { ENCRYPTION_KEY } = Constants.expoConfig.extra;
export const encrypt = (object) => {
  return new Promise((resolve, reject) => {
    try {
      return resolve(CryptoJS.AES.encrypt(JSON.stringify(object), ENCRYPTION_KEY).toString());
    } catch (error) {
      return reject(error);
    }
  });
};

export const decrypt = (text) => {
  return new Promise((resolve, reject) => {
    try {
      var bytes = CryptoJS.AES.decrypt(text, ENCRYPTION_KEY);
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      return resolve(decryptedData);
    } catch (error) {
      return reject(error);
    }
  });
};
