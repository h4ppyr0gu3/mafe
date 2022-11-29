import { InputField, InputButton } from "./input_field";
import { Show, createSignal } from "solid-js";
import { Portal } from "solid-js/web";

export default function TrackEntry(props) {
  let title, genre, year, artists, totalSeconds;
  const song = props.song;
  const toggleVideo = () => setShowVideo(!showVideo())
  const [showVideo, setShowVideo] = createSignal(false);
  const [edit, setEdit] = createSignal(false);
  var minutes = Math.floor(song.lengthSeconds / 60);
  var seconds = song.lengthSeconds - (minutes * 60);
  var correctedSeconds = 
    seconds < 10 ? "0" + seconds : seconds;

  function largeScreen() {
    return window.innerWidth > 750;
  }

  function handleDownload() {}

  function toggleEdit(event) { setEdit(!edit()) }

  function removeClick(event) { event.stopPropagation() }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(title.value);
    console.log(genre.value);
    console.log(year.value);
    console.log(artists.value);
    
    console.warn("updated");
  }

  function handleAutoFill() { console.log("autofilling") }

  return (
    <>
    <Show when={edit()} fallback={<div/>}>
    <Portal>
      <div class="overlay" onClick={toggleEdit}>
        <div class="card popup-content" onClick={removeClick}>
          <form onSubmit={handleSubmit} class="m-2">
            <InputField ref={title} label="Title" type="text" 
            value={song.title} placeholder="Title"/>
            <InputField ref={artists} label="Artist" type="text" 
            value={song.artist} placeholder="Artist"/>
            <p class="help">a list seperated by semicolons(; )</p>
            <InputField ref={genre} label="Genre" type="text" 
            value={song.genre} placeholder="Genre"/>
            <div class="field is-horizontal">
              <div class="label px-3">Year</div>
              <div class="control">
                <input class="input" type="number" ref={year} placeholder="Year"/>
              </div>
              <div class="label px-3">Seconds</div>
              <div class="control">
                <input class="input" type="number" ref={totalSeconds} placeholder="Seconds"/>
              </div>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <input class="button" type="submit" value="Update"/>
              </div>
              <div class="control">
                <div class="button" onClick={handleAutoFill}> Auto Fill </div> 
              </div>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  </Show>
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
              <button class="button mx-3" onClick={toggleEdit}>
                Edit
              </button>
              <button class="button mx-3">
                Remove from Tracks
              </button>
              <div class="button is-success mx-3" onClick={handleDownload}>
                Download
              </div>
              <a href={song.link} class="button is-success mx-3">
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
</>
  )
}
