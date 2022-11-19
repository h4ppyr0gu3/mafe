export default function NestedSongEntry(props) {
  let song = props.song;
  let imageUrl = 'https://img.youtube.com/vi/' +
    song.videoId + '/mqdefault.jpg'
  return (
    <>
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
            <button class="button">Add to tracks</button>
          </div>
          <div class="column">
            <p> {song.title} </p>
          </div>
        </div>
      </div>
      </>
  );
}
