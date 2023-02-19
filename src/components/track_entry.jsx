import { InputField, InputButton } from "./input_field";
import Fuse from "fuse.js";
import { Show, createSignal, For, children, onMount } from "solid-js";
import { A } from "@solidjs/router";
import { Portal } from "solid-js/web";
import { getMusicBrainz } from "../utils/musicbrainz_requests";
import { useResultState } from "../utils/search_service";
import { UpdateModal } from "./update_modal";
import { Autofill, useSongParams } from "./autofill";
import { downloadTrack, removeTrack } from "../utils/user_song_requests";

export default function TrackEntry(props) {
  let title, genre, year, artists, totalSeconds;
  let path, params, artistSongCount, songSelection, artistSelection;
  const song = props.song;
  const toggleVideo = () => setShowVideo(!showVideo());
  const [edit, setEdit] = createSignal(false);
  const toggleEdit = () => setEdit(!edit());

  const [resultState, setResultState] = useResultState();

  const [showVideo, setShowVideo] = createSignal(false);

  var minutes = Math.floor(song.seconds / 60);
  var seconds = song.seconds - minutes * 60;
  var correctedSeconds = seconds < 10 ? "0" + seconds : seconds;

  function handleDownload() {
    downloadTrack(song.link).then(() => {
      var link = document.createElement("a");
      link.href = resultState.data;
      link.click();
    });
  }

  function handleRemoveTrack(event) {
    event.preventDefault();
    let url = window.backend_server + "/api/v1/tracks/" + song.id;
    removeTrack(url);
    console.log("removed");
  }

  onMount(() => {
    // read the url bar and render edit modal if needed
    path = window.location.pathname;
    console.log(path);
    if (path.split("/").includes("edit") && song.id == path.split("/").pop()) {
      toggleEdit();
    }
  });

  return (
    <>
      <Show when={edit()} fallback={<div />}>
        <UpdateModal song={song} close={() => toggleEdit()} />
      </Show>
      <div class="rounded-md m-5 mx-10 flex flex-col bg-neutral-700 hover:bg-neutral-500 hover:cursor-pointer">
        <div class="flex flex-row">
          <div class="flex w-1/4">
            <img
              src={
                "https://img.youtube.com/vi/" + song.video_id + "/mqdefault.jpg"
              }
              alt={song.title}
              style={{ "border-radius": "5px" }}
              class="ml-2"
            />
          </div>
          <div class="flex w-3/4">
            <div class="flex flex-col flex-1 p-3">
              <div class="flex text-xl font-bold flex-1">{song.title}</div>
              <div class="flex flex-1">by:&nbsp;<span class="font-bold"> {song.artist}</span></div>
            </div>
            <div class="flex flex-col flex-1 p-3">
              <div class="flex flex-1">
                {song.publishedText} {song.year?.substring(0, 4)}
              </div>
              <div class="flex flex-1">
                {minutes}:{correctedSeconds}
              </div>
            </div>
            <div class="flex flex-1 flex-col justify-center items-center">
              <div class="flex align-middle items-center flex-1">
                <A href={"/my_tracks/edit/" + song.id} class="p-2 hover:underline bg-neutral-900 hover:border-sky-400 border border-transparent rounded-md">
                  Edit
                </A>
              </div>
              <div class="flex flex-1 items-center align-middle">
                <button class="p-2 hover:underline bg-neutral-900 hover:border-sky-400 border border-transparent rounded-md" onClick={handleRemoveTrack}>
                  Remove
                </button>
                </div>
              <div class="flex flex-1 items-center align-middle">
                <div class="p-2 hover:underline bg-neutral-900 hover:border-sky-400 border border-transparent rounded-md" onClick={handleDownload}>
                  Download
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
