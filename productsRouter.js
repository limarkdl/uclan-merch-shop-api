import {Router} from 'express';
const productsRouter = new Router();
import productsController from './productsController.js';

productsRouter.get('/all', productsController.getAllProducts);
productsRouter.get('/:id', productsController.getProductByID);

export default productsRouter;
