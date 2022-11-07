import axios from "axios";
import { useResultState } from "../utils/search_service.jsx";

export async function getInvidious(path, params) {
  const url = import.meta.env.VITE_INVIDIOUS_API_URL + path
  const [resultState, setResultState] = useResultState();

  return axios
    .get(url, {
      headers: {
        Accept: "application/json",
      },
      params: { params }
    })
    .then((res) => {
      setResultState('success', true);
      setResultState('data', res.data);
    })
    .catch((res) => {
      setResultState('success', false);
      setResultState('errors', res);
    });
}
