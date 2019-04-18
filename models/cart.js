const fs = require("fs");
const path = require("path");

const filePath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  /**
   * Add a product to the cart
   * @param {string} id
   * @param {float} totalPrice
   */
  static addProduct(id, totalPrice) {
    let cart = { products: [], totalPrice: 0 };

    // Fetch the previous cart
    fs.readFile(filePath, (err, fileContent) => {
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart...check if product already exists
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );

      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity = updatedProduct.quantity + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = existingProduct;
      } else {
        updatedProduct = { id: id, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      // Update the totalPrice
      cart.totalPrice = parseFloat(cart.totalPrice) + parseFloat(totalPrice);

      fs.writeFile(filePath, JSON.stringify(cart), err => {
        if (err) console.log(err);
      });
    });
  }
};
