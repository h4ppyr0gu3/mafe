import { createNotifications, createNotification } from "./notifications";

export function displayErrors(response, defaultText) {
  recursiveErrorLookup(response);
  createNotification(defaultText, "error");
}

function recursiveErrorLookup(obj) {
  if (obj === null) return;
  Object.keys(obj).forEach((key) => {
    if (key === "errors" && typeof(obj[key]) == "array" && typeof(obj[key][0]) === "string") {
        createNotifications(error, "error");
    } else if (typeof(obj[key]) == "object") {
      recursiveErrorLookup(obj[key]);
    }
  });
}
