import { useAppState } from "../utils/app_state_service";
import { onMount } from "solid-js";
import Footer from "../components/footer";
import Header from "../components/header";
import { Errors } from "../components/errors";

export default function Landing() {
  const [appState,] = useAppState();

  onMount(() => {
    console.log("else wheere");
    console.log(appState);
  });

  return (
    <>
  <Header />
      <div class="is-size-1">welcome to the musicApp, Mapp for short</div>
      <ul>
        <li>great free shit</li>
      </ul>
      <Footer />
    </>
  );
}
