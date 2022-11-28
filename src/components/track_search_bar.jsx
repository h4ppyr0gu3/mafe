import { InputField, InputButton } from "../components/input_field";
import { onMount, createSignal, Show } from "solid-js";
import { getUsersTracks } from "../utils/user_song_requests";
import { useResultState } from "../utils/search_service.jsx";
import TrackEntry from "./track_entry";

export default function TrackSearchBar() {
  let query, searchButton, sortBy, state;
  let filters, pagination, params;

  const [resultState, setResultState] = useResultState();
  const [songs, setSongs] = createSignal();
  const [more, setMore] = createSignal(false);

  onMount(async () => {
    // read the url bar
    filters = {query: null, sortBy: "default", queryField: null, state: "all"} 
    pagination = {offset: 0, limit: 20}
    params = { filters: filters, pagination: pagination }
    getUsersTracks(params).then(() => {
      console.log(resultState.data);
      setSongs(resultState.data);
      console.log(songs());
    });
  });

  function handleSubmit(event) {
    event.preventDefault();
    console.log(sortBy.value);
    console.log(query.value);
  }

  function handleMore() { setMore(!more()) }

  return (
    <>
    <div class="my-5">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="field pl-2 is-grouped is-grouped-multiline">
              <div class="control">
                <input class="input" type="text" ref={query} placeholder="Enter Phrase or URL" />
              </div>
              <div class="control">
                <input class="button darker" type="submit" value="Search" onClick={handleSubmit} ref={searchButton} />
              </div>
            </div>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <div class="button is-inverted is-outlined" onClick={handleMore}>
              More Options
            </div>
          </div>
        </div>
      </div>
      <Show when={more()} fallback={<div/>}>
        <div class="field pl-2 is-grouped is-grouped-multiline">
          <div class="control">
            <span class="select">
              <select ref={sortBy}>
                <option value="default">Sort by</option>
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
            <div class="button is-info is-outlined">
              Download All
            </div>
          </div>
          <div class="control">
            <div class="button is-primary is-outlined">
              Download Remaining
            </div>
          </div>
          <div class="control">
            <div class="button is-danger is-outlined">
              Update All Metadata
            </div>
          </div>
          <div class="control">
            <div class="button is-danger is-outlined">
              ReDownload on Server
            </div>
          </div>
        </div>
      </Show>
    </div>
    <For each={songs()}>{(el) => (
    <TrackEntry song={el}/>
    )}
  </For>
  </>
  );
}
