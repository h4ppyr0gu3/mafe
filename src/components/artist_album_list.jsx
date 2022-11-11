import { getMusicBrainz } from '../utils/musicbrainz_requests';
import { useHistoryState } from '../utils/album_search_service';
import {  useResultState } from '../utils/search_service';
import AlbumEntry from './album_entry';
import { For, Show, createEffect, createSignal, onMount } from 'solid-js';

export default function ArtistAlbumList() {

  const [resultState, setResultState] = useResultState();
  const [historyState, setHistoryState] = useHistoryState();

  const [change, setChange] = createSignal();
  const [display, setDisplay] = createSignal(
    historyState.albumResult != null &&
      historyState.albumSelect == null
  );

  createEffect(() => {
    console.log(historyState.albumResult);
    console.log(historyState.albumSelect);
    setDisplay(
      historyState.albumResult != null &&
        historyState.albumSelect == null
    );
    if (!display()) {return}
    createObserver();
  })

  function createObserver() {
    let target = document.querySelector('#observed5');
    let observer = new IntersectionObserver(callback);
    observer.observe(target);
  }

  createEffect(() => {
    if (!display()) {return}
    createObserver();
  });

  function callback(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        lazyLoadAlbums();
        observer.disconnect();
      }
    })
  }

  async function lazyLoadAlbums() {
    console.log(historyState.albumCount);
    console.log(historyState.albumResult);
    if (
      historyState.albumResult.length < historyState.albumCount ||
        historyState.albumCount == null
    ) {

      console.log(historyState.albumCount);
      let params = {
        "artist": historyState.artistSelect.id,
        "offset": historyState.albumResult.length,
      }
      let path = "/release"
      await getMusicBrainz(path, params).then(() => {
        setHistoryState(
          'albumResult', 
          historyState.albumResult.concat(
            resultState.data.data.releases
          ));
        setHistoryState(
          'albumCount', 
          resultState.data.data["release-count"]
        )
      });
    }
  }

  return (
    <>
      <Show when={display()} 
        fallback={<div id="observed5" />}>
        <div class="container" id="albumList">
          <p class="label pb-3">Artists albums</p>
          <div class="columns is-multiline">
            <For each={historyState.albumResult}>{(el, i) => (
              <div class="column is-4">
                <div class="observed" id={"observed" + (historyState.albumResult.length - i())}>
                  <AlbumEntry album={el}/>
                </div>
              </div>
            )}
            </For>
          </div>
        </div>
      </Show>
      </>
  );
}
