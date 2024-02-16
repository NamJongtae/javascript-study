# Webpack 최적화

## Webpack 최적화가 필요한 이유 ?

> **번들 크기가 커질수록 빌드시간이 매우 길어지며 브라우저 로딩시간이 길어진다는 문제점이 있기 때문입니다.**

</br>

### Webpack 최적화의 장점

- **번들링된 자원들의 크기를 최소하여 애플리케이션의 초기 로딩 속도를 향상 시킬수 있습니다.**
- **코드 스플리팅을 통해 로딩속도를 향상시키고 필요한 자원만 가져오도록 효율적으로 활용할 수 있습니다.**
- **최적화된 모듈 번들링을 통해 불필요한 코드를 제거하고, 중복되는 모듈을 하나의 모듈로 합쳐 번들 크기를 최소화합니다.**

</br>

### Webpack 최적화 분석

**`webpack-bundle-analyzer` 활용**

**webpack 번들링 모듈을 분석하여 시각적으로 표현해주는 라이브러리**

```bash
npm install -D webpack-bundle-analyzer
```

![webpack-analzer](https://github.com/NamJongtae/javascript-study/assets/113427991/3f022468-9137-45ae-ad7f-7bd8865dfe1e)

</br>

### Webpack 최적화 방법

### 1 ) optimization 플러그인

기본적으로 production 모드일 때 optimization.minimize 옵션은 true로 설정합니다.

true로 설정되어 있으면 minimizer에 지정된 플러그인이 적용됩니다.

**주요 minimizer 플러그인**

- `terser-webpack-plugin` : css파일을 압축하는 플러그인
- `css-minimizer-plugin` : js 코드를 압축하는 플러그인
- `image-minimizer-plugin` : 이미지 파일을 압축하는 플러그인

```javascript
const cssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const terserWebpackPlugin = require("terser-webpack-plugin");

{
    //...
    optimization: {
      // minimize: true,
      minimizer: mode === 'production' ? [
        new cssMinimizerPlugin (), // CSS 압축
        new terserWebpackPlugin({ // JS 압축
          terserOptions: {
            compress: {
              drop_console: true // console.log 제거
            },
            format : {
              comments : true // 주석 제거
            },
          }
        }),
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
      ] : []
    }
}
```

</br>

### 2 ) splitChunks

- **여러개의 `bundle` 파일을 생성할 때 동일한 모듈의 `chunk`가 중복해서 각 번들 파일에 포함되는 것을 방지하기 위해 `chunk`를 `split`하는 기능**
- **`Code Splitting` 처럼 번들 결과를 여러개로 산출할 때, 각 청크간에 겹치는 패키지들을 별도의 파일로 추출한 벤더(`vendor`)를 만들어서 최적화를 수행합니다.**

```javascript
{
  //...
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all', // 'all' 'async' 'initial'
    },
  },
}
```

</br>

### 3 ) 코드 스플리팅

**코드를 여러 번들로 분할하여 효율적으로 리소스를 관리하는 기술**

**장점**

- 여러개의 번들 파일로 분할해 브라우저 초기 리소스 다운속도를 향상시킵니다.
- 비동기적으로 필요할 때 리소스를 불러올 수 있도록 할 수 있습니다.
- 리소스의 캐싱을 통해 효율성을 높일 수 있습니다.

**코드 스플리팅 방법**

- `entry` 설정으로 개발자 직접 수동으로 분할하는 방법

```javascript
{
  // ...
  entry: {
    main: "./src/index.js",
    another: './src/another-module.js',
  },
  // ...
}
```

- **`dynamic import`을 통해 동적으로 모듈을 import 하는 방법 (권장되는 방식)**

```javascript
const handleButtonClick = async () => {
  // hello 모듈을 동적으로 로드
  const helloModule = await import(/* webpackChunkName: "hello" */ "./hello");
  // hello 모듈의 함수 실행
  helloModule.hello();
};
```

</br>

### 4 ) devtool 최적화

웹팩으로 코드를 번들링하면 디버깅 에러 트랙킹이 어렵기 때문에 source-map을 사용하여 번들링된 파일을 원래 위치로 매핑하여 에러 발생 위치을 파악합니다.

source-map은 상황에 적합하고 최적의 source-map를 선택하는 것이 좋습니다.

자세한 source-map 설명은 공식문서 참고

🔗 [devtool 공식문서](https://webpack.kr/configuration/devtool/)

**source-map 스타일별 비교**

- 번들링 사이즈 비교
  **none, hidden-source-map < source-map, cheap-module-source-map, nosource-source-map << eval < eval-soure-map < inline-source-map**
- 리빌드 속도
  **hidden-source-map, source-map, nosource-map, eval-source-map < cheap-source-map << eval < none**

**mode별 추천 source-map**

- **development**
  **eval** : 매우 빠른 리빌드와 빠른 빌드 제공, 개발자가 작성한 코드가 아닌 babel, webpack 변환된 코드를 제공합니다.
  **eval-cheap-module-source-map** : 빠른 리빌드와 함께 소스맵 제공, 정확한 매핑 기대가 불가합니다.
  **eval-source-map** : 리빌드가 약간 더 느리지만 좀더 성능 좋은 소스맵 제공합니다.
- **production**
  **none** : 매우 빠른 리빌드ㅡ 빌드를 제공하며 소스맵을 제공하지 않기에 디버깅 불가합니다.
  **source-map** : 성능 좋은 소스맵을 production 환경에서 사용할 때 이용합니다.

```javascript
module.exports = {
  // ...
  devtool:
    process.env.NODE_ENV === "development"
      ? "eval-cheap-module-source-map"
      : "none",
  //...
};
```

</br>

### 5 ) cache 타입 최적화

**cache 타입을 설정하면 생성된 웹팩 모듈 및 청크를 캐시하여 빌드 속도 개선 가능**

cache는 devlopment 모드에서 memory, production 모드에서는 비활성되는것이 기본값입니다.

production 모드에서도 캐시를 활성화 하는 것이 빌드 성능이 향상됩니다.

```javascript
module.exports = {
  // ...
  cache: {
    type: process.env.NODE_ENV === "development" ? "memory" : "filesystem",
  },
  // ...
};
```

`filesystem`으로 캐시를 활성화하면 node_modules/.cache/webpack 경로에 캐싱되며, `filesystem` 옵셥으로 설정하면 더 많은 옵션 설정 가능합니다.

🔗 [cahe 공식문서](https://webpack.kr/configuration/cache/)

</br>

### 6 ) output filename을 chunkhash로 저장

웹팩의 빌드한 결과물인 파일 내용이 변경되지 않는 한 캐싱 상태로 유지하면서 브라우저에서 불필요한 네크워크 트래픽을 줄여 웹 성능을 개선합니다.

output의 filename 옵션에 chunkhash를 사용하면 파일이 변경되는 경우에만 해시 값을 생성해서 파일 이름을 저장합니다.

```javascript
module.exports = {
  // ...
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunckhash].js",
  },
  // ...
};
```

</br>

### 7 ) 과도한 로더, 플러그인 사용하지 않기

반드시 필요하지 않는 로더, 플러그인을 제거해도 빌드 성능은 개선됩니다.

개발모드, 배포모드를 나누어 필요한 플러그인 로더를 사용하는 방법이 성능 개선에 좋습니다.

</br>

## 추가 ) Webpack merge를 이용한 webpack 분리

> **여러개의 웹팩 설정 파일을 하나로 병합해주는 라이브러리**

**주로 개발용과 배포용을 구분하여 웹팩을 나누어 적용할 때 활용**

</br>

**webpack-merge 설치**

```bash
npm install -D webpack-merge
```

</br>

### **웹팩 설정 파일 구분**

```bash
webpack.common.js
webpack.dev.js
webpack.prod.js
```

```javascript
// webpack.common.js
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].bundle.js",
  },
  target: ["web", "es5"],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: true,
    minimizer: [
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
      {
        test: /\.jpg$/,
        use: {
          loader: "file-loader",
          options: { outputPath: "./images", name: "[name].[ext]" },
        },
      },
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
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
  ],
};
```

```javascript
// webpack.dev.js
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "**eval-cheap-module-source-map**",
  devServer: { contentBase: "./dist" },
});
```

```javascript
// webpack.prod.js
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
});
```

</br>

### **package.json 파일에 script 수정**

- **`npm run dev`** : webpack-dev-server를 사용하며 설정 파일을 webpack.dev.js를 사용합니다.
- **`npm run build`** : 빌드를 실행하며 설정 파일을 webpack.dev.js를 사용합니다.
- **`npm run build:pro`** : 빌드를 실행하며 설정 파일을 webpack.prod.js를 사용합니다.

```javascript
// package.json
{
	"scripts": {
    "dev": "webpack-dev-server --config webpack.dev.js --open --hot",
    "build": "webpack --config webpack.dev.js",
    "build:pro": "webpack --config webpack.prod.js",
  },
  // ...
}
```

</br>

### **webpack-merge 주의사항**

**웹팩 설정 파일을 올바르게 작성해야 합니다.**

- webpack-merge 패키지는 웹팩 설정 파일을 병합하는 기능을 제공합니다. 병합되는 설정 파일은 올바르게 작성되어야 합니다. 각 설정 파일이 병합될 때 예기치 않은 결과가 발생할 수 있습니다.

**병합 순서를 고려해야 합니다.**

- webpack-merge 패키지는 설정 파일을 병합할 때 마지막으로 전달된 설정 파일이 가장 우선순위가 높습니다. 따라서 병합 순서를 고려하여 설정 파일을 전달해야 합니다.

**병합된 설정 파일을 검증해야 합니다.**

- webpack-merge 패키지를 사용하여 병합된 설정 파일이 올바른지 확인해야 합니다. 병합된 설정 파일이 원하는 대로 작동하지 않을 수 있습니다.
