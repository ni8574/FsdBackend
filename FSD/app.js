//function in js

// synchronous javascript
// console.log("Basic javascript function known as synchronous function");
// function hello(){
//     console.log("this js function");
// }
// hello();

// console.log("synchronous javascript");

////////////Asynchronous javascript////////////

//////ARROW FUNCTION///////
//////////////        Asynchronous javascript ---> IS A NON-BLOCKING PROGRAMMING         /////////////////
//////Variables ---> let,var,const
//  Syntax:  ()=>{}
//    const  hello = ()=>{
//     console.log("Asynchronous function");
//     setTimeout(()=>{
//         console.log("A");
//     },2000);


//    }
//    hello();
//    console.log("B");

 ////     -> Function as perimeter argument   <- ////
function hello(n1,n2){

    console.log(n1+n2);
        console.log(arguments);


}
let a = 10;
let b = 20;
hello(a,b);

/// promising , call back , asynkedness ///





