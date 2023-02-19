import { InputField, InputButton } from "../components/input_field";
import { onMount, createSignal, Show, For, createEffect } from "solid-js";
import { getUsersTracks } from "../utils/user_song_requests";
import { useResultState } from "../utils/search_service.jsx";
import TrackEntry from "./track_entry";

export default function TrackSearchBar() {
  let query, searchButton, sortBy, state, limit, queryField, offset;
  let filters, pagination, params;

  const [resultState, setResultState] = useResultState();
  const [songs, setSongs] = createSignal([]);
  const [moreOptions, setMoreOptions] = createSignal(false);
  const [totalCount, setTotalCount] = createSignal(0);
  const [displaySongs, setDisplaySongs] = createSignal(false);
  limit = {value: 20};
  queryField = {value: "all"};
  state = {value: "all"};

  createEffect(() => {
    if (songs().length > 0) {
      setDisplaySongs(true);
      if (songs().length < totalCount()) {
        createObserver();
      }
    }
  });

  onMount(async () => {
    // read the url bar
    filters = { query: null, queryField: null, state: "all" };
    pagination = { offset: 0, limit: 20 };
    params = { filters: filters, pagination: pagination };
    getUsersTracks(params).then(() => {
      setSongs(resultState.data.songs);
      setTotalCount(resultState.data.total_count);
    });
  });

  function lazyLoadSongs() {
    offset = songs().length;
    limit = limit.value || 20;
    filters = {
      query: query.value,
      queryField: queryField.value || "all",
      state: state.value || "all",
    };
    pagination = { offset: offset || 0, limit: limit.value || 20 };
    params = { filters: filters, pagination: pagination };
    getUsersTracks(params).then(() => {
      setSongs(songs().concat(resultState.data.songs));
      setTotalCount(resultState.data.total_count);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (query.value === "") return;
    filters = {
      query: query.value,
      queryField: queryField.value || "all",
      state: state.value || "all",
    };
    pagination = { offset: 0, limit: 20 };
    params = { filters: filters, pagination: pagination };
    getUsersTracks(params).then(() => {
      setSongs(resultState.data.songs);
      setTotalCount(resultState.data.total_count);
    });
  }

  function createObserver() {
    let target = document.querySelector("#observed5");
    let observer = new IntersectionObserver(callback);
    if (target == null) {
      return;
    }
    observer.observe(target);
  }

  function callback(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        lazyLoadSongs();
        observer.disconnect();
      }
    });
  }

  function handleDownloadAll() {
  }
  function handleRedownload() {
  }
  function handleUpdateMetadata() {
  }
  function handleDownloadRemaining() {
  }

  function toggleMoreOptions() {
    setMoreOptions(!moreOptions());
  }

  function handleReset(event) {
    event.preventDefault();
    query.value = "";
    filters = { query: null, queryField: null, state: "all" };
    pagination = { offset: 0, limit: 20 };
    params = { filters: filters, pagination: pagination };
    getUsersTracks(params).then(() => {
      setSongs(resultState.data.songs);
      setTotalCount(resultState.data.total_count);
    });
  }

  return (
    <>
      <form class="mx-5 flex flex-col bg-neutral-800 rounded-lg p-8 my-10" onSubmit={handleSubmit}>
        <div class="bg-neutral-800 text-white text-2xl font-bold p-2 rounded-t-lg flex-row flex">
          <div class="flex flex-1">
            Search Your Songs
          </div>
          <div class="flex flex-1 justify-end align-middle">
            <span class="test-sm font-normal">total:</span>&nbsp; {totalCount()}
          </div>
        </div>
        <input
          class="flex p-3 bg-neutral-600 rounded-t-lg focus:outline-none text-white"
          type="text"
          ref={query}
          placeholder="Enter Phrase"
        />
        <Show when={moreOptions()} fallback={
          <button type="button" class="bg-neutral-600 border-neutral-800 border-y hover:bg-sky-400" onClick={toggleMoreOptions}>More Options </button>
        }>
          <div class="flex-row flex bg-neutral-600 border-t border-neutral-800 justify-around pt-3">
            <div class="flex">
              <select ref={queryField} class="rounded-md bg-neutral-700 text-white shadow-sm hover:cursor-pointer p-2">
                <option value="all">Search by</option>
                <option>title</option>
                <option>artist</option>
                <option>genre</option>
                <option>date</option>
              </select>
            </div>
            <div class="flex">
              <select ref={state} class="rounded-md bg-neutral-700 text-white shadow-sm hover:cursor-pointer p-2">
                <option>all</option>
                <option>not updated</option>
                <option>only updated</option>
                <option>downloaded</option>
                <option>not downloaded</option>
              </select>
            </div>
            <div class="flex flex-row">
              <div class="flex">
                <input type="number" value="20" class="block px-3 py-1.5 font-normal bg-neutral-700 text-white bg-clip-padding rounded m-0" />
              </div>
              <div class="flex">
                per page
              </div>
            </div>
          </div>
          <div class="flex flex-row bg-neutral-600 justify-around py-3">
            <div class="flex flex-col">
              <div
                class="rounded-md p-3 flex bg-neutral-700 text-white shadow-sm hover:cursor-pointer"
                onClick={handleDownloadAll}
              >
                Download All
              </div>
              <div class="text-sm text-white flex">creates zip file</div>
            </div>
            <div class="flex flex-col">
              <div
                class="rounded-md p-3 flex bg-neutral-700 text-white shadow-sm hover:cursor-pointer"
                onClick={handleDownloadRemaining}
              >
                Download Remaining
              </div>
              <div class="text-sm text-white flex">creates zip file</div>
            </div>
            <div class="flex flex-col">
              <div
                class="rounded-md flex p-3 bg-neutral-700 text-white shadow-sm hover:cursor-pointer"
                onClick={handleUpdateMetadata}
              >
                Update All Metadata
              </div>
              <div class="text-sm flex text-white">runs background job</div>
            </div>
            <div class="flex flex-col">
              <div
                class="rounded-md flex p-3 bg-neutral-700 text-white shadow-sm hover:cursor-pointer"
                onClick={handleRedownload}
              >
                ReDownload on Server
              </div>
              <div class="text-sm text-white flex">runs background job</div>
            </div>
          </div>
          <button class="bg-neutral-600 border-neutral-800 border-y hover:bg-sky-400" onClick={toggleMoreOptions}>Less Options </button>
        </Show>
        <input
          class="flex p-3 bg-neutral-600 rounded-b-lg text-white hover:cursor-pointer hover:bg-sky-400"
          type="submit"
          value="Search"
        />
      </form>
      <Show when={displaySongs()} fallback={<div id="observed5" />}>
        <For each={songs()}>
          {(el, i) => (
            <div id={"observed" + (songs().length - i())}>
              <TrackEntry song={el} />
            </div>
          )}
        </For>
      </Show>
    </>
  );
}
