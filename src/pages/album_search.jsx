import ArtistNames from '../components/artist_search';
import ArtistList from '../components/artist_list';
import ArtistAlbumList from '../components/artist_album_list';
import SongList from '../components/song_list';

// {
//   artistSearch: null,
//   artistResult: null,
//   artistSelect: null,
//   albumResult: null,
//   albumSelect: null,
// }
export default function AlbumSearch() {
  return (
    <>
      <div class="container">
        <ArtistNames/>
        <ArtistList/>
        <ArtistAlbumList/>
        <SongList/>
      </div>
      </>
  )
}

//historyGlobal
