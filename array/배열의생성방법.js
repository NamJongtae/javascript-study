// 저는 배열이 여러 알고리즘 구현과 기능 구현에 있어 중요한 내용이라고 생각해서 배열에 대해 준비했습니다.
// 배열 내용 중 배열의 여러 생성방법에 대해 준비했습니다.
// 다른 분들과 겹치는 부분이 많을 것 같아서 유튜브 강의에서 소개한 내용에 없는 좀 깊은 내용을 준비했습니다. 

// ✔️ 참고해주세요 처음들어보는 용어가 있을 수 있어요.
// 나중에 뒤에 배울 내용이니 이런 용어가 있다고 참고만 해주세요. 지금은 몰라도 괜찮아요.
// 혹시 궁금하실 까봐 해당 설명이 되어있는 링크를 남겨두었으니 참고해주세요.
// 혹시 잘못된 내용이나 궁금한점이 있다면 말씀해주세요.

// 📌 Tip : 확장프로그램 codeRunner
// 확장프로그램창에서 codeRunner를 검색해서 목록에서 두 번째에 있는것을 설치해주세요.
// js코드를 브라우저 개발자 도구를 가지않고 출력 해볼 수 있습니다.
// 단축키 CTRL + ALT + N를 누르면 자동으로 실행되고 터미널의 OUTPUT에 출력됩니다.
// OUTPUT창에서 마우스 오른쪽 클릭하고, clear Output 클릭하면 출력내용을 지울 수 있습니다.

// 배열의 생성방법들
// 1 ) 일반적인 배열생성법 (배열의 리터럴 사용)
// 배열의 리터럴? [ , ]을 써서 배열을 생성하는 간단한 방법 입니다.
// 리터럴에 대한 내용이 궁금하시면 여기를 참고해주세요(https://tiboy.tistory.com/685)
console.log("==============일반적인 배열 생성==============");
const arr1 = ["a", "b", "c"];
console.log("arr1 : ", arr1);

//--------------------------------------------------------------

// 2 ) Array()(생성자 함수)를 이용한 배열 생성법
// 생성자 함수? 객체를 생성하기 위해 사용되는 특수한 함수를 말합니다.
// 생성자 함수에 대한 내용이 궁금하시면 여기를 참고해주세요 (https://developer-talk.tistory.com/281)
// 인자로 문자열을 넣을때 인자하나씩 배열의 요소로 들어갑니다.
// new를 생략하고 사용할 수도 있습니다.
// => new 키워드를 생략할 수 있는 이유는 인스턴스를 생성할 필요가 없기 때문입니다.
console.log("==============Array() 이용 배열 생성==============");
const arr2 = new Array("a", "b", "c");
console.log("arr2 : ", arr2); // ['a', 'b', 'c']

// 인자로 숫자를 넣으면 해당 수 만큼 빈 배열(empty)이 생성됩니다.
const arr3 = new Array(3);
console.log("arr3 : ", arr3);

// 빈 배열 요소 접근시 undefined가 반환됩니다.
console.log(arr3[0]); // undefined

// 전달된 인자가 없다면 빈 배열을 반환합니다.
const arr4 = new Array();
console.log("arr4 : ", arr4); // []


//--------------------------------------------------------------

// 3 ) Array.of() 메서드 사용
// 생성자 함수 키워드 new를 생략해서 사용한것이 아닙니다.(new Array.of() => X )
// new 키워드는 생성자 함수로 동작할때 사용합니다.
// Array.of()는 생성자 함수와 유사하게 동작합니다. 메서드로 새로운 배열을 생성하는 기능을 하는 겁니다.
// 아래 Array.from() 메서드도 동일합니다.
// 인자로 받은 값을 차례로 배열의 요소에 들어갑니다.
console.log("==============Array.of() 이용 배열 생성==============");
const arr5 = Array.of("a", "b", "c");
console.log("arr5 : ", arr5); // ['a', 'b', 'c']
// 숫자를 인자로 받으면 그 숫자가 요소로 들어갑니다.
const arr6 = Array.of(3);
console.log("arr6 : ", arr6); // [3]

