import { For, Show, createSignal, createEffect } from "solid-js";
import { useErrors, useMessages } from "../utils/error_store";

export function Success() {
  const [messages, setMessages] = useMessages();
  const [signal, setSignal] = createSignal(false);
  const [shouldShow, setShouldShow] = createSignal(false);

  createEffect(() => {
    console.log(messages.messages.length);
    console.log("above is messages");
    console.log(messages.messages);
    if (messages.messages.length > 0) {
      setShouldShow(true);
      setTimeout(function() {
        setShouldShow(false);
        setMessages({messages: []});
      }, 5000 );
    }
  });

  function handleClick() {
    setMessages({messages: []});
    setShouldShow(!shouldShow());
  }

  return (
    <>
      <Show when={shouldShow()} fallback={<div />}>
        <div class="notification is-success floating-notification">
          <button class="delete close-button" onClick={handleClick} />
          <For each={messages.messages}>
            {(el) => (
              <ul>
                <li class="has-text-black">{el}</li>
              </ul>
            )}
          </For>
        </div>
      </Show>
    </>
  );
}

export function Errors() {
  const [errors, setErrors] = useErrors();
  const [signal, setSignal] = createSignal(false);
  const [shouldShow, setShouldShow] = createSignal(false);

  createEffect(() => {
    console.log(errors.errors.length);
    if (errors.errors.length > 0) {
      setShouldShow(true);
      setTimeout(function() {
        setShouldShow(false);
        setErrors({errors: []});
      }, 5000 );
    }
  });

  function handleClick() {
    setErrors({errors: []});
    setShouldShow(!shouldShow());
  }

  return (
    <>
    <Show when={shouldShow()} fallback={<div />}>
      <div class="notification is-danger floating-notification">
        <button class="delete close-button" onClick={handleClick} />
        <For each={errors.errors}>
          {(el) => (
          <ul>
            <li class="has-text-black">{el}</li>
          </ul>
          )}
        </For>
      </div>
    </Show>
    </>
  );
}
