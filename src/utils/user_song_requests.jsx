import axios from "axios";
import { useResultState } from "../utils/search_service.jsx";
import { useNavigate } from "@solidjs/router";
import { useErrors } from "../utils/error_store";

export function addTrackToLibrary(params) {
  const url = import.meta.env.VITE_API_URL + "/api/v1/tracks";
  const [errors, setErrors] = useErrors();
  const navigate = useNavigate();
  const [resultState, setResultState] = useResultState();
  let response = { errors: null, success: null, data: null };

  return axios.get(url, {
    headers: {
      Authorization: localStorage.getItem("auth"),
    },
    params
  }).then((res) => {
    response.success = true;
    response.data = res.data.songs
    setResultState(response);
    localStorage.setItem("auth", response.headers.authorization)
  }).catch((res) => {
    localStorage.setItem("auth", "")
    console.log(res.response.data.errors);
    setErrors({errors: res.response.data.errors});
    console.log(errors);
    // navigate("/login", { replace: true });
  })
}

export function getUsersTracks(params) {
  const url = import.meta.env.VITE_API_URL + "/api/v1/tracks";
  const [resultState, setResultState] = useResultState();
  const [errors, setErrors] = useErrors();
  let response = { errors: null, success: null, data: null };
  const navigate = useNavigate();

  return axios.get(url, {
    headers: {
      Authorization: localStorage.getItem("auth"),
    },
    params
  }).then((res) => {
    response.success = true;
    response.data = res.data.songs
    setResultState(response);
    localStorage.setItem("auth", response.headers.authorization)
  }).catch((res) => {
    navigate("/login", { replace: true });
    localStorage.setItem("auth", "")
    console.log(res);
    setErrors(res.errors);
  })
}
