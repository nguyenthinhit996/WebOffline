"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";
import Login from "@/components/Login";
import { DeviceInfoContext } from "@/context/DeviceInfoContext";
import { minVersionCheck } from "@/util/Utils";
import WarningModal from "@/components/common/WarningModal";
import IOSInstallPWAInstruction from "@/components/IOSInstallPWAInstruction";
import AndroidInstallPWAInstruction from "@/components/AndroidInstallPWAInstruction";
import { IOS_WARNING_MSG } from "@/util/Utils";

export default function Home() {
  const { deviceInfo, setDeviceInfo } = useContext(DeviceInfoContext);
  const [uiState, setUIState] = useState({
    open: false,
    showIOSInstruction: false,
    showAndroidInstruction: false,
  });
  console.log("DEVICE INFO: ", deviceInfo);

  useEffect(() => {
    if (deviceInfo?.isIOS) {
      if (minVersionCheck(deviceInfo.osVersion.toString(), 16, 5)) {
        if (!deviceInfo.standalone) {
          setUIState({ ...uiState, showIOSInstruction: true });
        }
      } else {
        setUIState({ ...uiState, open: true });
        setDeviceInfo((prev) => ({ ...prev, isActiveNotification: false }));
      }
    } else if (deviceInfo?.isAndroid && !deviceInfo.standalone) {
      setUIState({ ...uiState, showAndroidInstruction: true });
    }
  }, [deviceInfo?.isIOS]);

  return (
    <Fragment>
      <WarningModal
        open={uiState.open}
        onClose={() => setUIState((prev) => ({ ...prev, open: false }))}
        message={IOS_WARNING_MSG}
      />
      {uiState.showIOSInstruction ? (
        <IOSInstallPWAInstruction />
      ) : uiState.showAndroidInstruction ? (
        <AndroidInstallPWAInstruction />
      ) : (
        <Login />
      )}
    </Fragment>
  );
}
