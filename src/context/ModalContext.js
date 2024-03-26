"use client";
import { createContext, useEffect, useState } from "react";
import { CURRENT_TASK_ID } from "@/util/Utils";
const mockNotifications = [
  {
    id: 0,
    title: "First notification",
    body: {
      taskId: 4,
      text: "New package will arrive",
    },
    isRead: true,
  },
  {
    id: 1,
    title: "Second notification",
    body: {
      taskId: 5,
      text: "New package will arrive",
    },
    isRead: false,
  },
];

const NOTIFICATIONS_KEY = "notifications";

export const ModalContext = createContext({
  open: false,
  setOpen: () => {},
});

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [openWarning, setOpenWarning] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem(NOTIFICATIONS_KEY);
    if (storedValue) {
      setNotifications(JSON.parse(storedValue));
    }
  }, []);

  const handleOnMessage = (message) => {
    const newMessage = {
      messageId: message.messageId,
      title: message.notification.title,
      ...message?.data,
      isRead: false,
    };
    setNotifications((prev) => {
      const newNotifications = [newMessage, ...prev];
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(newNotifications));
      return newNotifications;
    });
  };

  const handleViewMessage = (taskId) => {
    const index = notifications.findIndex((msg) => msg.taskId === taskId);
    const newNotifications = [...notifications];
    newNotifications[index].isRead = true;
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(newNotifications));
    localStorage.setItem(CURRENT_TASK_ID, taskId);
    setNotifications(newNotifications);
    setOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        open,
        setOpen,
        notifications,
        setNotifications,
        handleOnMessage,
        handleViewMessage,
        openWarning,
        setOpenWarning,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
