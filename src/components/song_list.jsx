import { useHistoryState } from "../utils/album_search_service";
import { useResultState } from "../utils/search_service";
import { getMusicBrainz } from "../utils/musicbrainz_requests";
import { For, Show, createEffect, createSignal } from "solid-js";
import SongEntry from "./song_entry";

export default function songList() {
  const [historyState, setHistoryState] = useHistoryState();
  const [display, setDisplay] = createSignal(false);

  createEffect(() => {
    console.log(historyState.artistSelect);
    setDisplay(historyState.albumSongs != null && historyState.artistSelect != null)
  });

  return (
    <>
      <Show when={display()} fallback={<div />}>
        <div class="flex flex-col">
          <p class="flex text-3xl justify-center p-2">song list</p>
            <For each={historyState.albumSongs}>
              {(el) => (
                <SongEntry song={el} />
              )}
            </For>
          </div>
      </Show>
    </>
  );
}
