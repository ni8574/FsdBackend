//status code network 200:success,404:page not found
// Practice routing using http module in nodejs
import http from "http";
const server = http.createServer((req,res) =>{
    res.writeHead(200,()=>{
        console.log("Connection established successfully");
    });
    if(req.url === "/"){
            res.end("<h1>This is my homepage</h1>");
    }
    else if(req.url === "/about"){
        res.end("<h1>This is aboutpage</h1>");
    }
    else if(req.url === "/contact"){
        res.end("<h1>This is contact page</h1>");
    }
});
server.listen(3001,() => {
    console.log("server is running on http://localhost:3001");

});

// Create a student information form(name,age,branch,email,in table) using html and send the data to the serverusing port 