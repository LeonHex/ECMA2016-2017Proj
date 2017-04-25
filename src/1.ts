
let s1 = Symbol('fucked');
// let s2 = Symbol('fucked');
// console.log(s1 === s2);

let s3 = Symbol.for('fucked');


function f1(obj) {
    obj[s1] = true;
    obj['a'] = 5;
    for (let key in obj) {
        console.log(`${key}: ${obj[key]}`);
    }
    Object.getOwnPropertyNames
    Object.getOwnPropertySymbols

    return obj;
}

console.log(typeof s1);

export const AA = 5;
export function Af() {};