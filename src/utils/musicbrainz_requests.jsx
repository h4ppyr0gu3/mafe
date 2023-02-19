import axios from "axios";
import { useResultState } from "../utils/search_service";
import { displayErrors } from "../utils/request_helpers";

export async function getMusicBrainz(path, params) {
  const url = import.meta.env.VITE_MB_API_URL + path;
  const [, setResultState] = useResultState();

  return axios
    .get(url, {
      headers: {
        Accept: "application/json",
        // "User-Agent": import.meta.env.VITE_MB_REQUEST_USER_AGENT,
        "User-Agent": "MApp/0.0.1 ( rogersdpdr@gmail.com )",
      },
      params,
    })
    .then((res) => {
      setResultState("success", true);
      setResultState("data", res);
      return res
    })
    .catch((res) => {
      displayErrors(res, "Failed to get musicbrainz data");
    });
}
