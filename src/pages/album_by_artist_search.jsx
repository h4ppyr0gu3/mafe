import ArtistNames from "../components/artist_search";
import ArtistList from "../components/artist_list";
import ArtistAlbumList from "../components/artist_album_list";
import SongList from "../components/song_list";
import Footer from "../components/footer";
import Header from "../components/header";
import { A } from "@solidjs/router";

export default function AlbumByArtistSearch() {

  function locationMatch(path) {
    const location = useLocation()
    return(location.pathname === path)
  }
  return (
    <>
      <Header />
      <div class="bg-neutral-900">
        <div class="flex-row flex">
          <div class="flex text-3xl w-7/12 p-3 m-3">
            Search
          </div>
          <div class="flex mx-4 w-5/12 h-min-full">
            <ul class="flex-row flex w-full space-x-2 justify-center m-auto">
              <li class="flex rounded-full bg-neutral-900 py-1 px-3 border border-sky-400 text-sm font-semibold text-gray-600">
                <A href="/search" 
                  class="hover:text-sky-400 text-white font-semibold"
                >Videos</A></li>
              <li class="flex rounded-full bg-neutral-800 py-1 px-3 text-sm font-semibold text-gray-600 "><A href="/search/by_artist" class="hover:text-gray-600" >By Artist</A></li>
              <li class="flex rounded-full bg-neutral-900 border border-sky-400 hover:text-sky-400 py-1 px-3 text-sm font-semibold text-gray-600">
                <A href="/search/by_album" 
                  class="hover:text-sky-400 text-white font-semibold"
                >By Album</A></li>
            </ul>
          </div>
        </div>
      </div>

      <ArtistNames />
      <ArtistList />
      <ArtistAlbumList />
      <SongList />
    </>
  );
}
// <div class="flex flex-wrap justify-center gap-2">
//   <span class="rounded-full bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-600"> Badge </span>
//   <span class="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-600"> Badge </span>
//   <span class="rounded-full bg-yellow-50 px-3 py-1 text-sm font-semibold text-yellow-600"> Badge </span>
//   <span class="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600"> Badge </span>
//   <span class="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600"> Badge </span>
//   <span class="rounded-full bg-black px-3 py-1 text-sm font-semibold text-white"> Badge </span>
// </div>
