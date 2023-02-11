import { Routes, Route } from "@solidjs/router";
import SignIn from "./pages/sign_in";
import SignUp from "./pages/sign_up";
import Landing from "./pages/landing";
import YTSearch from "./pages/yt_search";
import AlbumByArtistSearch from "./pages/album_by_artist_search";
import AlbumByNameSearch from "./pages/album_by_name_search";
import MyTracks from "./pages/my_tracks";
import { onMount } from "solid-js";
import SearchWrapper from "./pages/search_wrapper";
// import { Router } from "@solidjs/router";
// import Search from "./pages/search";

export default function App() {
  onMount(() => {
    window.backend_server = import.meta.env.VITE_API_URL;
    window.frontendServer = import.meta.env.VITE_BASE_URL;
    // test login
    // redirect_to_login();
  })

  return (
    <>
      <Routes>
        <Route path="/" component={Landing} />
        <Route path="/search" component={SearchWrapper} >
          <Route path="/" component={YTSearch} />
          <Route path="/by_artist" component={AlbumByArtistSearch} />
          <Route path="/by_album" component={AlbumByNameSearch} />
        </Route>
        <Route path="/my_tracks" component={MyTracks} />
        <Route path="/sign_up" component={SignUp} />
        <Route path="/login" component={SignIn} />
        <Route path="/sign_in" component={SignIn} />
        <Route path="/album_by_artist" component={AlbumByArtistSearch} />
        <Route path="/album_by_name" component={AlbumByNameSearch} />
      </Routes>
    </>
  );
}
