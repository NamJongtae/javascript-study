// 1. class 란?
//  - class는 ES6 도입된 개념입니다. class 나오기 이전에는 protype를 사용하였습니다.
//  - class는 prototype를 기반으로 만들어졌습니다.
//  - class가 ES6에서 추가된 이유는 prototype보다 직관적이고, 작성하기 쉽기 때문입니다.
//  - class와 같이 내부적인 동작은 동일하지만 더 보기 좋고 편리하게 개선된 문법을 Syntactic sugar라고 합니다.

// class 
// class는 class 키워드를 붙여 생성하고, 앞글자는 대문자로 하는 것이 관례입니다.
// class로 생성된 객체를 인스턴스 객체라고 합니다.
// 인스턴스 객체는 생성자 함수에 new 키워드를 붙여 생성합니다.
// construtor는 인스턴스 생성시 인자를 받아서 프로퍼티를 초기화 합니다.
// construtor는 class 하나에 하나만선언 할 수 있습니다.
// 필요없다면 생략이 가능 합니다.
// 여기서 this는 생성될 인스턴스 객체를 의미합니다.
// 클래스에서 정의된 함수는 메서드라고 합니다.
// 클래스 에서 정의한 메서드는 prototype에 저장됩니다.
// 클래스 사용 예시
console.log("\n================================클래스 예시================================\n");
class Animal {
    constructor(eat) {
        this.eat = eat;
    }
    introduce() {
        console.log(`나는 ${this.eat}를 좋아하는 동물이야`);
    }
    move() {
        console.log("달려서 이동중...");
    }
}
const 초식동물1 = new Animal('초식');
console.log('Animal 클래스로 생성 : ',초식동물1);
초식동물1.introduce();


// field에 대해
// field란? 클래스 내에서 construtor 밖에서도 this를 쓰지않고 프로퍼티를 정의하는 것을 말합니다.
// 현재 모든 브라우저에서는 지원하지 않습니다.
// 하지만 balbel같은 도구를사용하면 문제 없이 사용할 수 있습니다.
console.log("\n================================필드 예시================================\n");
class Animal2 {
    friend = '토끼';
    constructor(eat) {
        this.eat = eat;
    }
    introduce() {
        console.log(`나는 ${this.eat}를 좋아하는 동물이야`);
    }
    move() {
        console.log("달려서 이동중...");
    }
}
const 초식동물2 = new Animal2('초식');
console.log('field 영역에 friend 추가 : ', 초식동물2);
초식동물2.introduce();

// 상속 inherit
// class에서 상속은 extends 키워드를 사용합니다.
// 상속 사용 예시
console.log("\n================================상속 예시================================\n");
class 초식동물 extends Animal {
    constructor(name){
        super('초식');
        this.name = name;
    }
    introduce() { // 오버라이딩
        super.introduce();
        console.log(`내 이름은 ${this.name}이야`);
    }
} 
const 기린 = new 초식동물('기린');
console.log('Animal를 상속받은 초식동물 클래스로 생성 : ',기린);
기린.introduce();

// super 메소드는 부모 클래스와 constructor 가르킵니다.
// constructor안에서는 부모의 constructor를 가르킵니다.
// 메서드 안에서는 해당 부모 클래스를 가르킵니다.
// 주의사항 => 상속받은 자식 클래스에  constructor를 사용한다면 반드시 super() 사용해야 합니다.
// 부모에서 상속받은 constructor를 초기화 하지않고 생략하기 때문입니다.
// constructor를 사용 않는다면 자동으로 constructor를 넣어주기때문에 super를 사용하지 않아도 됩니다.
// 오버라이딩 => 자식 클래스에서 부모로 부터 받은 프로퍼티나 메서드를 덮여쓰는 것을 말합니다.
// 바로 위의 코드에서 introduce()가 부모의 introduce() 메소드 를 덮어쓴것입니다.
console.log("\n================================상속 예시2================================\n");
// class 상속 예시2
class 육식동물 extends Animal {
  
    introduce() {
        super.introduce();
        console.log(`내 이름은 ${this.name}이야`);
    }
}
const 사자 = new 육식동물("사자");
console.log('Animal를 상속받은 육식동물 클래스로 생성 : ', 사자);
사자.introduce();

// 문제 입니다.
// 1. 새라는 클래스를 만들고 육식동물을 상속해주세요.
// 2. introduce() 메소드에 기존 육식동물의 메서드에 나는 날 수 있어라는 문구가 출력되도록 추가해주세요.
// 3. move() 메소드를 비행해서 이동중이 출력되도록 변경해 주세요.
// 4. 인스턴스 객체의 명은 독수리로 만들어 주세요.
// 5. console.log()를 이용하여 introduce()와 move()제대로 나오는지 확인해주세요.

// ------------------------------------------------------------------------------

// 접근자 프로퍼티와 은닉화(객체 내부의 값을 감추는 것을 의미합니다.)
// 1. private 필드를 통한 은닉
// ES6에 도입된 문법으로 외부에서 해당 프로퍼티에 접근하지 못하도록 만듭니다.
// private 필드를 적용하려면 해당 프로퍼티 앞에 #를 붙여줍니다.
// 내부에서는 접근이 가능합니다.
// 필드에서 #를 붙인 프러퍼티를 먼저 선언해준 후 constructor에 사용해야합니다.
// 2. getter, setter 함수를 통한 은닉
// 위 함수들은 스스로 값을 갖지않고, 다른 프로퍼티의 값을 읽거나 저장할 때 사용됩니다.
// get, set를 앞에 붙여 사용합니다.
// get, set은 같은 이름으로 사용되어야합니다.
// 함수이지만 프로퍼티 처럼 사용됩니다.

