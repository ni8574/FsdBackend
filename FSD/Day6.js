//      File Module:fs Module in node js
//      CRUD operations:Create,Read,Update,Delete 
//      Create a fiLE:writefile() and readfile()

// const fs = require('fs');
// fs.writeFile('myfile.txt', 'Hello,World',(err) => {   // 
//     if (err) throw err;
//    console.log('File created successfully!');
// });
//READ a file:readfile()



const fs = require('fs');

let data = fs.readFile('myfile.txt','UTF-8',(err,res) => {
    if(err){
        console.log("error",err);
        
    } 
    else{
        console.log(res);
    }
    console.log("File read successfully");
});



// for update -> append 
// for delete -> 

