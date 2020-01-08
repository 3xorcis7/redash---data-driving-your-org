import { isString } from "lodash";
import navigateTo from "./navigateTo";

export default function handleNavigationIntent(event) {
  let element = event.target;
  while (element) {
    if (element.tagName === "A") {
      break;
    }
    element = element.parentNode;
  }
  if (!element) {
    return;
  }

  // Keep some default behaviour
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
    return;
  }

  const target = element.getAttribute("target");
  if (isString(target) && target.toLowerCase() === "_blank") {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  navigateTo(element.href);
}
