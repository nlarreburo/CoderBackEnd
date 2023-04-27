class CartRepositories {
    constructor(dao) {
        this.dao = dao
    }
    //Crear carrito
    addCart = async () => {
        try {
            let result = this.dao.addCart()
            return result
        } catch (error) {
            new Error(error)
        }
    }

    //Buscar por id
    getCartsById = async (cid) => {
        try {
            let result = this.dao.getCartsById(cid)
            return result
        } catch (error) {
            new Error(error)
        }
    }

    //Agregar prod al carrito
    updateCart = async (cid, pid) => {
        try {
            let result = this.dao.updateCart(cid, pid)
            return result
        } catch (error) {
            new Error(error)
        }
    }

    //borrar producto del carrito
    deletProdCart = async (cid, pid) => {
        try {
            let result = this.dao.deletProdCart(cid, pid)
            return result
        } catch (error) {
            new Error(error)
        }
    }

    //Actualizar quantity
    quantityProdCart = async (cid, pid, quantity) => {
        try {
            let result = this.dao.quantityProdCart(cid, pid, quantity)
            return result
        } catch (error) {
            new Error(error)
        }
    }

    //Borrar carrito
    deleteCart = async (cid) => {
        try {
            let result = this.dao.deleteCart(cid)
            return result
        } catch (error) {
            new Error(error)
        }
    }

    ticketCart = async (amount,purchaser) => {
        try {
            let result = this.dao.ticketCart(amount,purchaser)
            return result
        } catch (error) {
            new Error(error)
        }
    }

}

module.exports = CartRepositories