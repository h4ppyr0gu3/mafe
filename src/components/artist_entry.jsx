import { getMusicBrainz } from '../utils/musicbrainz_requests';
import { useHistoryState } from '../utils/album_search_service';
import {  useResultState } from '../utils/search_service';

export default function ArtistEntry(props) {
  let artist = props.artist

  const [resultState, setResultState] = useResultState();
  const [historyState, setHistoryState] = useHistoryState();

  async function handleClick() {
    console.log("handle click");
    let params = {
      "artist": artist.id,
    }
    let path = "/release"
    await getMusicBrainz(path, params).then(() => {
      setHistoryState('albumResult', resultState.data.data.releases);
      setHistoryState('artistSelect', artist);
    });
  }

  return (
    <div class="card on-hover p-3" onClick={handleClick}>
      <div class="title">
        {artist.name}
      </div>
      <div class="subtitle">
        {artist.country} {artist.type} {artist.gender}
      </div>
      <div class="content">
        {artist.disambiguation}
      </div>
    </div>
  );
}
