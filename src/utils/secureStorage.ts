import * as SecureStore from 'expo-secure-store';

export const saveSecure = async (key: any, value: any) => {
  await SecureStore.setItemAsync(key, value);
};

export const getSecure = async (key: any) => {
  return await SecureStore.getItemAsync(key);
};

export const removeSecure = async (key: any) => {
  await SecureStore.deleteItemAsync(key);
};
