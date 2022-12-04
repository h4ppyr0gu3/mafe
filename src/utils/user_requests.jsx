import { useAppState, setAuth } from "./app_state_service";
import { useErrors, useMessages } from "../utils/error_store.jsx";
import { useResultState } from "../utils/search_service.jsx";
import axios from "axios";
import { useNavigate } from "@solidjs/router";

export async function userLogin(email, password) {
  const url = import.meta.env.VITE_API_URL + "/api/auth/sign_in";
  const [, setAppState] = useAppState();
  const [errors, setErrors] = useErrors();
  const [messages, setMessages] = useMessages();

  let headers, body;
  let response = { errors: null, success: null, data: null };
  const data = { email: email, password: password };

  return axios
    .post(url, data)
    .then((res) => {
      setAuth(res.headers.authorization);
      setMessages({ messages: ["Successfully Logged in"] });
      response = { errors: null, success: true, data: res.data };
      return response;
    })
    .catch((res) => {
      response = {
        errors: res.response.data.errors,
        success: false,
        data: null,
      };
      setErrors({ errors: res.response.data.errors });
      return response;
    });
}

export async function userLogOut() {
  const url = import.meta.env.VITE_API_URL + "/api/auth/sign_out";
  const [appState] = useAppState();
  const [errors, setErrors] = useErrors();
  const [messages, setMessages] = useMessages();
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
      setMessages({ messages: ["You have successfully logged out"] });
      response.success = true;
      return response;
    })
    .catch((res) => {
      setAuth("");
      response.success = false;
      setMessages({ messages: ["You have successfully logged out"] });
      response.errors = res.response.data.errors;
      return response;
    });
}

export async function userSignUp(email, password) {
  const [errors, setErrors] = useErrors();
  const [messages, setMessages] = useMessages();
  const redirect_url = import.meta.env.VITE_BASE_URL + "/sign_in";
  const url = import.meta.env.VITE_API_URL + "/api/auth";
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
      setMessages({
        messages: [
          "Account Successfully created, please Check your email to confirm",
        ],
      });
      setAuth(res.headers.authorization);
      response.success = true;
      response.data = res.data;
      return response;
    })
    .catch((res) => {
      console.log("fail");
      console.log(res);
      setErrors({ errors: [res.response.data.errors.full_messages] });
      response.success = false;
      response.errors = res.response.data.errors;
      return response;
    });
}

export async function addToUserTracks(params) {
  const url = import.meta.env.VITE_API_URL + "/api/v1/tracks";
  const [appState, setAppState] = useAppState();
  let headers, body;
  let response = { errors: null, success: null, data: null };
  console.log(appState.auth);
  console.log(params);

  return axios
    .post(url, params, {
      headers: {
        Authorization: appState.auth,
        uid: "test1@test.com",
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
      response.success = false;
      response.errors = res.response.data.errors;
      return response;
    });
}
