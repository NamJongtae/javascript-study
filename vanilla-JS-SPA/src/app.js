import Router from "./router/router.js";
import $ from "./util/querySelector.js";
import Header from "./commons/header/Header.js";
import Footer from "./commons/footer/Footer.js";
import { BASE_URL } from "./router/routes.js";
import navigate from "./util/navigate.js";
import render from "./util/render.js";

export default function App() {
  this.router = new Router();
  this.router.initalize();

  this.render = () => {
    render(`
    ${Header()}
    ${this.router.getComponent()}
    ${Footer()}
    `);
  };

  // 이벤트 위임
  this.registerNavgateEvent = () => {
    $("#root").addEventListener("click", function (e) {
      // navbar
      if (e.target.matches(".navbar a")) {
        e.preventDefault();
        const targetURL = e.target.href.replace(BASE_URL, "");
        navigate(targetURL);
      }

      // main-content
      if (e.target.closest(".main-content")) {
        const target = e.target.closest("a");

        if (!target) return;
        e.preventDefault();

        const targetURL = target.href.replace(BASE_URL, "");

        navigate(targetURL);
      }

      // home-btn
      if (e.target.matches(".home-btn")) {
        navigate("/", true);
      }
    });
  };

  this.render();
  this.registerNavgateEvent();
}
