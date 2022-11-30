import { InputField, InputButton } from "./input_field";
import Fuse from 'fuse.js'
import { Show, createSignal, For, onMount, children } from "solid-js";
import { Portal } from "solid-js/web";
import { getMusicBrainz } from "../utils/musicbrainz_requests";
import { useResultState } from "../utils/search_service";
import { Autofill, useSongParams } from "./autofill";

const [edit, setEdit] = createSignal(false);

export function UpdateModal(props) {

  let toggleEdit = props.close;

  let title, genre, year, artists, totalSeconds, test, album;
  let path, params, artistSongCount, songSelection, artistSelection;

  const [song, setSong] = createSignal(props.song);
  const [resultState, setResultState] = useResultState();
  const [songParams, setSongParams] = useSongParams();
  const [autofill, setAutofill] = createSignal(false);

  function removeClick(event) { event.stopPropagation() }

  function handleSubmit(event) {
    event.preventDefault();
    
    toggleEdit();
    console.warn("updated");
  }

  function handleAutoFill() { 
    setSongParams({
      title: title.value,
      genre: genre.value,
      year: year.value,
      artists: artists.value,
      album: album.value
    })
    setAutofill(true);
  }

  const toggleAutofill = () => setAutofill(!autofill);
  function handleCloseModal() {toggleEdit()}

  async function handleAutoFillSubmit(event) {
    console.log("auto submitted");
  }

  function updateFromSongParams() {
    console.log("closed");
    console.log(songParams);
    console.log("closed");
    title.value = songParams.title
    genre.value = songParams.genre
    year.value = songParams.year
    artists.value = songParams.artists
    album.value = songParams.album

    console.log(title.value);
    console.log(genre.value);
    console.log(year.value);
    console.log(artists.value);
  }

  return (
    <Portal ref={test}>
      <div class="overlay" onClick={toggleEdit}>
        <div class="card popup-content" onClick={removeClick}>
          <div class="level">
            <div class="level-left">
              <div class="title">
                Updating Song
              </div>
            </div>
            <div class="level-right">
              <a role="button" class="navbar-burger is-active" aria-label="menu" aria-expanded="false" style="display: flex;" onClick={handleCloseModal}>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>
          </div>
          <form onSubmit={handleSubmit} class="m-2">
            <InputField ref={title} label="Title" type="text" 
            value={song().title} placeholder="Title"/>
            <InputField ref={artists} label="Artist" type="text" 
            value={song().artist} placeholder="Artist"/>
            <p class="help">a list seperated by semicolons(; )</p>
            <InputField ref={album} label="Album" type="text" 
            value={song().album} placeholder="Album"/>
            <InputField ref={genre} label="Genre" type="text" 
            value={song().genre} placeholder="Genre"/>
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
          <Show when={autofill()} fallback={<div/>}>
            <Autofill forceUpdate={() => updateFromSongParams()} close={() => toggleAutofill()}/>
          </Show>
        </div>
      </div>
    </Portal>
  )
}
