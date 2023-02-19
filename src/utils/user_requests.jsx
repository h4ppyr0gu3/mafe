import { useAppState, setAuth } from "./app_state_service";
import { useResultState } from "../utils/search_service.jsx";
import axios from "axios";
import { useNavigate } from "@solidjs/router";
import { createNotification, createNotifications } from "../utils/notifications";
import { displayErrors } from "../utils/request_helpers";

export async function userLogin(email, password) {
  const url = window.backend_server + "/api/auth/sign_in";
  const [, setAppState] = useAppState();

  let headers, body;
  let response = { errors: null, success: null, data: null };
  const data = { email: email, password: password };

  return axios
    .post(url, data)
    .then((res) => {
      setAuth(res.headers.authorization);
      createNotification("Successfully logged in", "success");
      response = { errors: null, success: true, data: res.data };
      return response;
    })
    .catch((res) => {
      displayErrors(res, "Failed to log in");
    });
}

export async function userLogOut() {
  const url = window.backend_server + "/api/auth/sign_out";
  const [appState] = useAppState();
  let response = { errors: null, success: null, data: null };
  return axios
    .delete(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: localStorage.getItem("auth"),
      },
    })
    .then((res) => {
      setAuth("");
      createNotification("You have successfully logged out", "success");
      response.success = true;
      return response;
    })
    .catch((res) => {
      displayErrors(res, "Failed to log out");
    });
}

export async function userSignUp(email, password) {
  const redirect_url = window.frontendServer + "/sign_in";
  const url = window.backend_server + "/api/auth";
  const [, setAppState] = useAppState();
  let headers, body;
  let response = { errors: null, success: null, data: null };

  const data = {
    email: email,
    password: password,
    confirm_success_url: redirect_url,
  };
  return axios
    .post(url, data)
    .then((res) => {
      createNotification("Account Successfully created, please Check your email to confirm",
      "success");
      setAuth(res.headers.authorization);
      response.success = true;
      response.data = res.data;
      return response;
    })
    .catch((res) => {
      displayErrors(res, "Failed to sign up");
    });
}

export async function addToUserTracks(params) {
  const url = window.backend_server + "/api/v1/tracks";
  const [appState, setAppState] = useAppState();
  let headers, body;
  let response = { errors: null, success: null, data: null };

  return axios
    .post(url, params, {
      headers: {
        Authorization: appState.auth,
        // uid: "test1@test.com",
      },
    })
    .then((res) => {
      headers = res.headers;
      body = res.data;
      response.success = true;
      response.data = res.data;
      return response;
    })
    .catch((res) => {
      displayErrors(res, "Failed to add track");
    });
}
