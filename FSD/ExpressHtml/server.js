import express from "express";
import fs from 'fs'
const app = express();
const PORT = 3000;
app.get('/',(req,res)=>{
    fs.readFile('./pages/index.html','utf-8',(err,data)=>{
        if(err){
            res.status(500).send("Error reading file");
            return;
        }
        res.send(data);

    });
});
app.get('/About',(req,res)=>{
    fs.readFile('./pages/About.html','utf-8',(err,data)=>{
        if(err){
            res.status(500).send("Error reading file");
            return;
        }
    });
})
app.get('/Contact',(req,res)=>{
        fs.readFile('./pages/Contact.html','utf-8',(err,data)=>{
        if(err){
            res.status(500).send("Error reading file");
            return;
        }
        res.send(data);

    });
})
app.listen(PORT,() =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})


