import { getInvidious } from '../utils/invidious_requests';
import { useHistoryState } from '../utils/album_search_service';
import {  useResultState } from '../utils/search_service';
import { onMount, createSignal, Show, For } from 'solid-js';
import NestedSongEntry from './nested_song_entry';

export default function SongEntry(props) {
  let song = props.song
  let videoId, lengthSeconds, publishedText, videoTitle;
  let entryPoint, correctedSeconds, image, imageUrl;
  let YTTitle, runTime, publishedTimeText, minutes;

  const [resultState, setResultState] = useResultState();
  const [historyState, setHistoryState] = useHistoryState();
  const [shouldShow, setShouldShow] = createSignal(false);

  onMount(async () => {
    let path = "/api/v1/search"
    let params = {
      "q": historyState.artistSelect.name + song.title + "audio",
      "type": "video",
      "sort_by": "relevance",
    }
    await getInvidious(path, params).then(() => {
      // console.log(resultState.data[0]);
      videoId = resultState.data[0].videoId;
      videoTitle = resultState.data[0].title;
      publishedText = resultState.data[0].publishedText;
      lengthSeconds = resultState.data[0].lengthSeconds;
      minutes = Math.floor(lengthSeconds / 60);
      var seconds = lengthSeconds - (minutes * 60);
      correctedSeconds = 
        seconds < 10 ? "0" + seconds : seconds;
      loadInvidiousData();
    })
  });

  function loadInvidiousData() {
    imageUrl = 'https://img.youtube.com/vi/' +
      videoId + '/mqdefault.jpg'
    image.src = imageUrl;
    YTTitle.innerHTML = "YT title: " + videoTitle;
    runTime.innerHTML = "length: " + minutes + ":" + correctedSeconds;
    publishedTimeText.innerHTML = publishedText;
  }

  // async function handleClick() {
  //   console.log("handle click");
  //   let params = {
  //     "song": song.id,
  //   }
  //   let path = "/release"
  //   await getMusicBrainz(path, params).then(() => {
  //     setHistoryState('albumResult', resultState.data.data.releases);
  //     setHistoryState('songSelect', song);
  //   });
  // }

  function handleShowMore() {
    // event.preventDefault();
    console.log("clicked");
    console.log(resultState.data[2]);
    console.log(shouldShow());
    console.log(videoId);
    setShouldShow(!shouldShow());
  }

  function nextFour(array) {
    return array.slice(1, 5);
  }

  function innerSong(props) {
    return (
      <div>
        <p> {input} </p>
      </div>
    )
  }

  return (
    <div class="card p-3">
      <div class="title">
        {song.title}
      </div>
      <div class='card-image'>
        <figure class='image is-4by3'>
          <img src="" alt={song.title} ref={image}/>
        </figure>
      </div>
      <div ref={entryPoint} />
      <div class="subtitle">
        {song["first-release-date"]} {song.type} {song.gender}
      </div>
      <p ref={YTTitle}> YT title: ... </p>
      <p ref={runTime}> length: ...</p>
      <p ref={publishedTimeText}> time: ... </p>
      <div class="content">
        {song.disambiguation}
      </div>
      <div class="columns">
        <div class="column">
          <div class="button">
            Add to Tracks
          </div>
        </div>
        <div class="column">
          <div class="button" onClick={handleShowMore}>
            Show more results
          </div>
        </div>
      </div>
      <Show when={shouldShow()} fallback={<div/>}>
        <For each={nextFour(resultState.data)}>{(i) => (
          <div>
          <p> {i.title} </p>
            <NestedSongEntry song={i}/>
          </div>
        )}
        </For>
      </Show>
    </div>
  );
}
// <NestedSongList songs={resultState.data}/>
