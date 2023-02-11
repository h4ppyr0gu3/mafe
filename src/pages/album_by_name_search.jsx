import AlbumNames from "../components/album_search";
import ArtistList from "../components/artist_list";
import ArtistAlbumList from "../components/artist_album_list";
import SongList from "../components/song_list";
import Footer from "../components/footer";
import Header from "../components/header";

// {
//   artistSearch: null,
//   artistResult: null,
//   artistSelect: null,
//   albumResult: null,
//   albumSelect: null,
// }
export default function AlbumByNameSearch() {
  return (
    <>
    <AlbumNames />
    <ArtistAlbumList />
    <SongList />
</>
  );
}

//historyGlobal
