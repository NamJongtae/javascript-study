# Vanilla JS SPA 구현

> **React, vue, angular 등과 같은 라이브러리, 프레임워크를 사용하지 않고 SPA 동작과정 및 원리를 이해하기 위해 바닐라 자바스크립트로 SPA를 구현합니다.**

`Router` 구현을 위해서 `history API`를 사용합니다.

👉 `Router` : **웹 애플리케이션에서 URL 경로와 해당 경로에서 실행할 코드를 연결해주는 역할을 합니다.**

👉 `history API` : **웹 브라우저의 세션 기록(session history)에 접근하고, 웹 페이지를 네비게이션하는 데 사용할 수 있는 JavaScript API입니다.**

`history API` **를 사용하면** **브라우저의 뒤로 가기, 앞으로 가기 버튼을 사용하거나, 북마크를 클릭할 때 페이지를 새로고침하지 않고도 웹 페이지의 상태를 변경하거나, 브라우저의 URL을 변경할 수 있습니다.**
 
### 구현 과정
1. wepback 설치 및 설정
2. 구현에 필요한 유틸 함수 생성
3. 더미 데이터 생성
4. 페이지 생성
5. 공통 컴포넌트 생성
6. 라우터 구현
7. app.js 초기화 파일 생성

### 폴더 구조
```
📦 vanilla-JS-SPA
 ┣ 📂public
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📜banner.jpg
 ┃ ┃ ┣ 📜forest.jpg
 ┃ ┃ ┣ 📜mountain.jpg
 ┃ ┃ ┗ 📜ocean.jpg
 ┃ ┣ 📜favicon.png
 ┃ ┗ 📜index.html
 ┣ 📂src
 ┃ ┣ 📂commons
 ┃ ┃ ┣ 📂footer
 ┃ ┃ ┃ ┣ 📜footer.css
 ┃ ┃ ┃ ┗ 📜Footer.js
 ┃ ┃ ┣ 📂header
 ┃ ┃ ┃ ┣ 📜header.css
 ┃ ┃ ┃ ┗ 📜Header.js
 ┃ ┃ ┗ 📂navbar
 ┃ ┃ ┃ ┣ 📜navbar.css
 ┃ ┃ ┃ ┗ 📜Navbar.js
 ┃ ┣ 📂dummy
 ┃ ┃ ┗ 📜data.js
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂about
 ┃ ┃ ┃ ┣ 📜about.css
 ┃ ┃ ┃ ┗ 📜About.js
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┣ 📜main.css
 ┃ ┃ ┃ ┗ 📜Main.js
 ┃ ┃ ┣ 📂notFound
 ┃ ┃ ┃ ┣ 📜notFound.css
 ┃ ┃ ┃ ┗ 📜NotFound.js
 ┃ ┃ ┣ 📂notice
 ┃ ┃ ┃ ┣ 📜notice.css
 ┃ ┃ ┃ ┗ 📜Notice.js
 ┃ ┃ ┗ 📂post
 ┃ ┃ ┃ ┣ 📜post.css
 ┃ ┃ ┃ ┗ 📜Post.js
 ┃ ┣ 📂router
 ┃ ┃ ┣ 📜routes.js
 ┃ ┃ ┗ 📜router.js
 ┃ ┣ 📂util
 ┃ ┃ ┣ 📜handleError.js
 ┃ ┃ ┣ 📜navigate.js
 ┃ ┃ ┣ 📜querySelector.js
 ┃ ┃ ┗ 📜render.js
 ┃ ┣ 📜app.js
 ┃ ┣ 📜global.css
 ┃ ┗ 📜index.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜webpack.config.js
```

</br>

### 1. Webpack 설정

기본적인 로더, 플러그인 설정과 동적으로 페이지를 가져오기 위해 devServer 설정에 `historyAPiFallback` 값은 **true**로 설정 output의 `publicPath`를 /로 설정

👉 `historyAPiFallback` : **History API를 사용하여 페이지를 새로고침 없이 URL을 변경 해주는 옵션으로 서버에 실제 경로가 없는 URL 요청이 왔을 때, 특정 페이지로 리다이렉트시켜주는 역할을 합니다.**

**`false`일 시** **URL을 입력하거나 새로고침을 하면, 서버는 해당 URL에 대응하는 실제 파일을 찾게됩니다. SPA의 경우 404에러를 반환하게 됩니다.**

