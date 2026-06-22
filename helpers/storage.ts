import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getStorageItem(key: string): Promise<string | null> {
  return AsyncStorage.getItem(key);
}

export async function setStorageItem(key: string, value: string): Promise<void> {
  await AsyncStorage.setItem(key, value);
}

export async function removeStorageItem(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}
