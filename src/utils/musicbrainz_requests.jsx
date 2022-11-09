import axios from "axios";
import { useResultState } from "../utils/search_service.jsx";

export async function getMusicBrainz(path, params) {
  const url = import.meta.env.VITE_MB_API_URL + path
  const [, setResultState] = useResultState();

  return axios
    .get(url, {
      headers: {
        Application: import.meta.env.VITE_MB_APPLICATION_STRING,
        Accept: "application/json",
        "User-Agent": import.meta.env.VITE_MB_REQUEST_USER_AGENT,
      },
      params: { params }
    })
    .then((res) => {
      setResultState('success', true);
      setResultState('data', res);
    })
    .catch((res) => {
      setResultState('success', false);
      setResultState('errors', res);
    });
}
