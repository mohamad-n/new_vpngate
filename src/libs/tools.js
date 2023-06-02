import Constants from "expo-constants";
import moment from "moment";
const { BASE_URL } = Constants.expoConfig.extra;
export const getImage = (imageUrl) => {
  if (!imageUrl) {
    return null;
  }

  return BASE_URL.slice(0, -6) + imageUrl;
};

export function getDateString(date) {
  if (!date) {
    return;
  }

  return moment(date).format("YYYY/MM/DD");
}
export function getDateAndTime(date) {
  if (!date) {
    return;
  }

  return moment().diff(moment(date), "days") > 10
    ? moment(date).format("YYYY/MM/DD - HH:mm:ss")
    : moment(date).fromNow();
}

export function getDate(date) {
  if (!date) {
    return;
  }
  return moment().diff(moment(date), "days") > 10
    ? moment(date).format("YYYY/MM/DD")
    : moment(date).fromNow();
}

export function getDurationFromExpire(expireDate) {
  if (!expireDate) {
    return null;
  }
  return moment(expireDate).diff(moment(), "days");
}

export function isExpired(expireDate) {
  if (!expireDate) {
    return null;
  }
  return moment(expireDate).isBefore(moment());
}

export function validateCodeFormat(code) {
  try {
    if (!code || code?.length !== 20) {
      return false;
    }

    const firstPart = code?.split("")?.slice(0, 6)?.join("");
    const firstDash = code?.split("")?.slice(6, 7)?.join("");
    const secondPart = code?.split("")?.slice(7, 13)?.join("");
    const secondDash = code?.split("")?.slice(13, 14)?.join("");
    const thirdPart = code?.split("")?.slice(14, 20)?.join("");

    if (!firstPart || !firstDash || !secondPart || !secondDash || !thirdPart) {
      return false;
    }

    if (firstDash !== "-" || secondDash !== "-") {
      return false;
    }

    for (const c of firstPart) {
      if (isNaN(Number(c))) {
        return false;
      }
    }
    for (const c of secondPart) {
      if (isNaN(Number(c))) {
        return false;
      }
    }
    for (const c of thirdPart) {
      if (isNaN(Number(c))) {
        return false;
      }
    }

    return true;
  } catch (error) {
    return false;
  }
}

export function validateLinkFormat(code) {
  try {
    if (!code) {
      return false;
    }
    // console.log('is valid : ', validateUrl(code));
    return validateUrl(code);
  } catch (error) {
    console.log(error);
    return false;
  }
}

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
}

export function validateIncomingProfile(cert) {
  try {
    if (!cert) {
      return false;
    }

    // console.log(cert);
    // console.log(cert.includes('remote'));
    if (!cert.includes("remote")) {
      return false;
    }

    if (!cert.includes("-----BEGIN CERTIFICATE-----")) {
      return false;
    }
    if (!cert.includes("<cert>")) {
      return false;
    }
    // console.log('is valid : ', validateUrl(code));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const runInSequense = async (array, fn) => {
  const arr = [];

  await array.reduce(async (previousValue, currentValue, currentIndex) => {
    arr.push(await previousValue);
    //   console.log(currentValue);

    if (currentIndex + 1 === array?.length) {
      return;
    }
    return fn(array[currentIndex + 1]);
  }, Promise.resolve(await fn(array[0])));

  return arr;
};

export const delay = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve();
    }, time);
  });
};
