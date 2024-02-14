# Webpack & Babel 다루기

## Webpack ?

### **Webpack은 여러 모듈을 하나로 번들링 해주는 번들러 (bundler)**

**웹팩을 사용하는 이유 ?**

- 자바스크립트의 종속성이 있는 파일을 하나로 묶어주어 관리하기 쉬움
- 모듈이 커지면 파일을 읽어 오는 로딩 시간이 늘어남 웹팩을 사용하면 하나의 파일로 번들링되어 로딩 시간이 최적화됨
- 하나의 파일로 번들링 되기 때문에 웹페이지 성능이 최적화 됨

## **Webpack 사용해보기**

### **웹팩 설치하기**

```bash
npm install --save-dev webpack webpack-cli
```

### **webpack.confing.js 파일 기본 설정 하기**

- `mode` : 웹팩의 실행 모드가 설정
    - 🔗 [Mode 공식 문서](https://webpack.kr/configuration/mode/)
    - `none` : 모드 설정 안함
    - `development` : 개발 모드
    - `production` : 배포 모드
    - 모드의 기본 값을 설정하지 않으면 `production` 모드로 자동 설정됩니다.
- `entry` : 웹 자원을 변환하기 위해 필요한 최초 진입점이자 자바스크립트 파일 경로 `dependency graph`를(모듈 간의 의존 관계가 생기는 구조) 그릴 때 시작점
    - 🔗 [entry 공식 문서](https://webpack.kr/concepts/entry-points/)
    - `entry` 속성에 파일 경로를 배열로 전달 가능
- `output` : 팩이 만드는 번들을 어디에 만들고 이름을 무엇으로 할 것인지 정의
    - 🔗 [output  공식문서](https://webpack.kr/concepts/output/)
    - `path` : 번들 파일 경로
    - `filename` : 번들 파일명
- `target` : 지원하길 원하는 환경을 설정
    - 🔗 [target 공식문서](https://webpack.kr/configuration/target/)
    - target를 설정하지 않으면 기본값으로 ES6가 적용됨 (⚠ 구 브라우저 지원불가)

```javascript
const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  target : ['web', 'es5'],
};
```

### **로더 추가하기**

`loader`  : 웹팩은 `JavaScript`와 `JSON`파일들만 이해가능 하지만 웹팩이 다른 타입의 파일들을 처리할 수 있게 해주고, 그 파일들을 변형하는 역할을 함

- 🔗 [loader 공식문서](https://webpack.kr/concepts/loaders/)
- loader는 오른쪽에서 부터 왼쪽 순으로 동작
- **loader 속성**
    - `test`는 어떤 파일을 대상으로 할 것인지 선택합니다.
    - `use`는 어떤 loader가 사용될 것인지 선택합니다.

- 로더 설치하기

```bash
npm install --save-dev style-loader css-loader babel-loader
```

- webpack.confing.js에 loader 추가
    - module.rules 배열에 로더 추가
    - `style-loader` : `<style>` 태그를 삽입하여 CSS에 DOM을 추가
    - `css-loader` : webpack에서 `.css` 파일을 읽어들이기위해 사용하는 로더
    - `file-loader` : webpack에서 특정 파일을 읽어들이기위해 사용하는 로더
    - `babel-loader` : 웹팩이 모듈을 번들링할 때 바벨을 사용하도록 설정하는 로더
        - babel 설정 방법은 아래 babel 설명에서 나옵니다.

```javascript
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  target : ['web', 'es5'],
	module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      { 
				test: /\.png$/, 
				use: {
          loader: "file-loader",
          options: { outputPath: './images/', name: "[name].[ext]"},
        }, 
			},
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
```

### **플러그인 추가하기**

`plugins` : 번들 최적화, 자산 관리 및 환경 변수 주입과 같은 광범위한 작업을 수행

- 플러그인을 사용하기 위해서 `require()`로 import하고 `plugins` 배열에 추가
- 플러그인을 여러 번 사용할 수 있으므로 `new`로 새로운 인스턴스를 생성하여 추가

**대표적인 플러그인** 

`html-webpack-plugin` : webpack 번들을 제공하는 HTML 파일 생성

**option 설정 목록**

- **template** : 웹팩이 사용할 HTML 템플릿 파일의 경로를 설정
- **filanme** : 생성될 HTML 파일의 이름을 설정
- **inject : 자동으로 생성된 script 태그를 HTML 파일에 삽입할 방법을 설정 true**를 사용하면 **body** 요소의 마지막에 삽입하고, **head** 요소에 삽입하려면 **head**를 설정 기본값은 **true**
- **minify : 생성된 HTML 파일을 최소화할지 여부를 설정** 기본값은 **false**
    - **세부 옵션**
    - `collapseWhitespace` : 빈칸 제거
    - `removeComments` : 주석 제거
- **hash : 자동으로 생성된 script 파일명에 해시값을 추가할지 여부를 설정** 기본값은 **false**

`mini-css-extract-plugin` : 웹팩 빌드 시점에서 CSS 파일을 분리하여 추출하는 플러그인

- CSS 파일을 별도로 추출하면, 브라우저에서 CSS 파일을 캐시할 수 있어 초기 로딩 속도를 높임

**option 설정 목록**

- **filename**: 추출된 CSS 파일명을 설정합니다. 기본값은 **main.css**입니다.
- **chunkFilename**: 추출된 CSS 파일의 청크(chunk) 파일명을 설정합니다. 기본값은 **[id].css**입니다.
- **ignoreOrder**: CSS 파일 추출 순서에 대한 경고를 출력하지 않도록 설정합니다. 기본값은 **false**입니다.

`clean-webpack-plugin` : 웹팩 빌드 시점에서 이전 빌드 결과물을 자동으로 삭제

**option 설정 목록**

- **cleanOnceBeforeBuildPatterns** : 빌드 이전에 삭제할 파일 경로를 설정합니다. 기본값은 **['**/*']**으로, 모든 파일을 삭제합니다.
- **cleanAfterEveryBuildPatterns** : 빌드 이후에 삭제할 파일 경로를 설정합니다.
- **verbose** : 삭제되는 파일의 상세 정보를 출력합니다. 기본값은 **false**입니다.

**`copy-webpack-plugin` :** 웹팩 빌드 시점에서 파일을 복사하는 플러그인

- 웹팩으로 빌드한 결과물 외에, 원하는 파일들을 추가로 복사

**option 설정 목록**

- **patterns** : 션을 사용하여 복사할 파일 경로와 대상 경로를 설정
    - { from : “복사파일 경로”, to:”대상경로” }
- **force**: 이미 존재하는 파일을 덮어쓸지 여부를 설정합니다. 기본값은 **false** 입니다.
- **cleanStaleWebpackAssets**: 이전 빌드 결과물 중 더 이상 사용되지 않는 파일을 삭제할지 여부를 설정합니다. 기본값은 **true**입니다.
- **flatten**: 복사 대상 경로에 상위 경로를 포함시키지 않고, 파일명만 복사할지 여부를 설정합니다. 기본값은 **false**입니다.

**`image-minimizer-webpack-plugin`** : 이미지를 최적화해주는 플러그인 ****

**이미지 최적화는 2가지 모드로 제공**

- 무손실 최적화를 위해 사용되는 imagemin 플러그인

```bash
npm i imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D
```

- 손실 최적화를 위해 사용되는 imagemin 플러그인

```bash
npm i imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo -D
```

**option 설정 목록**

- exclude :  제외 설정
- minimizerOptions : 최적화 옵션 설정
    - plugins : imagemin에 사용할 플러그인 설정

**대표적인 플러그인 설치하기**

```bash
npm install -D html-webpack-plugin mini-css-extract-plugin clean-webpack-plugin **copy-webpack-plugin image-minimizer-webpack-plugin**
```

`optimization` : 웹팩의 최적화 관련 설정 위한 옵션

**option 설정 목록**

- **minize** : true 값을 주면 webpack은 [TerserPlugin](https://webpack.js.org/plugins/terser-webpack-plugin/) 또는 opmization.minimizer에 명시된 플러그인들로 최적화를 실행 기본값은 **true**
- **minimizer** :  최적화를 위해 사용하는 플러그인을 명시하는 속성
- minimizer 속성으로 최적화할 때 적용되는 plugin을 재정의 할 때, ‘…’을 같이 사용하면 기존에 default로 적용되던 plugin도 같이 적용

`terser-webpack-plugin` : js 코드를 압축하는 데 사용되는 플러그인

- Production 모드일때 기본 활성화
- 플러그인을 설치하여 추가 옵션 설정 가능

**option 설정 목록**

- **compress** : { comments : true/fasle } 빌드 시 빈 칸 제거
- **format** : { drop_console : true/false } 빌드 시 주석 제거
- **extractComments** : 주석을 별도의 파일로 추출할 지 여부

**webpack에 plugins 추가**

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  target : ['web', 'es5'],
	optimization: {
    minimizer: [
			'...',
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["mozjpeg", { optimizationLevel: 5 }],
              ["pngquant", { optimizationLevel: 5 }],
              ["optipng", { optimizationLevel: 5 }],
            ],
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      { test: /\.png$/, use: "file-loader" },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
			**minify : true,**
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
      patterns: [
        // 복사할 파일 경로와 대상 경로를 설정합니다.
        { from: "./src/images", to: "./images" },
        ,
      ],
  ],
};
```

### webpack5 file-loader

**wepback5로 업데이트 되면서 file-loader의 기능을 새로운 모듈이 추가 되어 제공**

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  target : ['web', 'es5'],
	optimization: {
    minimizer: [
			'...',
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["mozjpeg", { optimizationLevel: 5 }],
              ["pngquant", { optimizationLevel: 5 }],
              ["optipng", { optimizationLevel: 5 }],
            ],
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      { test: /\.jpg/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
			minify : true,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
      patterns: [
        // 복사할 파일 경로와 대상 경로를 설정합니다.
        { from: "./src/images", to: "./images" },
        ,
      ],
  ],
};
```

---

## Babel ?

### **Babel은 신 버전의 자바스크립트가 실행되지 않는 구 버전의 브라우저에서도 정상적으로 실행되도록 변환하도록 도와주는 도구**

### **babel을 쓰는 이유**

- 크로스 브라우징
    - JavaScript (ES6) -> JavaScript(ES5)로 변환해줍니다. (브라우저 하위 호환성을 생각)
    - 각 브라우저마다 JavaScript 엔진이 다르지만, 모든 브라우저에서 동작하도록 호환성을 지켜줍니다.
- 폴리필(polyfill)
    - 폴리필은 개발자가 특정 기능이 지원되지 않는 브라우저를 위해 사용할 수 있는 코드 조각이나 플러그인을 의미
    - 폴리필은 프로그램이 처음에 시작될 때 현재 브라우저에서 지원하지 않는 함수를 검사해서 각 object의 prototype에 붙여주는 역할을 함
    - 폴리필을 사용하는 방법에는 3가지가 존재
        - `@babel/polyfill` 사용 ⇒ 현재는 폐지
        - `core-js` 에서 필요한 폴리필만 import해서 사용
        - `@babel/preset-env` 프리셋 사용
- 👉 `@babel/pollyfill` **폐지**
    - 전역 공간에 폴리필을 채워넣기 때문에 **전역 공간이 오염** 되어 **폴리필 충돌이 일어남**
    - 브라우저에서 필요하지 않은 폴리필까지 넣기 때문에 **번들 크기가 커짐**

### babel 설정하기

**프리셋**

- 필요한 플러그인을 일일이 설정하기 번거로운데 여러 가지 **플러그인을 세트로 모아 놓은 것**을 **프리셋**이라고 합니다.

**대표적인 babel 프리셋**

- `@babel/core` : 패키지에는 바벨이 작동하기 위한 핵심 기능들이 들어있음
- `@babel/cli` : 패키지는 터미널의 명령어 인터페이스를 통해 파일을 컴파일 할 수 있도록 함
- `@babel/pollyfill` : 현재 패지된 방식 커스텀 `regenerator runtime`과 `core-js`가 포함
- `@babel/preset-env` : 환경에 대한 구문 변환 설정을 쉽게 설정하고 관리할 수 있게 해줌
    - `@babel/pollyfill` 이 페지됨에 따라 `core-js`  사용이 추천되며, `@babel/preset-env`에서 `corejs` 옵션을 사용하여 버전을 지정할 수 있고 `useBuiltIns` 옵션(entry : 모든 폴리필을 불러옴, usage : 코드에서 사용중인 기능의 폴리필만 불러옴)으로 어떻게 폴리필을 다룰 것인지 설정
- `@babel/plugin-transform-runtime` : 코드 사이즈를 줄이기 위해 이미 사용한 `helper code`를 재사용 할 수있는 플러그인
    - 애플리케이션이 여러 파일에 분산되어 있는 경우는 중복이 발생
    - **중복을 방지**하기 위해 `helper code`들이 `@babel/runtime`을 참조하여 **재사용**할 수 있게 해줌
    - `core-js@3`와 `@babel/transform-runtime`를 함께 사용하면 `core-js-pure` 버전으로부터 폴리필을 주입하는데 `core-js-pure`버전은 **전역 스코프를 오염시키지 않음**

**프리셋 설치**

```javascript
npm install -D @babel/cli @babel/preset-env @babel/core @babel/plugin-transform-runtime
```

**.babelrc 설정하기**

```javascript
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "ie": "11"
        },
        "debug": true
      }
    ]
  ],
  "plugins": [["@babel/plugin-transform-runtime", { "corejs": 3 }]]
}
```