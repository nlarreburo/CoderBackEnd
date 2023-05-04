const FakerGenerate = require("../utils/faker");

const fakerGenerate = new FakerGenerate()


class MockingController {

    createProducts = async (req,res) => {
        try {
            let products = []
            console.log("acaca");
            for (let i = 0; i < 100; i++) {
                products.push(await fakerGenerate.generateProducts())
                console.log(products)
            }
            res.send({
                status:'succes',
                products: products
            })
        } catch (error) {
            
        }
    }
}

module.exports = new MockingController()