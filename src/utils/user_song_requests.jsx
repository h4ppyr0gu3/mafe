import axios from "axios";
import { useResultState } from "../utils/search_service.jsx";
import { useAppState, setAuth } from "./app_state_service";
import { useNavigate } from "@solidjs/router";
import { useErrors, useMessages } from "../utils/error_store";
import { Buffer } from "buffer";

export function addTrackToLibrary(params) {
  const url = import.meta.env.VITE_API_URL + "/api/v1/tracks";
  const [errors, setErrors] = useErrors();
  const [messages, setMessages] = useMessages();
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
        setResultState(response);
        setMessages({ messages: ["Successfully added to tracks"] });
      } else {
        response.success = false;
        setErrors({ errors: res.data.errors });
      }
    })
    .catch((res) => {
      setErrors({ errors: res.response.data.errors });
      setAuth(res.headers.authorization);
    });
}

export function getUsersTracks(params) {
  const url = import.meta.env.VITE_API_URL + "/api/v1/tracks_index";
  const [resultState, setResultState] = useResultState();
  const [errors, setErrors] = useErrors();
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
      setErrors(res.errors);
      setAuth(res.headers.authorization);
    });
}

export function updateTrack(params, id) {
  const url = import.meta.env.VITE_API_URL + "/api/v1/tracks/" + id;
  const [errors, setErrors] = useErrors();
  const [messages, setMessages] = useMessages();
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
        setMessages({ messages: ["Successfully update track"] });
      } else {
        response.success = false;
        setErrors({ errors: res.data.errors });
      }
    })
    .catch((res) => {
      setErrors({ errors: res.response.data.errors });
      setAuth(res.headers.authorization);
    });
}

export function downloadTrack(url) {
  const [resultState, setResultState] = useResultState();
  const [errors, setErrors] = useErrors();
  let response = { errors: null, success: null, data: null };

  return axios
    .get(url, {
      headers: { Authorization: localStorage.getItem("auth") },
    })
    .then((res) => {
      if (res.data == undefined && res.data.errors.length > 0) {
        setErrors({ errors: res.data.errors });
        setAuth(res.headers.authorization);
      } else {
        setAuth(res.headers.authorization);
        response.data = res.data.url;
        setResultState(response);
      }
    })
    .catch((res) => {
      setErrors({
        errors: ["Something went wrong, please refresh and try again"],
      });
    });
}

export function removeTrack(url) {
  const [resultState, setResultState] = useResultState();
  const [messages, setMessages] = useMessages();
  const [errors, setErrors] = useErrors();
  let response = { errors: null, success: null, data: null };

  return axios
    .delete(url, {
      headers: { Authorization: localStorage.getItem("auth") },
    })
    .then((res) => {
      setAuth(res.headers.authorization);
      setMessages({ messages: ["Successfully removed track"] });
    })
    .catch((res) => {
      setErrors({
        errors: ["Something went wrong, please refresh and try again"],
      });
    });
}
