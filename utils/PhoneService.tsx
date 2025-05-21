import { Platform } from "react-native";
import CallerDetector from "react-native-detect-caller-id";

export const setupCallerDetector = async () => {
  if (Platform.OS == "android") {
    const checkInfo = await CallerDetector.checkPermissions();
    console.log("checkPermissions", checkInfo);
  } else {
    const checkInfo = await CallerDetector.getExtensionEnabledStatus();
    console.log("getExtensionEnabledStatus", checkInfo);
  }

  const overlayPermission = await CallerDetector.requestOverlayPermission();
  console.log("onAskOverlayPermission", overlayPermission);

  const phonePermission = await CallerDetector.requestPhonePermission();
  console.log("onAskPermissions", phonePermission);

  const servicePermission = await CallerDetector.requestServicePermission();
  console.log("onAskServicePermissions", servicePermission);

  CallerDetector.setParams({
    ios: {
      EXTENSION_ID: "packagename.CallDirectoryExtension",
      DATA_GROUP: "group.packagename",
      DATA_KEY: "callerListKey",
    },
    android: {
      dbPassword: "dbpassword",
      fieldsPassword: "16-length-pass!!", // using 128bit mask for encryption so u need to use 16-length password
    },
  });

  let result = await CallerDetector.setCallerList([
    {
      name: `Mohd Zaid`,
      appointment: `Developer`,
      city: `Riga`,
      iosRow: `Pavel Nikolaev, Developer, Riga`,
      number: 919760129979,
      isDeleted: false,
    },
  ]);
  console.log(result);
};
