import { Tables } from "./tables";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useStorage<T>(key: Tables) {
  async function get(): Promise<T | null> {
    try {
      const data = await AsyncStorage.getItem(key);
      const result = data !== null ? JSON.parse(data) : null;
      return result;
    } catch (e) {
      // error reading value
      return null;
    }
  }

  async function set(value: T) {
    try {
      AsyncStorage.setItem(key, JSON.stringify(value));
    } catch {
      // error reading value
    }
  }

  return { get, set };
}