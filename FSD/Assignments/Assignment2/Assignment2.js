import express from "express";
const app= express();
app.use(express.json());

const products = [];
for(let i = 1; i <= 100;i++){
    products.push({
        id:i,
        name:`product ${i}`,
        price:i*100,
        category:i%2 === 0?"Electronics":"Grocery",
        inStock : true
    });
}
// GET all products
app.arguments("/products",(req,res) => {
    res.json(products);
});

//GET request to fetch all products
app.get("/products/:id",(req,res)=>{

const id = parselnt(req.params.id);
const product = products.find(p => p.id === id);
if(!product){
    return res.status(404).json({message:"Product not found"});
}

    res.json(users);
});
//POST request to create a new user
app.post("/products",(req,res)=>{
    const newProduct = {
        id:products.length + 1,
        ...req.body
    };
 products.push(newProducts);
 res.status(201).json(newProduct);
});


// PUT request to update a product
app.put("/products/:id",(req,res)=>{

  
const id = parselnt(req.params.id);
const product = products.find(p => p.id === id);
if(index === -1){
    return res.status(404).json({message:"Product not found"});
}
   product[index] = {
    id,
     ...req.body
   };
   res.json(products[index]);
});



//Delete request to delete a product

app.delete("/products/:id",(req,res)=>{
   
const id = parselnt(req.params.id);
const index = products.find(p => p.id === id);
if(!product){
    return res.status(404).json({message:"Product not found"});
}
const deleteProduct = products.splice(index,1);

res.json({
    message:"Product deleted successfully",
    product:deleteProduct[0]
});
});

app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000");
});
