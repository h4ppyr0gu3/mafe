import axios from "axios";
import { useResultState } from "../utils/search_service.jsx";
import { useAppState, setAuth } from "./app_state_service";
import { useNavigate } from "@solidjs/router";
import { createNotification, createNotifications } from "../utils/notifications";
import { displayErrors } from "../utils/request_helpers";

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
      displayErrors(res, "Failed to add track to library");
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
      displayErrors(res, "Failed to get tracks");
    });
}

export async function getSingleTrack(id) {
  const url = window.backend_server + "/api/v1/tracks/" + id;
  const [resultState, setResultState] = useResultState();
  let response = { errors: null, success: null, data: null };

  return axios
    .get(url, {
      headers: { Authorization: localStorage.getItem("auth") },
    })
    .then((res) => {
      console.log(res);
      setAuth(res.headers.authorization);
      return res.data;
    })
    .catch((res) => {
      displayErrors(res, "Failed to get track");
    });
}

export function updateTrack(params, id) {
  const url = window.backend_server + "/api/v1/tracks/" + id;
  const [resultState, setResultState] = useResultState();
  let response = { errors: null, success: null, data: null };

  return axios
    .put(url, params, {
      headers: {
        Authorization: localStorage.getItem("auth"),
      },
    })
    .then((res) => {
      console.log(res);
      setAuth(res.headers.authorization);
      if (res.data.errors.length == 0) {
        response.success = true;
        response.data = res.data.songs;
        setResultState(response);
        createNotification("Successfully update track", "success");
      } else {
        console.log
        response.success = false;
        createNotifications(res.data.errors, "error");
      }
    })
    .catch((res) => {
      displayErrors(res, "Failed to update track");
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
      displayErrors(res, "Failed to download track");
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
      displayErrors(res, "Failed to remove track");
    });
}
