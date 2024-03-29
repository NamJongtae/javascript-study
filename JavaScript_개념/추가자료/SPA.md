# SPA(Single Page Application)

## SPA란?

> **단일 페이지로 구성되며 필요한 데이터를 로드하여 동적으로 페이지를 업데이트하는 어플리케이션**
> 

**사용자와의 상호작용을 더욱 부드럽게 만들기 위해 도입된 개념**

SPA는 **React, vue, anglur** 등을 통해 쉽게 구현할 수 있습니다.

</br> 

### SPA의 특징

- **렌더링 방식** : SPA는 주로 CSR(Client Side Rendering) 방식으로 렌더링합니다.
- **사용자 경험 향상 :** SPA는 사용자와의 상호작용이 매우 빠르고 자연스럽습니다. 전체 페이지를 새로고침하지 않고도 새로운 데이터를 로드하거나 UI를 업데이트할 수 있기 때문에, 사용자는 웹 애플리케이션을 데스크톱 애플리케이션처럼 느낄 수 있습니다.
- **서버 부하 감소 :** SPA는 필요한 데이터만 서버에서 불러오므로, 서버의 부하를 줄일 수 있습니다. 전체 페이지를 다시 로드하는 대신 필요한 부분만 업데이트하므로 네트워크 트래픽이 줄어듭니다.
- **프론트엔드와 백엔드의 분리 :** SPA는 프론트엔드와 백엔드를 명확하게 분리할 수 있습니다. 백엔드는 API를 통해 데이터를 제공하고, 프론트엔드는 이 데이터를 이용해 UI를 구성합니다. 이로 인해 각각의 개발이 독립적으로 이루어질 수 있습니다.
- **초기 로딩 시간 :** SPA는 처음 페이지를 로드할 때 필요한 모든 스크립트를 불러와야 하므로 초기 로딩 시간이 길어질 수 있습니다.
- **SEO 문제 :** SPA는 페이지의 내용이 동적으로 변경되므로, 검색 엔진이 페이지의 내용을 제대로 인덱싱하기 어려울 수 있습니다. 하지만 이 문제는 서버 사이드 렌더링(SSR)이나 프리렌더링(Pre-rendering) 등의 기술을 사용하면 해결할 수 있습니다.

</br> 

### 전통적인 방식 MPA(Multi Page Application)의 특징

- **렌더링 방식** : MPA는 주로 SSR(Server Side Application) 방식으로 렌더링합니다.
- **SEO 최적화 :** MPA는 각 페이지가 독립적인 URL을 가지므로, 검색 엔진이 콘텐츠를 쉽게 인덱싱할 수 있습니다. 이로 인해 SEO 최적화에 유리합니다.
- **초기 로딩** : 필요한 페이지만 로드하기 때문에 초기 로딩 속도가 빠릅니다.
- **사용자 경험 :** MPA에서는 사용자의 액션에 따라 페이지 전체가 새로고침되므로, SPA에 비해 사용자 경험이 부드럽지 않을 수 있습니다.
- **성능 :** 각 페이지 이동마다 서버로부터 새로운 HTML, CSS, JavaScript 파일을 받아와야 하므로, 네트워크 지연이 발생할 수 있습니다.

</br> 

### CSR(Client Side Rendering)

**CSR은 클라이언트 측에서 HTML을 생성하는 방식으로, 최초에 한번 서버에서 전체 페이지를 로딩하여 보여주고 이후에는 사용자의 요청이 올 때마다, 리소스를 서버에서 제공한 후 클라이언트가 해석하고 렌더링하는 방식입니다.**

<div align="center">
 <img src="https://github.com/NamJongtae/javascript-study/assets/113427991/63b7f6c5-c492-49a9-b493-d0b89e33cbd3"/> 
</div>



**CSR의 동작과정**

**① 사용자가 웹사이트에 접속하면, 서버는 HTML, CSS, JavaScript 파일 등 필요한 정적 파일들을 클라이언트로 보냅니다.**

**② 클라이언트(브라우저)는 받은 자원들을 이용해 웹페이지를 렌더링합니다. 이때, JavaScript가 동작하여 동적인 페이지를 생성하게 됩니다.**

**③ 사용자가 페이지 내의 다른 링크를 클릭하거나, 인터랙션을 하면 추가적인 데이터 요청이 필요할 수 있습니다. 이때, JavaScript가 AJAX 요청 등을 통해 필요한 데이터만 서버에 요청합니다.**

**④ 서버는 요청받은 데이터를 JSON 형태 등으로 클라이언트에게 전달합니다.**

**⑤ 클라이언트는 받은 데이터를 기반으로 JavaScript를 이용해 페이지를 업데이트합니다. 이 과정에서 전체 페이지를 다시 로드하지 않고, 변경된 부분만 업데이트됩니다.**

**①~⑤의 과정들이 반복되며, 사용자가 웹사이트를 계속 이용할 수 있습니다.**

</br> 

### SSR(Server Side Rendering)

**SSR은 서버에서 HTML을 생성하여 클라이언트에 제공하는 방식으로, 모든 템플릿은 서버 연산을 통해서 렌더링하고 완성된 페이지 형태로 응답하는 방식입니다.**

<div align="center">
 <img src="https://github.com/NamJongtae/javascript-study/assets/113427991/bef36f2d-95a3-4a53-8540-a45eb7b4e942"/> 
</div>


**SSR의 동작과정**

**① 사용자가 웹사이트에 접속하면 서버에 요청이 전달됩니다.**

**② 서버는 데이터베이스 등에서 필요한 데이터를 조회합니다. 이 데이터는 페이지를 구성하는데 필요한 정보들입니다.**

**③ 서버는 조회한 데이터를 기반으로 HTML을 생성합니다. 이때 HTML은 전체 페이지를 구성하는 모든 요소를 포함하고 있습니다.**

**④ 생성된 HTML을 클라이언트(브라우저)에게 전달합니다.**

**⑤ 클라이언트는 받은 HTML을 렌더링하여 사용자에게 보여줍니다.**

**사용자가 다른 페이지로 이동하거나 인터랙션을 하면, 다시 서버에 요청이 가고 ①~⑤의 과정이 반복됩니다.**

</br> 

### 무조건 MPA == SSR, SPA == CSR 아니다.

React같은 JS 기반 프레임워크 혹은 라이브러리를 사용하면 기본적으로 하나의 HTML, CSS, JS 파일이 나오기 때문에 자연스레 SPA이면서 CSR이 되는 것이고, 이를 SSR로 구현하면 페이지 별로 렌더링을 따로 하기 때문에 MPA가 되는 것입니다.

MPA면서 같은 JS 파일을 받고 클라이언트에서 렌더링을 하게 되면 MPA + CSR이 되는 것이고 SPA면서 SSR을 택하면 SSR + SPA가 됩니다.

CSR 방식으로 동작하는 MPA의 경우도 가능하기 때문에 MPA는 무조건 SEO에 유리하다고 해버리면 이는 틀린 말이 되는 것입니다.

Next.js와 같은 React 라이브러리의 프레임워크를 사용하면 흔히 CSR로 동작하는 SPA도 SSR 방식으로 설계가 가능하기 때문에, SEO 문제를 해결할 수 있습니다.

</br>

### 참고 사이트

**🔗 [SPA(Single Page Application)이란 무엇인가요?](https://velog.io/@dikum98/SPA-Single-Page-Application%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80%EC%9A%94)**