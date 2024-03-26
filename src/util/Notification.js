import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
// import { messaging as messagingRecieve } from "@/config/firebase";
import { app } from "@/config/firebase";
import { getUserId } from "@/util/Utils";
import axiosInstance from "@/config/axiosConfig";
import { isEmpty } from "lodash";

const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(app);
    }
    console.log("Firebase not supported this browser");
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
})();
export async function requestPermission(cb, cbToken) {
  console.log("requestPermission ...");
  Notification.requestPermission().then(async (permission) => {
    try {
      if (permission === "granted") {
        console.log("hehe");
        const messagingResolve = await messaging;
        if (messagingResolve == null) return;
        onMessage(messagingResolve, (_payload) => {
          console.log(_payload);

          cb?.(_payload);
          // Xử lý thông báo ở đây
        });
        if (isEmpty(localStorage.getItem("deviceTokenId"))) {
          try {
            const currentToken = await getToken(messagingResolve, {
              vapidKey:
                "BGTHhYZ0eqCQs4xZXH_PgJmdMz2Q4l1PC0k9VpvuKWUcF5wzujjdOJn_QTlu3KgOx2Ehok5cCeyky66JsWqY4sA",
            });
            console.log("currentToken, ", currentToken);
            await cbToken?.(currentToken || "");
            localStorage.setItem("deviceTokenId", currentToken);
          } catch (e) {
            console.log(e);
          }
        }
      } else {
        console.log("Do not have permission!");
      }
    } catch (error) {
      console.log(error);
    }
  });
}

export async function requestPermissionLoginPage(cb, cbToken) {
  console.log("requestPermissionLoginPage ...");
  const permission = await Notification.requestPermission();
  try {
    if (permission === "granted") {
      console.log("hehe");
      const messagingResolve = await messaging;
      if (messagingResolve == null) return;
      onMessage(messagingResolve, (_payload) => {
        console.log(_payload);

        cb?.(_payload);
        // Xử lý thông báo ở đây
      });

      try {
        localStorage.setItem("deviceTokenId", "");
        const currentToken = await getToken(messagingResolve, {
          vapidKey:
            "BGTHhYZ0eqCQs4xZXH_PgJmdMz2Q4l1PC0k9VpvuKWUcF5wzujjdOJn_QTlu3KgOx2Ehok5cCeyky66JsWqY4sA",
        });
        console.log("currentToken, ", currentToken);
        await cbToken?.(currentToken || "");
        localStorage.setItem("deviceTokenId", currentToken);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("Do not have permission!");
    }
  } catch (error) {
    console.log(error);
  }

  // Notification.requestPermission().then(async (permission) => {
  //   try {
  //     if (permission === "granted") {
  //       console.log("hehe");
  //       const messagingResolve = await messaging;
  //       if (messagingResolve == null) return;
  //       onMessage(messagingResolve, (_payload) => {
  //         console.log(_payload);

  //         cb?.(_payload);
  //         // Xử lý thông báo ở đây
  //       });

  //       try {
  //         localStorage.setItem("deviceTokenId", "");
  //         const currentToken = await getToken(messagingResolve, {
  //           vapidKey:
  //             "BGTHhYZ0eqCQs4xZXH_PgJmdMz2Q4l1PC0k9VpvuKWUcF5wzujjdOJn_QTlu3KgOx2Ehok5cCeyky66JsWqY4sA",
  //         });
  //         console.log("currentToken, ", currentToken);
  //         await cbToken?.(currentToken || "");
  //         localStorage.setItem("deviceTokenId", currentToken);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     } else {
  //       console.log("Do not have permission!");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
}

export const udpateTokenDeviceId = async (currentId) => {
  console.log("currentId  ", currentId);
  const userId = getUserId();

  const payload = {
    deviceId: currentId,
  };

  console.log("payload  ", payload);
  console.log("id  ", userId);

  await axiosInstance.put(`/users/${userId}`, payload);
};
