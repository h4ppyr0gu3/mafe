import axios from "axios";
import { useResultState } from "../utils/search_service.jsx";
import { displayErrors } from "../utils/request_helpers.jsx";

export async function getInvidious(path, params) {
  const url = import.meta.env.VITE_INVIDIOUS_API_URL + path;
  const [resultState, setResultState] = useResultState();

  return axios
    .get(url, {
      headers: {
        Accept: "application/json",
      },
      params,
    })
    .then((res) => {
      setResultState("success", true);
      setResultState("data", res.data);
    })
    .catch((res) => {
      displayErrors(res, "Failed to get invidious data");
    });
}