// 4 ) Array.from() 메서드 사용
// 배열, 유사배열객체, 이터러블을받아 배열로 변환해 줍니다.
// 유사배열객체? 배열과 유사한 형태를 가진 객체로 키값으로 인덱스가진 프로퍼티와 length 프로퍼티를 가진 객체입니다.
// 이터러블? ES6 에서 도입된 이터레이션 프로토콜(iteration protocol)은 순회 가능한 자료구조를 만들기 위해 사용하는 규약입니다.
// ECMAScript 사양에 정의하여 미리 약속한 규칙 입니다.
// 유사배열객체, 이터러블에 대한 내용은 아래를 참고해주세요.
// (https://velog.io/@thumb_hyeok/자바스크립트의-이터러블)
// 유사 배열 객체 생성
// 유사배열 객체는 for문 for in문은 사용가능 하지만 for of문 사용 불가합니다.
// 배열의 메서드 forEach(), map(), filter(), reduce() 등을 사용할 수 없습니다.
console.log("==============Array.from() 이용 배열 생성==============");
const arrObj = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};
console.log("arrObj : ", arrObj);
// for(const item of arrObj){ // 에러 발생 유사배열객체는 for of문 사용이 불가!
//     console.log(item);
// }
// Array.from()를 이용해서 유사배열을 배열로 만듭니다.
const arrObj2 = Array.from(arrObj); // 배열로 바뀌게 됩니다.
console.log("arrObj2 : ", arrObj2); // ['a', 'b', 'c']
for (const item of arrObj2) {
  // for of문 사용이 가능
  console.log(item);
}
// 두 번째 인자를 넣을 수 있습니다.
// 두 번째 인자는 콜백함수(item, index, array)를 받습니다. map 함수와 동일하게 동작합니다.
const arrObj3 = Array.from(arrObj, (item, idx) => item + idx); // 배열로 변환됩니다.
console.log("arrObj3 : ", arrObj3); // ['a0', 'b1', 'c2']
// Array.from()를 통해 배열을 얕은 복사할 수 있습니다.
// 얕은복사? 참조 타입 데이터가 저장한 '메모리 주소 값'을 복사한 것을 의미합니다.
// 얕은복사와 깊은복사에 대한 내용은 여기를 참고해주세요. (https://cocobi.tistory.com/156)
const original = [1, 2, 3];
const copy = Array.from(original);
copy[0] = "a"; // 복사한 배열의 요소를 변경해도 원본 배열의 값이 바뀌지 않습니다.
console.log("original : ", original, "copy : ", copy);

//--------------------------------------------------------------

// 유사배열객체를 Array.from()를 이용하여 새로운 배열로 만들기
console.log(
  "==============Array.from() 유사배열객체 배열 만들기 예시=============="
);
const fruits = {
  0: "🍓",
  1: "🍐",
  2: "🍉",
  3: "🍇",
  4: "🍑",
  5: "🍊",
  length: 6,
};
const names = ["딸기", "배", "수박", "포도", "복숭아", "오렌지"];
const fruitsArr = Array.from(
  fruits,
  (item, idx) => (item = { name: names[idx], icon: item })
);
console.log("유사배열객체로 만든 새로운 배열 : ", fruitsArr);

// + 추가자료(안보시고 넘어가셔도 됩니다.)
// NodeList는 유사배열객체 임에도 불구하고 for of문과 배열 일부 메서드들을 사용 할 수 있습니다.
// 그이유는? NodeList는 Symbol.iterator 메서드가 추가적으로 구현되어 있기 때문입니다.
// 주의! NodeList의 forEach() 메소드는 배열의 forEach()와 다릅니다.
// 배열의 forEach()는 undefined를 반환하고, NodeList의 forEach()는 반환값이 없습니다.
// NodeList forEach()의 경우 익스플로러가 호환이 안됩니다.

// 문제 1
// 배열을 생성하는 4가지 방법을 적어보세요.

// 문제 2
// ['강아지', '고양이', '다람쥐', '호랑이', '토끼'] 이 배열을 4가지 방법으로 생성해보세요.
// 한 가지 방법은 유사배열객체를 생성해서 배열로 만들어주세요.
// 추가적으로 할 수 있다면 유사객체로 만든 배열의 요소들을 아래 이모지로 바꿔 주세요.
// ['🐕','🐈','🐿️','🐅','🐇']


// 정답은 아래 스크롤 내려면 있습니다.

//=======================================정답========================================
// 문제1 정답
// console.log('첫 번째 방법은 배열 리터럴을 사용하여 배열을 생성합니다.');
// console.log('두 번째 방법은 Array 생성자 함수를 사용하여 배열을 생성합니다.');
// console.log('세 번째 방법은 Array 객체의 of() 메소드를 사용하여 인자로 전달된 값으로 배열을 생성합니다.');
// console.log('네 번째 방법은 Array 객체의 from() 메소드를 사용하여 인자로 전달된 값을 배열로 변환합니다.');

// 문제2 정답
// console.log('=============================정답=============================');
// const animal1 = ['강아지', '고양이', '다람쥐', '호랑이', '토끼'] ;
// const animal2 = new Array('강아지', '고양이', '다람쥐', '호랑이', '토끼');
// const animal3 = Array.of('강아지', '고양이', '다람쥐', '호랑이', '토끼');
// const animalObj = {
//     0 : '강아지',
//     1 : '고양이',
//     2 : '사자',
//     3: '호랑이',
//     4 : '토끼',
//     length: 5
// }
// const animal4 = Array.from(animalObj);
// const animalEmoji = Array.from(animalObj, (item,idx) => item = ['🐕','🐈','🐿️','🐅','🐇'][idx]);
// console.log('배열의 리터럴 : ', animal1);
// console.log('new Array() : ', animal2);
// console.log('Array.of() : ', animal3);
// console.log('Array.from() : ', animal4);
// console.log('Array.from() 이모지 : ',animalEmoji);


