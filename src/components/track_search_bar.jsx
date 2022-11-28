import { InputField, InputButton } from "../components/input_field";
import { onMount, createSignal } from "solid-js";
import { getUsersTracks } from "../utils/user_song_requests";
import { useResultState } from "../utils/search_service.jsx";
import TrackEntry from "./track_entry";

export default function TrackSearchBar() {
  let query, searchButton;
  let filters, pagination, params;

  const [resultState, setResultState] = useResultState();
  const [songs, setSongs] = createSignal();

  onMount(async () => {
    filters = {query: null, sortBy: "default", queryField: null} 
    pagination = {offset: 0, limit: 20}
    params = { filters: filters, pagination: pagination }
    getUsersTracks(params).then(() => {
      console.log(resultState.data);
      setSongs(resultState.data);
      console.log(songs());
    });
  });

  function handleSubmit() {
  }

  return (
    <>
    <form class="my-5">
      <div class="columns">
        <div class="column">
          <div class="field pl-2 is-grouped is-grouped-multiline">
            <div class="control">
              <input class="input" type="text" ref={query} placeholder="Enter Phrase or URL" />
            </div>
            <div class="control">
              <input class="button darker" type="submit" value="Search" onClick={handleSubmit} ref={searchButton} />
            </div>
          </div>
        </div>
        <div class="column">
          <button class="button darker">Test</button>
        </div>
      </div>
    </form>
    <For each={songs()}>{(el) => (
      <TrackEntry song={el}/>
    )}
    </For>
  </>
  );
}
