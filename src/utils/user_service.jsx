import { onMount } from "solid-js";
import { createStore } from "solid-js/store"

export const userService = () => {
  const [user, setUser] = createStore();

  onMount(() => {
    const userString = localStorage.getItem('user')
    if (!userString) return
    console.log('onMount')
    setUser(() => JSON.parse(userString))
  })

  const updateUser = (user) => {
    setUser(() => user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  return { user, updateUser }
}
