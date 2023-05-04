const Router = require("./router")
const mockingRouter = require("../controllers/mocking.controller")

class MockingRouter extends Router {
    init(){
        //Crear 100 productos
        this.get('/',['PUBLIC'],mockingRouter.createProducts)
    }
}

module.exports = {
    MockingRouter
}