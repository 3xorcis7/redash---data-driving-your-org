import { startsWith } from "lodash";
import { history } from "./Router";

const htmlLink = document.createElement("a"); // cache instance

export default function navigateTo(href) {
  // do it async
  setTimeout(() => {
    // Resolve provided link and '' (root) relative to document's base.
    // `a.href` contains absolute variant of `a[href]` attribute.
    // If provided href is not related to current document (does not
    // start with resolved root) - redirect to that URL. Otherwise
    // strip root (it ends with slash, so restore it) and update history.

    htmlLink.setAttribute("href", "");
    const baseHref = htmlLink.href;

    htmlLink.setAttribute("href", href);
    href = htmlLink.href;

    if (!startsWith(href, baseHref)) {
      window.location = href;
      return;
    }

    history.push(`/${href.substr(baseHref.length)}`);
  }, 10);
}