// getter, setter 사용 예시
console.log("\n================================getter, setter 예시================================\n");
class Animal3 {
    #eat = ''; // private 필드 생성
    constructor(eat){
        this.#eat = eat;
    }
    get favriteFood() {
        return this.#eat;
    }
    set favriteFood(eat){
        // 설정을 제한할 수도 있습니다.
        if(eat==='육식') return console.log('나는 육식동물이 아니야');
        return this.#eat = eat;
    }
    introduce() {
        console.log(`나는 ${this.#eat}를 좋아하는 동물이야`);
    }
    move() {
        console.log("달려서 이동중...");
    }
}

const 초식동물3 = new Animal3('초식');
console.log('private 필드 프로퍼티 접근불가 : ',초식동물3);
console.log('setter 함수를 통한 프로퍼티 출력 : ',초식동물3.favriteFood);
초식동물3.favriteFood = '육식'; // 육식을 넣으면 접근 제한
초식동물3.favriteFood = '풀';
console.log('getter함수로 프로퍼티 변경 후 setter 함수를 통한 프로퍼티 출력 : ',초식동물3.favriteFood);

// 문제 입니다.
// 1. 아래의 클래스에서 이름을 private 필드를 활용해서
// setter getter은닉하는 클래스로 바꾸고, 원하는 동물을 생성하고
// 2. 생성한 객체 자신의 이름이 아니라면 '그건 내 이름이 아니야 내 이름은 OO이야' 라는 문구를 출력하도록 만들어주세요.
// 3. setter getter 함수가 잘 작동하는지 실행해보세요.
// class Animal4 {
//     constructor(name){
//         this.name = name;
//     }
//     introduce() {
//         console.log(`나는 ${this.name}이야`);
//     }
//     move() {
//         console.log("달려서 이동중...");
//     }
// }

// ==============================================================================================

// 정적 필드
// ES6에 도입된 기능입니다.
// class 내부에서 static 키워드를 사용하여 정의합니다.
// 인스턴스 객체 개수와 상관없이 메모리 한 곳만을 차지 합니다.
// 인스턴스 없이 클래스에서 바로 호출할 수 있습니다.
// 인스턴스에는 정적필드를 접근 할 수 없습니다.
// 클래스 자체에 있는 프로퍼티라고 보면 됩니다.
// 정적메서드에서는 정적필드만 사용가능합니다.
// 정적 필드 사용 예시

 class Person {
    static job = "developer";
    static introduceJob(){
        console.log(`저의 직업은 ${this.job}입니다.`);
    }
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    introduce() {
        console.log(`안녕하세요 저는 ${this.name}입니다. 나이는 ${this.age}세 입니다.`)
    }
 }
 Person.introduceJob();
const jon = new Person('jon', 20);
console.log(jon);
jon.introduce();



// +추가자료 (이외의 차이점이 있을 수도 있습니다.)
// 클래스와 생성자 함수의 차이점

// 생성자 함수는 new 키워드를 붙이지 않으면 undefined를 반환합니다.
// class는 에러를 출력합니다.

// for in 문 사용에서
// 생성자 함수는 프로토타입에 있는 메소드까지 모두 출력됩니다.
// class는 프로토타입에 있는 메소드는 출력되지 않습니다.
// => class의 메소드는 for in문에서 제외 되기 때문입니다.

// 생성자함수는 호이스팅 됩니다.
// class도 호이스팅이 되지만 TDZ 영역에 걸려 호이스팅이 이루어지지 않습니다.

// 생성자 함수는 call, apply을 이용한 바인딩을 통해 오버라이딩 할 수 있습니다.
// 생성자 함수 오버라이딩 예시
// function Animal(eat){
//     this.eat = eat;
// }
// Animal.prototype.introduce = function(){
//     console.log(`나는 ${this.eat}를 좋아하는 동물이야`);
// };

// function Lion(eat, name){
//     Animal.call(this, eat); // call을 사용하여 Animal 생성자 함수에서 상속받은 eat을 초기화합니다.
//     this.name = name;
// }

// // Animal 생성자 함수의 introduce 메서드를 호출하면서 Lion의 introduce 메서드를 오버라이딩 합니다.
// Lion.prototype.introduce = function(){
//     Animal.prototype.introduce.call(this); // call을 사용하여 Animal의 introduce 메서드를 호출하면서 this를 전달합니다.
//     console.log(`내 이름은 ${this.name}야`);
// };

// const lion = new Lion('육식', '사자');
// lion.introduce(); // 나는 육식을 좋아하는 동물이야, 내 이름은 사자야
// class는 super() 메서드를 사용하여 오버라이딩 할 수 있습니다.

// 생성자 함수는 prototype으로 상속을 합니다.
// class는 extends 키워드로 상속을 합니다.

// 생성자 함수의 메서드는 프로토타입을 이용하여 직접 정의해야합니다.
// class의 메서드는 class 내부에 정의하면 됩니다.
