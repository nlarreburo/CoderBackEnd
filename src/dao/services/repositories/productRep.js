class ProductRepositories{
    constructor(dao){
        this.dao = dao
    }
    getProducts = async() =>{
        let result = this.dao.getProducts()
        return result
    }

    getProductsById= async(uid) =>{
        let result = this.dao.getProductsById(uid)
        return result
    }

    addProduct = async() => {
        let result = this.dao.addProduct()
        return result
    }

    updateProduct = async() => {
        let result = this.dao.updateProduct()
        return result
    }

    deleteProduct = async() => {
        let result = this.dao.deleteProduct()
        return result
    }

}

module.exports = ProductRepositories