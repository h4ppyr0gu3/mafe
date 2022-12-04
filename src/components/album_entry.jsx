import { getMusicBrainz } from "../utils/musicbrainz_requests";
import { useHistoryState } from "../utils/album_search_service";
import { useResultState } from "../utils/search_service";
import { onMount, For } from "solid-js";

export default function AlbumEntry(props) {
  let album = props.album;

  const [resultState, setResultState] = useResultState();
  const [historyState, setHistoryState] = useHistoryState();

  async function handleClick() {
    if (historyState.albumSearch != null) {
      let manufacturedArtist = {};
      album["artist-credit"].forEach((el) => {
        if (manufacturedArtist.name == undefined) {
          manufacturedArtist.name = el.name;
        } else {
          manufacturedArtist.name += " & " + el.name;
        }
      });
      console.log(manufacturedArtist);
      setHistoryState("artistSelect", manufacturedArtist);
    }
    let params = { release: album.id };
    let path = "/recording";
    await getMusicBrainz(path, params).then(() => {
      // console.log(resultState.data);
      setHistoryState("albumSongs", resultState.data.data.recordings);
      setHistoryState("albumSelect", album);
    });
  }

  function displayArtist() {
    if (historyState.albumSearch != null) {
      return "Artists: ";
    }
  }

  return (
    <>
      <div class="card on-hover p-3" onClick={handleClick}>
        <div class="title">{album.title}</div>
        <div class="subtitle">
          {album.date} {album.country}
        </div>
        <div class="content">{album.disambiguation}</div>
        <div class="label is-underlined has-text-info">{displayArtist()}</div>
        <For each={album["artist-credit"]}>
          {(el) => <p class="is-size-5 has-text-weight-bold">{el.name}</p>}
        </For>
      </div>
    </>
  );
}
