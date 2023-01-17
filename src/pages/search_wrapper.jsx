import { Outlet, A, useLocation, useMatch } from "@solidjs/router";
import Header from "../components/header";
import Footer from "../components/footer";
import { createSignal, onMount, createEffect } from "solid-js";

export default function SearchWrapper() {

  function locationMatch(path) {
    const location = useLocation()
    return(location.pathname === path)
  }

  return (
    <>
    <Header />
    <div class="container">
      <div class="columns">
        <div class="column">
          <h1 class="is-size-2">Search</h1>
        </div>
        <div class="column">
          <div class="tabs is-right">
            <ul>
              <li classList={{ "is-active": locationMatch("/search") }}><A href="/search" >Videos</A></li>
              <li classList={{ "is-active": locationMatch("/search/by_artist") }}><A href="/search/by_artist" >By Artist</A></li>
              <li classList={{ "is-active": locationMatch("/search/by_album") }}><A href="/search/by_album" >By Album</A></li>
            </ul>
          </div>
        </div>
    </div>
  </div>
  <Outlet/>
  <Footer />
    </>
  )
}
