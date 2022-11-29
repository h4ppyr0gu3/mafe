import { InputField, InputButton } from "./input_field";
import { Show, createSignal, For } from "solid-js";
import { Portal } from "solid-js/web";
import { getMusicBrainz } from "../utils/musicbrainz_requests";
import { useResultState } from "../utils/search_service";

export default function TrackEntry(props) {
  let title, genre, year, artists, totalSeconds;
  let path, params, artistSongCount, songSelection, artistSelection;
  const song = props.song;
  const toggleVideo = () => setShowVideo(!showVideo())
  const toggleEdit = () => setEdit(!edit())

  const [resultState, setResultState] = useResultState();

  const [showVideo, setShowVideo] = createSignal(false);
  const [edit, setEdit] = createSignal(false);
  const [artistDropdown, setArtistDropdown] = createSignal(false);
  const [artistOptions, setArtistOptions] = createSignal([]);
  const [songDropdown, setSongDropdown] = createSignal(false);
  const [songOptions, setSongOptions] = createSignal([]);


  var minutes = Math.floor(song.lengthSeconds / 60);
  var seconds = song.lengthSeconds - (minutes * 60);
  var correctedSeconds = 
    seconds < 10 ? "0" + seconds : seconds;

  function largeScreen() {
    return window.innerWidth > 750;
  }

  function handleDownload() {}

  function removeClick(event) { event.stopPropagation() }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(title.value);
    console.log(genre.value);
    console.log(year.value);
    console.log(artists.value);
    
    console.warn("updated");
  }

  async function handleAutoFill() { 
    path = "/artist"
    params = { query: artists.value }
    getMusicBrainz(path, params).then(() => {
      setArtistDropdown(true);
      setArtistOptions(resultState.data.data.artists.slice(0, 5));
      console.log(resultState.data.data.artists)
    })
  }

  async function handleArtistChange(event) {
    let count = 0;
    path = "/recording" 
    params = { artist: event.target.value, limit: 100 }
    getMusicBrainz(path, params).then(() => {
      setSongOptions(resultState.data.data.recordings)
      setSongDropdown(true);
      artistSongCount = resultState.data.data["recording-count"]
      if (artistOptions().length < artistSongCount) {
        callAgain(path, params);
      } 
    })
  }

  async function handleSongChange(event) {
    console.log("selected song")
    console.log(event.target.value);
    console.log(songSelection.value);
    path = "/release"
    params = { recording: event.target.value, inc: "artist" }
    getMusicBrainz(path, params).then(() => {
      console.log(resultState.data.data.releases)
      // resultState.data.data.artists.forEach((el) => {
      //   console.log(el.name);
      // })
    })
  }

  async function callAgain(path, params) {
    if (songOptions().length < artistSongCount) {
      params.offset = songOptions().length
      getMusicBrainz(path, params).then(() => {
        setSongOptions(songOptions().concat(resultState.data.data.recordings));
        setTimeout(() => {callAgain(path, params)}, 200);
      })
    } 
  }

  async function handleAutoFillSubmit(event) {
    console.log("auto submitted");
  }

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
          <form onSubmit={handleAutoFillSubmit}>
            <Show when={artistDropdown()} fallback={<div/>}>
              <div class="field">
                <div class="label">Select Artist</div>
                <div class="control">
                  <select onChange={handleArtistChange} class="input" ref={artistSelection}>
                    <option value={null}>Select Artist</option>
                    <For each={artistOptions()}>
                      {(el) => (
                      <option value={el.id}>{el.name}</option>
                      )}
                    </For>
                  </select>
                </div>
              </div>
            </Show>
            <Show when={songDropdown()} fallback={<div/>}>
              <div class="field">
                <div class="label">Selected Artist's Songs</div>
                <div class="control">
                  <select onChange={handleSongChange} class="input" ref={songSelection}>
                    <option value={null}>Select Song</option>
                    <For each={songOptions()}>
                      {(el) => (
                      <option value={el.id}>{el.title}</option>
                      )}
                    </For>
                  </select>
                </div>
              </div>
            </Show>
            <input type="submit" style="display: none;"/>
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
