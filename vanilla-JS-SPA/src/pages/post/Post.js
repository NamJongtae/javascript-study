import DUMMY_DATA from "../../dummy/data";
import NotFound from "../notFound/NotFound";
import "./post.css";

export default function Post() {
  const id = location.pathname.split("/").pop();

  return DUMMY_DATA[id]?.title
    ? /*html*/ `
  <main class="post">
    <h2 class="post-title">${DUMMY_DATA[id].title}</h2>
    <h3>${DUMMY_DATA[id].subTitle}</h3>
    <img class="post-img" src=${DUMMY_DATA[id].img}/>
    <div class="post-content">
      ${DUMMY_DATA[id].content}
    </div>
  </main>
    `
    : NotFound();
}
