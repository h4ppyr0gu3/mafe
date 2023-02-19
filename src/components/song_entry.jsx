import { getInvidious } from "../utils/invidious_requests";
import { addTrackToLibrary } from "../utils/user_song_requests";
import { useHistoryState } from "../utils/album_search_service";
import { useResultState } from "../utils/search_service";
import { onMount, createSignal, Show, For } from "solid-js";
import NestedSongEntry from "./nested_song_entry";
import { addToUserTracks } from "../utils/user_requests";

export default function SongEntry(props) {
  let song = props.song;
  let videoId, lengthSeconds, publishedText, videoTitle;
  let entryPoint, correctedSeconds, image, imageUrl;
  let YTTitle, runTime, publishedTimeText, minutes;

  const [resultState, setResultState] = useResultState();
  const [historyState, setHistoryState] = useHistoryState();
  const [shouldShow, setShouldShow] = createSignal(false);
  const [result, setResult] = createSignal({});

  onMount(async () => {
    let path = "/api/v1/search";
    let params = {
      q: historyState.artistSelect.name + song.title + "audio",
      type: "video",
      sort_by: "relevance",
    };
    await getInvidious(path, params).then(() => {
      videoId = resultState.data[0].videoId;
      videoTitle = resultState.data[0].title;
      publishedText = resultState.data[0].publishedText;
      lengthSeconds = resultState.data[0].lengthSeconds;
      setResult(resultState.data);
      minutes = Math.floor(lengthSeconds / 60);
      var seconds = lengthSeconds - minutes * 60;
      correctedSeconds = seconds < 10 ? "0" + seconds : seconds;
      loadInvidiousData();
    });
  });

  function loadInvidiousData() {
    imageUrl = "https://img.youtube.com/vi/" + videoId + "/mqdefault.jpg";
    image.src = imageUrl;
    YTTitle.innerHTML = "<span class='text-xl font-bold'>YT title: </span>" + videoTitle;
    runTime.innerHTML = "length: " + minutes + ":" + correctedSeconds;
    publishedTimeText.innerHTML = publishedText;
  }

  function handleShowMore() {
    setShouldShow(!shouldShow());
  }

  function nextFour(array) {
    return array.slice(1, 5);
  }

  function addToTracks() {
    var params = {
      video_id: videoId,
      title: song.title,
      artist: historyState.artistSelect.name,
      album: historyState.albumSelect.title,
      year: historyState.albumSelect.date.substring(0, 4),
      // genre: historyState.genreSelect.name,
      seconds: lengthSeconds,
    };
    addTrackToLibrary(params);
  }

  return (
    <div class="rounded-md m-5 flex flex-col bg-neutral-800 flex flex-col">
      <div class="flex flex-row">
        <div class="flex w-1/4">
          <img src="" alt={song.title} ref={image} />
        </div>
        <div class="flex w-3/4 flex-row">
          <div class="flex-col flex flex-1">
            <div class="flex text-xl font-bold">{song.title}</div>
            <p ref={YTTitle} class="flex text-xl">YT title: ... </p>
          </div>
          <div class="flex flex-col flex-1">
            <div class="flex">
              <p ref={runTime}> length: ...</p>
            </div>
            <div class="flex">
              <p ref={publishedTimeText}> time: ... </p>
            </div>
            <div class="flex">
              {song["first-release-date"].substring(0,4)} {song.type} {song.gender}
            </div>
            <div class="flex">{song.disambiguation}</div>
          </div>
          <div class="flex flex-col flex-1">
            <div class="flex flex-1"/>
            <div class="flex flex-1">
              <div class="bg-neutral-900 hover:border-sky-400 border border-transparent p-3 hover:cursor-pointer m-1 rounded-md" onClick={addToTracks}>
                Add to Tracks
              </div>
            </div>
            <div class="flex flex-1"/>
            <div class="flex flex-1">
              <div class="bg-neutral-900 hover:border-sky-400 border border-transparent p-3 hover:cursor-pointer m-1 rounded-md" onClick={handleShowMore}>
                Show more results
              </div>
            </div>
            <div class="flex flex-1"/>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <Show when={shouldShow()} fallback={<div />}>
          <For each={nextFour(result())}>
            {(i) => (
              <div>
                <NestedSongEntry song={i} />
              </div>
            )}
          </For>
        </Show>
      </div>
    </div>
  );
}
