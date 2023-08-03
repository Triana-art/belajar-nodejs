const prisma = require("../db");
const { 
    findProduct, 
    insertProduct, 
    deleteProduct, 
    findAllProduct, 
    updateProduct, 
    checkProduct
} = require("./product.repository");

const allProducts = async () => {
    const products = await findAllProduct();

    return products;
};

const productById = async (id) => {
    const products = await findProduct(id);
    if(!products){
       throw Error("product not found");
    }
    return products;
};

const createProduct = async (newData) => {
    const check = await checkProduct(newData);
    if(check){
        throw Error("product already exists");
    }
    const product = await insertProduct(newData);

    return product;
};

const deleteProductById = async (id) => {
    await productById(id);

    await deleteProduct(id);
};

const editProductById = async (id,newData) => {
    await productById(id);

    const product = await updateProduct(id,newData);

    return product;
};

module.exports ={
    allProducts,
    productById,
    createProduct,
    deleteProductById,
    editProductById
}