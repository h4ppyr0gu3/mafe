import { useSearchState, useResultState } from "../utils/search_service.jsx";

import { createSignal, For } from "solid-js";
import TrendingSong from "./trending_song";

export function MBResults() {
  const [resultState, setResultState] = useResultState();
  const [searchState, setSearchState] = useSearchState();

  return (
    <div class="container" >  
      <Show when={searchState.query != null} fallback={
        <p class="p-5 is-size-4">Trending Music</p>
      }>
        <p class="p-5 is-size-4">Search Results</p>
      </Show>
      <For each={resultState.data}>
        {(song) => (
          <TrendingSong song={song}/>
        )}
      </For>
    </div>
  )
}
