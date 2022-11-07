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
  if (auth === "") {
    setLoggedIn(false);
  } else {
    setLoggedIn(true);
  }
  setAppState("auth", auth);
  localStorage.setItem("authorization", auth);
};
export const loggedInStatus = () => [loggedIn, setLoggedIn];
