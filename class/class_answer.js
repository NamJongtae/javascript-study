
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
class 육식동물 extends Animal {
    constructor(name){
        super('육식');
        this.name = name;
    }
    introduce() {
        super.introduce();
        console.log(`내 이름은 ${this.name}이야`);
    }
}

// 정답입니다
console.log('============================문제1번 정답============================\n')
class 새 extends 육식동물 {
    constructor(name){
        super(name);
    }
    move() {
        super.introduce();
        console.log('나는 날 수 있어');
    }
}

const 독수리 = new 새('독수리');
독수리.move();
독수리.introduce();

console.log('\n============================문제2번 정답============================\n')
class Animal4 {
    #name = '';
    constructor(name){
        this.#name = name;
    }
    get myName() {
        return this.#name;
    }
    set myName(name){
        if(name!==this.#name) return console.log(`그건 내 이름이 아니야 내 이름은 ${this.#name}이야`);
        return this.#name = name;
    }
    introduce() {
        console.log(`나는 ${this.#name}이야`);
    }
    move() {
        console.log("달려서 이동중...");
    }
}
const 사슴 = new Animal4('사슴');
사슴.myName = '토끼';