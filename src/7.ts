
let x = Inject(B, C)
@x
class A {
    @d2
    id: string;

    @bindThis
    f1() {
        this
    }

    @log
    f2() {
        addEvxxx(this.f1);
    }
}

function Inject(B, C) {
    return (...args) {
        self.f = () => {
            f();
            log('f');
        }
    }
}