import { useSearchState } from "../utils/search_service.jsx";
import { onMount, Show, createSignal } from "solid-js";
import { getInvidious } from "../utils/invidious_requests";
// import { getMusicBrainz } from "../utils/musicbrainz_requests";

export function YTSearchBar() {
  let date, relevance, query, searchButton, audio, explicit, queryString;
  relevance = {value: null};
  date = {value: null};
  explicit = {checked: true};
  audio = {checked: true};

  const [, setSearchState] = useSearchState();
  const [moreOptions, setMoreOptions] = createSignal(false);
  // const [resultState, setResultState] = useResultState();

  onMount(async () => {
    await getInvidious("/api/v1/trending?type=Music", {});
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setSearchState("query", query.value);
    setSearchState("relevance", relevance.value);
    setSearchState("date", date.value);
    queryString = query.value
    if (explicit.checked) queryString += " explicit";
    if (audio.checked) queryString += " audio";
    console.log(queryString)
    let params = {
      q: queryString,
      page: 1,
      type: "video",
      sort_by: relevance.value,
      date: date.value,
    };
    searchButton.disabled = true;
    await getInvidious("/api/v1/search", params).then(() => {
      searchButton.disabled = false;
    });
  }

  function toggleMoreOptions(e) {
    e.preventDefault();
    console.log("toggle more options");
    setMoreOptions(!moreOptions());
  }

  return (
    <>
      <form class="mx-5 flex flex-col bg-neutral-800 rounded-lg p-8 my-10">
        <div class="bg-neutral-800 text-white text-2xl font-bold p-2 rounded-t-lg">
          Search for a Song
        </div>
            <input
              class="flex p-3 bg-neutral-600 rounded-t-lg focus:outline-none text-white"
              type="text"
              ref={query}
              placeholder="Enter Phrase or URL"
            />
        <Show when={moreOptions()} fallback={
          <button type="button" class="bg-neutral-600 border-neutral-800 border-y hover:bg-sky-400" onClick={toggleMoreOptions}>More Options </button>
        }>
          <div class="flex-col sm:flex-row flex justify-around py-2 bg-neutral-600 border-neutral-800 border-t">
            <div class="flex">
              <select ref={date} class="rounded-md bg-neutral-700 text-white shadow-sm hover:cursor-pointer p-2">
                <option value={""}>Date</option>
                <option>hour</option>
                <option>today</option>
                <option>week</option>
                <option>month</option>
                <option>year</option>
              </select>
            </div>
            <div class="flex">
              <select ref={relevance} class="rounded-md bg-neutral-700 text-white shadow-sm hover:cursor-pointer p-2">
                <option value={""}>Sort By</option>
                <option>relevance</option>
                <option>date</option>
                <option>rating</option>
                <option>reviews</option>
              </select>
            </div>
            <div class="flex items-center">
              <input type="checkbox" ref={audio} checked="true" class="h-4 w-4 rounded text-white shadow-sm"/>
              <label class="text-sm font-medium text-white">audio</label>
            </div>
            <div class="flex items-center space-x-2 m-2">
              <input type="checkbox" ref={explicit} checked="true" class="h-4 w-4 rounded text-white shadow-sm"/>
              <label class="text-sm font-medium text-white"> explicit </label>
            </div>
          </div>
          <button class="bg-neutral-600 border-neutral-800 border-y hover:bg-sky-400" onClick={toggleMoreOptions}>Less Options </button>
        </Show>
            <input
              class="flex p-3 bg-neutral-600 rounded-b-lg text-white hover:cursor-pointer hover:bg-sky-400"
              type="submit"
              value="Search"
              onClick={handleSubmit}
              ref={searchButton}
            />
      </form>
    </>
  );
}
