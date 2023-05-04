const ProductModel = require('../../models/products.model.js')

class ProductManagerMongo{
    constructor(){

    }
    //Devolver todos los productos un producto
    getProducts = async(filter,option) =>{
        return await ProductModel.paginate(filter,option) //Devuelve todos los productos
         
    }


    //Buscar producto por su id
    getProductsById = async(pid) => {
        const product = await ProductModel.find({_id:pid})
        return product
    }
    

    //Agregar un producto
    addProduct = async(title,description,price,thumbnail,code,stock) =>{

        try {
            //Creamos el product
            let product = await ProductModel.create({
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                "status":true
            })

            return product
        } catch (error) {
            console.log("Error: ",error)
        }
    }


    //Actualizar producto
    updateProduct = async (pid,updProd) => {
        try {
            await ProductModel.updateOne({_id:pid},{$set:updProd})
        } catch (error) {
            console.log(error);
        }
        // for (let key in updProd){
        //     if(key!=pid && updProd[key]!=''){
        //         switch(key){
        //             case "title":
        //                 await ProductModel.updateOne({id:pid},{$set:{title:updProd[key]}})
        //                 break
        //             case "description":
        //                 await ProductModel.updateOne({id:pid}, {$set:{description:updProd[key]}})
        //                 break
        //             case "price":
        //                 await ProductModel.updateOne({id:pid}, {$set:{price:updProd[key]}})
        //                 break
        //             case "thumbnail":
        //                 await ProductModel.updateOne({id:pid}, {$set:{thumbnail:updProd[key]}})
        //                 break
        //             case "code":
        //                 await ProductModel.updateOne({id:pid}, {$set:{code:updProd[key]}})
        //                 break
        //             case "stock":
        //                 await ProductModel.updateOne({id:pid}, {$set:{stock:updProd[key]}})
        //                 break
        //         }
        //     }
        // }
    }

    //Borrar product
    deleteProduct = async(pid) =>{
        const product = await this.getProductsById(pid)
        if (product){
            await ProductModel.deleteOne({_id:pid})
            return product
        }
    }

}



module.exports = ProductManagerMongo