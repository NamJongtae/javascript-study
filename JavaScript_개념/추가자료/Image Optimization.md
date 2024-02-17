# Image Optimization

## 이미지 최적화가 필요한 이유 ?

> 1. 리소스 최적화 및 로딩 속도 개선
> 2. UX 향상
> 3. SEO 최적화

</br>

## 이미지 최적화의 여러가지 방법

### 1 ) 차세대 이미지 포맷 사용

### 이미지 종류

- **JPEG** : JPEG는 손실이 많은 압축 디지털 이미지를 만드는 데 사용할 수 있는 압축 방법 크기와 품질 사이에서 절충하기 위해 압축 정도를 선택할 수 있다.
- **PNG** : 비손실 압축 파일 포맷중 하나로 GIF처럼 알파 채널을 지원하며, 안티레이싱 기능도 있어 날카로운 경계를 갖고 있는 이미지들을 부드럽게 처리, 이미지 손실이 없으면서 웹상에서 GIF나 JPEG보다 빠른 화면 출력이 가능
- **GIF** : 인터넷이나 네트워크 상에서 이미지를 전송할 때 전송 시간을 최소화하기 위해 개발된 포맷, 8~256비트 색상을 표현가능 하며, 알파채널과 애니메이션 기능을 지원, 이미지의 압축률은 높으나 지원하는 색상이 256으로 제한적
- **SVG** : XML을 기반으로 한 벡터 파일 형식, SVG는 XML로 작성한 파일이므로 웹상이나 텍스트로 여는 것이 가능하고, 문서 편집기에서 수정이 가능하다.
- **BMP** : 윈도우 환경의 비트맵 데이터를 표현하기 위해서 개발한 포맷으로 압축을 사용하지 않는 가장 다눈한 파일 포맷이며, 용량이 크다.
- **TIFF** : 호환성이 좋은 최초의 파일 포맷으로, 웹에서 이용하는 RGB와 출력용으로 이용하는 CMYK 이미지를 24비트까지 지원 LZW라고 부르는 무손실 압축을 채택하여 사용, 화질은 좋은 편이 아님
- **WEBP** : **이미지의 더 나은 무손실 및 손실 압축을 위해 개발된 이미지 포맷으로 JPEG 및 PNG에 보다 동일한 품질에 대해 35% 더 작은 이미지 용량을 가짐, 모든 브라우저에서 지원하지 않는다.**
- **AVIF** : **손실 압축과 비 손실 압축을 전부 지원하기 때문에 WebP처럼 GIF, PNG, JPEG 등의 상용 이미지 포맷을 대체할 수 있다. 또한 애니메이션 기능이 있으며, 압축 효율이 뛰어나다는 점에서 WEBP와 비슷함**

</br>

차세대 이미지 형식인 **WebP**와 **Avif**를 포맷을 사용하면, 이미지 용량을 줄일 수 있어 이미지 최적화를 할 수 있다.
차세대 이미지 형식은 모든 브라우저에서 지원하지 않으므로 `picture`태그와 `source` 태그를 이용하여 `source` 태그에 넣은 이미지 형식을 지원하지 않을 경우 아래 `img` 태그의 이미지 형식을 사용하도록 하는 방식을 이용 이와 같은 방식을 **점진적 향상 기법**이라고 한다.

</br>

**👉 점진적 향상 기법** : 기본적으로 구식 기술 환경에서 동작할 수 있는 기능을 구현하고, 최신 기술을 사용할 수 있는 환경에서는 더 나은 사용자 경험을 제공할 수 있는 최신 기술을 제공하는 방법입니다.

</br>

### **점진적 향상 기법 적용 방법**

**ⓛ html를 이용한 기본적인 방법**

```html
<picture>
  <source srcset="img.avif" type="image/avif" />
  <source srcset="img.webp" type="image/webp" />
  <img src="img.jpeg" alt="this is img" />
</picture>
```

</br>

**② javascript를 이용한 방법**

```javascript
// 현재 브라우저가 webp 이미지를 지원하는지 판단하는 함수
function detectWebpSupport() {
  const image = new Image();
  // 1px x 1px WebP 이미지
  const webpdata = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";
  const callback = (event) => {
   // event.type이 "load"인 경우와 이미지의 너비(image.width)가 1 픽셀인 경우를 검사하여 브라우저가 WebP 이미지를 지원하는지 여부를 판별
  const result = event?.type === "load" && image.width === 1;
    if (result) {
      // webp이미지가 지원된다면 body에 webp class를 추가
      document.body.classList.add("webp");
    }
    else {
      / webp이미지가 지원된다면 body에 no-webp class를 추가
      document.body.classList.add("no-webp");
    }
  };
  image.onerror = callback;
  image.onload = callback;
  image.src = webpdata;
}

// webp 이미지를 지원유무에 따라 다른 이미지 형식을 반환 해주는 함수
// 인자 값으로는 webpSupported: webp이미지 지원 유무, webp이미지 경로, webp 대신 사용할 이미지 형식
 const resolveWebp = (webpSupported,img, fallbackExt) => {
  //
  const ext = img.split(".").pop();
  if (!webpSupported && ext === "webp") {

    return img.replace("/webp", "").replace(".webp", `.${fallbackExt}`);
  }
  return img;
};

```

