"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
function ff1() {
    return __awaiter(this, void 0, void 0, function* () {
        var x;
        console.log(x);
        x = yield new Promise(function (resolve, reject) {
            setTimeout(function () { return resolve('a'); }, 1000);
        });
        console.log(x);
        x = yield new Promise(function (resolve, reject) {
            setTimeout(function () { return resolve('b'); }, 1000);
        });
        console.log(x);
        x = yield new Promise(function (resolve, reject) {
            setTimeout(function () { return resolve('c'); }, 1000);
        });
        console.log(x);
        return 'asd';
    });
}
function ff2() {
    return __awaiter(this, void 0, void 0, function* () {
        yield ff1();
        yield ff1();
    });
}
ff2().then(function (x) { return console.log(x); });
//# sourceMappingURL=3.js.map