import { useSearchState, useResultState } from "../utils/search_service.jsx";
import { onMount } from "solid-js";
import { getInvidious } from "../utils/invidious_requests";
// import { getMusicBrainz } from "../utils/musicbrainz_requests";

export function YTSearchBar() {
  let date, relevance, query;

  const [searchState, setSearchState] = useSearchState();
  // const [resultState, setResultState] = useResultState();

  onMount(async () => {
    await getInvidious("/api/v1/trending?type=Music", {})
  });

  function handleSubmit(e) {
    e.preventDefault();
    setSearchState('query', query.value);
    setSearchState('relevance', relevance.value);
    setSearchState('date', relevance.value);
  }

  // function buildSearchUrl() {
  //   // trending_url "#{api}/api/v1/trending?type=Music"
  // };

  return (
    <>
      <form>
        <div class="field is-grouped is-grouped-multiline">
          <div class="control is-expanded">
            <input class="input" type="text" ref={query}
              placeholder="Enter Phrase or URL" />
          </div>
          <div class="control">
            <input class="button" type="submit" value="Search"
              onClick={handleSubmit} />
          </div>
        </div>
        <div class="field is-flex is-justify-content-center">
          <div class="control">
            <div class="select">
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
            <div class="select">
              <select ref={relevance}>
                <option value={""}>relevance</option>
                <option>date</option>
                <option>rating</option>
                <option>reviews</option>
              </select>
            </div>
          </div>
        </div>
      </form>
      </>
  );
}
