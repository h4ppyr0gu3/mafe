import { InputField, InputButton } from "./input_field";
import Fuse from "fuse.js";
import { Show, createSignal, For, onMount } from "solid-js";
import { Portal } from "solid-js/web";
import { createStore, produce } from "solid-js/store";
import { getMusicBrainz } from "../utils/musicbrainz_requests";
import { useResultState } from "../utils/search_service";
import { createNotification } from "../utils/notifications";

const [songParams, setSongParams] = createStore({
  title: null,
  genre: null,
  year: null,
  artists: null,
  album: null,
});

export const useSongParams = () => [songParams, setSongParams];

export function Autofill(props) {
  let forceUpdate = props.forceUpdate;
  let close = props.close;
  let title, genres, year, artists, totalSeconds, songSearch;
  let path, params, artistSongCount, songSelection, artistSelection;

  const [resultState, setResultState] = useResultState();

  const [artistDropdown, setArtistDropdown] = createSignal(false);
  const [songDropdown, setSongDropdown] = createSignal(false);
  const [albumDropdown, setAlbumDropdown] = createSignal(false);
  const [loadedSongs, setLoadedSongs] = createSignal(false);

  const [albumResult, setAlbumResult] = createSignal([]);
  const [artistOptions, setArtistOptions] = createSignal([]);
  const [searchResults, setSearchResults] = createSignal([]);
  const [albumSearchResults, setAlbumSearchResults] = createSignal([]);
  const [songOptions, setSongOptions] = createSignal([]);

  onMount(() => {
    if (songParams.artists == null || songParams.artists == "") {
      createNotification("You need to fill in artists before auto filling", "info")
      return;
    }
    path = "/artist";
    params = { query: songParams.artists, limit: 6 };
    getMusicBrainz(path, params).then(() => {
      setArtistOptions(resultState.data.data.artists.slice(0, 5));
      setArtistDropdown(true);
    });
  });

  function handleSearch(event) {
    let fuseOptions = {
      includeScore: true,
      isCaseSensitive: false,
      shouldSort: true,
      keys: ["title"],
    };
    const fuse = new Fuse(songOptions(), fuseOptions);
    setSearchResults(fuse.search(event.target.value));
  }

  function handleAlbumSearch(event) {
    let fuseOptions = {
      includeScore: true,
      isCaseSensitive: false,
      shouldSort: true,
      keys: ["title"],
    };
    const fuse = new Fuse(albumResult(), fuseOptions);
    setAlbumSearchResults(fuse.search(event.target.value));
  }

  async function handleArtistChange(event) {
    let count = 0;
    path = "/recording";
    params = { artist: event.target.value, limit: 100 };
    getMusicBrainz(path, params).then(() => {
      setSongOptions(resultState.data.data.recordings);
      setSongDropdown(true);
      artistSongCount = resultState.data.data["recording-count"];
      if (artistOptions().length < artistSongCount) {
        callAgain(path, params);
      }
    });
  }

  function handleSelectResult(event) {
    console.log(event);
    setSongParams(produce((song) => (song.title = event.target.title)));
    songSearch.value = event.target.title;
    setSearchResults([]);
    path = "/recording/" + event.target.value;
    params = { inc: "artists+releases+genres" };
    getMusicBrainz(path, params).then(() => {
      setArtists();
      setGenres();
      setAlbumResult(resultState.data.data.releases);
      setAlbumSearchResults(
        resultState.data.data.releases.map((rel) => {
          return { item: rel };
        })
      );
      setAlbumDropdown(true);
    });
  }

  function setGenres() {
    genres = "";
    resultState.data.data.genres.forEach((genre) => {
      if (genres == "") {
        genres = genre.name;
      } else {
        genres = genres + "; " + genre.name;
      }
    });
    console.log(genres);
    console.log(resultState.data.data);
    setSongParams(produce((song) => (song.genre = genres)));
  }

  function setArtists() {
    artists = "";
    resultState.data.data["artist-credit"].forEach((artist) => {
      if (artists == "") {
        artists = artist.name;
      } else {
        artists = artists + "; " + artist.name;
      }
    });
    setSongParams(produce((song) => (song.artists = artists)));
  }

  async function callAgain(path, params) {
    if (songOptions().length < artistSongCount) {
      params.offset = songOptions().length;
      getMusicBrainz(path, params).then(() => {
        if (songOptions().length > 200) {
          setSongOptions(
            songOptions().concat(resultState.data.data.recordings)
          );
          setTimeout(() => {
            callAgain(path, params);
          }, 1500);
        } else {
          setSongOptions(
            songOptions().concat(resultState.data.data.recordings)
          );
          setTimeout(() => {
            callAgain(path, params);
          }, 200);
        }
      });
    } else {
      setLoadedSongs(true);
    }
  }

  function handleSelectAlbum(event) {
    setSongParams(produce((song) => (song.album = event.target.title)));
    setSongParams(produce((song) => (song.year = event.target.value)));
    console.log(songParams);
    close();
    forceUpdate();
  }

  return (
    <>
      <Show when={artistDropdown()} fallback={<div />}>
        <div class="field">
          <div class="label">Select Artist</div>
          <div class="control">
            <select
              onChange={handleArtistChange}
              class="input"
              ref={artistSelection}
            >
              <option value={null}>Select Artist</option>
              <For each={artistOptions()}>
                {(el) => <option value={el.id}>{el.name}</option>}
              </For>
            </select>
          </div>
        </div>
      </Show>
      <Show when={songDropdown()} fallback={<div />}>
        <>
          <Show
            when={loadedSongs()}
            fallback={
              <div class="label">
                Please wait whilst we load the artists songs
              </div>
            }
          >
            <div class="field">
              <div class="label">Selected Artist's Songs</div>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  ref={songSearch}
                  placeholder="start typing to find song ..."
                  onInput={handleSearch}
                />
              </div>
            </div>
          </Show>
          <div class="panel">
            <For each={searchResults()}>
              {(el) => (
                <div
                  class="panel-block has-text-white"
                  onClick={handleSelectResult}
                >
                  <div class="columns" style={{"width":"100%"}}>
                    <div
                      class="column"
                      value={el.item.id}
                      title={el.item.title}
                    >
                      {el.item.title}
                    </div>
                    <div
                      class="column has-text-grey is-size-7"
                      value={el.item.id}
                      title={el.item.title}
                    >
                      {el.item.disambiguation} {" => "}
                      {el.item["first-release-date"]}
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
        </>
      </Show>
      <Show when={albumDropdown()} fallback={<div />}>
        <>
          <div class="field">
            <div class="label">Selected Song's Album</div>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="start typing to find song ..."
                onInput={handleAlbumSearch}
              />
            </div>
          </div>
          <div class="panel">
            <For each={albumSearchResults()}>
              {(el) => (
                <div
                  class="panel-block has-text-white"
                  value={el.item.date.slice(0, 4)}
                  onClick={handleSelectAlbum}
                  title={el.item.title}
                >
                  <div class="columns" style={{"width":"100%"}}>
                    <div
                      class="column"
                      value={el.item.date.slice(0, 4)}
                      title={el.item.title}
                    >
                      {el.item.title}
                    </div>
                    <div
                      class="column"
                      value={el.item.date.slice(0, 4)}
                      title={el.item.title}
                    >
                      {el.item.disambiguation} {el.item["first-release-date"]}
                    </div>
                  </div>
                  {el.item.title}
                </div>
              )}
            </For>
          </div>
        </>
      </Show>
    </>
  );
}
