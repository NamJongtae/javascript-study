import About from "../pages/about/About.js";
import Notice from "../pages/notice/Notice.js";
import Main from "../pages/main/Main.js";
import Post from "../pages/post/Post.js";

const BASE_URL = "http://localhost:3000";

const routes = [
  { path: /^\/$/, page: Main },
  { path: /^\/notice$/, page: Notice },
  { path: /^\/post\/[\w]+$/, page: Post },
  { path: /^\/about$/, page: About },
];
export { BASE_URL, routes };
