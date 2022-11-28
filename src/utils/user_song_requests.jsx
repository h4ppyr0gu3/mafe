import axios from "axios";
import { useResultState } from "../utils/search_service.jsx";
import { useAppState, setAuth } from "./app_state_service";
import { useNavigate } from "@solidjs/router";
import { useErrors, useMessages } from "../utils/error_store";

export function addTrackToLibrary(params) {
  const url = import.meta.env.VITE_API_URL + "/api/v1/tracks";
  const [errors, setErrors] = useErrors();
  const [messages, setMessages] = useMessages();
  const [resultState, setResultState] = useResultState();
  let response = { errors: null, success: null, data: null };

  return axios.post(url, params, {
    headers: {
      Authorization: localStorage.getItem("auth"),
    }
  }).then((res) => {
      setAuth(res.headers.authorization);
    console.log(res)
    if (res.data.errors.length == 0) {
      response.success = true;
      response.data = res.data.songs
      setResultState(response);
      setMessages({messages: ["Successfully added to tracks"]});
    } else {
      response.success = false;
      setErrors({errors: res.data.errors});
    }
  }).catch((res) => {
    setErrors({errors: res.response.data.errors});
    setAuth(res.headers.authorization);
  })
}

export function getUsersTracks(params) {
  const url = import.meta.env.VITE_API_URL + "/api/v1/tracks";
  const [resultState, setResultState] = useResultState();
  const [errors, setErrors] = useErrors();
  let response = { errors: null, success: null, data: null };

  return axios.get(url, {
    headers: { Authorization: localStorage.getItem("auth") },
    params
  }).then((res) => {
    response.success = true;
    response.data = res.data.songs
    setResultState(response);
    setAuth(res.headers.authorization);
  }).catch((res) => {
    setErrors(res.errors);
    setAuth(res.headers.authorization);
  })
}
