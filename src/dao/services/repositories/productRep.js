class ProductRepositories{
    constructor(dao){
        this.dao = dao
    }
    getProducts = async(filter,option) =>{
        try { 
            let result = this.dao.getProducts(filter,option)
            return result
        } catch (error) {
            new Error(error)
        }
    }

    getProductsById= async(uid) =>{
        try { 
            let result = this.dao.getProductsById(uid)
            return result
        } catch (error) {
            new Error(error)
        }
    }

    addProduct = async() => {
        try { 
            let result = this.dao.addProduct()
            return result
        } catch (error) {
            new Error(error)
        }
    }

    updateProduct = async() => {
        try { 
            let result = this.dao.updateProduct()
            return result
        } catch (error) {
            new Error(error)
        }
    }

    deleteProduct = async() => {
        try { 
            let result = this.dao.deleteProduct()
            return result
        } catch (error) {
            new Error(error)
        }
    }

}

module.exports = ProductRepositories