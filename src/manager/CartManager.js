const fs= require('fs')
const ProductManager = require('../manager/ProductManager.js')



const filePath = __dirname + '/JSON/products.JSON'
const productManager = new ProductManager(filePath)


class CartManager {

    constructor(ruta){
        this.path = ruta
    }
    
    //Funcion obtener carrito
    gCarts = async () =>{
        try {

            const data = await fs.promises.readFile(this.path,'utf-8')
            let carts = JSON.parse(data)
            return carts

        } catch (error) {
            console.log('Error:',error)
        }
    }

    //Funcion agregar products
    aCarts = async (carts) => {
        try {

            //Pasar products a string para poder re-escribir el archivo
            let cartsStr = JSON.stringify(carts)
            //Re-escribir archivo
            await fs.promises.writeFile(this.path,cartsStr)

        } catch (error) {
            console.log('Error:',error)
        }
    }


    //Devuelve la lista de products
    getCarts = async () =>{
        if(!fs.existsSync(this.path)){return console.log("No se encuentra el archivo");} //Consulta si existe la ruta con el archivo
        const carts = await this.gCarts()
        console.log(carts)
        return carts
    }

    //Agregar product
    addCart = async (cart) =>{

        //Comprobar que todos los campos esten completos
        if((Object.values(cart)).includes(undefined)){return console.log("Ingresar todos los datos\n")}

        try {
            //Crea un nuevo archivo si este no existe
            if(!fs.existsSync(this.path)){await fs.promises.writeFile(this.path,"[]")}

            //let resultado = await fs.promises.readFile(this.path,'utf-8')
            let carts = await this.gCarts()
            

            carts.push(cart)

            //Funcion agregar products
            this.aCarts(carts)
            console.log("El carrito se a agregado con exito!!!\n")
            this.getCarts()

        } catch (error) {
            console.log('Error:',error);
        }
        
    }

    //Buscar por ID
    getCartsById = async (id) =>{
        //let resultado = await fs.promises.readFile(this.path,'utf-8')
        let carts = await this.gCarts()

        const cart = carts.find(p => p.id === id)

        if (cart===undefined){
            //console.log("Not Found\n")
            return ('Not Found')
        } else {
            //console.log(prod,"\n")
            return cart
        }
    }

    //Agregar prod al carrito
    updateCart = async (cid,pid) =>{
        let products = await productManager.gProducts()
        let carts = await this.gCarts()
        //console.log(products)
        carts.find(c => {
            if(c.id === cid){

                products.find( p =>{
                    if(p.id === pid){
                        if(!(c.product.includes(pid))){
                            c.product.push(pid)
                            c.quantity = 1
                        } else {
                            c.quantity += 1
                        }
                    }

                })
            }else{
                console.log("no existe el carrito")
            }
        }
        )
        //Funcion agregar products
        this.aCarts(carts)
    }
}
module.exports = CartManager