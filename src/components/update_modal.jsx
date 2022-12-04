import { InputField, InputButton } from "./input_field";
import Fuse from "fuse.js";
import { Show, createSignal, For, onMount, children } from "solid-js";
import { Portal } from "solid-js/web";
import { getMusicBrainz } from "../utils/musicbrainz_requests";
import { useResultState } from "../utils/search_service";
import { Autofill, useSongParams } from "./autofill";
import { updateTrack } from "../utils/user_song_requests";

const [edit, setEdit] = createSignal(false);

export function UpdateModal(props) {
  let toggleEdit = props.close;

  let title, genre, year, artists, totalSeconds, test, album;
  let path, params, artistSongCount, songSelection, artistSelection;

  const [song, setSong] = createSignal(props.song);
  const [resultState, setResultState] = useResultState();
  const [songParams, setSongParams] = useSongParams();
  const [autofill, setAutofill] = createSignal(false);

  function removeClick(event) {
    event.stopPropagation();
  }

  onMount(() => {
    setSongParams({
      title: song().title,
      genre: song().genre,
      year: song().year,
      artists: song().artist,
      album: song().album,
    });
  });

  function handleSubmit(event) {
    event.preventDefault();
    params = {
      artist: songParams.artists || "",
      year: songParams.year || "",
      genre: songParams.genre || "",
      album: songParams.album || "",
      title: songParams.title,
      video_id: song().video_id,
    };
    updateTrack(params, song().id).then(() => {
      toggleEdit();
    });
  }

  function handleAutoFill() {
    setSongParams({
      title: title.value,
      genre: genre.value,
      year: year.value,
      artists: artists.value,
      album: album.value,
    });
    setAutofill(!autofill());
  }

  const toggleAutofill = () => setAutofill(!autofill);
  function handleCloseModal() {
    toggleEdit();
  }

  async function handleAutoFillSubmit(event) {
    console.log("auto submitted");
  }

  function updateFromSongParams() {
    title.value = songParams.title;
    genre.value = songParams.genre;
    year.value = songParams.year;
    artists.value = songParams.artists;
    album.value = songParams.album;
  }

  return (
    <Portal ref={test}>
      <div class="overlay" onClick={toggleEdit}>
        <div class="card popup-content" onClick={removeClick}>
          <div class="level">
            <div class="level-left">
              <div class="title">Updating Song</div>
            </div>
            <div class="level-right">
              <a
                role="button"
                class="navbar-burger is-active"
                aria-label="menu"
                aria-expanded="false"
                style={{ display: "flex" }}
                onClick={handleCloseModal}
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </a>
            </div>
          </div>
          <form onSubmit={handleSubmit} class="m-2">
            <Show when={!autofill()} fallback={<div />}>
              <InputField
                ref={title}
                label="Title"
                type="text"
                value={song().title}
                placeholder="Title"
              />
              <InputField
                ref={artists}
                label="Artist"
                type="text"
                value={song().artist}
                placeholder="Artist"
              />
              <p class="help">a list seperated by semicolons(; )</p>
              <InputField
                ref={album}
                label="Album"
                type="text"
                value={song().album}
                placeholder="Album"
              />
              <InputField
                ref={genre}
                label="Genre"
                type="text"
                value={song().genre}
                placeholder="Genre"
              />
              <div class="field is-horizontal">
                <div class="label px-3">Year</div>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    ref={year}
                    placeholder="Year"
                    value={song().year}
                  />
                </div>
                <div class="label px-3">Seconds</div>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    ref={totalSeconds}
                    placeholder="Seconds"
                  />
                </div>
              </div>
            </Show>
            <div class="field is-grouped">
              <div class="control">
                <input class="button" type="submit" value="Update" />
              </div>
              <div class="control">
                <div class="button" onClick={handleAutoFill}>
                  {" "}
                  Auto Fill{" "}
                </div>
              </div>
            </div>
          </form>
          <Show when={autofill()} fallback={<div />}>
            <div class="columns">
              <div class="column">
                <div class="label">Title</div>
                <div>{songParams.title}</div>
              </div>
              <div class="column">
                <div class="label">Artist</div>
                <div>{songParams.artists}</div>
              </div>
            </div>
            <Autofill
              forceUpdate={() => updateFromSongParams()}
              close={() => toggleAutofill()}
            />
          </Show>
        </div>
      </div>
    </Portal>
  );
}
