
async function ff1() {
    let x;
    console.log(x);
    x = await new Promise<string>((resolve, reject) => {
        setTimeout(() => resolve('a'), 1000);
    });
    console.log(x);
    x = await new Promise<string>((resolve, reject) => {
        setTimeout(() => resolve('b'), 1000);
    });
    console.log(x);
    x = await new Promise<string>((resolve, reject) => {
        setTimeout(() => resolve('c'), 1000);
    });
    console.log(x);
    return 'asd';
}

async function ff2() {
    await ff1();
    await ff1();
}


ff2().then((x) => console.log(x));


export { };