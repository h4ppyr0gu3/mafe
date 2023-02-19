import { getMusicBrainz } from "../utils/musicbrainz_requests";
import { useHistoryState } from "../utils/album_search_service";
import { useResultState } from "../utils/search_service";
import { useSearchParams } from "@solidjs/router";

export default function ArtistEntry(props) {
  let artist = props.artist;

  const [resultState, setResultState] = useResultState();
  const [historyState, setHistoryState] = useHistoryState();
  const [searchParams, setSearchParams] = useSearchParams();

  async function handleClick() {
    let params = {
      artist: artist.id,
    };
    let path = "/release";
    // setSearchParams({ selected: artist.id });
    await getMusicBrainz(path, params).then(() => {
      setHistoryState("albumResult", resultState.data.data.releases);
      setHistoryState("artistSelect", artist);
    });
  }

  return (
    <div class="flex-row flex hover:cursor-pointer bg-neutral-700 hover:bg-neutral-500 m-3 p-3 rounded-lg mb-5 text-white" onClick={handleClick}>
      <div class="flex w-2/6">Name: <span class="font-bold text-xl"> {artist.name}</span></div>
      <div class="text-sm flex-col w-1/2">
        <div class="flex">Country: <span class="text-lg font-bold">{artist.country}</span></div>
        <div class="flex">Type: <span class="font-bold text-lg">{artist.type}</span></div>
      </div>
      <div class="flex w-1/6 flex-col">
        <div class="flex font-bold">{artist.disambiguation}</div>
        <div class="flex">Gender: <span class="font-bold">{artist.gender}</span></div>
      </div>
    </div>
  );
}
