import handleError from "./handleError";

export default function $(selector) {
  const selectedElement  = document.querySelector(selector);
  handleError(selectedElement, "Not Found selectedElement.");
  return selectedElement
}

