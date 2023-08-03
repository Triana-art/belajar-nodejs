const prisma = require("../db");


const findAllProduct = async () => {
    const products = await prisma.product.findMany();
    // const products = await prisma.$executeRaw`SELECT * FROM product`;

    return products;
};

const findProduct = async (id) => {
    const products = await prisma.product.findUnique({
        where:{
            id,
        },
    });
    return products;
};
const checkProduct = async (newData) => {
    const products = await prisma.product.findFirst({
        where:{
            name:newData.name,
        },
    });
    return products;
};
const insertProduct = async (newData) => {
    const product = await prisma.product.create({
        data:{
            name:newData.name,
            desc:newData.desc,
            image:newData.image,
            price:newData.price,
        },
    });
    return product;
};

const updateProduct = async (id,newData) => {
    const product = await prisma.product.update({
        where:{
            id,
        },
        data:{
            name:newData.name,
            desc:newData.desc,
            image:newData.image,
            price:newData.price,
        },
    });
    return product;
};

const deleteProduct = async (id) => {
    await prisma.product.delete({
        where:{
            id,
        },
    });
};
module.exports ={
    findAllProduct,
    findProduct,
    checkProduct,
    insertProduct,
    updateProduct,
    deleteProduct
}