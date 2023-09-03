import Product from './src/models/Product.js';

class ProductsController {
  async getProductByID(req, res) {
    try {
      const {id} = req.params;
      const product = await Product.findOne({id}).select('-_id -__v');
      if (!product) {
        return res.status(404).json({message: 'Product not found'});
      }
      return res.json(product);
    } catch (e) {
      console.log(e);
      return res.status(400).json({message: 'An error occurred'});
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await Product.find().select('-_id -__v');
      return res.json(products);
    } catch (e) {
      console.log(e);
      return res.status(400).json({message: 'An error occurred'});
    }
  }
}

export default new ProductsController();
