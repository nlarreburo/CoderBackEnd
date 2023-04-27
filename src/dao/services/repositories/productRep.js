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

    getProductsById= async(pid) =>{
        try { 
            let result = this.dao.getProductsById(pid)
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

    updateProduct = async(pid,updProd) => {
        try { 
            let result = this.dao.updateProduct(pid,updProd)
            return result
        } catch (error) {
            new Error(error)
        }
    }

    deleteProduct = async(pid) => {
        try { 
            let result = this.dao.deleteProduct(pid,updProd)
            return result
        } catch (error) {
            new Error(error)
        }
    }

}

module.exports = ProductRepositories