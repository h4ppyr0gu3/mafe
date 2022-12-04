import { YTSearchBar } from "../components/yt_search";
import { MBResults } from "../components/music_brainz_results";
import { createSignal } from "solid-js";
import Footer from "../components/footer";
import Header from "../components/header";

export default function YTSearch() {
  const [signal, setSignal] = createSignal();
  return (
    <>
      <Header />
      <YTSearchBar onChange={setSignal()} />
      <MBResults results={signal()} />
      <Footer />
    </>
  );
}
