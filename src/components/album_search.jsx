import { InputField, InputButton } from "./input_field";
import { useHistoryState } from "../utils/album_search_service";
import { useResultState } from "../utils/search_service";
import { getMusicBrainz } from "../utils/musicbrainz_requests";

export default function AlbumNames() {
  let albumQuery, searchAlbum, params;

  const [historyState, setHistoryState] = useHistoryState();
  const [resultState, setResultState] = useResultState();

  async function handleSubmit(e) {
    e.preventDefault();
    toggleDisableButton();
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
      <form onSubmit={handleSubmit} class="container">
        <InputField ref={albumQuery} label="Album Name" value="" />
        <InputButton type="submit" value="Search" ref={searchAlbum} />
      </form>
    </>
  );
}
