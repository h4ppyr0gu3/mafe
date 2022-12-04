import { createStore } from "solid-js/store";

const [resultState, setResultState] = createStore({
  data: [],
  success: null,
  errors: null,
});
const [searchState, setSearchState] = createStore({
  query: null,
  relevance: null,
  date: null,
});
const [searchResultState, setSearchResultState] = createStore({
  data: [],
  success: null,
  errors: null,
});

export const useSearchResultState = () => [searchState, setSearchState];
export const useSearchState = () => [searchState, setSearchState];
export const useResultState = () => [resultState, setResultState];
