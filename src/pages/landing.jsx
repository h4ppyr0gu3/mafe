import { useAppState } from "../utils/app_state_service";
import { onMount } from "solid-js";

export default function Landing() {
  const [appState,] = useAppState();

  onMount(() => {
    console.log("else wheere");
    console.log(appState);
  });

  return (
    <>
      <div class="is-size-1">welcome to the musicApp, Mapp for short</div>
      <ul>
        <li>great free shit</li>
      </ul>
    </>
  );
}
