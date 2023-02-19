import { Show, createSignal, For, onMount, children } from "solid-js";
import { Portal } from "solid-js/web";
import { getMusicBrainz } from "../utils/musicbrainz_requests";
import { useResultState } from "../utils/search_service";
import { updateTrack, getSingleTrack } from "../utils/user_song_requests";
import Header from "../components/header";
import Footer from "../components/footer";
import { useParams, useNavigate } from "@solidjs/router";

export default function EditTrack() {
  // let toggleEdit = props.close;

  let title, genre, year, artists, totalSeconds, test, album;
  let path, artistSongCount, songSelection, artistSelection;
  let imageUrl, image, imageInput;
  let songTitle, song, updatedAttributes;

  // const [song, setSong] = createSignal(props.song);
  // const [resultState, setResultState] = useResultState();
  // // const [songParams, setSongParams] = useSongParams();
  // const [autofill, setAutofill] = createSignal(false);

  const params = useParams();
  const navigate = useNavigate();

  // function removeClick(event) {
  //   event.stopPropagation();
  // }

  onMount(() => {
    getSingleTrack(params.id).then((res) => {
      song = res;
      title.value = song.title;
      genre.value = song.genre;
      year.value = song.year;
      artists.value = song.artist;
      album.value = song.album;
      imageUrl = "https://img.youtube.com/vi/" + song.video_id + "/mqdefault.jpg";
      image.src = imageUrl;
      imageInput.value = imageUrl;
    })
  });

  function handleSubmit(event) {
    event.preventDefault();
    updatedAttributes = {
      video_id: song.video_id,
      title: title.value,
      genre: genre.value,
      year: year.value,
      artist: artists.value,
      album: album.value,
      image_url: imageInput.value,
    }
    updateTrack(updatedAttributes, song.id).then(() => {
      navigate("/my_tracks", { replace: true });
    });
  //   params = {
  //     artist: songParams.artists || "",
  //     year: songParams.year || "",
  //     genre: songParams.genre || "",
  //     album: songParams.album || "",
  //     title: songParams.title,
  //     video_id: song().video_id,
  //   };
  //   updateTrack(params, song().id).then(() => {
  //     toggleEdit();
  //   });
  }

  // function handleAutoFill() {
  //   setSongParams({
  //     title: title.value,
  //     genre: genre.value,
  //     year: year.value,
  //     artists: artists.value,
  //     album: album.value,
  //   });
  //   setAutofill(!autofill());
  // }

  // const toggleAutofill = () => setAutofill(!autofill);
  // function handleCloseModal() {
  //   toggleEdit();
  // }

  // async function handleAutoFillSubmit(event) {
  // }

  // function updateFromSongParams() {
  //   title.value = songParams.title;
  //   genre.value = songParams.genre;
  //   year.value = songParams.year;
  //   artists.value = songParams.artists;
  //   album.value = songParams.album;
  // }

  return (
    <>
      <Header />
      <form class="mx-5 flex flex-col bg-neutral-800 rounded-lg p-8 my-10" onSubmit={handleSubmit}>
        <div class="bg-neutral-800 text-white text-2xl font-bold p-2 rounded-t-lg">
          Update Song
        </div>
        <div class="mb-3 pt-3 rounded bg-neutral-600">
          <div class="block text-white text-sm font-bold mb-2 ml-3">Title</div>
          <input
            class="bg-neutral-600 rounded w-full text-white focus:outline-none border-b-4 border-gray-400 focus:border-gray-200 px-3 pb-3"
            ref={title}
            placeholder="Title"
            type="text"
          />
        </div>
        <div class="mb-3 pt-3 rounded bg-neutral-600">
          <div class="block text-white text-sm font-bold mb-2 ml-3">Artists <span class="text-xs">(seperated with `;` )</span></div>
          <input
            class="bg-neutral-600 rounded w-full text-white focus:outline-none border-b-4 border-gray-400 focus:border-gray-200 px-3 pb-3"
            ref={artists}
            placeholder="Artist"
            type="text"
          />
        </div>
        <div class="mb-3 pt-3 rounded bg-neutral-600">
          <div class="block text-white text-sm font-bold mb-2 ml-3">Album</div>
          <input
            class="bg-neutral-600 rounded w-full text-white focus:outline-none border-b-4 border-gray-400 focus:border-gray-200 px-3 pb-3"
            ref={album}
            placeholder="Genre"
            type="text"
          />
        </div>
        <div class="flex flex-row">
          <div class="flex flex-1 justify-center">
            <img src="" ref={image}/>
          </div>
          <div class="flex flex-1 flex-col">
            <div class="flex">
              <div class="mb-3 pt-3 rounded bg-neutral-600 w-full">
                <div class="block text-white text-sm font-bold mb-2 ml-3">year</div>
                <input
                  class="bg-neutral-600 rounded w-full text-white focus:outline-none border-b-4 border-gray-400 focus:border-gray-200 px-3 pb-3"
                  ref={year}
                  placeholder="Genre"
                  type="text"
                />
              </div>
            </div>
            <div class="flex">
              <div class="mb-3 pt-3 rounded bg-neutral-600 w-full">
                <div class="block text-white text-sm font-bold mb-2 ml-3">Genre</div>
                <input
                  class="bg-neutral-600 rounded w-full text-white focus:outline-none border-b-4 border-gray-400 focus:border-gray-200 px-3 pb-3"
                  ref={genre}
                  placeholder="Genre"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="my-3 pt-3 rounded bg-neutral-600">
          <div class="block text-white text-sm font-bold mb-2 ml-3">Image Url</div>
          <input
            class="bg-neutral-600 rounded w-full text-white focus:outline-none border-b-4 border-gray-400 focus:border-gray-200 px-3 pb-3"
            ref={imageInput}
            placeholder="Image Url"
            type="text"
          />
        </div>
        <button
          class="bg-neutral-600 hover:bg-sky-400 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
          type="submit"
        >Update Song</button>
      </form>
      <Footer />
    </>
  );
}
