import { createSignal, Show } from "solid-js";


export default function TrendingSong(props) {

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

  function addToUserLibrary() {
    console.log("adding to library");
  }

  return (
    <>
      <div class="card m-5">
        <div class="columns">
          <div class="column is-3">
            <img src={"https://img.youtube.com/vi/" +
              song.videoId + "/mqdefault.jpg"} alt={song.title}
              style={{"border-radius":"5px"}} class="ml-2"
              />
          </div>
          <div class="column">
            <div class="columns">
              <div class="column">
                {song.title}
              </div>
              <div class="column">
                {song.author}
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
                <button class="button mx-3" 
                  onClick={toggleVideo}>
                  Watch Video
                </button>
                <button class="button is-success mx-3"
                  onClick={addToUserLibrary}>
                  Add to Library
                </button>
              </div>
            </div>
          </div>
        </div>
        <Show when={showVideo()} >
          <iframe width={
            largeScreen() ? 560 : window.innerWidth - 30} 
            height={largeScreen() ? 315 : 
              (Math.floor(window.innerWidth / 16) * 9)} 
            src={
            "https://www.youtube.com/embed/" + song.videoId
          }
            title="YouTube video player" frameborder="0" 
            allowfullscreen />
        </Show>
      </div>
      </>
  );
}
