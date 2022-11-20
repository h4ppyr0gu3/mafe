import { useAppState, setAuth } from "./app_state_service";
import { useResultState } from "../utils/search_service.jsx";
import axios from "axios";
import { useNavigate } from "@solidjs/router";

// always return {
//   success:
//   errors:
//   data:
// }

export async function userLogin(email, password) {
  const url = import.meta.env.VITE_API_URL + "/api/auth/sign_in";
  const [, setAppState] = useAppState();

  let headers, body, response;
  response = {
    errors: null,
    success: null,
    data: null,
  };
  const data = {
    email: email,
    password: password,
  };
  return axios
    .post(url, data)
    .then((res) => {
      headers = res.headers;
      body = res.data;
      setAuth(headers.authorization);
      setAppState("user", body);
      response.success = true;
      response.data = body;
      return response;
    })
    .catch((res) => {
      response.success = false;
      response.errors = res.response.data.errors;
      return response;
    });
}

export async function userLogOut() {
  const url = import.meta.env.VITE_API_URL + "/api/auth/sign_out";
  const [appState,] = useAppState();
  var response = {
    success: null,
    errors: null,
    data: null,
  };
  return axios
    .delete(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: appState.auth,
      },
    })
    .then((res) => {
      setAuth("");
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

export async function userSignUp(email, password) {
  const redirect_url = import.meta.env.VITE_BASE_URL + "/search";
  const url = import.meta.env.VITE_API_URL + "/api/auth";
  const [, setAppState] = useAppState();
  let headers, body, response;
  response = {
    success: null,
    errors: null,
    data: null,
  };
  const data = {
    email: email,
    password: password,
    confirm_success_url: redirect_url,
  };
  return axios
    .post(url, data)
    .then((res) => {
      headers = res.headers;
      body = res.data;
      setAuth(headers.authorization);
      setAppState("user", body);
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

export async function addToUserTracks(params) {
  const url = import.meta.env.VITE_API_URL + "/api/v1/tracks";
  const [appState, setAppState] = useAppState();
  let headers, body, response;
  response = {
    success: null,
    errors: null,
    data: null,
  };
  console.log(appState.auth);
  console.log(params);

  return axios
    .post(url, params, {
    headers: {
      Authorization: appState.auth,
      uid: "test1@test.com",
    }
  }).then((res) => {
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

export async function getUsersTracks(params) {
  const url = import.meta.env.VITE_API_URL + "/api/v1/tracks";
  const navigate = useNavigate();
  const [resultState, setResultState] = useResultState();
  const [appState, setAppState] = useAppState();
  let response;
  response = {
    errors: null,
    success: null,
    data: null,
  };
  return axios.get(url, {
    headers: {
      Authorization: appState.auth,
    },
    params
  }).then((res) => {
    response.success = true;
    response.data = res.data.songs
    setResultState(response);
    setAuth(res.headers.authorization);
  }).catch((res) => {
    navigate("/login", { replace: true });
    setAuth("");
  })
}

