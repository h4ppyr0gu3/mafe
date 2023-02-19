import { createSignal, Show } from "solid-js";
// import { writeSignal } from "solid-js/types/reactive/signal";
import { addTrackToLibrary } from "../utils/user_song_requests";

export default function TrendingSong(props) {
  const song = props.song;
  const toggleVideo = () => setShowVideo(!showVideo());
  const [showVideo, setShowVideo] = createSignal(false);
  var minutes = Math.floor(song.lengthSeconds / 60);
  var seconds = song.lengthSeconds - minutes * 60;
  var correctedSeconds = seconds < 10 ? "0" + seconds : seconds;
  var container;

  function largeScreen() {
    return window.innerWidth > 750;
  }

  function addToUserLibrary(event) {
    event.preventDefault()
    event.stopPropagation()
    var params = {
      video_id: song.videoId,
      title: song.title,
      artist: song.author,
      seconds: song.lengthSeconds,
    };
    addTrackToLibrary(params);
  }

  function instantDownload(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <>
      <div class="rounded-md m-5 mx-10 flex flex-col bg-neutral-700 hover:bg-neutral-500 hover:cursor-pointer" onClick={toggleVideo} ref={container} id="videoWidth">
        <div class="flex flex-row">
          <div class="flex w-1/4">
            <img
              src={ "https://img.youtube.com/vi/" + song.videoId + "/mqdefault.jpg" }
              alt={song.title}
              class="m-2 object-cover rounded-md"
            />
          </div>
          <div class="flex w-3/4 flex-row">
            <div class="flex flex-col flex-1 p-3">
              <div class="flex text-xl font-bold flex-1">{song.title}</div>
              <div class="flex flex-1">by:&nbsp;<span class="font-bold"> {song.author}</span></div>
            </div>
            <div class="lg:flex flex-col hidden lg:flex-1 p-3">
              <div class="flex flex-1">{song.publishedText}</div>
              <div class="flex flex-1">
                {minutes}:{correctedSeconds}
              </div>
            </div>
            <div class="flex flex-col flex-1 justify-center items-center">
              <div class="flex flex-1 align-middle items-center">
                <button
                  class="bg-neutral-900 rounded-lg h-fit p-2 z-10 hover:border-sky-400 border border-neutral-900 hover:underline"
                  onClick={addToUserLibrary}
                >
                  Add to tracks
                </button>
              </div>
              <div class="flex flex-1">
                <button
                  class="bg-neutral-900 h-fit rounded-lg p-2 z-10 hover:border-sky-400 border border-neutral-900 hover:underline"
                  onClick={instantDownload}
                >
                  Instant Download coming soon 
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex">
          <Show when={showVideo()}>
            <iframe
              width={container.scrollWidth}
              height={ Math.floor(container.scrollWidth / 16) * 10 }
              src={"https://www.youtube.com/embed/" + song.videoId}
              title="YouTube video player"
              frameborder="1"
              allowfullscreen
            />
          </Show>
        </div>
      </div>
    </>
  );
}
