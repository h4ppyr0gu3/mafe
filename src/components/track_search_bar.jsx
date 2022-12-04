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
  const [more, setMore] = createSignal(false);
  const [totalCount, setTotalCount] = createSignal(0);
  const [displaySongs, setDisplaySongs] = createSignal(false);

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
    console.log("download all");
  }
  function handleRedownload() {
    console.log("re download");
  }
  function handleUpdateMetadata() {
    console.log("update metadata");
  }
  function handleDownloadRemaining() {
    console.log("remaining");
  }

  function handleMore() {
    setMore(!more());
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
      <form onSubmit={handleSubmit}>
        <div class="my-5">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <div class="field pl-2 is-grouped is-grouped-multiline">
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      ref={query}
                      placeholder="Enter Phrase or URL"
                    />
                  </div>
                  <div class="control">
                    <input
                      class="button darker"
                      type="submit"
                      value="Search"
                      onClick={handleSubmit}
                      ref={searchButton}
                    />
                  </div>
                  <div class="control">
                    <button
                      class="button darker"
                      value="Search"
                      onClick={handleReset}
                    >
                      Reset Search
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="level-right">
              <div class="level-item">
                <div
                  class="button is-inverted is-outlined"
                  onClick={handleMore}
                >
                  More Options
                </div>
              </div>
            </div>
          </div>
          <Show
            when={more()}
            fallback={
              <div>
                <div ref={queryField} value={null} />
                <div ref={state} value={null} />
                <div ref={limit} value={null} />
              </div>
            }
          >
            <div class="field pl-2 is-grouped is-grouped-multiline">
              <div class="control">
                <span class="select">
                  <select ref={queryField}>
                    <option value="all">Search by</option>
                    <option>title</option>
                    <option>artist</option>
                    <option>genre</option>
                    <option>date</option>
                  </select>
                </span>
              </div>
              <div class="control">
                <span class="select">
                  <select ref={state}>
                    <option>all</option>
                    <option>not updated</option>
                    <option>only updated</option>
                    <option>downloaded</option>
                    <option>not downloaded</option>
                  </select>
                </span>
              </div>
              <div class="control">
                <input type="number" value="20" class="input" />
              </div>
              <div class="control">
                <div
                  class="button is-info is-outlined"
                  onClick={handleDownloadAll}
                >
                  Download All
                </div>
                <div class="help">creates zip file</div>
              </div>
              <div class="control">
                <div
                  class="button is-primary is-outlined"
                  onClick={handleDownloadRemaining}
                >
                  Download Remaining
                </div>
                <div class="help">creates zip file</div>
              </div>
              <div class="control">
                <div
                  class="button is-danger is-outlined"
                  onClick={handleUpdateMetadata}
                >
                  Update All Metadata
                </div>
                <div class="help">runs background job</div>
              </div>
              <div class="control">
                <div
                  class="button is-danger is-outlined"
                  onClick={handleRedownload}
                >
                  ReDownload on Server
                </div>
                <div class="help">runs background job</div>
              </div>
            </div>
          </Show>
        </div>
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
