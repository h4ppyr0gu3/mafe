import axios from "axios";
import { createStore, SetStoreFunction } from "solid-js/store";
import { useAppState, setAuth } from "./app_state_service";
import { useResultState } from "./search_service.jsx";
import { Notification } from "../types/main";

interface NotificationState {
  notifications: Notification[];
}

declare global {
  interface Window {
    backend_server: string;
  }
}


const [notifications, setNotifications] = createStore<NotificationState>({notifications: []});
export const useNotifications = (): [NotificationState, SetStoreFunction<NotificationState>] => [notifications, setNotifications];

export function getNotifications() {
  const url = window.backend_server + "/api/v1/notifications";
  const response = { errors: null, success: null, data: null };
  const [resultState, setResultState] = useResultState();

  return axios
    .get(url, {
      headers: { Authorization: localStorage.getItem("auth") },
    })
    .then((res) => {
      response.data = res.data.notifications;
      response.success = true;
      setNotifications({ notifications: res.data.notifications });
      setAuth(res.headers.authorization);
    })
    .catch((res) => {
      console.log("failed to get notifications");
    });
}

export function markAllAsRead() {
  console.log("all caught up");
}

export function markAsRead(id: string) {
  const url = window.backend_server + "/api/v1/notifications/" + id;
  const response = { errors: null, success: null, data: null };
  const [resultState, setResultState] = useResultState();

  console.log(localStorage);
  return axios
    .put(url, {}, {
      headers: { Authorization: localStorage.getItem("auth") },
    })
    .then((res) => {
      console.log(res)
      response.data = res.data.notifications;
      response.success = true;
      setNotifications({ notifications: res.data.notifications });
      setAuth(res.headers.authorization);
    })
    .catch((res) => {
      console.log("failed to get notifications");
    });
}
