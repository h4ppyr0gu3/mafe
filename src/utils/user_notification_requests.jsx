import axios from "axios";
import { createStore } from "solid-js/store";

const [notifications, setNotifications] = createStore({notifications: []});
export const useNotifications = () => [notifications, setNotifications];

const addNotification = (text) => {
  setTodos({notifications: 
    [...notifications.notifications, { text: text, read: false }]});
}

export function getNotifications() {
  const url = import.meta.env.VITE_API_URL + "/api/v1/notifications";
  let response = { errors: null, success: null, data: null };

  return axios
    .get(url, {
      headers: { Authorization: localStorage.getItem("auth") },
    })
    .then((res) => {
      // if (res.data == undefined && res.data.errors.length > 0) {
      //   setErrors({ errors: res.data.errors });
      //   setAuth(res.headers.authorization);
      // } else {
      //   setAuth(res.headers.authorization);
      //   response.data = res.data.url;
      //   setResultState(response);
      // }
    })
    .catch((res) => {
      console.log("failed to get notifications");
    });
}

}

export function markAllAsRead() {
}
