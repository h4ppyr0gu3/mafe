import { InputField, InputButton } from "./input_field";
import Fuse from 'fuse.js'
import { Show, createSignal, For, children } from "solid-js";
import { Portal } from "solid-js/web";
import { getMusicBrainz } from "../utils/musicbrainz_requests";
import { useResultState } from "../utils/search_service";
import { UpdateModal } from "./update_modal";
import { Autofill, useSongParams } from "./autofill";

export default function TrackEntry(props) {
  let title, genre, year, artists, totalSeconds;
  let path, params, artistSongCount, songSelection, artistSelection;
  const song = props.song;
  const toggleVideo = () => setShowVideo(!showVideo())
  const [edit, setEdit] = createSignal(false);
  const toggleEdit = () => setEdit(!edit())

  const [resultState, setResultState] = useResultState();

  const [showVideo, setShowVideo] = createSignal(false);


  var minutes = Math.floor(song.lengthSeconds / 60);
  var seconds = song.lengthSeconds - (minutes * 60);
  var correctedSeconds = 
    seconds < 10 ? "0" + seconds : seconds;

  function largeScreen() {
    return window.innerWidth > 750;
  }

  function handleDownload() {}

  return (
    <>
    <Show when={edit()} fallback={<div/>}>
      <UpdateModal song={song} close={(() => toggleEdit())}/>
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
