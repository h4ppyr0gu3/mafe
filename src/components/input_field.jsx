export function InputField(props) {
  return (
    <>
      <div class="field">
        <div class="label">{props.label}</div>
        <div class="control">
          <input
            class="input"
            ref={props.ref}
            placeholder={props.placeholder}
            type={props.type}
            value={props.value}
          />
        </div>
      </div>
    </>
  );
}

export function InputButton(props) {
  return (
    <div class="field">
      <div class="control">
        <input
          class="button"
          ref={props.ref}
          placeholder={props.placeholder}
          type={props.type}
          value={props.value}
        />
      </div>
    </div>
  );
}

export function YTSearchBar(props) {
  return (
    <>
      <div class="field is-grouped is-grouped-multiline">
        <div class="control is-expanded">
          <input class="input" type="text" placeholder="Enter Phrase or URL" />
        </div>
        <div class="control">
          <input class="button" type="submit" value="Search" />
        </div>
      </div>
      <div class="field is-flex is-justify-content-center">
        <div class="control">
          <div class="select">
            <select>
              <option>date</option>
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
            <select>
              <option>relevance</option>
              <option>date</option>
              <option>rating</option>
              <option>reviews</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
