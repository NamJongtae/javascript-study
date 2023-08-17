// 자바스크립트에서 this는 실행 컨텍스트가 실행될때 결정됩니다.
// 즉 함수가 호출될 때를 의미합니다.
// 함수를 어떤 방식으로 호출하느냐에 따라 this 값이 달라집니다.
// 전역공간에서 this는 전역객체를 가르킵니다.
// 브라우저 환경에서 전역객체는 window, nodejs 환경에서는 global 입니다.

//전역변수, 전역객체의 예시 코드
// var대신 let과 const는 전역 변수가 아니기 때문에 window에 속하지 않음
var a = 1;
console.log(a); // 전역 변수 1
console.log(window.a); // 전역 변수으므로 window에 속한 프로퍼티
console.log(this.a); // this는 window 따라서 window.a와 같다.

// 전역변수, 전역객체
var a = 1;
window.b = 2;
console.log(a, window.a, this.a);
console.log(b.window.b, this.b);

delete a; // 삭제 되지 않음 => 사용자가 의도치 않게 삭제하는 것을 방지하기위해
delete b; // 삭제

console.log(a, window.a, this.a);
console.log(b, window.b, this.b);

// 함수와 메서드
// 함수는 그 자체로 독립적인 기능을 수행
// 메서드는 자신을 호출한 대상 객체에 관한 동작을 수행

// 함수와 메서드 비교 예시
let func1 = function (a) {
  console.log(this, a); // 전역 객체(window)를 가리킴
};
func1(1);

let obj = {
  medthod: func1,
};
obj.medthod(2); // obj를 가리킴

// 메서드 내부의 this
// 여기서 this 호출한 주체에 대한 정보가 담긴다.
// 점 표기법(.) 바로 앞의 객체가 곧 this의 대상이 된다.
let obj2 = {
  medthod: function () {
    console.log(this);
  },
  inner: {
    medthod2: function () {
      console.log(this);
    },
  },
};
obj2.medthod(); // obj2
obj2.inner.medthod2(); // obj2.inner

// 함수로 선언할때 그 함수의 내부함수의 this
// 내부함수의 this는 window 전역 객체를 가리킴

// 내부함수의 this 예시
let obj3 = {
  outer: function () {
    console.log(this); // outer
    let innerFunc = function () {
      console.log(this); // window
    };
    innerFunc();
    let obj4 = {
      innerMethod: innerFunc,
    };
    obj4.innerMethod(); // obj4
  },
};
obj3.outer();

// 화살표 함수의 this
// this를 바인딩하지 않는 함수

// 화살표 함수의 this 예시
let obj5 = {
  outer: function () {
    console.log(this); // outer
    let innerFunc = () => {
      console.log(this); // outer
    };
    innerFunc();
  },
}[
  // 콜백 함수의 this 예시
  (1, 2, 3, 4, 5)
].forEach((_) => {
  console.log(this); // window
});
document.body.addEventListener("click", function (e) {
  console.log(this, e); // body addEventListener 메서드는 콜백함수를 호출시 자신의 this를 상속 하도록 정의 되어 있어 addEventListener 앞의 body가 this가 됨 => body.event = function(e){}
});

// 생성자 함수의 this 예시
let Cat = function (name, age) {
  (this.bark = "야옹"), (this.name = name), (this.age = age);
};
const nabi = new Cat("나비", 3);
console.log(nabi); // this는 nabi의 인스턴스를 가리킴

// this를 명시적으로 바인딩 하는 방법
// 1. call() : 메서드의 호출 주체인 함수를 즉시 실행하도록 하는 명령
// call의 첫 번째 인자를 this로 바인딩, 이후 인자들은 매개변수로 들어갑니다.

// call 메서드 사용 예시
let func = function (a, b, c) {
  console.log(this, a, b, c);
};

func(1, 2, 3); // window{...} 1 2 3
func.call({ x: 1 }, 4, 5, 6); // {x:1} 4 5 6

// 2. apply() : call와 완전히 동일
// 두 번째 인자를 배열로 받아 매개변수로 지정하는 것이 다름

// apply 메서드 사용 예시
let func2 = function (a, b, c) {
  console.log(this, a, b, c);
};

func(1, 2, 3); // window{...} 1 2 3
func.apply({ x: 1 }, [4, 5, 6]); // {x:1} 4 5 6

// call/apply 활용 예시(생성자 내부에서 다른 생성자 호출)
function People(name, gender) {
  this.name = name;
  this.gender = gender;
}
function Student(name, gender, school) {
  personalbar.call(this, name, gender);
  this.school = school;
}
let kim = new Student("kim", "female", "A");
let jin = new Student("jin", "female", "B");

// 3. bind() : 즉시 호출하지 않고, 넘겨받은 this 및 인수들을 바탕으로 새로운 함수를 만듭니다.
// 함수에 this를 미리 적용하는 것

// bind 메서드 활용 예시
let func3 = function (a, b, c) {
  console.log(this, a, b, c);
};
func3(1, 2, 3); // window 1 2 3

let bindFunc = func3.bind({ x: 1 });
bindFunc(5, 6, 7); // { X:1 } 5 6 7

// 화살표 함수 this
// 실행 컨텍스트 생성 시 this를 바인딩하는 과정이 제외되었습니다.
// 즉 함수 내부에는 this가 없으며, 접근하고자 하면 스코프체인상 가장 가까운 this에 접근합니다.

// 화살표 함수의 this 예시
let obj6 = {
  outer: function () {
    console.log(this); // outer
    let innerFunc = () => {
      console.log(this); // outer
    };
    innerFunc();
  },
};
obj6.outer();

// 콜백함수에서의 this
// 콜백함수를 인자로 받은 메서드 중 일부는 추가로 this로 지정할 객체를 인자(thisArg)로 지정할 수 있습니다.
// 따라서 콜백함수 내부에서 this 값을 원하는 대로 변경할 수 있습니다.
// 콜백함수와 함께 thisArg를 인자로 받는 메서드
// array.forEach(), array.map(), array.filter(), array.some(), array.every(), array.find()

// thisArg 예시
let post = {
  count: 0,
  update: function (posts) {
    posts.forEach(function () {
      this.count++;
    }, this);
  },
};