**`true`일 시 웹팩 개발 서버는 404 응답을 반환하는 대신, 대신 항상 주어진 페이지(기본적으로 `index.html`)를 반환합니다.**

**webpack 설치**

```bash
npm install -D wepback webpack-cli webpack-dev-server
```

**사용된 로더 설치**

```bash
npm install -D style-loader css-loader
```

**사용된 플러그인 설치**

```bash
npm install -D html-webpack-plugin
```

**webpack.config.js**

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.png"
    }),
  ],
};
```

**package.json**

```javascript
{
  "scripts": {
    "dev": "webpack serve",
    "build": "webpack --mode production"
  },
  "devDependencies": {
    "css-loader": "^6.10.0",
    "html-webpack-plugin": "^5.6.0",
    "style-loader": "^3.3.4",
    "webpack": "^5.90.2",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^5.0.2"
  }
}
```

</br>

### 2. 유틸 함수 생성

**handleError.js ⇒ 에러 처리 함수**

```javascript
export default function handleError(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
```

**querySelector.js ⇒ document.querySelector를 통해 찾은 element를 반환해줍니다.**

```javascript
import handleError from "./handleError";

export default function $(selector) {
  const selectedElement = document.querySelector(selector);
  handleError(selectedElement, "Not Found selectedElement.");
  return selectedElement;
}
```

**render.js ⇒ root 요소에 동적으로 HTML 요소를 렌더링합니다.**

```javascript
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
```

**navigate ⇒ history api를 이용하여 페이지를 이동시킵니다.**

```javascript
export default function navigate(to, isReplace = false) {
  const historyChangeEvent = new CustomEvent("historychange", {
    detail: {
      to,
      isReplace,
    },
  });
  dispatchEvent(historyChangeEvent);
}
```

</br>

### 3. 더미 데이터 생성

```javascript
const DUMMY_DATA = [
  {
    id: "0",
    title: "Mountain",
    subTitle: "Tall peaks, rugged terrain",
    content:
      "Mountains, with their towering peaks and rugged terrains, are natural wonders that never fail to awe and inspire. They are home to an astonishingly diverse array of flora and fauna, each uniquely adapted to the challenging conditions. Hiking up a mountain can be a physically demanding endeavor, but the breathtaking views from the summit make the effort worthwhile. The experience also offers a sense of accomplishment and a renewed appreciation for the beauty and resilience of nature. The sight of a snow-capped peak rising majestically against the sky is a reminder of the grandeur and mystery of the natural world.",
    img: "../images/mountain.jpg",
  },
  {
    id: "1",
    title: "Forest",
    subTitle: "Lush trees, abundant life",
    content:
      "Forests are a treasure trove of biodiversity, teeming with a multitude of species that play vital roles in maintaining the balance of our planet's ecosystem. They provide a habitat for a wide range of organisms, from the towering trees that form the forest canopy, to the myriad of life forms that inhabit the understory. Forests also play a crucial role in the global carbon cycle, absorbing carbon dioxide from the atmosphere and storing it in their biomass. A walk in the forest can be a journey of discovery and wonder, offering countless opportunities to observe and learn about nature's intricate web of life.",
    img: "../images/forest.jpg",
  },
  {
    id: "2",
    title: "Ocean",
    subTitle: "Blue sea, mysterious creatures.",
    content:
      "Oceans, covering more than 70% of the earth's surface, are vast and mysterious realms teeming with life. From the sunlit surface waters to the dark depths of the abyss, the ocean is home to a staggering variety of organisms, each adapted to the unique conditions of their environment. The ocean's waves and tides shape our coastlines and influence our climate. They also provide us with a wealth of resources, from the fish that form a crucial part of our food supply, to the minerals and energy resources that fuel our economies. Yet, despite their immense importance, our oceans remain largely unexplored and their secrets continue to fascinate and intrigue us.",
    img: "../images/ocean.jpg",
  },
];

export default DUMMY_DATA;
```

</br>

### 4. 공통 컴포넌트 생성

**페이지에 공통적으로 들어가는 컴포넌트를 생성합니다.**

**Header.js**

```javascript
import Navbar from "../navbar/Navbar";
import "./header.css";

export default function Banner() {
  return /*html*/ `
  <header class="header">
  <h1 class="title">
    <img src="../images/banner.jpg" class="banner" alt="Sing Page Application"/>
  </h1>
  ${Navbar()}
  </header>
  `;
}
```

**Navbar.js**

```javascript
import "./navbar.css";

export default function Navbar() {
  return `
    <nav class="navbar">
      <ul>
        <li>
          <a href="/">HOME</a>
        </li>
        <li>
          <a href="/about">ABOUT</a>
        </li>
        <li>
          <a href="/notice">NOTICE</a>
        </li>
      <ul>
    </nav>
    `;
}
```

**Footer.js**

```javascript
import "./footer.css";

export default function Footer() {
  return /*html*/ `
    <footer class="footer">
      Copyright ⓒ Travel World Rights Reserved.
    </footer>
    `;
}
```

</br>


### 5. 페이지 생성

**Main.js**

**Main.js**

```javascript
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
```

**About.js**

```javascript
import "./about.css";

export default function About() {
  return /*html*/ `
  <main class="about">
  <h2 class="about-title">About Us</h2>
  <div class="about-content">
    <p>Welcome to Travel World! We are a passionate team of travel enthusiasts dedicated to providing you with the best travel experiences.</p>
    <p>At Travel World, we believe that travel has the power to broaden horizons, create lifelong memories, and foster connections between people from different cultures and backgrounds.</p>
    <p>Whether you're seeking adventure in the great outdoors, exploring historical landmarks, or indulging in local cuisines, we've got you covered. Our team of experts curates unique travel itineraries and hand-picks the best destinations to ensure that your journey is unforgettable.</p>
    <p>Join us on a remarkable journey to discover the wonders of the world. Let Travel World be your guide as you embark on your next adventure.</p>
  </div>
</main>
    `;
}
```

**Notice.js**

```javascript
import "./notice.css";

export default function Notice() {
  return /*html*/ `
    <main class="notice">
      <h2 class="notice-title">Noitce</h2>
      <div class="notice-content">
      <p>
      Dear travelers, we are excited to announce some new updates to our travel experiences. We have added three new destinations that you might find intriguing: Mountain, Forest, and Ocean.
    </p>
    <p>
      The "Mountain" tour will take you on an exhilarating journey through towering peaks and rugged terrains. You will be able to witness the astonishingly diverse array of flora and fauna, each uniquely adapted to the challenging conditions. The breathtaking views from the summit make the physically demanding endeavor worthwhile.
    </p>
    <p>
      The "Forest" tour allows you to explore a treasure trove of biodiversity. You will be surrounded by lush trees and abundant life forms that play vital roles in maintaining the balance of our planet's ecosystem. The forest’s tranquility offers a journey of discovery and wonder, providing countless opportunities to observe and learn about nature's intricate web of life.
    </p>
    <p>
      The "Ocean" tour offers a journey into the vast and mysterious realm of the sea. Covering more than 70% of the earth's surface, the ocean is teeming with a staggering variety of organisms. This tour will take you from the sunlit surface waters to the dark depths of the abyss, offering a unique underwater experience.
    </p>
    <p>
      We invite you to experience these new offerings and look forward to serving you on your next adventure. Thank you for choosing us as your travel companion.
    </p>
      </div>
    </main>
    `;
}
```

**NotFound.js**

```javascript
import "./notFound.css";
export default function NotFound() {
  return /*html*/ ` 
  <main class="notFound">
    <h2 class="notice-title">404 Not Found.</h2>
    <button class="home-btn">Go To Home</button>
  </main>
  `;
}
```

</br>

### 6. 라우터 구현

**Router.js**

```javascript
import Header from "../commons/header/Header.js";
import Footer from "../commons/footer/Footer.js";
import NotFound from "../pages/notFound/NotFound.js";
import { routes } from "./routes.js";
import render from "../util/render.js";

class Router {
  compoent = null;

  // 현재 URL 경로와 일치하는 라우트 찾기
  // 정규표현식을 이용하여 라우트를 찾습니다.
  findRoute() {
    return routes.find((route) => {
      return route.path.test(location.pathname);
    });
  }

  // 현재 렌더링할 컴포넌트를 가져오는 메서드
  getComponent() {
    const currentPage = this.findRouter()?.page || NotFound;
    this.compoent = currentPage();
    return this.compoent;
  }

  // 라우터 초기화
  // 1. historychange 커스텀 이벤트 등록
  // 2. popstate 이벤트 등록
  initalize() {
    window.addEventListener("historychange", ({ detail }) => {
      const { to, isReplace } = detail;

      // 페이지 중복 스텍 제거 및 페이지 스텍 쌓기
      if (isReplace || to === location.pathname) {
        history.replaceState(null, "", to);
      } else {
        history.pushState(null, "", to);
      }

      // 페이지 렌더링
      render(`
      ${Header()}
      ${this.getComponent()}
      ${Footer()}
      `);
    });

    // 브라우저의 뒤로 가기/앞으로 가기 버튼 클릭 시 페이지 렌더링
    window.addEventListener("popstate", () => {
      // 페이지 렌더링
      render(`
        ${Header()}
        ${this.getComponent()}
        ${Footer()}
        `);
    });
  }
}

export default Router;
```

**routes.js ⇒ 라우팅 경로와 렌더링할 페이지를 설정**

```javascript
import About from "../pages/about/About.js";
import Notice from "../pages/notice/Notice.js";
import Main from "../pages/main/Main.js";
import Post from "../pages/post/Post.js";

const BASE_URL = "http://localhost:3000";

// 정규표현식을 이용하여 라우팅 하기위해 path를 정규표현식으로 설정
const routes = [
  { path: /^\/$/, page: Main },
  { path: /^\/notice$/, page: Notice },
  { path: /^\/post\/[\w]+$/, page: Post },
  { path: /^\/about$/, page: About },
];
export { BASE_URL, routes };
```

</br>

### 7. app.js 초기화 파일 생성

```javascript
import Router from "./router/router.js";
import $ from "./util/querySelector.js";
import Header from "./commons/header/Header.js";
import Footer from "./commons/footer/Footer.js";
import { BASE_URL } from "./router/routes.js";
import navigate from "./util/navigate.js";
import render from "./util/render.js";

function App() {
  // 라우터 생성 및 초기화
  this.router = new Router();
  this.router.initalize();

  // 초기 페이지 렌더링
  this.render = () => {
    render(`
    ${Header()}
    ${this.router.getComponent()}
    ${Footer()}
    `);
  };

  // 초기 이벤트 등록 SPA 구현을 위해 a 링크 동작을 막고 navigate가 작동되도록 설정
  // 동적요소 이벤트 적용을 위해 이벤트 위임을 사용하여 이벤트 등록
  this.registerNavgateEvent = () => {
    $("#root").addEventListener("click", function (e) {
      // navbar
      if (e.target.matches(".navbar a")) {
        e.preventDefault();
        // targetURL 추출 BASE_URL 제외한 부분
        const targetURL = e.target.href.replace(BASE_URL, "");
        navigate(targetURL);
      }

      // main-content
      if (e.target.closest(".main-content")) {
        const target = e.target.closest("a");
        // 클릭된 요소의 상위 요소 중 a 태그가 없으면 return
        if (!target) return;
        e.preventDefault();
        // 클릭된 a 태그의 href 속성값을 가져온다.
        const targetURL = target.href.replace(BASE_URL, "");
        // SPA 라우팅 함수를 호출한다.
        navigate(targetURL);
      }

      // home-btn
      if (e.target.matches(".home-btn")) {
        // home 페이지로 이동
        navigate("/", true);
      }
    });
  };

  // 초기 렌더링
  this.render();
  // 초기 이벤트 등록
  this.registerNavgateEvent();
}

export default App;
```

**index.js ⇒ 어플리케이션의 진입점**

```javascript
import "../public/assets/banner.jpg";
import "../public/assets/mountain.jpg";
import "../public/assets/forest.jpg";
import "../public/assets/ocean.jpg";
import "./global.css";
import App from "./app.js";

// DOM이 로드된 이후 App 생성
window.addEventListener("DOMContentLoaded", (e) => {
  new App();
});
```

**index.html ⇒ 페이지를 구성**
```javascript
<!DOCTYPE html>
<html lang="ko-KR">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SPA</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- This HTML file is a template. -->
  </body>
</html>
```

</br>

### 실행 화면
![SPA-gif](https://github.com/NamJongtae/javascript-study/assets/113427991/358c0e5e-c06c-4623-81f5-000f06fb0203)

### 배포 URL
🔗 [vanilla-js-spa](https://vanilla-js-spa123.netlify.app)

</br>

### 참고 사이트
🔗 [Vanilla Javascript로 간단한 SPA 라우터 구현해보기](https://nukw0n-dev.tistory.com/34)
