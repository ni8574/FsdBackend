// // Call back  --> pass function as a perimeter 

// function hello(n1,n2,callback){
// console.log("Hello World");
// callback();
// // cb();

// }
// let a = 10;
// let b = 20;
// console.log(hello(a,b,sayHi));
// console.log(hello(a,b,sayHello()));
// console.log(hello(a,b,function demo(){
//     console.log("callback is calling");
// }));

// function sayHi(){
//     console.log("callback function");
// }

// sayHi();

// function sayHello(){
//     console.log("this is second call");

// }
// sayHello();

// // PROMISES // //

const promiseOne = new Promise((resolve, reject) => {
    console.log("successfully passed");
    resolve("resolve promises");
});

promiseOne
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });

new Promise(function (resolve, reject) {
    setTimeout(function () {
        let msg = true;

        if (!msg) {
            resolve("User: Asynchronous task");
        } else {
            reject("ERROR: Undefined data..");
        }

        console.log("Asynchronous task...");
    }, 1000);

})
.then(function (result) {
    console.log(result);
})
.catch(function (error) {
    console.log(error);
});

console.log("Async task-2...");