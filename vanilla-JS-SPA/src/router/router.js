import Header from "../commons/header/Header.js";
import Footer from "../commons/footer/Footer.js";
import NotFound from "../pages/notFound/NotFound.js";
import { routes } from "./routes.js";
import render from "../util/render.js";

class Router {
  compoent = undefined;

  findRoute() {
    return routes.find((route) => {
      return route.path.test(location.pathname);
    });
  }

  getComponent() {
    this.compoent = null;
    const renderPage = this.findRoute()?.page || NotFound;
    this.compoent = renderPage();
    return this.compoent;
  }

  initalize() {
    window.addEventListener("historychange", ({ detail }) => {
      const { to, isReplace } = detail;

      // 페이지 중복 스텍 제거 및 페이지 스텍 쌓기
      if (isReplace || to === location.pathname) {
        history.replaceState(null, "", to);
      } else {
        history.pushState(null, "", to);
      }

      render(`
      ${Header()}
      ${this.getComponent()}
      ${Footer()}
      `);
    });

    window.addEventListener("popstate", () => {
      render(`
      ${Header()}
      ${this.getComponent()}
      ${Footer()}
      `);
    });
  }
}

export default Router;
