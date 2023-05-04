const generateUserErrorInfo = (user) => {
    return `One or more properties were incomplete or not valid.
            List of reuqired properies:
            * fist_name: needs to be a String, revived: ${user.first_name}
            * last_name: needs to be a String, revived: ${user.last_name}
            * email: needs to be a String, revived: ${user.email}`
}

const generateProductsErrorInfo = (product) => {
    console.log(product);
    return `One or more properties were incomplete or not valid.
            List of reuqired properies:
            * title: needs to be a String, revived: ${product.title}
            * description: needs to be a String, revived: ${product.description}
            * price: needs to be a Number, revived: ${product.price}
            * thumbnail: needs to be a String, revived: ${product.thumbnail}
            * code: needs to be a String, revived: ${product.code}
            * stock: needs to be a Number, revived: ${product.stock}
            `
}

module.exports = {
    generateUserErrorInfo,
    generateProductsErrorInfo
}