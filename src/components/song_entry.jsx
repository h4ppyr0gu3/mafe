import { getInvidious } from '../utils/invidious_requests';
import { useHistoryState } from '../utils/album_search_service';
import {  useResultState } from '../utils/search_service';
import { onMount } from 'solid-js';

export default function SongEntry(props) {
  let song = props.song
  let videoId, lengthSeconds, publishedText;
  let entryPoint, correctedSeconds, image, imageUrl;
  const [resultState, setResultState] = useResultState();
  const [historyState, setHistoryState] = useHistoryState();

  onMount(async () => {
    let path = "/api/v1/search"
    let params = {
      "q": historyState.artistSelect.name + song.title + "audio",
      "type": "video",
    }
    await getInvidious(path, params).then(() => {
      console.log(resultState.data[0]);
      videoId = resultState.data[0].videoId;
      publishedText = resultState.data[0].publishedText;
      lengthSeconds = resultState.data[0].lengthSeconds;
      var minutes = Math.floor(lengthSeconds / 60);
      var seconds = lengthSeconds - (minutes * 60);
      correctedSeconds = 
        seconds < 10 ? "0" + seconds : seconds;
      loadImages();
    })
  });

  function loadImages() {
    imageUrl = 'https://img.youtube.com/vi/' +
      videoId + '/mqdefault.jpg'
      console.log(image);
    image.src = imageUrl;
  }


  async function handleClick() {
    console.log("handle click");
    let params = {
      "song": song.id,
    }
    let path = "/release"
    await getMusicBrainz(path, params).then(() => {
      setHistoryState('albumResult', resultState.data.data.releases);
      setHistoryState('songSelect', song);
    });
  }

  return (
    <div class="card on-hover p-3" onClick={handleClick}>
      <div class="title">
        {song.title}
      </div>
      <div class='card-image'>
        <figure class='image is-4by3'>
          <img src="" alt={song.title} ref={image}/>
        </figure>
      </div>
      <div ref={entryPoint} />
      <div class="subtitle">
        {song["first-release-date"]} {song.type} {song.gender}
      </div>
      <p> length: {correctedSeconds} </p>
      <p> time: {publishedText} </p>
      <div class="content">
        {song.disambiguation}
      </div>
    </div>
  );
}
