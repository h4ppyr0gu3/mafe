import { InputField, InputButton } from "./input_field";
import { useHistoryState } from "../utils/album_search_service";
import { useResultState } from "../utils/search_service";
import { getMusicBrainz } from "../utils/musicbrainz_requests";
import { useSearchParams } from  "@solidjs/router";
import { onMount } from "solid-js";

export default function ArtistNames() {
  let artistQuery, searchArtist, params, query;

  const [historyState, setHistoryState] = useHistoryState();
  const [resultState, setResultState] = useResultState();

  const [searchParams, setSearchParams] = useSearchParams();

  onMount(() => {
    query = searchParams.query;
    if ( query !== undefined ) {
      artistQuery.value = query;
      handleSubmit({preventDefault: () => {}});
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();
    toggleDisableButton();
    setSearchParams({query: artistQuery.value});
    let params = {
      query: artistQuery.value,
      limit: 9,
    };
    let path = "/artist";
    setHistoryState("artistSearch", artistQuery.value);
    setHistoryState("artistResult", null);
    setHistoryState("artistSelect", null);
    setHistoryState("albumResult", null);
    setHistoryState("albumSearch", null);
    setHistoryState("albumCount", null);
    setHistoryState("albumSongs", null);
    setHistoryState("albumSelect", null);
    await getMusicBrainz(path, params).then(() => {
      console.log(resultState.data.data.artists);
      setHistoryState("artistResult", resultState.data.data.artists);
      toggleDisableButton();
    });
  }

  function toggleDisableButton() {
    searchArtist.disabled = !searchArtist.disabled;
  }

  return (
    <>
      <form onSubmit={handleSubmit} class="flex flex-col bg-neutral-800 rounded-lg p-8 my-10 mx-5">
        <div class="bg-neutral-800 text-white text-2xl font-bold p-2 rounded-t-lg">
          Search for an Artist
        </div>
        <input class="flex p-3 bg-neutral-600 rounded-t-lg focus:outline-none text-white" ref={artistQuery} type="text" />
        <input class="flex p-3 bg-neutral-600 rounded-b-lg border-t border-neutral-800 text-white hover:cursor-pointer hover:bg-sky-400" 

          ref={searchArtist} 
          onClick={handleSubmit}
          type="submit"
          value="Search"
        />
      </form>
    </>
  );
}