</br>

### 2 ) 이미지 스프라이트 기법 사용

**여러 개의 배경 이미지를 하나의 파일로 제작한 후 background-position 속성을 이용하여 이미지를 배치하는 방법**

[ 네이버에서 사용중인 스프라이트 이미지 ]

![img-sprite-naver](https://github.com/NamJongtae/javascript-study/assets/113427991/b5ace00f-1222-4ce2-80df-f2c0393126f0)

**특징**

- 이미지 스프라이트를 이용하면 하나의 이미지를 이용하기 때문에 이미지 용량을 줄일 수 있으며, 하나의 이미지만 받아오면 모든 이미지를 사용할 수 있기 때문에 이미지의 로딩 속도 또한 줄어들게 됩니다.
- 이미지 스프라이트의 이미지의 수가 늘어나게 되면, 이미지 용량이 많이 커질 수 있으며, 일부 이미지, 로고의 수정이 필요한 경우 유지 보수가 까다롭습니다.

</br>

### 이미지 스프라이트 기법 사용 예시

**아래 스프라이트 이미지 이용 아이콘 배치**

<img src="https://github.com/NamJongtae/javascript-study/assets/113427991/0ee657af-77fc-4ec6-a2f5-2a9ca2008fb6" width="50%" />

</br>
</br>

### 이미지 스프라이트 적용 코드

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>sprite img</title>
    <style>
      a {
        display: inline-block;
        position: relative;
        padding: 10px 10px 10px 45px;
        border: 1px solid #bdbdbd;
        border-radius: 10px;
        text-decoration: none;
        color: inherit;
      }
      a::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        background: url("img/sprites.png") no-repeat;
        width: 30px;
        height: 30px;
      }
      .naver1::after {
        background-position: 0px 0px;
        background-size: 67px 67px;
      }
      .naver2::after {
        background-position: -37px 0px;
        background-size: 67px 67px;
      }
      .naver3::after {
        background-position: 0px -37px;
        background-size: 67px 67px;
      }
      .naver4::after {
        background-position: -37px -37px;
        background-size: 67px 67px;
      }
    </style>
  </head>
  <body>
    <a href="#" class="naver1">네이버 1</a>
    <a href="#" class="naver2">네이버 2</a>
    <a href="#" class="naver3">네이버 3</a>
    <a href="#" class="naver4">네이버 4</a>
  </body>
</html>
```

</br>

### 적용된 화면

![img-sprite-icons2](https://github.com/NamJongtae/javascript-study/assets/113427991/1c42ec21-8b11-4ff4-a14f-3a9cc83ec9fc)

</br>

### 3 ) 이미지 Lazy-loading 기법

**Image Lazy Loading**은 페이지 안에 있는 **실제 이미지들이 실제로 화면에 보여질 필요가 있을 때 로딩을 할 수 있도록 하는 기술**로 페이지 내에서 바로 로딩을 하지 않고 로딩 시점을 뒤로 미루는 것으로 페이지 초기 로딩 시 필요로 한 이미지의 수를 줄일 수 있으며, 또한 웹 성능과 디바이스 내 리소스 활용도 증가, 그리고 연관된 비용을 줄이는데 도움을 줄 수 있습니다.

### **Lazy-loading 기법 사용 방법**

**① img 태그를이용한 일반적인 방법**

```html
<picture>
  <source media="(min-width: 800px)" srcset="large.jpg 1x, larger.jpg 2x" />
  <img src="photo.jpg" loading="lazy" />
