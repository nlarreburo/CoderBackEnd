const fs= require('fs')


class ProductManager {

    constructor(ruta){
        this.path = ruta
    }

    //Funcion obtener products
    gProducts = async () =>{
        try {

            const data = await fs.promises.readFile(this.path,'utf-8')
            let products = JSON.parse(data)
            return products

        } catch (error) {
            console.log('Error:',error)
        }
    }

    //Funcion agregar products
    aProducts = async (products) => {
        try {

            //Pasar products a string para poder re-escribir el archivo
            let productsStr = JSON.stringify(products)
            //Re-escribir archivo
            await fs.promises.writeFile(this.path,productsStr)

        } catch (error) {
            console.log('Error:',error)
        }
    }


    //Devuelve la lista de products
    getProducts = async () =>{
        if(!fs.existsSync(this.path)){return console.log("No se encuentra el archivo");} //Consulta si existe la ruta con el archivo
        const products = await this.gProducts()
        //console.log(products)
        return products
    }

    //Agregar product
    addProduct = async (title,description,price,thumbnail,code,stock) =>{
        const product={
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

        //Comprobar que todos los campos esten completos
        if((Object.values(product)).includes(undefined)){return console.log("Ingresar todos los datos\n")}

        try {
            //Crea un nuevo archivo si este no existe
            if(!fs.existsSync(this.path)){await fs.promises.writeFile(this.path,"[]")}

            //let resultado = await fs.promises.readFile(this.path,'utf-8')
            let products =await this.gProducts()
            
            //Comprobar si se repito el code
            if(products.find(p => p.code === product.code)){return console.log("El code ya fue ingresado, por favor ingresar otro \n")}

            products.push(product)

            //Colocar ID
            if (products.length === 1){
                product.id = 1
            } else {
                product.id = (products[(products.length) -2].id) + 1
            }
            product.status = true
            //Funcion agregar products
            this.aProducts(products)
            console.log("El producto se a agregado con exito!!!\n")
            this.getProducts()

        } catch (error) {
            console.log('Error:',error);
        }
    }

    //Buscar por ID
    getProductsById = async (id) =>{
        //let resultado = await fs.promises.readFile(this.path,'utf-8')
        let products = await this.gProducts()

        const prod = products.find(p => p.id === id)

        if (prod===undefined){
            //console.log("Not Found\n")
            return ('Not Found')
        } else {
            //console.log(prod,"\n")
            return prod
        }

    }

    //id del producto, campo al cual se quiere modificar, modificacion
    updateProduct = async (id,updProd) =>{

        let products = await this.gProducts()
        //console.log(products)
        products.find(p => {
            if(p.id === id){
                for (let key in updProd){
                    if(key!=id && updProd[key]!=''){
                        p[key] = updProd[key]
                    }
                }
            }}
        )
        //Funcion agregar products
        this.aProducts(products)
    }

    //Borrar product
    deleteProduct = async (id) =>{
        console.log("El siguiente producto se a borrado \n")
        this.getProductsById(id)

        let products = await this.gProducts()
        products = products.filter(p =>p.id != id)
        //Funcion agregar products
        this.aProducts(products)

        console.log("Elemento borrado con exito!!! \n")

        this.getProducts()
    }

}

module.exports = ProductManager
//const productManager = new ProductManager('./JSON/products.JSON')
//productManager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc10",25)
//productManager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc2",25)
//productManager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc3",25)
//productManager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc4",25)

//productManager.getProducts()
//productManager.getProductsById(2)
//productManager.updateProduct(2,'title','segunda prueba') //id del producto, campo al cual se quiere modificar, modificacion
//productManager.deleteProduct(2)

