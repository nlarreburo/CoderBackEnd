class ProductDTO {
    constructor(title,description,price,thumbnail,code,stock){
        this.title          = String(title)
        this.description    = String(description)
        this.price          = Number(price)     
        this.thumbnail      = String(thumbnail)
        this.code           = String(code)    
        this.stock          = Number(stock)      
    }
}
module.exports = ProductDTO