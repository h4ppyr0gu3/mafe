import { loggedInStatus } from "../utils/app_state_service";
import { userLogOut } from "../utils/user_requests";
import { createSignal, Show } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import Notifications from "./notifications";

export default function Header() {
  const [loggedIn, setLoggedIn] = loggedInStatus();
  const navigate = useNavigate();
  let dropdownToggle, tailwindDropdown;

  async function handleLogOut() {
    await userLogOut().then((res) => {
      setLoggedIn(false);
    });
  }

  function toggleDropdown() {
    dropdownToggle.classList.toggle("is-active");
    tailwindDropdown.classList.toggle("hidden");
  }

  function handleMapp() {
    navigate("/search", {});
  }

  function toggleMenu() {
    tailwindDropdown.classList.toggle('hidden');
    tailwindDropdown.classList.toggle('block');
  }

  return (
    <>
      <nav class="flex items-center justify-between flex-wrap bg-neutral-900 p-3">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <span class="font-semibold text-xl tracking-tight">GhostBrain</span>
        </div>
        <div class="block lg:hidden">
          <button class="flex items-center px-3 py-2 border rounded text-white border-none" onClick={toggleMenu}>
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div class="hidden w-full flex-grow lg:flex lg:justify-end lg:w-auto" ref={tailwindDropdown}>
          <div class="text-sm lg:flex lg:justify-end">
            <A class="block lg:inline-block lg:mt-0 text-white mr-1 p-3 hover:bg-neutral-700" href="/search">
              Search Songs
            </A>
            <Show
              when={loggedIn()}
              fallback={
                <div class="block lg:inline-block lg:mt-0 text-white mr-1 inline-flex">
                  <A class="p-3 inline-block hover:bg-neutral-700" href="/sign_up">
                    <strong>Sign up</strong>
                  </A>
                  <A class="p-3 inline-block hover:bg-neutral-700" href="/sign_in">
                    Log in
                  </A>
                </div>
              }
            >
              <A class="mr-1 p-3 hover:bg-neutral-700" href="/my_tracks">
                My Tracks
              </A>
              <div class="mr-1 p-3 hover:bg-neutral-700">
                <Notifications />
              </div>
              <div class="buttons">
                <button class="mr-1 p-3 hover:bg-red-400 hover:text-black" onClick={handleLogOut}>
                  Log out
                </button>
              </div>
            </Show>
          </div>
        </div>
      </nav>
    </>
  );
}
