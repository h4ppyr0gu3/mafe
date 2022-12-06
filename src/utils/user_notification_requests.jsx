import axios from "axios";
import { createStore } from "solid-js/store";
import { useAppState, setAuth } from "./app_state_service";
import { useResultState } from "./search_service.jsx";

const [notifications, setNotifications] = createStore({ notifications: [] });
export const useNotifications = () => [notifications, setNotifications];

const addNotification = (text) => {
  // setTodos({
  //   notifications: [
  //     ...notifications.notifications,
  //     { text: text, read: false },
  //   ],
  // });
};

export function getNotifications() {
  const url = import.meta.env.VITE_API_URL + "/api/v1/notifications";
  let response = { errors: null, success: null, data: null };
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

export function markAllAsRead() {}
