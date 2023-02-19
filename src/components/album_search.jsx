import { InputField, InputButton } from "./input_field";
import { useHistoryState } from "../utils/album_search_service";
import { useResultState } from "../utils/search_service";
import { getMusicBrainz } from "../utils/musicbrainz_requests";
import { useSearchParams } from  "@solidjs/router";
import { onMount } from "solid-js";

export default function AlbumNames(props) {
  let albumQuery, searchAlbum, params, query;
  query = props.query;

  const [historyState, setHistoryState] = useHistoryState();
  const [resultState, setResultState] = useResultState();
  const [searchParams, setSearchParams] = useSearchParams();

  onMount(() => {
    if ( query !== undefined ) {
      albumQuery.value = query;
      handleSubmit({preventDefault: () => {}});
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();
    toggleDisableButton();
    setSearchParams({query: albumQuery.value});
    let params = {
      query: albumQuery.value,
    };
    let path = "/release";
    setHistoryState("albumSearch", albumQuery.value);
    setHistoryState("artistResult", null);
    setHistoryState("artistSelect", null);
    setHistoryState("albumResult", null);
    setHistoryState("artistSearch", null);
    setHistoryState("albumCount", null);
    setHistoryState("albumSongs", null);
    setHistoryState("albumSelect", null);
    await getMusicBrainz(path, params).then(() => {
      setHistoryState("albumResult", resultState.data.data.releases);
      toggleDisableButton();
    });
  }

  function toggleDisableButton() {
    searchAlbum.disabled = !searchAlbum.disabled;
  }

  return (
    <>
      <form onSubmit={handleSubmit} class="mx-5 flex flex-col bg-neutral-800 rounded-lg p-8 my-10">
        <div class="bg-neutral-800 text-white text-2xl font-bold p-2 rounded-t-lg">
          Search for an Album
        </div>
        <input class="flex p-3 bg-neutral-600 rounded-t-lg focus:outline-none text-white" ref={albumQuery} type="text" />
        <input class="flex p-3 bg-neutral-600 rounded-b-lg border-t border-neutral-800 text-white hover:cursor-pointer hover:bg-sky-400" 

          ref={searchAlbum} 
          onClick={handleSubmit}
          type="submit"
          value="Search"
        />
      </form>
    </>
  );
}
