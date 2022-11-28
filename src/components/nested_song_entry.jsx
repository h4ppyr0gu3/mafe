import { addTrackToLibrary } from "../utils/user_song_requests";

export default function NestedSongEntry(props) {
  let song = props.song;
  let imageUrl = 'https://img.youtube.com/vi/' +
    song.videoId + '/mqdefault.jpg'
  var minutes = Math.floor(song.lengthSeconds / 60);
  var seconds = song.lengthSeconds - (minutes * 60);
  var correctedSeconds = 
    seconds < 10 ? "0" + seconds : seconds;


  function handleClick(e) {
    e.preventDefault
    var params = {
      "video_id": song.videoId,
      "title": song.title,
      "artist": song.author,
      "seconds": song.lengthSeconds
    }
    addTrackToLibrary(params)
  }

  return (
    <>
      <hr/>
      <div class="py-2 my-2">
        <div class="columns">
          <div class="column">
            <img src={imageUrl} />
          </div>
          <div class="column">
            <p> {song.title} </p>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <button class="button" onClick={handleClick}>Add to tracks</button>
          </div>
          <div class="column">
            <p> {minutes}:{correctedSeconds} </p>
          </div>
        </div>
      </div>
      </>
  );
}
