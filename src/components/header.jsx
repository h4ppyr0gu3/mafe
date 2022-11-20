import {
  loggedInStatus,
} from "../utils/app_state_service";
import { userLogOut } from "../utils/user_requests";
import { createSignal, Show } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { Errors, Success } from "./errors";

export default function Header() {
  const [loggedIn,] = loggedInStatus();
  const [errors, setErrors] = createSignal([]);
  const [messages, setMessages] = createSignal([]);

  // onMount(() => {
  // });
  let dropdownToggle;

  async function handleLogOut() {
    await userLogOut().then((res) => {
      if (res.success) {
        setMessages(["You have successfully logged out"]);
      } else {
        setErrors(res.errors);
      }
    });
  }

  function toggleDropdown() {
    dropdownToggle.classList.toggle("is-active");
  }

  const navigate = useNavigate();

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
            <A class="navbar-item" href="/my_tracks">
              My Tracks
            </A>
            <A class="navbar-item" href="/search">
              Search Songs
            </A>
            <A class="navbar-item" href="/album_by_artist">
              Album by Artist
            </A>
            <A class="navbar-item" href="/album_by_name">
              Album by Name
            </A>
            <div class="navbar-item">
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
                <div class="buttons">
                  <button class="button is-light" onClick={handleLogOut}>
                    Log out
                  </button>
                </div>
              </Show>
            </div>
          </div>
        </div>
      </nav>
      <Errors
        {...{
          get errors() {
            return errors();
          },
          set errors(value) {
            setErrors(value);
          },
        }}
      />
      <Success
        {...{
          get messages() {
            return messages();
          },
          set messages(value) {
            setMessages(value);
          },
        }}
      />
    </>
  );
}
