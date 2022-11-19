import { For, onMount } from "solid-js";

export default function NestedSongList(props) {
  onMount(() => {
    console.log("mounted");
    console.log(props);
  });
  return (
    <For each={props.songs}>
      <p> somehati </p>
    </For>
  );
}
//<NestedSongEntry />
