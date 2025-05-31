import { PermissionsAndroid, Platform } from "react-native";
import CallerIdModule from "../modules/caller-id";

export async function requestAndroidPermissions() {
  if (Platform.OS === "android") {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
    );
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG
    );
    // Overlay permission is special:
    if (!(await hasOverlayPermission())) {
      await CallerIdModule.requestOverlayPermission();
    }
  }
}

export async function hasOverlayPermission() {
  if (Platform.OS !== "android") return true;
  try {
    return await CallerIdModule.hasOverlayPermission();
  } catch {
    return false;
  }
}
