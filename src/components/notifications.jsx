import { onMount, createSignal, Show, For } from "solid-js";
import {
  getNotifications,
  useNotifications,
} from "../utils/user_notification_requests";

export default function Notifications() {
  const [shouldShow, setShouldShow] = createSignal(false);
  const [notifications, setNotifications] = useNotifications();

  async function fetchNotifications() {
    console.log("notifications");
    getNotifications().then(() => {
      console.log(notifications);
      setTimeout(() => {
        fetchNotifications();
      }, 60000);
    });
  }

  const toggleNotifications = () => {
    setShouldShow(!shouldShow());
  };

  onMount(() => {
    fetchNotifications();
  });

  function handleClick(el) {
    // mark as read el.target.dataset.id
    if (el.target.dataset.link != undefined) {
      var link = document.createElement("a");
      link.href = el.target.dataset.link;
      link.click();
    }
  }

  return (
    <>
      <a class="navbar-item" onClick={toggleNotifications}>
        Notifications
      </a>
      <Show when={shouldShow()} fallback={<div />}>
        <div class="notifications-dropdown">
          <For each={notifications.notifications}>
            {(el) => (
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
        </div>
      </Show>
    </>
  );
}
