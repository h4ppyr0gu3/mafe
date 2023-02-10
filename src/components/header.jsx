import { loggedInStatus } from "../utils/app_state_service";
import { userLogOut } from "../utils/user_requests";
import { createSignal, Show } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { Errors, Success } from "./errors";
import { useErrors } from "../utils/error_store";
import Notifications from "./notifications";

export default function Header() {
  const [loggedIn, setLoggedIn] = loggedInStatus();
  const navigate = useNavigate();
  let dropdownToggle;

  async function handleLogOut() {
    await userLogOut().then((res) => {
      setLoggedIn(false);
    });
  }

  function toggleDropdown() {
    dropdownToggle.classList.toggle("is-active");
  }

  function handleMapp() {
    navigate("/search", {});
  }

  return (
    <>
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" onClick={handleMapp}>
            Mapp
          </a>

          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={toggleDropdown}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div ref={dropdownToggle} class="navbar-menu">
          <div class="navbar-end">
            <A class="navbar-item" href="/">
              Home
            </A>
            <A class="navbar-item" href="/search">
              Search Songs
            </A>
            <Show
              when={loggedIn()}
              fallback={
              <div class="buttons">
                <A class="button is-primary" href="/sign_up">
                  <strong>Sign up</strong>
                </A>
                <A class="button is-light" href="/sign_in">
                  Log in
                </A>
              </div>
            }
            >
              <A class="navbar-item" href="/my_tracks">
                My Tracks
              </A>
              <div class="navbar-item">
                <Notifications />
              </div>
              <div class="buttons">
                <button class="button is-light" onClick={handleLogOut}>
                  Log out
                </button>
              </div>
            </Show>
          </div>
        </div>
      </nav>
      <Errors />
      <Success />
      </>
  );
}
