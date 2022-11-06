import { setAuth, useAppState, loggedInStatus } from '../utils/app_state_service';
import { userLogOut } from '../utils/user_requests';
import { createSignal, Show, onMount } from 'solid-js';
import { Router, useRoutes, A } from "@solidjs/router";
import { Errors, Success } from './errors';

export default function Header() {

  const [appState, setAppState] = useAppState();
  const [loggedIn, setLoggedIn] = loggedInStatus();
  const [errors, setErrors] = createSignal([]);
  const [messages, setMessages] = createSignal([]);
  const [dropdown, setDropdown] = createSignal(false);

  // onMount(() => {
  // });
  let dropdownToggle;

  async function handleLogOut() {
    await userLogOut()
    .then(res => {
      if (res.success) {
        setMessages(["You have successfully logged out"]);
      } else {
        setErrors(res.errors);
      }
    })
  }

  function toggleDropdown() {
    dropdownToggle.classList.toggle("is-active");
  }

  return (
    <>
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <A class="navbar-item" href="/search">
            Mapp
          </A>

          <a role="button" class="navbar-burger"
            aria-label="menu" aria-expanded="false" 
            data-target="navbarBasicExample" 
            onClick={toggleDropdown}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div ref={dropdownToggle} class="navbar-menu">
          <div class="navbar-start">
            <A class="navbar-item" href="/">
              Home
            </A>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <Show
                when={loggedIn()}
                fallback={
                <div class="buttons">
                  <A class="button is-primary" 
                    href="/sign_up">
                    <strong>Sign up</strong>
                  </A>
                  <A class="button is-light" href="/sign_in">
                    Log in
                  </A>
                </div>
              }>
                <div class="buttons">
                  <button class="button is-light" 
                    onClick={handleLogOut}>
                    Log out
                  </button>
                </div>
              </Show>
            </div>
          </div>
        </div>
      </nav>
      <Errors {...{
        get errors() {
          return errors();
        },
        set errors(value) {
          setErrors(value);
        }}}/>
      <Success {...{
        get messages() {
          return messages();
        },
        set messages(value) {
          setMessages(value);
        }}}/>
    </>
  );
};
