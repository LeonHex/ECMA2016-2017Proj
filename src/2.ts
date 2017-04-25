const a = [1,2,3];
let it = a[Symbol.iterator]();

let s: Set<string> = new Set<string>();
s.add('1');
s.add('2');
s.add('2');
console.log(s.size);
console.log('---------------');

class C {
    constructor(public id: string) {}
    toString() {
        return JSON.stringify(this);
    }
}

let m:Map<C, number> = new Map();
let e1 = new C('e1');
m.set(e1, 1);
m.set(e1, 2);
let e2 = new C('e2');
m.set(e2, 3);


for (let x of m.entries()) {
    console.log(x);
}

export {};