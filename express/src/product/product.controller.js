const express = require("express");
const prisma = require("../db/index");
const { 
    allProducts, 
    productById, 
    createProduct, 
    deleteProductById, 
    editProductById 
} = require("./product.service");
const router = express.Router();

router.get("/", async (req,res)=>{
    const products = await allProducts();

    res.send(products);
});
router.post("/", async (req,res)=>{
    try {
        const newData = req.body;
        const product = await createProduct(newData);

        res.send({
            data:product,
            message:"create product success",
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
    
});
router.put("/:id", async (req,res)=>{
    const productId = req.params.id;
    const newData = req.body;
    if(
        !(
            newData.name &&
            newData.desc &&
            newData.image &&
            newData.price
        )
    ){
        return res.status(400).send("some fields are missings");
        
    }
    const product = await editProductById(parseInt(productId),newData);


    res.send({
        data:product,
        message:"Update product success",
    });
});
router.patch("/:id", async (req,res)=>{
    try {
        const productId = req.params.id;
        const newData = req.body;
        const product = await editProductById(parseInt(productId),newData);

        res.send({
            data:product,
            message:"Update product success",
        });
    } catch (err) {
        res.status(400).send(err.message);
    }  
});
router.delete("/:id", async (req,res)=>{
    try {
        const productId = req.params.id;
        await deleteProductById(parseInt(productId));

        res.send("product deleted");
    } catch (err) {
        res.status(400).send(err.message);
    }
    
});
router.get("/:id", async (req,res)=>{
    try {
        const productId = parseInt(req.params.id);
        const products = await productById(productId);
        res.send(products);
    } catch (err) {
        res.status(400).send(err.message);
    } 
});

module.exports = router;