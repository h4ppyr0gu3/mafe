import { useHistoryState } from "../utils/album_search_service";
import { useResultState } from "../utils/search_service";
import { getMusicBrainz } from "../utils/musicbrainz_requests";
import { For, Show } from "solid-js";
import ArtistEntry from "./artist_entry";

// import
// {
//   artistSearch: null,
//   artistResult: null,
//   artistSelect: null,
//   albumResult: null,
//   albumSelect: null,
// }
//

export default function ArtistList() {
  const [historyState, setHistoryState] = useHistoryState();

  return (
    <>
      <Show
        when={
          historyState.artistResult != null && historyState.albumResult == null
        }
        fallback={<div />}
      >
        <div class="container">
          <p class="label pb-3">Artist list</p>
          <div class="columns is-multiline">
            <For each={historyState.artistResult}>
              {(el) => (
                <div class="column is-4">
                  <ArtistEntry artist={el} />
                </div>
              )}
            </For>
          </div>
        </div>
      </Show>
    </>
  );
}
