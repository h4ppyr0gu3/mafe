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
      <div class="flex flex-row hover:cursor-pointer bg-neutral-700 hover:bg-neutral-500 m-3 p-3 rounded-lg mb-5 text-white" onClick={handleClick}>
        <div class="flex text-xl w-5/12">Title: <span class="font-bold">{album.title}</span></div>
        <div class="flex flex-col text-sm w-1/6">
          <div class="flex">Country: <span class="font-bold">{album.country}</span></div>
          <div class="flex">{album.date?.substring(0, 4)}</div>
        </div>
        <div class="flex text-sm w-1/6">{album.disambiguation}
        <span class="text-sm" >{displayArtist()}</span></div>
        <div class="text-lg flex font-bold">
          <For each={album["artist-credit"]}>
            {(el) => <p class="text-lg">{el.name}</p>}
          </For>
        </div>
      </div>
    </>
  );
}
