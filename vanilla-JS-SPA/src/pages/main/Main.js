import DUMMY_DATA from "../../dummy/data";
import "./main.css";

export default function Main() {
  return /*html*/ `
    <main class="main">
      <h2 class="main-title">Travel World</h2>
      <div class="main-content">
        <ul>
        ${DUMMY_DATA.map(
          (data) =>
            `<li>
              <a href=${"/post/" + data.id}>
                  <img src=${data.img} />
                  <h3>${data.title}</h3>
                  <span>${data.subTitle}</span>
              </a>
          </li>`
        ).join("")}
        </ul>
      </div>
    </main>
    `;
}
