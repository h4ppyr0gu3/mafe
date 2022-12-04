import { createStore } from "solid-js/store";

const [errors, setErrors] = createStore({ errors: [] });
export const useErrors = () => [errors, setErrors];

const [messages, setMessages] = createStore({ messages: [] });
export const useMessages = () => [messages, setMessages];
