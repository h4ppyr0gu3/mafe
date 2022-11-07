import { useSearchState, useResultState } from "../utils/search_service.jsx";

import { createSignal, For } from "solid-js";
import TrendingSong from "./trending_song";

export function MBResults() {
  const [resultState, setResultState] = useResultState();

  return (
    <div class="container" >  
      <p class="p-5">Trending Music</p>
      <For each={resultState.data}>
        {(song) => (
          <TrendingSong song={song}/>
        )}
      </For>
    </div>
  )
}
