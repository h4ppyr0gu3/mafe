import ArtistNames from "../components/artist_search";
import ArtistList from "../components/artist_list";
import ArtistAlbumList from "../components/artist_album_list";
import SongList from "../components/song_list";
import Footer from "../components/footer";
import Header from "../components/header";

export default function AlbumByArtistSearch() {
  return (
    <>
    <ArtistNames />
    <ArtistList />
    <ArtistAlbumList />
    <SongList />
</>
  );
}
