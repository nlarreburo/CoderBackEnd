const { faker } = require('@faker-js/faker')


class FakerGenerate {
    constructor(){
        faker.local = 'es'

    }

    generateProducts = () => {
        return{
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image(),
            code: faker.random.numeric(1, {bannedDigits: ['0']}),
            stock: faker.random.numeric(1),
            id: faker.database.mongodbObjectId(),
            status: faker.datatype.boolean()
        }
    }

    generateUser = () => {
        let numOfProducts = parseInt(faker.random.numeric(1, {bannedDigits: ['0']}))
        let products = []
        for (let i = 0; i < numOfProducts; i++) {
            products.push(generateProducts())
        }

        return {
            name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            sex: faker.name.sex(),
            birthDate: faker.date.birthdate(),
            phone: faker.phone.number(),
            imagen: faker.imagen.avatar(),
            id: faker.database.mongodbObjectId(),
            email: faker.internet.email(),
            products
        }
    }
}

module.exports = FakerGenerate