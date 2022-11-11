import { useHistoryState } from '../utils/album_search_service';
import {  useResultState } from '../utils/search_service';
import { getMusicBrainz } from '../utils/musicbrainz_requests';
import { For, Show, createEffect } from 'solid-js';
import SongEntry from './song_entry';

export default function songList() {

  const [historyState, setHistoryState] = useHistoryState();

  createEffect(() => {
    console.log(historyState.albumSongs);
  })

  return (
    <>

      <p class="label pb-3">song list</p>
      <Show when={
        historyState.albumSongs != null
      } 
        fallback={<div />}>
        <div class="container">
          <div class="columns is-multiline">
            <For each={historyState.albumSongs}>
              {(el) => (
                <div class="column is-6">
                  <SongEntry song={el}/>
                </div>
              )}
            </For>
          </div>
        </div>
      </Show>
      </>
  );
}
