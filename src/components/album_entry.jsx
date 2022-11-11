import { getMusicBrainz } from '../utils/musicbrainz_requests';
import { useHistoryState } from '../utils/album_search_service';
import {  useResultState } from '../utils/search_service';

export default function AlbumEntry(props) {
  let album = props.album

  const [resultState, setResultState] = useResultState();
  const [historyState, setHistoryState] = useHistoryState();

  async function handleClick() {
    let params = {
      "release": album.id,
    }
    let path = "/recording"
    await getMusicBrainz(path, params).then(() => {
      console.log(resultState.data.data.recordings);
      setHistoryState('albumSongs', resultState.data.data.recordings);
      setHistoryState('albumSelect', album);
    });
  }

  return (
    <>
      <div class="card on-hover p-3" onClick={handleClick}>
        <div class="title">
          {album.title}
        </div>
        <div class="subtitle">
          {album.date} {album.country}
        </div>
        <div class="content">
          {album.disambiguation}
        </div>
      </div>
      </>
  );
}
