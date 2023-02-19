import { useHistoryState } from "../utils/album_search_service";
import { useResultState } from "../utils/search_service";
import { getMusicBrainz } from "../utils/musicbrainz_requests";
import { For, Show } from "solid-js";
import ArtistEntry from "./artist_entry";

export default function ArtistList() {
  const [historyState, setHistoryState] = useHistoryState();

  return (
    <>
      <Show
        when={
          historyState.artistResult != null &&
            historyState.albumResult == null &&
            historyState.albumSongs == null
        }
        fallback={<div />}
      >
        <div class="py-5 flex-col">
          <p class="text-3xl pb-3 text-white flex text-3xl justify-center">Artist list</p>
          <div class="p-3">
            <For each={historyState.artistResult}>
              {(el) => (
                <ArtistEntry artist={el} />
              )}
            </For>
          </div>
        </div>
      </Show>
    </>
  );
}
