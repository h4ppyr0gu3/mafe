import { InputField, InputButton } from "./input_field";
import { useHistoryState } from '../utils/album_search_service';
import {  useResultState } from '../utils/search_service';
import { getMusicBrainz } from '../utils/musicbrainz_requests';

export default function ArtistNames() {
  let artistQuery, searchArtist, params;

  const [historyState, setHistoryState] = useHistoryState();
  const [resultState, setResultState] = useResultState();

  async function handleSubmit(e) {
    e.preventDefault();
    toggleDisableButton();
    let params = {
      "query": artistQuery.value,
      "limit": 9,
    }
    let path = "/artist"
    setHistoryState('artistSearch', artistQuery.value);
    setHistoryState('artistResult', null);
    setHistoryState('artistSelect', null);
    setHistoryState('albumResult', null);
    setHistoryState('albumCount', null);
    setHistoryState('albumSongs', null);
    setHistoryState('albumSelect', null);
    await getMusicBrainz(path, params).then(() => {
      console.log(resultState.data.data.artists);
      setHistoryState('artistResult', resultState.data.data.artists);
      toggleDisableButton();
    });
  }

  function toggleDisableButton() {
    searchArtist.disabled = !searchArtist.disabled;
  }

  return (
    <>
      <form onSubmit={handleSubmit} class="container">
        <InputField
          ref={artistQuery}
          label="Artist Name"
          value=""
          />
        <InputButton type="submit" value="Search" 
          ref={searchArtist} />
      </form>
      </>
  )
}