</picture>
```

- `loading` 속성은 브라우저의 이미지 로드 시점 여부를 결정 할 수 있습니다.
- `loading` 속성의 값으로 lazy 를 사용하면 브라우저 스크롤에 반응해서 뷰포트 영역에 근접할 때 이미지를 로딩합니다.

</br>

**② Intersection Observer API를 이용한 방법**

- `Intersection Observer API`는 최상위 `document` 의 `viewport` 사이의 intersection 내의 변화를 비동기적으로 관찰하는 방법
- 웹 페이지를 스크롤 할 때 어떤 요소 이미지가 해당 뷰포트내에 교차 되었는지를 판단할 수 있는 방법을 제공합니다.
- 이 방법을 이용해 해당되는 이미지가 교차 되면 이미지를 로딩할 수 있도록 JavaScript 핸들링 하면 됩니다.

</br>

**이미지 지연 로딩 구현 동작 과정**

1. **Intersection Observer의 options 객체 생성**
   - root에 타겟 요소의 가시성을 확인할 뷰포트 요소
   - rootMargin: root의 각 측면의 영역을 수측 또는 증가
   - threshold: observer의 callback이 실행될 타겟 요소의 가시성 퍼-센티지
2. **Intersection Observer의 callback 함수 생성**
   - 타겟 요소와 root가 교차된 상태인지의 여부 확인
   - 교차된 타겟 요소의 dataset에 등록된 이미지 주소를 src에 할당하여 이미지 로딩
   - 이미지 로딩이 완료된 타겟 요소는 관측 요소에서 제외
3. **IntersectionObserver(callback, options) 인스턴스 생성**
4. **IntersectionObserver 인스턴스에 타겟 요소들을 등록**

</br>

### **Intersection Observer API 사용예시**

```javascript
// IntersectionObserver 를 등록한다.
// entries는 위에 data-src로 설정된 img 태그들의 배열
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    // 관찰 대상이 viewport 안에 들어온 경우 image 로드
    if (entry.isIntersecting) {
      // data-src 정보를 타켓의 src 속성에 설정
      entry.target.src = entry.target.dataset.src;
      // 이미지를 불러왔다면 타켓 엘리먼트에 대한 관찰을 멈춘다.
      observer.unobserve(entry.target);
    }
  });
}, options);

// 관찰할 대상을 선언하고, 해당 속성을 관찰시킨다.
const images = document.querySelectorAll(".image");
images.forEach((el) => {
  io.observe(el);
});
```

</br>

### **Intersection Observer API를 이용한 이미지 lazy-loading 예시 코드**

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>img lazy-loading</title>
    <style>
      img {
        background: #d5d9da;
        width: 500px;
        height: 500px;
        display: block;
        margin: 10px auto;
        border: 0;
      }
    </style>
  </head>
  <body>
    <img
      class="lazy-loading"
      data-src="<https://cdn.pixabay.com/photo/2016/12/11/12/02/mountains-1899264_1280.jpg>"
    />
    <img
      class="lazy-loading"
      data-src="<https://cdn.pixabay.com/photo/2017/04/09/09/56/avenue-2215317_1280.jpg>"
    />
    <img
      class="lazy-loading"
      data-src="<https://cdn.pixabay.com/photo/2016/09/19/07/01/lake-1679708_1280.jpg>"
    />
    <img
      class="lazy-loading"
      data-src="<https://cdn.pixabay.com/photo/2017/12/29/18/47/mountains-3048299_1280.jpg>"
    />
    <img
      class="lazy-loading"
      data-src="<https://cdn.pixabay.com/photo/2013/06/12/22/20/mountains-139012_1280.jpg>"
    />
    <img
      class="lazy-loading"
      data-src="<https://cdn.pixabay.com/photo/2012/10/30/15/55/valley-63564_1280.jpg>"
    />
    <script>
      // lazy-loading 이미지 요소
      const imgs = document.querySelectorAll(".lazy-loading");

      const observerCallback = (entries, observer) => {
        entries.forEach(({ isIntersecting, intersectionRatio, target }) => {
          if (isIntersecting && intersectionRatio > 0) {
            // data-src 정보를 타켓의 src 속성에 설정
            target.src = target.dataset.src;
            // 이미지를 불러왔다면 타켓 엘리먼트에 대한 관찰을 멈춘다.
            target.classList.remove("lazy-loading");
            observer.unobserve(target);
          }
        });
      };

      // 관찰할 대상을 선언하고, 해당 속성을 관찰시킨다.
      const io = new IntersectionObserver(observerCallback);
      imgs.forEach((img) => io.observe(img));
    </script>
  </body>
</html>
```

### 적용 결과

