class CartRepositories{
    constructor(dao){
        this.dao = dao
    }
    //Crear carrito
    addCart = async() =>{
        let result = this.dao.addCart()
        return result
    }

    //Buscar por id
    getCartsById= async(cid) =>{
        let result = this.dao.getCartsById(cid)
        return result
    }

    //Agregar prod al carrito
    updateCart = async(cid,pid) => {
        let result = this.dao.updateCart(cid,pid)
        return result
    }

    //borrar producto del carrito
    deletProdCart = async(cid,pid) => {
        let result = this.dao.deletProdCart(cid,pid)
        return result
    }

    //Actualizar quantity
    quantityProdCart = async(cid,pid,quantity) => {
        let result = this.dao.quantityProdCart(cid,pid,quantity)
        return result
    }

    //Borrar carrito
    deleteCart = async(cid) => {
        let result = this.dao.deleteCart(cid)
        return result
    }

}

module.exports = CartRepositories