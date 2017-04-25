
interface A {
    id: string;
}

class C1 {
    id: string;
    constructor(id:string){}
}
class C2 {
    id: string;
    constructor(id:number){}
}
let o1 = new C1('5');
let o2 = new C2(6);
let a: A = o2;
let c: C1 = new C2(7);
