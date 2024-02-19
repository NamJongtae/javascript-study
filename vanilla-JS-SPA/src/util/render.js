import handleError from "./handleError";
import $ from "./querySelector";

function render(element) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = element;

  handleError(
    tempDiv.firstChild !== null,
    "The element must be a valid HTML string."
  );

  $("#root").innerHTML = element;
}

export default render;
