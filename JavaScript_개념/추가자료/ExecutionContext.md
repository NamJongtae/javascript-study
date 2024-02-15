# Execution Context

## Execution Context(실행 컨텍스트) ?

> **자바스크립트 실행 환경으로 실행할 코드에 제공할 환경 정보들을 모아놓은 객체를 의미**

**자바스크립트는 실행 컨텍스트가 활성화되는 시점에 다음과 같은 현상이 발생**

- 호이스팅이 발생한다(선언된 변수를 위로 끌어올린다)
- 외부 환경 정보를 구성한다
- this 값을 설정한다.

### Execution Context의 실행과정

**1 ) 실행 전 동일한 환경에 있는 코드들을 실행할 때 필요한 환경정보들을 모아 컨텍스트를 구성**

**👉 `동일한 환경` : 실행의 컨텍스트를 구성할 수 있는 전역공간, eval() 함수, 함수호출, { } 코드 블럭 사용**

**2 ) 이를 CallStack에 쌓아 올렸다가 가장 위에 쌓여있는 컨텍스트와 관련있는 코드들을 실행하는 방식으로 전체 코드의 환경과 순서를 보장 ( 후입선출 방식 )**

**👉 `CallStack` : **함수 호출의 순서를 기록하는 자료 구조\*\*

### CallStack 예시 코드

![execution-contetx](https://github.com/NamJongtae/javascript-study/assets/113427991/24ab0349-8f1b-47d1-89e3-1877f247ca1c)

```javascript
var a = 1;
function outer() {
  function inner() {
    console.log(a); // undefined => TDZ
    var a = 3;
  }
  inner(); // 함수 실행 => 현재 실행을 멈추고, 함수 선언문 안으로 들어감
  console.log(a); // inner()함수가 종료된 후 호출 1
}

outer(); // outer 함수 호출 => 현재 실행을 멈추고 outer 함수 선언문 안으로 들어감
console.log(a); // outer 함수 종료 후 호출 1
// 전역 컨텍스트 => outer => innter 순으로 콜 스텍 쌓임
// 이후 함수 종료 마다 inner => outer => 전역 컨텍스트 순으로 콜 스텍이 제거
// => 후입선출
```

### Execution Context의 구성

**1 ) VariableEnvironment(변수 환경)**

**EnviromentRecord(환경레코드, 현재 컨텍스트 내의 식별자들에 대한 정보)**, **OuterEnviromentReference(외부환경참조, 상위 Lexical Environment를 참조)** 가 담겨있습니다.

**2 ) LexicalEnvironment(정적 환경)**

**EnviromentRecord(환경레코드, 현재 컨텍스트 내의 식별자들에 대한 정보)**, **외부환경참조(OuterEnviromentReference, 상위 Lexical Environment를 참조)** 가 담겨있습니다.

초기에는 VariableEnvironment와 LexicalEnvironment가 같지만 LexicalEnvironment은 코드 실행 이후 변경 사항이 실시간으로 반영됩니다.

**👉 VariableEnvironment와 LexicalEnvironment 차이점**

- **Variable environment**
  - Environment Record: 현재 실행 컨텍스트 내 호이스팅이 되는 것들(var, 함수선언문 등)을 저장합니다.
  - outer Environment Reference : outer environment
- **Lexical environment**
  - Environment Record: let,const로 선언된 변수, 함수표현식도 포함합니다.
  - outer Environment Reference : Variable environment
- 실행 컨텍스트를 생성할 때, **variableEnvironment에 정보를 먼저 담은 다음, 이를 그대로 복사해서 Lexical environment를 만들고, 이후에는 Lexical environment를 주로 활용**

**3 ) ThisBinding**

**this값이 결정되는 곳 입니다.**

함수 실행 컨텍스트에서는 this 값은 어떻게 함수가 호출 방법에 따라 달라집니다. 만약 함수가 객체의 참조로 호출되었다면 this는 해당 객체를 가리키게 됩니다. 그렇지 않으면 this는 글로벌 객체(window)를 가리키게 되고, strict mode에서는 undefined 를 가르키게 됩니다.

### Environment Record와 Hoisting

**현재 컨텍스트내의 코드의 식별자 정보들이 저장됩니다.**

