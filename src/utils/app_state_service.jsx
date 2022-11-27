import { createStore } from "solid-js/store";
import { createSignal } from "solid-js";

const [loggedIn, setLoggedIn] = createSignal(false);
const [appState, setAppState] = createStore({
  auth: setInitialAppState(),
  user: {},
});

function setInitialAppState() {
  let auth = localStorage.getItem("authorization");
  if (auth != "" && auth != undefined && auth != null && auth != "undefined") {
    setLoggedIn(true);
  } else {
    setLoggedIn(false);
  }
  return auth;
}

export const useAppState = () => [appState, setAppState];
export const setAuth = (auth) => {
  if (auth === undefined || auth === null) { return}
  if (auth === "") {
    setLoggedIn(false);
  } else {
    setLoggedIn(true);
  }
  localStorage.setItem("auth", auth);
};
export const loggedInStatus = () => [loggedIn, setLoggedIn];
