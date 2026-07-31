/// /// /// Asynchronous js using async/await /// /// ///
// async function test(){
//     console.log("2:message");
//    await console.log("3:message");
//     console.log("4:message");

    
// }
// console.log("5:message");
// test();
// console.log("1:message");

// /// create promises that resolve with assignment submitted 
// /// and print using then(), reject with submission failed

// const assignmentPromise = new Promise((resolve, reject) => {
//     let isSubmitted = true;

//     if (isSubmitted) {
//         resolve("Assignment submitted");
//     } else {
//         reject("Submission failed");
//     }
// });
// assignmentPromise
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

    /// async function that display userdata ///
    // const userdataPromise = new Promise((resolve,reject) => {
    //    let success = true;
    //    if(success){
    //     resolve({
            

    //     });

    //    } else{
    //     reject("failed");
    //    }
    
    // });
    // userdataPromise
    // .then((result) => {
    //     console.log(result);
    // })
    // .catch((error) => {
    //     console.log(error);
    // });
    ///////



async function data(){
    await console.log("2:message");
   const response= await fetch("./studentData.json");
   console.log(response.status);


   const std = await response.json();

   return std;

       await console.log("3:message");
       console.log("4:message");

}
console.log("1:message");
data()
.then((res)=>{


})
.catch((err)=>{
  
    console.log("")
})



