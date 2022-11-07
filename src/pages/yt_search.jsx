import { YTSearchBar } from "../components/yt_search";
import { MBResults } from "../components/music_brainz_results";
import { createSignal } from "solid-js";

export default function YTSearch() {
  const [signal, setSignal] = createSignal();
  return (
    <>
      <YTSearchBar onChange={setSignal()} />
      <MBResults results={signal()} />
    </>
  );
}
