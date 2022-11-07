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
