import { useSearchState } from "../utils/search_service.jsx";
import { onMount } from "solid-js";
import { getInvidious } from "../utils/invidious_requests";
// import { getMusicBrainz } from "../utils/musicbrainz_requests";

export function YTSearchBar() {
  let date, relevance, query, searchButton, audio, explicit, queryString;

  const [, setSearchState] = useSearchState();
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

  return (
    <>
      <form class="my-5">
        <div class="field is-grouped is-grouped-multiline">
          <div class="control is-expanded">
            <input
              class="input"
              type="text"
              ref={query}
              placeholder="Enter Phrase or URL"
            />
          </div>
          <div class="control">
            <input
              class="button darker"
              type="submit"
              value="Search"
              onClick={handleSubmit}
              ref={searchButton}
            />
          </div>
        </div>
        <div class="field is-flex is-justify-content-center">
          <div class="control">
            <div class="select m-2">
              <select ref={date}>
                <option value={""}>date</option>
                <option>hour</option>
                <option>today</option>
                <option>week</option>
                <option>month</option>
                <option>year</option>
              </select>
            </div>
          </div>
          <div class="control">
            <div class="select m-2">
              <select ref={relevance}>
                <option value={""}>sort by</option>
                <option>relevance</option>
                <option>date</option>
                <option>rating</option>
                <option>reviews</option>
              </select>
            </div>
          </div>
          <div class="is-justify-content-center">
            <label class="checkbox p-4">
              <input type="checkbox" ref={audio} checked="true"/>
              audio
            </label>
            <label class="checkbox p-4">
              <input type="checkbox" ref={explicit} checked="true"/>
              explicit
            </label>
          </div>
        </div>
      </form>
    </>
  );
}
