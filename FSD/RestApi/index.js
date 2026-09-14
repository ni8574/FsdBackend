import express from "express"
const app = express();
app.use(express.json());
let users = [{
    id:1,
    name:"A",
    email:"a@abes.ac.in"
},
{
id:2,
name:"B",
email:"b@abes.ac.in"
}];
app.get("/users",(req,res) => {
    res.json(users);

    app.post("/users",(req,res) => {
    res.json(users);
app.put("/users/:");

app.put("/ussers/:id",(req,res) => {
    let user = users.find(u=>u.id==req.params.id);
    user.name = req
})


})
