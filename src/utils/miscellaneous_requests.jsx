import axios from "axios";

export function confirmToken(token) {
  const url = window.backend_server + "/api/auth/confirmation"
  const params = {confirmation_token: token}

  return axios
    .get(url, params)
    .then((res) => {
      console.log(res)
    })
    .catch((res) => {
      console.log(res)
    });

}

