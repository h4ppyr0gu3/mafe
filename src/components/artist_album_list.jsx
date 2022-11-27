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
    if (historyState.albumResult < 20) { return };
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
    if (target == null) { return };
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

  function fetchParams() {
    let default_params = {
        "offset": historyState.albumResult.length,
      }
    console.log(historyState);
    if (historyState.albumSearch == null) {
      default_params["artist"] =  historyState.artistSelect.id
    } else {
      default_params["query"] = historyState.albumSearch
    }
    return default_params
  }

  async function lazyLoadAlbums() {
    if (
      historyState.albumSearch == null &&
      historyState.albumResult.length < historyState.albumCount ||
        historyState.albumCount == null
    ) {

      console.log(historyState.albumCount);
      let params = fetchParams()
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

  function heading() {
    console.log(historyState.albumSearch == null);
    console.log(historyState);
    if (historyState.albumSearch == null) {
      return "Artist's Albums"
    } else {
      return "Albums"
    }
  }

  return (
    <>
      <Show when={display()} 
        fallback={<div id="observed5" />}>
        <div class="container" id="albumList">
          <p class="label pb-3">{heading()}</p>
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
