"use client";
import { useEffect, useState } from "react";

export function useNavigatorOnline() {
  const [value, setValue] = useState(window.navigator.onLine);

  useEffect(() => {
    function handleOnlineStatus() {
      setValue(window.navigator.onLine);
    }

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  return { isOnline: value, isOffline: !value };
}