- 컨텍스트를 구성하는 함수에는 매개변수, 식별자, 선언한 함수 자체, var선언된 변수 식별자 정보들이 저장됩니다.
- 변수 정보를 수집하는 과정을 모두 마치더라도 코드은 아직 실행되지 않습니다.
- 즉, 코드가 실행되기 전 자바스크립트 엔진은 식별자들을 이미 최상단으로 끌어 올려 놓은 것과 같습니다.
- 이것이 Hoisting(호이스팅) 입니다.=> 자바스크립트가 실제로 끌어올리는 것은 아님 그렇게 동작한다는 것입니다.

### Scope Chain(스코프 체인) & **OuterEnvironmentReference(외부 환경 참조)**

**Scope** : **식별자에 대한 유효범위**를 의미합니다.

**Scope Chain**이란 **식별자의 유효범위를 안에서부터 바깥은로 차레로 검색해 나가는 것**을 말합니다.

Scope Chain은 **OuterEnvironmentReference(외부 환경 참조)** 를 통해 이루어집니다.

**OuterEnvironmentReference(외부 환경 참조)는 현재 호출된 함수가 선언될 당시의 LexicalEnvironment(정적 환경)를 참조합니다.**

**외부 환경 참조는 오직 자신이 선언된 시점의 정적 환경만 참조**하고 있으므로 가장 가까운 요소부터 차례대로 접근하게 됩니다. => (후입선출 방식)

**즉, 스코프 체인 상에서 가장 먼저 발결된 식별자에만 접근이 가능합니다.**

### Scope Chain 예시 코드

```javascript
var a = 1;
let outer2 = function () {
  let inner2 = function () {
    console.log(a); // undefined : 아래 var에 의해 inner2 함수 스코프 안에서 호이스팅도되어
    // 선언은 되었지만 초기화되지 않았으므로 undefined가 반환됨
    var a = 3; // 변수의 은닉화 전역 변수(a)에 접근하지 못함
  };
  inner2();
  console.log(a); // 1
};
outer2();
console.log(a); // 1
```

### 예시 코드 실행컨텍스트 실행과정

**1 ) 전역 컨텍스트 생성**

전역 변수 a가 선언되고 초기화됩니다. a의 초기값은 1입니다.

outer2 함수가 전역 스코프에 선언됩니다.

**2 ) outer2 함수 호출**

outer2 함수의 실행 컨텍스트가 생성됩니다.

outer2 함수 내부에서 inner2 함수 호출됩니다.

**3 ) inner2 함수 호출**

inner2 함수의 실행 컨텍스트가 생성됩니다.

inner2 함수 내부에서 console.log(a) 문이 실행됩니다.

**4 ) console.log(a) 실행**

inner2 함수 내부에서 변수 a를 찾습니다.

변수 a는 현재 스코프 내에서 호이스팅되어 선언되었지만, 값이 할당되기 전에 호출되어 undefined를 반환합니다.

undefined가 출력됩니다.

**5 ) var a = 3 재할당**

inner2 함수 내부에서 호이스팅 되어있던 변수 a값을 3으로 재할당합니다.

**6 ) inner2 함수가 종료**

inner2 함수가 종료되어 실행 컨텍스트에서 제거됩니다.

**7) console.log(a) 실행**

outer2 함수 내부에서 변수 a를 찾습니다.

변수 a가 outer2 함수 내부에 존재하지 않기 때문에 ScopeChain를 통해 a를 찾습니다.

OuterEnvironmentReference를 통해 상위 스코프의 LexicalEnvironment에 접근하여 a를 찾습니다.

상위 스코프는 전역 컨텍스트이며, a 값은 1로 선언되어 있습니다.

따라서 a은 1이라는 값을 찾게됩니다.

1이 콘솔에 출력됩니다.

**8 ) console.log(a) 실행**

전역 스코프에서 변수 a값을 찾습니다.

변수 a는 전역 스코프에서 선언되었으며, 값은 1입니다.

1이 콘솔에 출력 됩니다.

**9 ) outer2 함수가 종료**

outer2 함수가 종료되어 실행 컨텍스트에서 제거됩니다.

**10 ) console.log(a) 실행**

전역 컨텍스트에서 변수 a를 찾습니다.

변수 a는 전역 스코프에서 선언되었으며, 값은 1입니다.
