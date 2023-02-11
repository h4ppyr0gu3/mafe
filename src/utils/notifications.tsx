export function createNotifications(input: string[], type:string) {
  input.forEach((text:string) => {
    createNotification(text, type);
  })
}
export function createNotification(text:string, type:string) {
  const parent = document.getElementById("notify")
  const notificationShell = document.createElement('div');
  const notification = document.createElement('div');
  const notificationClasses = "w-11/12 text-gray-50 p-3 flex-auto"
  const buttonClasses = "hover:bg-red-400 flex-auto bg-gray-50 m-2 rounded-full hover:text-secondary-900 items-center justify-center max-h-5 max-w-fit";
  const button = document.createElement('div');
  var notificationShellClasses = "mx-5 my-2 min-w-[400px] rounded-xl border border-secondary-50 text-sm shadow-lg bg-neutral-900 border border-solid flex"
  notificationShellClasses += borderColorFromType(type);
  notificationShell.classList.add(...notificationShellClasses.split(" ").filter(n => n));
  notification.textContent = text;
  notification.classList.add(...notificationClasses.split(" ").filter(n => n))
  button.classList.add(...buttonClasses.split(" ").filter(n => n))
  notificationShell.appendChild(notification);
  notificationShell.appendChild(button);
  button.appendChild(createSVG());
  if (parent == null) {console.error("notify element is not defined");return}
  parent.appendChild(notificationShell);
  button.addEventListener('click', () => {
    parent.removeChild(notificationShell);
  })

  setTimeout(() => {
    parent.removeChild(notificationShell);
  }, 5000);
}

function borderColorFromType(type:string):string {
  const types = {
    green: " border-green-500",
    success: " border-green-500",
    failure: " border-red-500",
    error: " border-red-500",
    red: " border-red-500",
    info: " border-blue-500",
    blue: " border-blue-500",
  }
  if (types[type.toLowerCase()] != undefined) { return types[type] }
  return types.blue;
}

function createSVG():Element {
  const xmlns = "http://www.w3.org/2000/svg";
  const svgElem = document.createElementNS(xmlns, "svg");
  const path = document.createElementNS(xmlns, "path");
  svgElem.setAttributeNS(null, "viewBox", "0 0 20 20");
  svgElem.classList.add(...["h-5", "w-5"]);
  path.setAttributeNS(null, 'd', "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z");
  svgElem.appendChild(path);
  return svgElem;
}

