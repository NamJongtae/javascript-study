// 실행 컨텍스트 : 실행할 코드에 제공할 환경 정보들을 모아놓은 객체
// 실행 컨텍스트의 실행 과정
// 1. 동일한 환경에 있는 코드들을 실행할 때 필요한 환경 정보들을 모아 컨텍스트를 구성
// 2. 이를 콜 스텍에 쌓아 올렸다가 가장 위에 쌓여있는 컨텍스트와 관련있는 코드들을 실행하는 식으로 전체 코드의 환경과 순서를 보장
// 여기서 '동일한 환경'은 실행의 컨텍스트를 구성할 수 있는 전역공간, eavl() 함수, 함수 등이 있습니다.

// 예시 코드 실행 컨텍스트와 콜 스텍
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

// 실행 컨텍스트에 담기는 정보
// VariableEnvironment : 환경레코드(enviromentRecord, 현재 컨텍스트 내의 식별자들에 대한 정보), 외부환경참조(outerEnviromentReference)
// LexicalEnvironment : 환경레코드(enviromentRecord, 현재 컨텍스트 내의 식별자들에 대한 정보), 외부환경참조(outerEnviromentReference)
// => 초기에는 VariableEnvironment와 같지만 이후 변경 사항이 실시간으로 반영됨
// VariableEnvironment에 정보를 먼저 담은 다음 이를 그대로 복사해서 LexicalEnvironment를 만든다.

// 환경레코드 : 현재 컨텍스트내의 코드의 식별자 정보들이 저장된다.
// 컨텍스트를 구성하는 함수에는 매개변수, 식별자, 선언한 함수 자체, var선언된 변수 식별자
// 변수 정보를 수집하는 과정을 모두 마치더라도 코드은 아직 실행되지 않음
// 즉, 코드가 실행되기 전 자바스크립트 엔진은 식별자들을 이미 최상단으로 끌어 올려 놓은 것
// 이것이 호이스팅 => 자바스크립트가 실제로 끌어올리는 것은 아님 그렇게 동작한다는 것

// 매개변수와 변수에 대한 호이스팅
function func1(x) {
  console.log(x); //매개변수 x 1를 할당 받아 1를 출력
  var x; // 이미 존재한 변수 이미로 그대로 1
  console.log(x); // 1를 출력
  var x = 2; // 변수에 2를 재선언
  console.log(x); // 2가 출력
}
func1(1); // 함수 호출 현재 실행을 멈추고 a 함수 선언문으로 들어감

// 함수 선언의 호이스팅
function func2() {
  console.log(b); // b() 함수 출력
  var b = "bbb"; // b = bbb;
  console.log(b); // bbb 출력
  function b() {}
  console.log(b); // bbb 출력
}

// 함수 선언문과 함수 표현식
console.log(sum(1, 2));
// console.log(div(2,4));
// 함수 선언문
function sum(a, b) {
  return a + b;
}
// 함수 표현식 error => TDZ
// let div = function(a,b) {
//   return a / b;
// }

//////////////////////////////////////////////////////////

// 스코프와 스코프 체인
// 스코프란 식별자에 대한 유효범위
// 스코프 체인이란 식별자의 유효범위를 안에서부터 바깥은로 차레로 검색해 나가는 것
// outerEnvironmentReference(외부 환경 참조)는 현재 호출된 함수가 선언될 당시의 LexicalEnvironment(정적환경)를 참조
// 외부 환경 참조는 오직 자신이 선언된 시점의 정적환경만 참조하고 있으므로 가장 가까운 요소부터 차례대로 접근 => 후입선출
// 즉, 무조건 스코프 체인 상에서 가장 먼저 발결된 식별자에만 접근이 가능

// 스코프 체인 예제
var a = 1;
let outer2 = function () {
  let inner2 = function () {
    console.log(a); // undefined
    var a = 3; // 변수의 은닉화 전역 변수(a)에 접근하지 못함
  };
  inner2();
  console.log(a); // 1
};
outer2();
console.log(a); // 1

// 전역변수와 지역변수
// 전역변수(global variable) : 전역 컨텍스트에 선언된 변수
// 지역변수(local variable) : 함수 내부에 선언된 변수, 코드 블록 내부에 선언된 변수

// thisBinding : this로 지정된 객체가 저장
// 실행 컨텍스트 활성화 다시에 this가 지정되지 않으면 this에는 전역객체가 저장
// 함수 호출 방식에 따라 this에 저장되는 대상이 다름
