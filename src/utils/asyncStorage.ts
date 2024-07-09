import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (itemName: any, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(itemName, jsonValue);
  } catch (e) {
    // console.log(e);
  }
};

export const getData = async (itemName: any) => {
  try {
    const jsonValue = await AsyncStorage.getItem(itemName);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    // console.log(e);
  }
};

export const removeData = async (itemName: any) => {
  try {
    await AsyncStorage.removeItem(itemName);
  } catch (e) {
    // error reading value
    // console.log(e);
  }
};

// export const initializeScreens = async (screenKeys: Object) => {
//   try {
//     for (const key in screenKeys) {
//       if (screenKeys.hasOwnProperty(key)) {
//         await AsyncStorage.setItem(screenKeys[key], "false");
//       }
//     }
//   } catch (e) {
//     // console.log(e);
//   }
// };

// export const removeScreensOnLogout = async () => {
//   try {
//     for (const key in screenKeys) {
//       if (screenKeys.hasOwnProperty(key)) {
//         await AsyncStorage.removeItem(screenKeys[key]);
//       }
//     }
//   } catch (e) {
//     // console.log(e);
//   }
// };

// export const screenKeys: any = {
//   snapbase: "hasShownSnapbase",
//   groups: "hasShownGroups",
//   snapfeed: "hasShownSnapfeed",
//   datingProfile: "hasShownDatingProfile",
//   socialProfile: "hasShownSocialProfile",
//   moments: "hasShownMoments",
//   anonymousGroups: "hasShownAnonymousGroups",
// };