- 이미지가 화면에 보일 때 이미지가 로딩 되는 것을 볼 수 있습니다.
  ![img-lazy-loading](https://github.com/NamJongtae/javascript-study/assets/113427991/76a22eec-0a82-477b-9882-0a4ed8c747d4)

</br>

### 4 ) 이미지 압축

- 사용자가 이미지를 서버로 업로드 할 때 이미지 파일이 실제 사용하는 크기 보다 크다면 리소스 낭비로 이어짐
- 이런 리소스 낭비를 방지하기 위해 이미지 업로드전 이미지 압축 과정이 필요
- **browser-image-compression** 라이브러리를 사용하기 쉽게 구현 가능

**이미지 압축 예시 코드**

```javascript
import imageCompression from "browser-image-compression";

const imgCompression = async (file) => {
  try {
    const options = {
      maxSizeMB: 10, // 이미지 최대 용량
      maxWidthOrHeight: 256, // 이미지 최대 너비 및 높이
      useWebWorker: true, // webworker 적용 유무
      // webworker : 웹 워커 API가 멀티 스레딩을 지원하게 되어 워커를 이용하면 워커에서 작성된 스크립트는
      // 메인 스레드에서 분기되어 독립된 스레드로 실행되기 때문에 메모리 자원을 효율적으로 사용할 수 있다.
    };
    // 압축된 이미지 blob
    const compressedFileBlob = await imageCompression(file, options);
    // blob 형식의 이미지를 file 형식으로 변환
    const compressedFile = new File([compressedFileBlob], file.name, {
      type: file.type,
    });
    // 미리보기 이미지를 URL 생성
    const preview = await imageCompression.getDataUrlFromFile(file);
    // 압축된 파일과 미리보기 이미지를 반환
    return { compressedFile, preview };
  } catch (error) {
    console.log(error);
  }
};
```

</br>

### 5 ) UX향상을 위한 점진적 이미지 로딩 기법

- **점진적 로딩 기법 : 실제 이미지가 로드 되기 전까지 미리 보기 이미지를 표시하는 것**
- 이미지가 로딩되는 동안에는 이미지가 나타나지 않는 현상으로 사용자 경험에 좋지 못한 영향을 준다. 특히 이미지 용량이 클 경우 로딩 시간이 길어지기 때문에 이런 현상이 더 뚜렷하게 나타납니다.
- 점진적 로딩 기법을 활용하면, 사용자 경험을 개선할 수 있습니다.
- 미리보기 이미지로는 주로 저화질의 이미지나 임시 이미지를 넣습니다.

</br>

### **점진적 이미지 로딩 기법 예시 코드**

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #progressiveImg {
        max-width: 500px;
        height: 300px;
        margin: 0 auto;
        display: block;
      }
    </style>
  </head>
  <body>
    <img id="progressiveImg" alt="lake" />

    <script>
      const img = document.querySelector("#progressiveImg");
      ProgressiveImg(
        img,
        "<https://cdn.pixabay.com/photo/2023/06/17/20/15/lake-8070741_1280.png>",
        "<https://via.placeholder.com/500x300>",
        "<https://via.placeholder.com/500x300>"
      );

      const ProgressiveImg = (targetImg, src, placeholderSrc, errorImgSrc) => {
        targetImg.src = placeholderSrc;
        const img = new Image();
        img.src = src;
        img.onload = () => {
          targetImg.src = src;
        };
        img.onerror = () => {
          targetImg.src = errorImgSrc;
        };
      };
    </script>
  </body>
</html>
```

- 인자 값으로 targetImg(대상 이미지), src(이미지 경로), placeholderSrc(대체 이미지 경로), errorImgSrc(에러 이미지 경로)를 받습니다.
- 이미지 요소를 생성해서 해당 이미지 요소에 인자로 받은 src를 넣어 로딩 유무를 파악합니다.
- 이미지가 로딩된다면 실제 이미지의 src에 로딩된 이미지 src를 넣습니다.
- 만약 에러가 발생 한다면 실제 이미지의 src에 에러로 넣을 이미지 src를 넣습니다.

</br>

### **적용 결과 (빠른 3g환경 캐시 사용 중지 후 촬영한 결과)**

- 점진적 이미지 로딩 적용 전
  - 대체 이미지 없이 이미지가 로딩되는 것을 볼 수 있습니다.
    ![img-progressive- loading-before](https://github.com/NamJongtae/javascript-study/assets/113427991/4673987c-eba6-4452-bf64-dfa44acae16c)
- 점진적 이미지 로딩 적용 후
  - 이미지 로딩전 대체 이미지가 나오고, 이미지가 모두 로딩되면 실제 이미지가 나오는 것을 볼 수 있습니다.
    ![img-progressive-loading-after](https://github.com/NamJongtae/javascript-study/assets/113427991/ca453d16-6982-4a04-ae48-2a33cef58f4a)

</br>

### 참고 사이트

🔗 [웹 성능을 위한 이미지 최적화](https://velog.io/@hustle-dev/%EC%9B%B9-%EC%84%B1%EB%8A%A5%EC%9D%84-%EC%9C%84%ED%95%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%B5%9C%EC%A0%81%ED%99%94)

🔗 [Image Lazy Loading 기법으로 웹 성능 최적화하기](https://onlydev.tistory.com/104)

🔗 [리액트로 점진적 이미지 로딩 구현하기: 튜토리얼](https://velog.io/@eunbinn/progressive-image-loading-react-tutorial)
