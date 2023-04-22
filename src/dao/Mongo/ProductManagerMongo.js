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
        const product = await ProductModel.find({id:pid})
        return product
    }
    

    //Agregar un producto
    addProduct = async(title,description,price,thumbnail,code,stock) =>{
        //Comprobamos que todos los campos esten completos
        if(!title || !description || !price || !thumbnail || !code || !stock){
            return console.log("Ingresar todos los datos\n");
        }
        try {
            
            //Buscamos el ultimo id
            var pid = ((await ProductModel.find({},{id:1,_id:0}).sort({id:-1}).limit(1)).map(doc => doc.id))[0]
            if(pid){
                //Sumamos al ultimo id
                var id = pid + 1
            }else{
                //Creamos el primer id
                var id = 1
            }

            //Creamos el product
            let product = await ProductModel.create({
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                "status":true,
                id
            })

            return product
        } catch (error) {
            console.log("Error: ",error)
        }
    }


    //Actualizar producto
    updateProduct = async (pid,updProd) => {
        for (let key in updProd){
            if(key!=pid && updProd[key]!=''){
                switch(key){
                    case "title":
                        await ProductModel.updateOne({id:pid},{$set:{title:updProd[key]}})
                        break
                    case "description":
                        await ProductModel.updateOne({id:pid}, {$set:{description:updProd[key]}})
                        break
                    case "price":
                        await ProductModel.updateOne({id:pid}, {$set:{price:updProd[key]}})
                        break
                    case "thumbnail":
                        await ProductModel.updateOne({id:pid}, {$set:{price:updProd[key]}})
                        break
                    case "code":
                        await ProductModel.updateOne({id:pid}, {$set:{price:updProd[key]}})
                        break
                    case "stock":
                        await ProductModel.updateOne({id:pid}, {$set:{price:updProd[key]}})
                        break
                }
            }
        }
    }

    //Borrar product
    deleteProduct = async(pid) =>{
        const product = await this.getProductsById(pid)
        if (product){
            await ProductModel.deleteOne({id:pid})
            return product
        }
    }

}



module.exports = ProductManagerMongo