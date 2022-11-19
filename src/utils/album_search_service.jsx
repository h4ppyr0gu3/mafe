import { createStore } from "solid-js/store";

const [historyState, setHistoryState] = createStore(
  {
    artistSearch: null,
    artistResult: null,
    artistSelect: null,
    albumSearch: null,
    albumResult: null,
    albumCount: null,
    albumSongs: null,
    albumSelect: null,
  }
);

export const useHistoryState = () => [historyState, setHistoryState]
