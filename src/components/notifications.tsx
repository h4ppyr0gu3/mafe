import { onMount, createSignal, Show, For, onCleanup } from "solid-js";
import {
  getNotifications,
  useNotifications,
  markAsRead,
} from "../utils/user_notification_requests";
import { Notification } from "../types/main";

export default function Notifications() {
  let timeout: number;
  const [shouldShow, setShouldShow] = createSignal(false);
  const [notifications, setNotifications] = useNotifications();

  async function fetchNotifications() {
    console.log("notifications");
    // getNotifications().then(() => {
    //   console.log(notifications);
    //   timeout = setTimeout(() => {
    //     fetchNotifications();
    //   }, 60000);
    // });
  }

  onCleanup(() => {
    clearTimeout(timeout);
  })

  const toggleNotifications = () => {
    setShouldShow(!shouldShow());
  };

  onMount(() => {
    fetchNotifications();
  });

  function handleClick(event: Event) {
    const target = event.target as HTMLButtonElement;
    markAsRead(target.dataset.id).then(() => {
      if (target.dataset.link != undefined) {
        const link = document.createElement("a");
        link.href = target.dataset.link;
        link.click();
        }
      })
  }

  function handleMarkAsRead() {
    console.log("all notifications will be read");
  }

  return (
    <>
      <a class="navbar-item" onClick={toggleNotifications}>
        Notifications
      </a>
      <Show when={shouldShow()} fallback={<div />}>
        <div class="notifications-dropdown">
          <Show when={notifications.notifications.length > 0} fallback={
          <div> No unread Notifications to show</div>
          }>
          <For each={notifications.notifications}>
            {(el: Notification) => (
              <div
                onClick={handleClick}
                data-id={el.id}
                data-link={el.link}
                class="notification-element"
              >
                {el.text}
              </div>
            )}
          </For>
          <div class="button is-fullwidth" onClick={handleMarkAsRead}> Mark all as read </div>
          </Show>
        </div>
      </Show>
    </>
  );
}
