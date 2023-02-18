import {
  useSearchState,
  useResultState,
  useSearchResultState,
} from "../utils/search_service.jsx";
import { createSignal, For, Show } from "solid-js";
import TrendingSong from "./trending_song";

export function MBResults() {
  const [resultState, setResultState] = useResultState();
  const [searchState, setSearchState] = useSearchState();

  return (
    <div class="flex flex-col">
      <Show
        when={searchState.query != null}
        fallback={<p class="flex text-3xl justify-center p-2">Trending Music</p>}
      >
        <p class="flex text-3xl justify-center p-2">Search Results</p>
      </Show>
      <For each={resultState.data}>
        {(song) => <TrendingSong song={song} />}
      </For>
    </div>
  );
}
