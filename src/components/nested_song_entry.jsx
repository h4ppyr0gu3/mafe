import { addTrackToLibrary } from "../utils/user_song_requests";
import { useHistoryState } from "../utils/album_search_service";

export default function NestedSongEntry(props) {
  let song = props.song;
  let imageUrl =
    "https://img.youtube.com/vi/" + song.videoId + "/mqdefault.jpg";
  var minutes = Math.floor(song.lengthSeconds / 60);
  var seconds = song.lengthSeconds - minutes * 60;
  var correctedSeconds = seconds < 10 ? "0" + seconds : seconds;
  const [historyState, setHistoryState] = useHistoryState();

  function handleClick(e) {
    e.preventDefault;
    var params = {
      video_id: song.videoId,
      title: song.title,
      artist: historyState.artistSelect.name,
      album: historyState.albumSelect.title,
      year: historyState.albumSelect.date.substring(0, 4),
      seconds: song.lengthSeconds,
    };
    addTrackToLibrary(params);
  }

  return (
    <>
      <div class="py-2 mx-20 flex-row flex border-t-neutral-500 border-t">
        <div class="flex flex-1">
          <div class="flex flex-1">
            <img src={imageUrl} />
          </div>
          <div class="flex flex-col flex-1">
            <div class="flex flex-1">
            <p> {song.title} </p>
            </div>
            <div class="flex flex-1">
              <p>
                {" "}
                {minutes}:{correctedSeconds}{" "}
              </p>
            </div>
          </div>
          <div class="flex justify-center flex-col">
            <div class="flex flex-1"/>
            <button 
              class="bg-neutral-900 hover:border-sky-400 border border-transparent p-2 hover:cursor-pointer rounded-md flex" 
              onClick={handleClick}>
              Add to tracks
            </button>
            <div class="flex flex-1"/>
          </div>
        </div>
      </div>
    </>
  );
}
