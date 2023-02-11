import axios from "axios";
import { useResultState } from "../utils/search_service.jsx";
import { useAppState, setAuth } from "./app_state_service";
import { useNavigate } from "@solidjs/router";
import { createNotification, createNotifications } from "../utils/notifications";

export async function addTrackToLibrary(params) {
  const url = window.backend_server + "/api/v1/tracks";
  const [resultState, setResultState] = useResultState();
  let response = { errors: null, success: null, data: null };

  return axios
    .post(url, params, {
      headers: {
        Authorization: localStorage.getItem("auth"),
      },
    })
    .then((res) => {
      setAuth(res.headers.authorization);
      if (res.data.errors.length == 0) {
        response.success = true;
        response.data = res.data.songs;
        createNotification("Successfully added to tracks", "success");
      } else {
        response.success = false;
        createNotifications(res.data.errors, "failure");
      }
    })
    .catch((res) => {
      createNotifications(res.response.data.errors, "failure");
      setAuth(res.headers.authorization);
    });
}

export function getUsersTracks(params) {
  const url = window.backend_server + "/api/v1/tracks_index";
  const [resultState, setResultState] = useResultState();
  let response = { errors: null, success: null, data: null };

  return axios
    .post(url, params, {
      headers: { Authorization: localStorage.getItem("auth") },
    })
    .then((res) => {
      response.success = true;
      response.data = res.data;
      setResultState(response);
      setAuth(res.headers.authorization);
    })
    .catch((res) => {
      createNotifications(res.errors, "failure");
      setAuth(res.headers.authorization);
    });
}

export function updateTrack(params, id) {
  const url = window.api_url + "/api/v1/tracks/" + id;
  const [resultState, setResultState] = useResultState();
  let response = { errors: null, success: null, data: null };

  return axios
    .put(url, params, {
      headers: {
        Authorization: localStorage.getItem("auth"),
      },
    })
    .then((res) => {
      setAuth(res.headers.authorization);
      if (res.data.errors.length == 0) {
        response.success = true;
        response.data = res.data.songs;
        setResultState(response);
        createNotification("Successfully update track", "success");
      } else {
        response.success = false;
        createNotifications(res.data.errors, "error");
      }
    })
    .catch((res) => {
      createNotifications(res.response.data.errors, "error");
      createNotification("Something went wrong, please refresh and try again", "failure");
      setAuth(res.headers.authorization);
    });
}

export async function downloadTrack(url) {
  const [,setResultState] = useResultState();
  let response = { errors: null, success: null, data: null };

  return axios
    .get(url, {
      headers: { Authorization: localStorage.getItem("auth") },
    })
    .then((res) => {
      if (res.data == undefined && res.data.errors.length > 0) {
        createNotifications(res.data.errors, "failure");
        setAuth(res.headers.authorization);
      } else {
        setAuth(res.headers.authorization);
        response.data = res.data.url;
        setResultState(response);
      }
    })
    .catch((res) => {
      console.log(res)
      createNotification("Something went wrong, please refresh and try again", "failure");
    });
}

export async function removeTrack(url) {
  return axios
    .delete(url, {
      headers: { Authorization: localStorage.getItem("auth") },
    })
    .then((res) => {
      setAuth(res.headers.authorization);
      createNotification("Successfully removed track", "success");
    })
    .catch((res) => {
      console.log(res)
      createNotification("Something went wrong, please refresh and try again", "failure");
    });
}
