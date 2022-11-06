import { Portal } from "solid-js/web";
import { createSignal, For } from 'solid-js';
import { Show } from 'solid-js/web';

// Call like so: 

// <Errors {...{
//   get errors() {
//     return errors();
//   },
//   set errors(value) {
//     setErrors(value);
//   }}}/>

export function Errors(props) {

  function handleClick() {
    props.errors = [];
  }

  function errorsPresent() {
    return (props.errors.length > 0);
  }

  return (
    <>
      <Show
        when={errorsPresent()}
        fallback={<div></div>}
      >
        <div class="notification is-failure">
          <button class="delete" onClick={handleClick}>
          </button>
          <For each={props.errors} >{(el, i) => 
            <ul><li>{el}</li></ul>
          }</For>
        </div>
      </Show>
      </>
  );
}

export function Success(props) {

  function handleClick() {
    props.messages = [];
  }

  function messagesPresent() {
    return (props.messages.length > 0);
  }

  return (
    <>
      <Show
        when={messagesPresent()}
        fallback={<div></div>}
      >
        <div class="notification is-success">
          <button class="delete" onClick={handleClick}>
          </button>
          <For each={props.messages} >{(el, i) => 
            <ul><li>{el}</li></ul>
          }</For>
        </div>
      </Show>
      </>
  );
}
