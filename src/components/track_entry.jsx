import { Show, createSignal } from "solid-js";

export default function TrackEntry(props) {
  const song = props.song;
  const toggleVideo = () => setShowVideo(!showVideo())
  const [showVideo, setShowVideo] = createSignal(false);
  var minutes = Math.floor(song.lengthSeconds / 60);
  var seconds = song.lengthSeconds - (minutes * 60);
  var correctedSeconds = 
    seconds < 10 ? "0" + seconds : seconds;

  function largeScreen() {
    return window.innerWidth > 750;
  }

  return (
    <>
    <div class="card m-5">
      <div class="columns">
        <div class="column is-3">
          <img src={"https://img.youtube.com/vi/" +
          song.video_id + "/mqdefault.jpg"} alt={song.title}
          style={{"border-radius":"5px"}} class="ml-2" />
        </div>
        <div class="column">
          <div class="columns">
            <div class="column">
              {song.title}
            </div>
            <div class="column">
              {song.artist}
            </div>
          </div>
          <Show when={largeScreen()} >
            <div class="columns">
              <div class="column">
                {song.publishedText}
              </div>
              <div class="column">
                {minutes}:{correctedSeconds}
              </div>
            </div>
          </Show>
          <div class="columns">
            <div class="column">
              <button class="button mx-3">
                Download
              </button>
              <button class="button mx-3">
                Remove from Tracks
              </button>
              <button class="button is-success mx-3">
                Play
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
